common = {
    showTime: function () {
        var myDate = new Date();
        var year = myDate.getFullYear();    //获取完整的年份(4位,1970-????)
        var month = myDate.getMonth();
        var day = myDate.getDate();
        var h = myDate.getHours();
        var m = myDate.getMinutes();
        var s = myDate.getSeconds();
        month = common.checkTime(month);
        day = common.checkTime(day);
        h = common.checkTime(h);
        m = common.checkTime(m);
        s = common.checkTime(s);
        var str = year + "-" + month + "-" + day + " " + h + ":" + m + ":" + s;
        return str;
    },
    checkTime: function (i) {
        if (i < 10) {
            i = "0" + i;
        }
        return i
    }
}