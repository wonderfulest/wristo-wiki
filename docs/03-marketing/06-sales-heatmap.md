
# World HeatMap

## 使用 echarts实现

https://jtjnjp.sh.cn/nchart/doc/example/map4.html#-en

```
option = {
    title : {
        text: 'World Sales (2023)',
        subtext: 'from Garminface, Total sales, both ',
        sublink : 'https://www.garminface.com/',
        x:'center',
        y:'top'
    },
    tooltip : {
        trigger: 'item',
        formatter : function (params) {
            var value = (params.value + '').split('.');
            value = value[0].replace(/(\d{1,3})(?=(?:\d{3})+(?!\d))/g, '$1,')
                    + '.' + value[1];
            return params.seriesName + '<br/>' + params.name + ' : ' + value;
        }
    },
    toolbox: {
        show : true,
        orient : 'vertical',
        x: 'right',
        y: 'center',
        feature : {
            mark : {show: true},
            dataView : {show: true, readOnly: false},
            restore : {show: true},
            saveAsImage : {show: true}
        }
    },
    dataRange: {
        min: 0,
        max: 1000,
        text:['High','Low'],
        realtime: false,
        calculable : true,
        color: ['orangered','yellow','lightskyblue']
    },
    series : [
        {
            name: 'World Population (2010)',
            type: 'map',
            mapType: 'world',
            roam: true,
            mapLocation: {
                y : 60
            },
            itemStyle:{
                emphasis:{label:{show:true}}
            },
            data: [
  {
    "name": "Poland",
    "value": 372.18
  },
  {
    "name": "United States of America",
    "value": 3169.34
  },
  {
    "name": "Germany",
    "value": 972.13
  },
  {
    "name": "Mexico",
    "value": 197.53
  },
  {
    "name": "China",
    "value": 96.3
  },
  {
    "name": "Iceland",
    "value": 31.46
  },
  {
    "name": "Czech Republic",
    "value": 354.67
  },
  {
    "name": "Finland",
    "value": 55.83
  },
  {
    "name": "Vietnam",
    "value": 13.44
  },
  {
    "name": "Slovakia",
    "value": 35.1
  },
  {
    "name": "United Kingdom",
    "value": 930.81
  },
  {
    "name": "Slovenia",
    "value": 13.44
  },
  {
    "name": "South Korea",
    "value": 55.83
  },
  {
    "name": "Taiwan",
    "value": 342.3
  },
  {
    "name": "Argentina",
    "value": 24.81
  },
  {
    "name": "Canada",
    "value": 441.03
  },
  {
    "name": "Thailand",
    "value": 164.5
  },
  {
    "name": "France",
    "value": 607.67
  },
  {
    "name": "Singapore",
    "value": 14.44
  },
  {
    "name": "Israel",
    "value": 49.69
  },
  {
    "name": "Denmark",
    "value": 74.49
  },
  {
    "name": "Turkey",
    "value": 69.27
  },
  {
    "name": "Belgium",
    "value": 262.94
  },
  {
    "name": "Netherlands",
    "value": 443.96
  },
  {
    "name": "Australia",
    "value": 687.74
  },
  {
    "name": "Norway",
    "value": 566.64
  },
  {
    "name": "South Africa",
    "value": 338.08
  },
  {
    "name": "India",
    "value": 92.94
  },
  {
    "name": "Japan",
    "value": 87.93
  },
  {
    "name": "Switzerland",
    "value": 156.14
  },
  {
    "name": "Costa Rica",
    "value": 67.34
  },
  {
    "name": "Hungary",
    "value": 49.61
  },
  {
    "name": "Austria",
    "value": 126.32
  },
  {
    "name": "Italy",
    "value": 193.24
  },
  {
    "name": "Indonesia",
    "value": 128.18
  },
  {
    "name": "Romania",
    "value": 28.88
  },
  {
    "name": "Brazil",
    "value": 24.81
  },
  {
    "name": "Hong Kong",
    "value": 72.49
  },
  {
    "name": "New Zealand",
    "value": 28.02
  },
  {
    "name": "Malta",
    "value": 17.59
  },
  {
    "name": "Spain",
    "value": 55.98
  },
  {
    "name": "Estonia",
    "value": 20.8
  },
  {
    "name": "Colombia",
    "value": 111.67
  },
  {
    "name": "Malaysia",
    "value": 35.25
  },
  {
    "name": "Puerto Rico",
    "value": 20.8
  },
  {
    "name": "Bulgaria",
    "value": 20.8
  },
  {
    "name": "Guernsey",
    "value": 51.69
  },
  {
    "name": "Bolivia",
    "value": 10.37
  },
  {
    "name": "Croatia",
    "value": 103.38
  },
  {
    "name": "Ukraine",
    "value": 42.39
  },
  {
    "name": "Cyprus",
    "value": 7.22
  },
  {
    "name": "Chile",
    "value": 17.59
  },
  {
    "name": "Isle of Man",
    "value": 7.22
  },
  {
    "name": "Armenia",
    "value": 7.22
  },
  {
    "name": "Latvia",
    "value": 17.59
  },
  {
    "name": "Philippines",
    "value": 21.66
  },
  {
    "name": "Russia",
    "value": 7.22
  },
  {
    "name": "Sweden",
    "value": 32.03
  },
  {
    "name": "Ireland",
    "value": 58.91
  },
  {
    "name": "Montenegro",
    "value": 10.37
  },
  {
    "name": "Serbia",
    "value": 7.22
  },
  {
    "name": "Luxembourg",
    "value": 7.22
  }
]
        }
    ]
};
                    
```
