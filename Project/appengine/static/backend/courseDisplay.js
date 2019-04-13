let course_setting_html = '';

$('#course-statistic').on('click', function(e) {
    try {
        // remove course setting
        let student_list_html = $(".student-list").parent()[0].outerHTML;
        let task_list_html = $(".task-list").parent()[0].outerHTML;
        course_setting_html = student_list_html + task_list_html;
        // console.log(course_setting_html);
        $(".student-list").parent().remove();
        $(".task-list").parent().remove();

        // remove chart
        
    }
    catch {
        $("#statistic-selected").remove();
        console.log('reclear');
    }

    let course_id = $('.list-group-item-primary')[0].id;
    console.log(course_id);

    let chart = `
        <div class="col-9" id="statistic-selected">
            <div class="row">
                <div class="card" style="margin: 20px">
                    <nav class="nav nav-tabs nav-fill">
                        <li class="nav-item nav-link chart-selector active" data-toggle="tab" id="pass-num-statistic">通過人數統計</li>
                        <li class="nav-item nav-link chart-selector" data-toggle="tab" id="pass-time-statistic">通過時間統計</li>
                        <li class="nav-item nav-link chart-selector" data-toggle="tab" id="student-statistic">學生過關統計</li>
                    </nav>
                </div>
            </div>
            <div id="statistic-chart" style="min-width: 310px; height: 400px; margin: 10px;"></div>
        </div>`;

    $("#side-selector .row").first().append(chart);
    makeChart('pass-num-statistic', course_id);
})

$('#course-setting').on('click', function(e) {
    // console.log(course_setting_html);
    $(".student-list").parent().remove();
    $(".task-list").parent().remove();
    $("#statistic-selected").remove();
    $("#side-selector .row").first().append(course_setting_html);
})