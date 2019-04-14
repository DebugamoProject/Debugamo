// get charts data

function getPassNum(URL) {
    let passNumData;
    $.ajax({
        type: "GET",
        url: URL,
        async: false,
        success: function (response) {
            passNumData = response;
        }
    });
    return passNumData;
}

function getPassTime(URL) {
    let passTimeData;
    $.ajax({
        type: "GET",
        url: URL,
        async: false,
        success: function (response) {
            passTimeData = response;
        }
    });
    return passTimeData;
}

function getStudentStatus(URL) {
    let student_data;
    $.ajax({
        type: "GET",
        url: URL,
        async: false,
        success: function (response) {
            student_data = response;
        }
    });
    return student_data;
}


function makeChart(selected, course_id){

    let statisticChart = new Highcharts.chart('statistic-chart', {
        chart: {
            type: 'column',
            event: {}
        },
        title: {
            text: ''
        },
        xAxis: {
            categories: [],
            crosshair: true
        },
        yAxis: {
            min: 0,
            title: {
                text: ''
            }
        },
        tooltip: {
            headerFormat: '<b>{point.x}</b><br/>',
            pointFormat: '{series.name}: {point.y}<br/>Total: {point.stackTotal}'
        },
        plotOptions: {
            column: {
                series: 'rgb(124,181,236)',
                stacking: 'normal',
                dataLabels: {
                    // enabled: true,
                    color: (Highcharts.theme && Highcharts.theme.dataLabelsColor) || 'white'
                },
                // pointPadding: 0.1,
                // borderWidth: 0
            }
        },
        credits: {
            enabled: false
        },
        series: [{
            name: '',
            data: []
        }, {
            name: '',
            data: []
        }, {
            name: '',
            data: []
        }]
    });

    
    if(selected === 'pass-num-statistic') {
        let pass_num_data = getPassNum('/chart/passNum/' + course_id);
        statisticChart.update({
            series: [{
                name: 'passed',
                data: pass_num_data['passed']
            },{
                name: 'not_pass',
                data: pass_num_data['not_pass']
            }, {
                name: 'not_tried',
                data: pass_num_data['not_tried']
            }]
        });
        statisticChart.xAxis[0].update({categories: pass_num_data['taskList']});
        statisticChart.yAxis[0].update({title: {text: '人數'}});
    }
    else if(selected === 'pass-time-statistic') {
        let pass_time_data = getPassTime('/chart/passTime/' + course_id);
        for(let i = 0; i <　pass_time_data['averagetime'].length; i++) {
            pass_time_data['averagetime'][i] = Math.floor(pass_time_data['averagetime'][i] / 60);
        }
        while(statisticChart.series.length > 1) {
            statisticChart.series[0].remove(true);
        }

        statisticChart.series[0].update({color: 'rgb(124,181,236)'});
        statisticChart.series[0].update({data: pass_time_data['averagetime']});
        statisticChart.series[0].update({name: '完成時間'});
        statisticChart.xAxis[0].update({categories: pass_time_data['courseList']});
        statisticChart.yAxis[0].update({title: {text: '時間(分鐘)'}});
        
    } 
    else if(selected === 'student-statistic') {
        let student_data = getStudentStatus('/chart/scoreBoard/' + course_id);
        let student_list = [];
        let student_status = {'pass_num': [], 'unpass_num': [], 'not_tried_num': []};
        if(student_data.length > 0) {
            for(let i = 0; i < student_data.length; i++) {    
                student_status['pass_num'].push(student_data[i]['score'][0]);
                student_status['unpass_num'].push(student_data[i]['score'][1]);
                student_status['not_tried_num'].push(student_data[i]['score'][2]);
                student_list.push(student_data[i]['ID']);
            }
        }
        statisticChart.update({
            series: [{
                name: 'pass num',
                data: student_status['pass_num']
            },{
                name: 'not pass yet',
                data: student_status['unpass_num']
            }, {
                name: 'not tried yet',
                data: student_status['not_tried_num']
            }]
        });
        statisticChart.xAxis[0].update({categories: student_list});
        statisticChart.yAxis[0].update({title: {text: ''}});
    }
    
}

$(document).on('click', '.chart-selector', function() {
    let course_id = $('.list-group-item-primary')[0].id;
    let chart_type = $(this)[0].id;
    console.log(course_id, chart_type);
    makeChart(chart_type, course_id);
})