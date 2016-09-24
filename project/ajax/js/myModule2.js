/**
 * Created by xfzhang on 2016/5/23.
 */
(function (w) {
    var name = 'cool';
    var arr = [2, 4, 6, 8];

    function doSomething() {
        console.log(name);
    }

    function doOtherthing() {
        console.log(arr.join('-'));
    }

    w.CoolModule =  {
        doSomething : doSomething,
        doOtherthing : doOtherthing
    };
})(w);