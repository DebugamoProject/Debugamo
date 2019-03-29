
function makeChart(){
    $('#statistic-chart').highcharts({
        chart: {
            type: 'column'
        },
        title: {
            text: '通關人數'
        },
        xAxis: {
            categories: [
                '1','2', '3', '4', '5', '6'
            ],
            crosshair: true
        },
        yAxis: {
            min: 0,
            title: {
                text: '人數'
            }
        },
        tooltip: {
            headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
            pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                '<td style="padding:0"><b>{point.y:.1f} mm</b></td></tr>',
            footerFormat: '</table>',
            shared: true,
            useHTML: true
        },
        plotOptions: {
            column: {
                pointPadding: 0.2,
                borderWidth: 0
            }
        },
        series: [{
            name: '',
            data: [49.9, 71.5, 106.4, 129.2, 144.0, 176.0]
    
        }]
    });
}