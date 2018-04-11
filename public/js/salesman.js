$(function() {
    getcookie();

    function getcookie() {
        var obj1 = JSON.parse($.cookie("user"));
        for (var i in obj1) {
            $(".username").html(i)
        }
    }
})