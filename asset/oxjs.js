/**
 * Created by wurui on 13/12/2016.
 */
define([], function () {

    return {
        toast: function () {
            window.alert.apply(window, arguments)
        },
        callapi: function (uri, data, cb) {
            cb()
        },
        queryString: function (name) {
            var splt = location.search.substr(1).split('&');

            if (splt.length) {
                for (var i = 0, pair; pair = splt[i++];) {
                    if (name == pair.split('=')[0]) {
                        return pair.split('=')[1]
                    }
                }

            }
            return name
        },

        formToJSON: function (f) {
            var els = f.elements, el, i = 0,
                json = {};
            while (el = els[i++]) {
                if (el.name) {
                    if (el.type != 'hidden' && !el.clientWidth) {
                        continue
                    } else {
                        var value = el.value;
                        if (el.tagName.toLowerCase() == 'img') value = el.src;
                        if (/date/.test(el.type)) {
                            value = value.replace('T', ' ')
                        }

                        if (!/checkbox|radio/.test(el.type) || el.checked) {
                            if (el.name in json) {
                                json[el.name] += ',' + value;
                            } else
                                json[el.name] = value;
                        }

                    }


                }
            }
            return json;
        },
        fillWithJSON: function (f, json, noHidden) {
            for (var k in json) {
                var el = f[k], val = json[k];
                if (typeof val == 'object') {
                    val = JSON.stringify(val);
                }
                if (!el) {
                    if (!noHidden) {
                        el = document.createElement('input');
                        el.type = 'hidden';
                        el.value = val;
                        el.name = k;
                        f.appendChild(el);
                    }

                    continue;
                }
                ;
                switch (el.tagName.toLowerCase() + (el.type ? el.type + ':' : '')) {
                    case 'input:checkbox':
                        break;
                    case 'input:radio':
                        break;
                    case 'img':
                        el.src = val
                        break;

                    /*
                     case 'select':

                     break;
                     */
                    default :
                        el.value = val;
                        break;
                }
            }
        }

    }
})