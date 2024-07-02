
      
        let orbit_display_canvas = document.getElementById("orbit_display_canvas");
        let orbit_display_ctx = orbit_display_canvas.getContext("2d");



        function Orbit_display(ctx_type, scale, pos_x, pos_y){

            let time = 0;

            this.draw = function(shape_obj, shape_points_pos, display_path_color, trig, select){



                ctx_type.beginPath();
                ctx_type.rect(0,0,1000,1000)
                ctx_type.fillStyle = display_path_color.bg_color;
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
                ctx_type.fillStyle = display_path_color._color
                ctx_type.arc(placement(time, shape_points_pos).x * scale + pos_x, placement(time, shape_points_pos).y * scale + pos_y, 16 * scale, 0, 2 * Math.PI);
                ctx_type.fill();
                ctx_type.closePath();


                ctx_type.beginPath();
                ctx_type.fillStyle = display_path_color.path_color
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

        

        let test = 'purple'
        let test_1 = 'green'

        let display_path_color = {path_color: "#000000", bg_color: "#F5F5F5"}

        let orbit_display = new Orbit_display(orbit_display_ctx, 1.2, 30, -70);




      function orbit_display_anim() {

        orbit_display.draw(shape_obj[key_1], shape_con.points_position[key_1], display_path_color, true);

        window.requestAnimationFrame(orbit_display_anim);

      }

      orbit_display_anim();







    orbit_display_canvas.addEventListener("mouseover", path_display_over);
    orbit_display_canvas.addEventListener("mouseout", path_display_out);



    function path_display_over() {

        display_path_color.path_color = '#000000';
        display_path_color.bg_color = '#EAEAEA';

    }



    function path_display_out() {
        
        display_path_color.path_color = '#000000';
        display_path_color.bg_color = '#F5F5F5';
        
    }













            