define([], function () {
    var Actions={
        comment:function(){
            var box=this.find('[data-action=comment]'),
                textarea=box.find('textarea').focus();

            console.log(textarea)
        }
    };
    return {
        init: function ($mod) {

            $mod.on('click', function (e) {
                var tar= e.target,action=tar.getAttribute('data-anchor');
                switch (action){
                    case 'comment':
                        Actions[action].call($mod.attr('data-acting',action))
                        break
                }
            })
        }
    }
})
