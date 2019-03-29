let course_setting_html = '';

$('#course-statistic').on('click', function(e) {
    try {
        // remove course setting
        let student_list_html = $(".student-list").parent()[0].outerHTML;
        let task_list_html = $(".task-list").parent()[0].outerHTML;
        course_setting_html = student_list_html + task_list_html;
        $(".student-list").parent().remove();
        $(".task-list").parent().remove();

        // remove chart
        
    }
    catch {
        $("#statistic-chart").remove();
        console.log('reclear');
    }
    
    // statistic
    let chart = '<div class="col-9" id="statistic-chart" style="min-width: 310px; height: 400px; margin: 0 auto"></div>';
    $("#side-selector .row").first().append(chart);
    makeChart();
})

$('#course-setting').on('click', function(e) {
    console.log(course_setting_html);
    $(".student-list").parent().remove();
    $(".task-list").parent().remove();
    $("#statistic-chart").remove();
    $("#side-selector .row").first().append(course_setting_html);
})