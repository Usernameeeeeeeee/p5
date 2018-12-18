var circles = [], slider, s = 250;
function setup(){
    createCanvas(1800, 900);
    colorMode(HSB);
    frameRate(144);
}

function racaman(n){
    let current = 0,
    closedSet = [],
    array = [];
    for(let i = 0; i < n; i++){
        let find = false;
        for(let k = 0; k < closedSet.length; k++){
            if(closedSet[k] == current - i){
                find = true
            }
            if(current - i <= 0){
                find = true
            }
        }
        if(find == false){
            closedSet.push(current - i);
            current = current - i;
            array.push(current);
        } else {
            closedSet.push(current + i);
            current = current + i;
            array.push(current);
        }
    }
    return array;
}

function draw(){
    background(9, 0, 20);
    //s = slider.value();
    if(s > 0.1){
        s /= 1.001
    } else {
        noLoop()
    }
    let rac = [];
    rac = racaman(floor(500 / s));
    let circles = [];
    stroke(9, 0, 90);
    strokeWeight(1)
    line(50, 450, 1750, 450);
    if(circles.length == 0){
        for(let i = 1; i < rac.length; i++){
            let diameter = abs(rac[i] - rac[i - 1]);
            let center;
            if(rac[i - 1] < rac[i]){
                center = rac[i - 1] + (diameter * 0.5);
                circles.push({c: center, d: diameter, f: i % 2, dir: 1});
            } else {
                center = rac[i - 1] - (diameter * 0.5);
                circles.push({c: center, d: diameter, f: i % 2, dir: -1});

            }
        }
    }
    strokeWeight(0.5);
    circles.forEach(circle => {
        noFill()
        stroke(circles.indexOf(circle) % 360, 90, 90);
        //stroke(0, 0, 90);
        if(circles.indexOf(circle) == circles.length - 1){
            if(circle.dir == 1){
                if(circle.f == 1){
                    arc(50 + s * circle.c, 450, circle.d * s, circle.d * s, PI, PI + ((500/s) - floor((500 / s))) * PI);
                } else {
                    arc(50 + s * circle.c, 450, circle.d * s, circle.d * s, PI - ((500/s) - floor((500 / s))) * PI, PI);
                }     
            } else {
                if(circle.f == 1){
                    arc(50 + s * circle.c, 450, circle.d * s, circle.d * s, TWO_PI - PI * ((500/s) - floor((500 / s))), TWO_PI);
                } else {
                    arc(50 + s * circle.c, 450, circle.d * s, circle.d * s, 0, ((500/s) - floor((500 / s))) * PI);
                } 
            }
               
        } else {
            if(circle.f == 1){
                arc(50 + s * circle.c, 450, circle.d * s, circle.d * s, PI, TWO_PI);
            } else {
                arc(50 + s * circle.c, 450, circle.d * s, circle.d * s, 0, PI);
            }    
        }
        
    });
}