/**
 * Created by xfzhang on 2016/5/23.
 */
function CoolModule() {
    var name = 'cool';
    var arr = [2, 4, 6, 8];

    function doSomething() {
        console.log(name); //闭包
    }

    function doOtherthing() {
        console.log(arr.join('-')); //闭包
    }

    return {
        doSomething : doSomething,
        doOtherthing : doOtherthing
    };
}