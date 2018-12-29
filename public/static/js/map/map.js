map = {
    //后台获取数据并回调
    getMapData: function (callback) {
        $.get(getMaPDataUrl, function (event) {
            var option = map.getNameAndLngLat(event, event.length);
            callback(option);
        })
    },
    getNameAndLngLat: function (event, len) {
        data = [];
        geoCoordMap = {};
        for (i = 0; i < len; i++) {
            data.push({
                'name': event[i]['name'],
                'value': 220
            });
            geoCoordMap[event[i]['name']] = [event[i]['longitude'], event[i]['latitude']];
        }
        var res = map.convertData(data, geoCoordMap);
        var option = map._build_option(res, geoCoordMap, len);
        return option;
    },
    convertData: function (data, geoCoordMap) {
        var res = [];
        for (var i = 0; i < data.length; i++) {
            var geoCoord = geoCoordMap[data[i].name];
            if (geoCoord) {
                res.push({
                    name: data[i].name,
                    value: geoCoord.concat(data[i].value)
                });
            }
        }

        return res;
    },
    //组装option
    _build_option: function (data, geoCoordMap, len) {
        return {
            // backgroundColor: '#404a59',
            title: {
                text: '地图标题',
                subtext: common.showTime(),
                left: 'center',
                textStyle: {
                    color: 'black',
                    fontSize: 35
                },
                subtextStyle: {
                    color: '#fff',
                    fontSize: 25
                }
            },
            tooltip: {
                trigger: 'item'
            },
            bmap: {
                center: [104.114129, 37.550339],
                zoom: 5,
                roam: false,
                mapStyle: {
                    styleJson: [
                        {
                            "featureType": "water",
                            "elementType": "all",
                            "stylers": {
                                "color": "#044161"
                            }
                        },
                        {
                            "featureType": "land",
                            "elementType": "all",
                            "stylers": {
                                "color": "#004981"
                            }
                        },
                        {
                            "featureType": "boundary",
                            "elementType": "geometry",
                            "stylers": {
                                "color": "#064f85"
                            }
                        },
                        {
                            "featureType": "boundary",
                            "elementType": "geometry.fill",
                            "stylers": {
                                "color": "#029fd4"
                            }
                        },
                        {
                            "featureType": "label",
                            "elementType": "all",
                            "stylers": {
                                "visibility": "off"
                            }
                        }
                    ]
                }
            },
            series: [
                {
                    name: '鼠标右侧显示',
                    type: 'effectScatter',
                    coordinateSystem: 'bmap',
                    data: this.convertData(data.sort(function (a, b) {
                        return b.value - a.value;
                    }).slice(0, len), geoCoordMap),
                    symbolSize: function (val) {
                        return val[4] / 12;
                    },
                    showEffectOn: 'emphasis',
                    rippleEffect: {
                        brushType: 'stroke'
                    },
                    hoverAnimation: false,
                    label: {
                        normal: {
                            formatter: '{b}',
                            position: 'right',
                            show: true,
                            fontSize: 15
                        }
                    },
                    itemStyle: {
                        normal: {
                            color: '#f4e925',
                            shadowBlur: 10,
                            shadowColor: '#333'
                        }
                    },
                    zlevel: 1
                },
                {
                    type: 'custom',
                    coordinateSystem: 'bmap',
                    itemStyle: {
                        normal: {
                            opacity: 0.5
                        }
                    },
                    animation: false,
                    silent: true,
                    data: [0],
                    z: -10
                }
            ]
        };
    }

};