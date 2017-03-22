
(function(doc, win) {
    //正式代码
    var docEl = doc.documentElement,
        resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
        recalc = function() {
            setTimeout(function(){
                document.getElementsByTagName('body')[0].style.height = window.innerHeight+'px';
            },20);

            var clientHeight =docEl.clientHeight;
            if (!clientHeight) {
                return;
            }
            docEl.style.fontSize = Math.ceil(100 * (clientHeight / 667)) + 'px';
        };

    if (!doc.addEventListener) {
        return;
    }
    // win.addEventListener(resizeEvt, recalc, false);
    doc.addEventListener('DOMContentLoaded', recalc, false);
})(document, window);
