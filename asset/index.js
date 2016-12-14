define(['./oxjs'], function (Lib) {
    var target_id = Lib.queryString('_id');
    var Actions = {
        comment: function ($mod) {
            var box = $mod.find('[data-anchor=comment]'),
                textarea = box.find('textarea').focus(),
                $f = box.find('form');

            if(!$f.data('initialized')) {
                $f.data('initialized',1);
                $f.on('submit', function (e) {
                    var data = Lib.formToJSON($f[0]);
                    var content = $f[0].content.value;
                    data.tid = target_id;
                    // data.ds_id;
                    Lib.callapi('insert/comment@258511b3cc23a3f18b51128ed', {
                        tid: target_id,
                        time: (new Date).getTime(),
                        user: {
                            name: 'wurui',
                            avatar: 'https://oxm1.cc/uploads/git/wurui/img/229d1bc0-bb9d-11e6-9ac2-537d1512e9b0.jpg',
                            tag: 'git开发者'
                        },
                        content: content
                    }, function () {
                        Lib.toast('ok');
                    })
                    $mod.removeAttr('data-acting');
                    return false;
                })
            }
        },
        cancel: function ($mod) {

        }
    };
    return {
        init: function ($mod) {

            $mod.on('click', function (e) {
                var tar = e.target, action = tar.getAttribute('data-action');
                if (action in Actions) {
                    Actions[action].call(Actions, $mod.attr('data-acting', action))
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
