define(['./oxjs'], function (Lib) {
    var target_id=Lib.queryString('_id');
    var Actions={
        comment:function($mod){
            var box=$mod.find('[data-anchor=comment]'),
                textarea=box.find('textarea').focus(),
                $f=box.find('form');

            $f.on('submit',function(e){
                var data= Lib.formToJSON($f[0]);

                data.tid=target_id;
                Lib.callapi('sns.comment',data,function(){
                    Lib.toast('ok');
                })
                $mod.removeAttr('data-acting');
                return false;
            })
        },
        cancel:function($mod){

        }
    };
    return {
        init: function ($mod) {

            $mod.on('click', function (e) {
                var tar= e.target,action=tar.getAttribute('data-action');
                if(action in Actions){
                    Actions[action].call(Actions,$mod.attr('data-acting',action))
                }
                /*
                switch (action){
                    case 'comment':
                    case 'cancel':

                        break
                }
                */
            })
        }
    }
})
