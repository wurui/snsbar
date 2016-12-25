define(['mustache','oxjs'], function (Mustache,Lib) {
    Lib.config({
        devHost:'http://192.168.1.103:9000/'
    })
    var target_id = Lib.queryString('_id');
    var tplCmtList,fixedBar,cmtList;
    var login_uid;
    var ds_comment='comment@258511b3cc23a3f18b51128ed';
    var ds_fav='fav@258525703fd550a4e04e686a0';
    var Actions = {
        comment: function (ctx) {
            fixedBar.attr('data-acting', 'comment')

            var box = fixedBar.find('[data-anchor=comment]'),
                textarea = box.find('textarea').focus(),
                $f = fixedBar.find('form.J_commentForm');

            if(!$f.data('initialized')) {
                $f.data('initialized',1);
                $f.on('submit', function (e) {
                    var data = Lib.formToJSON($f[0]);
                    var content = $f[0].content.value;
                    data.tid = target_id;
                    // data.ds_id;
                    Lib.callapi('insert/'+ds_comment, {
                        tid: target_id,
                        time: (new Date).getTime(),
                        user: {
                            name: login_uid.replace(/\w+\//,''),
                            avatar: 'https://oxm1.cc/uploads/'+login_uid+'/user/avatar.png',
                            tag: login_uid.startsWith('git/')?'git开发者':'openxsl用户'
                        },
                        content: content
                    }, function () {
                        Lib.toast('ok');
                        Actions.getCmtcount();
                        Actions.getCmtList()
                    })
                    fixedBar.removeAttr('data-acting');
                    return false;
                })
            }
        },
        cancel: function (ctx) {
            fixedBar.removeAttr('data-acting');
        },
        share:function(ctx){

            fixedBar.attr('data-acting', 'share')
        },
        cmtlist:function(ctx){
            location.href='#commentlist'
            //window.scrollTo(0,ctx.children('.J_CmtList').offset().top);
        },
        fav:function(ctx){
            var btnFav=ctx.find('.J_fav'),
                cls='bt-faved',//.toggleClass('bt-faved');
                s_update={};
            if(btnFav.hasClass(cls)){

                s_update={
                    $pull:{
                        "users":login_uid
                    }
                }
            }else{
                s_update={
                    $addToSet:{
                        "users":login_uid
                    }
                };
            }
            Lib.callapi('update/'+ds_fav, {
                query:{
                    "tid": target_id
                },
                update:s_update
            }, function (r) {
                //if(r.data.nModified ==1)
                btnFav.toggleClass(cls)

                Lib.toast('ok');
            })
        },
        getFav:function(ctx){
            Lib.callapi('count/'+ds_fav, {

                "tid": target_id,
                "users":{
                    "$elemMatch":{
                        $eq:login_uid
                    }
                }

            }, function (r) {
                if(r.data ==1){

                    fixedBar.find('.J_fav').addClass('bt-faved');
                }
                //Lib.toast('ok'+ r.data );
            });
        },
        getCmtcount:function(ctx){
            Lib.callapi('count/'+ds_comment, {

                "tid": target_id

            }, function (r) {


                fixedBar.find('.J_cmtcount').html(r.data||0);

                //Lib.toast('ok'+ r.data );
            });
        },
        getCmtList:function(){
            Lib.callapi('find/'+ds_comment,{
                tid:target_id
            },function(r){
                var data=r && r.data;
                if(data){
                    cmtList.children('.J_cmtUL').html(Mustache.render(tplCmtList,{
                        data:data,
                        displayTime:function(){
                            var d=new Date(this.time-0);
                            return d.getMonth()- -1 +'.'+ d.getDate() +' '+ d.getHours()+':'+ d.getMinutes()
                        }
                    }));
                }
            })
        }

    };
    return {
        init: function ($mod) {
            login_uid=$mod.attr('data-uid');
            fixedBar=$mod.children('.J_Fixedbar');
            cmtList=$mod.children('.J_CmtList');
            //$('body').css('padding-bottom',40)

            tplCmtList= $.trim($mod.find('.J_tplCmtList').html());
            $mod.on('click', function (e) {
                if(!login_uid){
                    return Lib.toast('未登录')
                }
                var tar = e.target, action = tar.getAttribute('data-action');
                if (action in Actions) {
                    Actions[action].call(Actions, $mod)
                }
            });

            this.initFixedbar();
            this.initCmtList();
            //this.initWX();

        },
        initFixedbar:function(){
            Actions.getFav();
            Actions.getCmtcount();
        },
        initCmtList:function(){
            Actions.getCmtList();


        }
    }
})
