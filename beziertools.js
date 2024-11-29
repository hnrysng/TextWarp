
function get_bezier_points(letter_canvas_path_con) {
    let q0_x = [],
        q0_y = [],
        q1_x = [],
        q1_y = [],
        q2_x = [],
        q2_y = [],
        r0_x = [],
        r0_y = [],
        r1_x = [],
        r1_y = [],
        s0_x = [],
        s0_y = [];

    let number_of_points = 1000;

    let time = [];

    for (let i = 0; i <= number_of_points; i++) {
        time[i] = i * (1 / number_of_points)
    }

    for (let i = 0; i < letter_canvas_path_con.length - 1; i++) {
        q0_x[i] = [];
        q0_y[i] = [];
        q1_x[i] = [];
        q1_y[i] = [];
        q2_x[i] = [];
        q2_y[i] = [];

        r0_x[i] = [];
        r0_y[i] = [];
        r1_x[i] = [];
        r1_y[i] = [];

        s0_x[i] = [];
        s0_y[i] = [];
    }

    for (let i = 0; i < letter_canvas_path_con.length - 1; i = i + 1) {
        for (let a = 0; a <= number_of_points; a = a + 1) {
            q0_x[i][a] = (1 - time[a]) * (letter_canvas_path_con[i].x) + time[a] * (letter_canvas_path_con[i].out_x);
            q0_y[i][a] = (1 - time[a]) * (letter_canvas_path_con[i].y) + time[a] * (letter_canvas_path_con[i].out_y);

            q1_x[i][a] = (1 - time[a]) * (letter_canvas_path_con[i].out_x) + time[a] * (letter_canvas_path_con[i + 1].in_x);
            q1_y[i][a] = (1 - time[a]) * (letter_canvas_path_con[i].out_y) + time[a] * (letter_canvas_path_con[i + 1].in_y);

            q2_x[i][a] = (1 - time[a]) * (letter_canvas_path_con[i + 1].in_x) + time[a] * (letter_canvas_path_con[i + 1].x);
            q2_y[i][a] = (1 - time[a]) * (letter_canvas_path_con[i + 1].in_y) + time[a] * (letter_canvas_path_con[i + 1].y);

            r0_x[i][a] = (1 - time[a]) * (q0_x[i][a]) + time[a] * (q1_x[i][a]);
            r0_y[i][a] = (1 - time[a]) * (q0_y[i][a]) + time[a] * (q1_y[i][a]);

            r1_x[i][a] = (1 - time[a]) * (q1_x[i][a]) + time[a] * (q2_x[i][a]);
            r1_y[i][a] = (1 - time[a]) * (q1_y[i][a]) + time[a] * (q2_y[i][a]);

            s0_x[i][a] = ((1 - time[a]) * (r0_x[i][a]) + time[a] * (r1_x[i][a]));
            s0_y[i][a] = ((1 - time[a]) * (r0_y[i][a]) + time[a] * (r1_y[i][a]));
        }
    }


    let s0_points = {
        s0_x,
        s0_y
    }


    return s0_points;
}

function get_bezier_points_1(letter_canvas_path_con) {
    let q0_x = [],
        q0_y = [],
        q1_x = [],
        q1_y = [],
        q2_x = [],
        q2_y = [],
        r0_x = [],
        r0_y = [],
        r1_x = [],
        r1_y = [],
        s0_x = [],
        s0_y = [];

    let number_of_points = 1000;
    let s_point_container = [];

    let time = [];

    for (let i = 0; i <= number_of_points; i++) {
        time[i] = i * (1 / number_of_points)
    }
    
    for (let i = 0; i < letter_canvas_path_con.length - 1; i++) {
        q0_x[i] = [];
        q0_y[i] = [];
        q1_x[i] = [];
        q1_y[i] = [];
        q2_x[i] = [];
        q2_y[i] = [];

        r0_x[i] = [];
        r0_y[i] = [];
        r1_x[i] = [];
        r1_y[i] = [];

        s0_x[i] = [];
        s0_y[i] = [];
    }

    for (let i = 0; i < letter_canvas_path_con.length - 1; i = i + 1) {
        for (let a = 0; a <= number_of_points; a = a + 1) {
            q0_x[i][a] = (1 - time[a]) * (letter_canvas_path_con[i].x) + time[a] * (letter_canvas_path_con[i].out_x);
            q0_y[i][a] = (1 - time[a]) * (letter_canvas_path_con[i].y) + time[a] * (letter_canvas_path_con[i].out_y);

            q1_x[i][a] = (1 - time[a]) * (letter_canvas_path_con[i].out_x) + time[a] * (letter_canvas_path_con[i + 1].in_x);
            q1_y[i][a] = (1 - time[a]) * (letter_canvas_path_con[i].out_y) + time[a] * (letter_canvas_path_con[i + 1].in_y);

            q2_x[i][a] = (1 - time[a]) * (letter_canvas_path_con[i + 1].in_x) + time[a] * (letter_canvas_path_con[i + 1].x);
            q2_y[i][a] = (1 - time[a]) * (letter_canvas_path_con[i + 1].in_y) + time[a] * (letter_canvas_path_con[i + 1].y);

            r0_x[i][a] = (1 - time[a]) * (q0_x[i][a]) + time[a] * (q1_x[i][a]);
            r0_y[i][a] = (1 - time[a]) * (q0_y[i][a]) + time[a] * (q1_y[i][a]);

            r1_x[i][a] = (1 - time[a]) * (q1_x[i][a]) + time[a] * (q2_x[i][a]);
            r1_y[i][a] = (1 - time[a]) * (q1_y[i][a]) + time[a] * (q2_y[i][a]);

            s0_x[i][a] = ((1 - time[a]) * (r0_x[i][a]) + time[a] * (r1_x[i][a]));
            s0_y[i][a] = ((1 - time[a]) * (r0_y[i][a]) + time[a] * (r1_y[i][a]));
        }
    }


    let s0_points = {
        s0_x,
        s0_y
    }


    return s0_points;
}



function get_bezier_length(bezier_path) {
    let each_point_length = [];
    let each_path_length = [];
    let total_length;


    for (let i = 0; i < bezier_path.s0_x.length; i++) {
        each_point_length[i] = [];
    }

    for (let i = 0; i < bezier_path.s0_x.length; i++) {
        for (let a = 0; a < bezier_path.s0_x[0].length - 1; a++) {
            each_point_length[i].push(Math.hypot(bezier_path.s0_x[i][a] - bezier_path.s0_x[i][a + 1], bezier_path.s0_y[i][a] - bezier_path.s0_y[i][a + 1]))
        }
    }

    for (let i = 0; i < bezier_path.s0_x.length; i++) {
        each_path_length.push(each_point_length[i].reduce(function(a, b) {
            return (a + b);
        }, 0))
    }

    total_length = each_path_length.reduce(function(a, b) {
        return (a + b);
    }, 0);

    

    return {
        each_point_length,
        each_path_length,
        total_length
    };
}


function equally_divide_length(total_length, each_point_length, num_of_points) {


    if(num_of_points == undefined){
      num_of_points = 100;
    }

    let point_length_tracker = 0;
    let array_index = [];

    for (let i = 0; i < each_point_length.length; i++) {
        array_index[i] = [];
    }

    let avg_distance = (total_length / num_of_points);
    
    each_point_length.forEach(matching_avg_dist_and_each_point_length);

    function matching_avg_dist_and_each_point_length(item, index, arr) {
        for (let i = 0; i < each_point_length[index].length; i++) {
            point_length_tracker = point_length_tracker + each_point_length[index][i];
            if (point_length_tracker >= avg_distance) {
                array_index[index].push(i);
                point_length_tracker = point_length_tracker - avg_distance;
            }
        }
    }


    // adding the first point
    array_index[0].unshift(0);


    // the calculation isn't accurate keeping track of point_length_tracker. 
    // this prevents from not inlcuding the last point of the path by two conditions: 
    // A: if the avg_distance and point length tracker only has 0.00001 difference
    // B: if the array_index doesn't include the last point(999) by the matching_avg_dist_and_each_point_length calculation
    // Warning: there might be an edge case for this
    if(avg_distance - point_length_tracker < 0.00001 && array_index[array_index.length - 1].includes(999) == false){
        array_index[array_index.length - 1].push(999);
    }

    return array_index;

};


function get_points_position(bezier_points_con, divided_length_array_index){      

    let point_con = [];
    
    for(let i = 0; i < bezier_points_con.s0_x.length; i++){
        for(let a = 0; a < divided_length_array_index[i].length; a++){
                point_con.push({x : bezier_points_con.s0_x[i][divided_length_array_index[i][a]], y: bezier_points_con.s0_y[i][divided_length_array_index[i][a]]})
        }
    }

    return point_con;
}


function derivative(bezier_points_con) {

    let derivative_con = [];

    for (let i = 0; i < bezier_points_con.s0_x.length; i++) {
        derivative_con[i] = [];
    }

    for (let i = 0; i < bezier_points_con.s0_x.length; i++) {
        for (let a = 0; a < bezier_points_con.s0_x[i].length - 1; a++) {
            derivative_con[i].push(angle(bezier_points_con.s0_x[i][a], bezier_points_con.s0_y[i][a], bezier_points_con.s0_x[i][a + 1], bezier_points_con.s0_y[i][a + 1]));
        }
    }

    function angle(cx, cy, ex, ey) {
        var dx = ex - cx;
        var dy = ey - cy;
        var theta = Math.atan2(dy, dx);
        theta *= -180 / Math.PI;
        
        if(theta >= 90){
            theta = theta - 90
        }else if(theta < 0){
            theta = theta + 270
        }else if(theta > 0 && theta < 90){
            theta = theta + 270
        }

        return theta;
    }
    
    return derivative_con;

}


function get_point_angle(derivative_angle_con, divided_length_array_index){      

    let deg = [];

    for(let i = 0; i < derivative_angle_con.length; i++){
        for(let a = 0; a < divided_length_array_index[i].length; a++){
            deg.push(derivative_angle_con[i][divided_length_array_index[i][a]])
        }
    }

    return deg;
}


function apply_parameters(obj, shapes){

    console.log(obj)
    console.log(shapes)


    return shapes   
}
