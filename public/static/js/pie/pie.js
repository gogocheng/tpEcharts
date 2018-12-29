enterform = {
    //后台获取数据并回调
    getPieData: function (callback) {
        $.get(getPieDataUrl, function (event) {
            var option = getPieData.getPieGoodsNameAndNetWeight(event, event.length);
            callback(option);
        })
    },
    getPieGoodsNameAndNetWeight: function (event, len) {
        var data = [];
        var name = [];
        for (i = 0; i < len; i++) {
            data.push({
                'value': event[i]['net_weight_sum'],
                'name': event[i]['name']
            });
            name[i] = event[i]['name'];
        }
        var option = getPieData.pieOption(name, data);
        return option;
    },
    pieOption: function (name, data) {
        return {
            title: {
                text: '饼图标题',
                x: 'center',
                textStyle: {
                    fontfamily: 'Microsoft YaHei',
                    fontSize: 20,
                    align: 'center',

                }
            },
            tooltip: {
                trigger: 'item',
                formatter: "{a} <br/>{b} : {c} ({d}%)"
            },
            legend: {
                orient: 'vertical',
                left: 'left',
                data: name
            },
            series: [
                {
                    name: '鼠标右侧显示',
                    type: 'pie',
                    radius: '55%',
                    center: ['50%', '60%'],
                    data: data,
                    itemStyle: {
                        emphasis: {
                            shadowBlur: 10,
                            shadowOffsetX: 0,
                            shadowColor: 'rgba(0, 0, 0, 0.5)'
                        }
                    }
                }
            ]
        }
    }
}