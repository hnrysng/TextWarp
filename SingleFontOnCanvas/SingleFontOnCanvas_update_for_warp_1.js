function StaticSingleFontOnCanvas(typeface, letter, assets){

    let defaults = {
        position: { x: 0, y: 0 },
        weight: 0,
        scale: 1,
        alignment: "left",
        sticky: "top",
        color: "#ffffff",
        line_height: 1,
        tracking: 0,
        kerning: 0,
        stroke_width: 0,
        stroke_style: "#ffffff",
        structure_width: 0,
        structure_style: "#ffffff"
    };

    
    if (assets === undefined) {
        assets = defaults;
    }

    for (const prop in defaults) {
        if (assets[prop] === undefined) {
            assets[prop] = defaults[prop];
        }
    }
    


    
    //  finding the letter index using unicode of the each letter
    let index_con = [];

    for(let i = 0; i < letter.length; i++){
        for(let j = 0; j < Object.entries(typeface.letters.info).length; j++){
            if(letter[i].charCodeAt() == typeface.letters.info[j].unicode){
                index_con[i] = j;
            }
        }
    }
    


    //  Organizing the info
    //  path contains ALL nodes or points {x: 285, y: 715, in_x: 285, in_y: 715, out_x: 285, …}
    //  typeface_info_con contains general letter info {advanceWidth: 588, index: 12, leftSideBearing: 10, name: "A"}
    let path = [];
    let typeface_info_con = [];

    for(let i = 0; i < letter.length; i++){
        path[i] = [];
        typeface_info_con[i] = [];
    }

    for(let i = 0; i < letter.length; i++){
            path[i] = structuredClone(typeface.letters.path[index_con[i]]);
            typeface_info_con[i] = structuredClone(typeface.letters.info[index_con[i]]);
    }
    

    //  Similar to path, letter_path_con containers points but ONLY for the selected letters
    let letter_path_con = [];

    for(let i = 0; i < letter.length; i++){
        letter_path_con[i] = structuredClone(path[i][assets.weight]);
    }

    

    let structure_con = [];


    for(let i = 0; i < letter.length; i++){
        structure_con[i] = [];
    }

    
    for(let i = 0; i < letter.length; i++){
        structure_con[i] = {
            point_0: {x: 0, y: 0}, 
            point_1: {x: typeface_info_con[i].advanceWidth, y: 0}, 
            point_2: {x: typeface_info_con[i].advanceWidth, y: -(typeface.parameters.descender - typeface.parameters.ascender)}, 
            point_3: {x: 0, y: -(typeface.parameters.descender - typeface.parameters.ascender)},
                    
            base_0: {x: 0, y:  typeface.parameters.ascender},
            base_1: {x: typeface_info_con[i].advanceWidth, y : typeface.parameters.ascender}
        }
    }



    let width_con = [];
    let updated_width_con = [];
    let pos_y_align = [];


    for(let i = 0; i < letter.length; i++){
        updated_width_con[i] = 0;
    }



        for(let i = 0; i < letter.length; i++){
            width_con[i] = (structure_con[i].point_1.x - structure_con[i].point_0.x) * assets.scale;
        }

        let total_width = sumArray(width_con);

        
        // Text Alignment
        // might be able to take out of draw function if scale don't change in motion
        if(assets.alignment == 'center'){
            for(let i = 0; i < letter.length; i++){
                text_alignment = assets.position.x - (total_width / 2);
            }
        }else if(assets.alignment == 'left'){
            for(let i = 0; i < letter.length; i++){
                text_alignment = assets.position.x;
            }
        }else if(assets.alignment == 'right'){
            for(let i = 0; i < letter.length; i++){
                text_alignment = assets.position.x - total_width;
            }
        }

        


        // might be able to take out of draw function if scale don't change in motion
        if(assets.sticky == 'bottom'){
            for(let i = 0; i < letter.length; i++){
                pos_y_align[i] = - ((typeface[0].parameters.ascender - typeface[0].parameters.descender) * assets.scale);
            }
        }else{
            for(let i = 0; i < letter.length; i++){
                pos_y_align[i] = 0;
            }
        }


        

        // Variable to store the cumulative sum
        let cumulativeSum = 0;

        // Loop through the original array starting from index 1
        for (let i = 0; i < width_con.length; i++) {
            cumulativeSum += width_con[i];
            updated_width_con[i + 1] = cumulativeSum;
        }



        
        for(let i = 0; i < path.length; i++){
            for(let j = 0; j < path[i].length; j++){
                for(let k = 0; k < path[i][j].length; k++){
                    path[i][j][k].x = (path[i][j][k].x * assets.scale) + updated_width_con[i] + text_alignment;
                    path[i][j][k].y = ((-path[i][j][k].y + typeface.parameters.ascender) * assets.scale) + assets.position.y + pos_y_align[i];
                    path[i][j][k].in_x = (path[i][j][k].in_x * assets.scale) + updated_width_con[i] + text_alignment;
                    path[i][j][k].in_y = ((-path[i][j][k].in_y + typeface.parameters.ascender) * assets.scale) + assets.position.y + pos_y_align[i];
                    path[i][j][k].out_x = (path[i][j][k].out_x * assets.scale) + updated_width_con[i] + text_alignment;
                    path[i][j][k].out_y = ((-path[i][j][k].out_y + typeface.parameters.ascender) * assets.scale) + assets.position.y + pos_y_align[i];
                }
            }
        }


        for(let i = 0; i < letter.length; i++){
            structure_con[i].point_0.x = (structure_con[i].point_0.x * assets.scale) + updated_width_con[i] + text_alignment;
            structure_con[i].point_0.y = (structure_con[i].point_0.y * assets.scale) + assets.position.y + pos_y_align[i];
            structure_con[i].point_1.x = (structure_con[i].point_1.x * assets.scale) + updated_width_con[i] + text_alignment;
            structure_con[i].point_1.y = (structure_con[i].point_1.y * assets.scale) + assets.position.y + pos_y_align[i];
            structure_con[i].point_2.x = (structure_con[i].point_2.x * assets.scale) + updated_width_con[i] + text_alignment;
            structure_con[i].point_2.y = (structure_con[i].point_2.y * assets.scale) + assets.position.y + pos_y_align[i];
            structure_con[i].point_3.x = (structure_con[i].point_3.x * assets.scale) + updated_width_con[i] + text_alignment;
            structure_con[i].point_3.y = (structure_con[i].point_3.y * assets.scale) + assets.position.y + pos_y_align[i];
            structure_con[i].base_0.x = (structure_con[i].base_0.x * assets.scale) + updated_width_con[i] + text_alignment;
            structure_con[i].base_0.y = (structure_con[i].base_0.y * assets.scale) + assets.position.y + pos_y_align[i];
            structure_con[i].base_1.x = (structure_con[i].base_1.x * assets.scale) + updated_width_con[i] + text_alignment;
            structure_con[i].base_1.y = (structure_con[i].base_1.y * assets.scale) + assets.position.y + pos_y_align[i];
        }


        console.log(typeface.letters.info[1].name)
        console.log(typeface.letters.info[index_con[3]].advanceWidth)
        console.log(index_con)
        console.log(path)


        let space_con = [];
        console.log(path)

        for(let i = 0; i < path.length; i++){
            
        }

        for(let i = 0; i < index_con.length; i++){
            if(typeface.letters.info[index_con[i]].name == 'space'){
                // console.log('asdfasdf')
                // console.log(i)
                space_con.push(i)
                for(let j = i; j < path.length; j++){
                    for(let k = 0; k < path[j].length; k++){
                        for(let l = 0; l < path[j][k].length; l++){
                            path[j][k][l].x = path[j][k][l].x + 300
                            path[j][k][l].in_x = path[j][k][l].in_x + 300
                            path[j][k][l].out_x = path[j][k][l].out_x + 300
                        }
                    }
                }

            }
        }


        // for(let i = 0; i < space_con.length; i++){
        //     for(let j = space_con[i]; j < path.length; j++){
        //         for(let k = 0; k < path[j].length; k++){
        //             for(let l = 0; l < path[j][k].length; l++){
        //                 path[j][k][l].x = path[j][k][l].x - 300
        //                 path[j][k][l].in_x = path[j][k][l].in_x - 300
        //                 path[j][k][l].out_x = path[j][k][l].out_x - 300
        //             }
        //         }
        //     }
        // }
        
        

        let max_val = 0;

        for(let i = 0; i < path.length; i++){
            for(let j = 0; j < path[i].length; j++){
                for(let k = 0; k < path[i][j].length; k++){

                    if(max_val < path[i][j][k].x){
                        max_val = path[i][j][k].x;
                    }

                    if(max_val < path[i][j][k].in_x){
                        max_val = path[i][j][k].in_x;
                    }

                    if(max_val < path[i][j][k].out_x){
                        max_val = path[i][j][k].out_x;
                    }
                }
            }
        }


        let min_val = max_val

        for(let i = 0; i < path.length; i++){
            for(let j = 0; j < path[i].length; j++){
                for(let k = 0; k < path[i][j].length; k++){

                    if(min_val >= path[i][j][k].x){
                        min_val = path[i][j][k].x;
                    }

                    if(min_val >= path[i][j][k].in_x){
                        min_val = path[i][j][k].in_x;
                    }

                    if(min_val >= path[i][j][k].out_x){
                        min_val = path[i][j][k].out_x;
                    }
                }
            }
        }


        // this.position = assets.position;
        // this.path = path;
        // this.total_width = total_width;
        // this.extreme_val = {min: min_val, max: max_val};
        // this.total_height = structure_con[0].point_2.y - structure_con[0].point_0.y;
        


        this.parameters = structuredClone(typeface.parameters);

        let extreme_val = {min: min_val, max: max_val};
        let total_height = structure_con[0].point_2.y - structure_con[0].point_0.y;

        this.letters = {path};
        this.assets = {...assets, total_width, total_height, extreme_val}




        this.draw = function(){

            if(assets.structure_width !== 0){
                for(let i = 0; i < letter.length; i++){

                    ctx.beginPath();
                    ctx.moveTo(structure_con[i].point_0.x, structure_con[i].point_0.y);
                    ctx.lineTo(structure_con[i].point_1.x, structure_con[i].point_1.y);
                    ctx.lineTo(structure_con[i].point_2.x, structure_con[i].point_2.y);
                    ctx.lineTo(structure_con[i].point_3.x, structure_con[i].point_3.y);
                    
                    ctx.lineTo(structure_con[i].point_0.x, structure_con[i].point_0.y);

                    ctx.strokeStyle = assets.structure_style;
                    ctx.lineWidth = assets.structure_width;
                    ctx.stroke();

                    ctx.closePath();


                    ctx.beginPath();
                    ctx.moveTo(structure_con[i].base_0.x, structure_con[i].base_0.y);
                    ctx.lineTo(structure_con[i].base_1.x, structure_con[i].base_1.y);

                    ctx.strokeStyle = assets.structure_style;
                    ctx.lineWidth = assets.structure_width;
                    ctx.stroke();

                    ctx.closePath();

                }
            }


        ctx.beginPath();


        for(let i = 0; i < letter.length; i++){
            for(let j = 0; j < path[i].length; j++){

                    ctx.moveTo(path[i][j][0].x, path[i][j][0].y); 

                    for(let k = 0; k < path[i][j].length - 1; k++){
                        ctx.bezierCurveTo(
                            path[i][j][k].out_x, path[i][j][k].out_y,
                            path[i][j][k + 1].in_x, path[i][j][k + 1].in_y,
                            path[i][j][k + 1].x, path[i][j][k + 1].y
                        );
                    }

                    ctx.bezierCurveTo(
                        path[i][j][path[i][j].length - 1].out_x, path[i][j][path[i][j].length - 1].out_y,
                        path[i][j][0].in_x, path[i][j][0].in_y,
                        path[i][j][0].x, path[i][j][0].y
                    );

                    ctx.lineTo(path[i][j][0].x, path[i][j][0].y);

            }
        }



        ctx.fillStyle = assets.color;
        ctx.fill();
        ctx.strokeStyle = assets.stroke_style;
        ctx.lineWidth = assets.stroke_width;
        ctx.stroke();
        ctx.closePath();

        
    }



    function sumArray(arr) {

        let sum = 0;

        for (let i = 0; i < arr.length; i++) {
            sum += arr[i];
        }

        return sum;

    }



}