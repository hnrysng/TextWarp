let key = 0;


let key_tracker = [0,0];



function update_keytracker(key_val){
    key_tracker.push(key_val);
    key_tracker.splice(0, 1);
}


        document.addEventListener("keypress", function(e) {
            console.log(e.keyCode)
            if (e.keyCode == 49) {
                console.log("number 0");
                key = 0;
            }
            if (e.keyCode == 50) {
                console.log("number 1");
                key = 1;
            }
            if (e.keyCode == 51) {
                console.log("number 2");
                key = 2;
            }
            if (e.keyCode == 52) {
                console.log("number 3");
                key = 3;
            }
            if (e.keyCode == 53) {
                console.log("number 4");
                key = 4;
            }
            if (e.keyCode == 54) {
                console.log("number 4");
                key = 5;
            }


            update_keytracker(key);
            console.log(key_tracker)
        });