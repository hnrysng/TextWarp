


        let orbit_0_canvas = document.getElementById("orbit_0_canvas");
        let orbit_0_ctx = orbit_0_canvas.getContext("2d");

        let orbit_1_canvas = document.getElementById("orbit_1_canvas");
        let orbit_1_ctx = orbit_1_canvas.getContext("2d");

        let orbit_2_canvas = document.getElementById("orbit_2_canvas");
        let orbit_2_ctx = orbit_2_canvas.getContext("2d");

        let orbit_3_canvas = document.getElementById("orbit_3_canvas");
        let orbit_3_ctx = orbit_3_canvas.getContext("2d");

        let orbit_4_canvas = document.getElementById("orbit_4_canvas");
        let orbit_4_ctx = orbit_4_canvas.getContext("2d");

        let orbit_5_canvas = document.getElementById("orbit_5_canvas");
        let orbit_5_ctx = orbit_5_canvas.getContext("2d");

        let orbit_6_canvas = document.getElementById("orbit_6_canvas");
        let orbit_6_ctx = orbit_6_canvas.getContext("2d");

        let orbit_7_canvas = document.getElementById("orbit_7_canvas");
        let orbit_7_ctx = orbit_7_canvas.getContext("2d");

        let orbit_8_canvas = document.getElementById("orbit_8_canvas");
        let orbit_8_ctx = orbit_8_canvas.getContext("2d");

        let orbit_9_canvas = document.getElementById("orbit_9_canvas");
        let orbit_9_ctx = orbit_9_canvas.getContext("2d");

        let orbit_canvas_con = [orbit_0_canvas, orbit_1_canvas, orbit_2_canvas, orbit_3_canvas, orbit_4_canvas, orbit_5_canvas, orbit_6_canvas, orbit_7_canvas, orbit_8_canvas, orbit_9_canvas]






        function Orbit(ctx_type, shape_obj, shape_points_pos, scale, pos_x, pos_y){

            let time = 0;

            this.draw = function(path_color, bg_color, trig, select){



                ctx_type.beginPath();
                ctx_type.rect(0,0,1000,1000)
                ctx_type.fillStyle = path_color;
                ctx_type.fillStyle = bg_color;
                ctx_type.fill();
                ctx_type.closePath();


                ctx_type.beginPath();
                ctx_type.moveTo(shape_obj.letters.path[2][0][0].x * scale + pos_x, shape_obj.letters.path[2][0][0].y * scale + pos_y);
                for(let i = 0; i < shape_obj.letters.path[2][0].length - 1; i++){
                    ctx_type.bezierCurveTo(
                        shape_obj.letters.path[2][0][i].out_x * scale + pos_x, shape_obj.letters.path[2][0][i].out_y * scale + pos_y, 
                        shape_obj.letters.path[2][0][i + 1].in_x * scale + pos_x, shape_obj.letters.path[2][0][i + 1].in_y * scale + pos_y,
                        shape_obj.letters.path[2][0][i + 1].x * scale + pos_x, shape_obj.letters.path[2][0][i + 1].y * scale + pos_y);
                }
                ctx_type.lineWidth = 5 * scale;
                ctx_type.strokeStyle = path_color;
                ctx_type.stroke();
                ctx_type.closePath();



                if(trig == true || select == true){
                    if(time >= 1){
                        time = 0;
                    }else{
                        time = time + 0.003;
                    }
                }else{
                    time = 0;
                }

                ctx_type.beginPath();
                ctx_type.fillStyle = bg_color;
                ctx_type.arc(placement(time, shape_points_pos).x * scale + pos_x, placement(time, shape_points_pos).y * scale + pos_y, 16 * scale, 0, 2 * Math.PI);
                ctx_type.fill();
                ctx_type.closePath();


                ctx_type.beginPath();
                ctx_type.fillStyle = path_color;
                ctx_type.arc(placement(time, shape_points_pos).x * scale + pos_x, placement(time, shape_points_pos).y * scale + pos_y, 8 * scale, 0, 2 * Math.PI);
                ctx_type.fill();
                ctx_type.closePath();

            }


            function placement(value, points) {

                if (value <= 0) return { x: points[0].x, y: points[0].y };
                if (value >= 1) return { x: points[points.length - 1].x, y: points[points.length - 1].y };

                let totalLength = points.length - 1;
                let segment = value * totalLength;
                let index = Math.floor(segment);
                let progress = segment - index;

                let startPoint = points[index];
                let endPoint = points[index + 1];

                let x = startPoint.x + (endPoint.x - startPoint.x) * progress;
                let y = startPoint.y + (endPoint.y - startPoint.y) * progress;

                return { x, y };

            }


        }




        let orbit_pos = {
            x: 30,
            y: -60
        }

        let orbit_0 = new Orbit(orbit_0_ctx, shape_obj[0], shape_con.points_position[0], 1, orbit_pos.x, orbit_pos.y);
        let orbit_1 = new Orbit(orbit_1_ctx, shape_obj[1], shape_con.points_position[1], 1, orbit_pos.x, orbit_pos.y);
        let orbit_2 = new Orbit(orbit_2_ctx, shape_obj[2], shape_con.points_position[2], 1, orbit_pos.x, orbit_pos.y);
        let orbit_3 = new Orbit(orbit_3_ctx, shape_obj[3], shape_con.points_position[3], 1, orbit_pos.x, orbit_pos.y);
        let orbit_4 = new Orbit(orbit_4_ctx, shape_obj[4], shape_con.points_position[4], 1, orbit_pos.x, orbit_pos.y);
        let orbit_5 = new Orbit(orbit_5_ctx, shape_obj[5], shape_con.points_position[5], 1, orbit_pos.x, orbit_pos.y);
        let orbit_6 = new Orbit(orbit_6_ctx, shape_obj[6], shape_con.points_position[6], 1, orbit_pos.x, orbit_pos.y);
        let orbit_7 = new Orbit(orbit_7_ctx, shape_obj[7], shape_con.points_position[7], 1, orbit_pos.x, orbit_pos.y);
        let orbit_8 = new Orbit(orbit_8_ctx, shape_obj[8], shape_con.points_position[8], 1, orbit_pos.x, orbit_pos.y);
        let orbit_9 = new Orbit(orbit_9_ctx, shape_obj[9], shape_con.points_position[9], 1, orbit_pos.x, orbit_pos.y);


        let orbit_con = [orbit_0, orbit_1, orbit_2, orbit_3, orbit_4, orbit_5, orbit_6, orbit_7, orbit_8, orbit_9];


        let path_color_con = [];
        let hover_trig_con = [];
        let select_trig_con = [];

        for(let i = 0; i < orbit_con.length; i++){
            hover_trig_con[i] = false;
            select_trig_con[i] = false;
        }






        console.log(hover_trig_con)


        function orbit_anim() {

            for(let i = 0; i < orbit_con.length; i++){
                select_trig_con[i] = false;
            }
            select_trig_con[key_1] = true;


            for(let i = 0; i < orbit_canvas_con.length; i++){
                if(hover_trig_con[i] == true ||  select_trig_con[i] == true){
                    path_color_con[i] = {path_color: "#000000", bg_color: "#EAEAEA"}
                }else if(hover_trig_con[i] == false && select_trig_con[i] == false){
                    path_color_con[i] = {path_color: "#000000", bg_color: "#F5F5F5"}
                }
            }




            for(let i = 0; i < orbit_con.length; i++){
                orbit_con[i].draw(path_color_con[i].path_color, path_color_con[i].bg_color, hover_trig_con[i], select_trig_con[i])
            }



            window.requestAnimationFrame(orbit_anim);

        }

        orbit_anim();






    let path_trig = document.getElementById('path_trig');

    path_trig.addEventListener("click", path_open);



    function path_open() {

        document.getElementById("container").style.transitionDuration = "0.2s";
        document.getElementById("container").style.transitionTimingFunction = "ease-in-out";
        document.getElementById("container").style.transform = 'scale(0.95,0.95)';
        document.getElementById("container").style.opacity = 0.5;
        document.getElementById("container").style.filter = 'blur(1px)';
        // document.getElementById("container").style.top = '8px';
        // document.getElementById("container").style.right = '-32px';

        document.getElementById("path_container").style.transitionDelay = "0.15s"
        document.getElementById("path_container").style.transitionDuration = "0.2s";
        document.getElementById("path_container").style.transitionTimingFunction = "ease-in-out";
        document.getElementById("path_container").style.right = '24px';

    }


    let path_arrow = document.getElementById('path_arrow');


    path_arrow.addEventListener("click", path_close);
    
    function path_close() {
        
        document.getElementById("container").style.transitionDelay = "0.15s"
        document.getElementById("container").style.transitionDuration = "0.2s";
        document.getElementById("container").style.transitionTimingFunction = "ease-in-out";
        document.getElementById("container").style.transform = 'scale(1,1)';
        document.getElementById("container").style.opacity = 1;
        document.getElementById("container").style.filter = 'blur(0px)';
        document.getElementById("container").style.top = '24px';
        document.getElementById("container").style.right = '24px';

        document.getElementById("path_container").style.transitionDuration = "0.2s";
        document.getElementById("path_container").style.transitionTimingFunction = "ease-in-out";
        document.getElementById("path_container").style.right = 'calc(((-164px * 2) - 48px - 8px - 2px))';

    }




    for(let i = 0; i < orbit_canvas_con.length; i++){

        orbit_canvas_con[i].addEventListener("mouseover", function path_over() {
            hover_trig_con[i] = true;
        });
        
        orbit_canvas_con[i].addEventListener("mouseout", function path_over() {
            hover_trig_con[i] = false;
        });
        


        orbit_canvas_con[i].addEventListener("click", function path_out() {
            key_1 = i;
            console.log(i);

            for(let a = 0; a < orbit_canvas_con.length; a++){
                select_trig_con[a] = false;
            }

            select_trig_con[i] = true;
        });
        
    }



    orbit_0_canvas.addEventListener("mouseover", path_over_1);
    orbit_0_canvas.addEventListener("mouseout", path_out_1);



    function path_over_1() {

        test = 'pink';
        test_1 = 'pink';

    }



    function path_out_1() {

        test = 'pink';
        test_1 = 'purple';
        
    }







    // let direction_val_on = document.getElementById('direction_val_on');
    // let direction_val_off = document.getElementById('direction_val_off');


    // direction_val_on.addEventListener("click", direction_1);
    // direction_val_off.addEventListener("click", direction_2);
            



    // function direction_1() {
    //     direction_val_on.style.opacity = '1'
    //     direction_val_off.style.opacity = '0.2'
    //     angle_test = false;
        
    // }

    // function direction_2() {
    //     direction_val_on.style.opacity = '0.2'
    //     direction_val_off.style.opacity = '1'
    //     angle_test = true;
        
    // }




    let OnCurve = document.getElementById('OnCurve');

OnCurve.addEventListener('mouseover', function(){
    if(angle_test == true){
        direction_val_on.style.opacity = '1'
        direction_val_off.style.opacity = '0.4'
    }else{
        direction_val_on.style.opacity = '0.4'
        direction_val_off.style.opacity = '1'
    }
});

OnCurve.addEventListener('mouseout', function(){
    if(angle_test == true){
        direction_val_on.style.opacity = '1'
        direction_val_off.style.opacity = '0.2'
    }else{
        direction_val_on.style.opacity = '0.2'
        direction_val_off.style.opacity = '1'

    }
});


OnCurve.addEventListener('click', function(){
    if(angle_test == true){
        angle_test = false;
        direction_val_on.style.opacity = '0.4'
        direction_val_off.style.opacity = '1'
        
    }else{
        angle_test = true;
        direction_val_on.style.opacity = '1'
        direction_val_off.style.opacity = '0.4'
    }
});



    



            