
//构造柱状图数据
var echartBar = (data) => {
    var {title,subtitle,legendData,xData,seriesData} = data;
    seriesData = seriesData.map((item,index,arr) => {
        return {
            name: item.name,
            type: "bar",
            label:{
                show:true,
                formatter: '{c}',
                position:"top"
            },
            data: item.data
        }
    })
    var option = {

        color:[
            '#ff7f50', '#87cefa', '#da70d6', '#32cd32', '#6495ed',
            '#ff69b4', '#ba55d3', '#cd5c5c', '#ffa500', '#40e0d0',
            '#1e90ff', '#ff6347', '#7b68ee', '#00fa9a', '#ffd700',
            '#6b8e23', '#ff00ff', '#3cb371', '#b8860b', '#30e0e0'
        ],
        title: {
            text: title,
            subtext: subtitle
        },

        legend: {
            data: legendData,
            right:50
        },
        xAxis: [
            {
                type: "category",
                data:xData
            }
        ],
        yAxis: [
            {
                type: "value"
            }
        ],
        series: seriesData
    }

    return option
}

module.exports = echartBar;
