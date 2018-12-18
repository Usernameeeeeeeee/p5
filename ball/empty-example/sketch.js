var balls = [], points = [], g = 0.1, b, tmp;

function Ball(p, v, a){
    this.pos = p;
    this.vel = v;
    this.acc = a;
    this.update = function(){
        tmp.x = 0, tmp.y = 0;
        points.forEach(point => {
            if(Math.sqrt((point.x - this.pos.x)^2 + (point.y - this.pos.y)^2) <= 10){
                this.acc.add(point.b.mult(0.0001));
                tmp.add(point.b.mult(0.0001));
            }
        });
        stroke(240);
        line(this.pos.x, this.pos.y, this.pos.x + this.acc.x, this.pos.y + this.acc.y);
        this.vel.add(this.acc);
        this.pos.add(this.vel);
        this.acc.add(- tmp);

    }
    this.show = function(){
        fill(240);
        ellipse(this.pos.x, this.pos.y, 7, 7);
    }
}

function setup(){
    createCanvas(900, 900);
    frameRate(144);
    
    tmp = createVector(0, 0);
    balls[0] = new Ball(createVector(0, 0), createVector(0, 0), createVector(0, g));

    for(let i = 0; i < 100; i++){
        points.push({x: Math.random() * width - width / 2, y: height - Math.random() * height / 2});
        b = createVector(0 - points[i].x, 300 - points[i].y);
        points[i].b = b;
    }
}

function draw(){
    background(51);
    translate(width / 2, 0);
    balls.forEach(ball => {
        ball.update();
        ball.show();
    });

    points.forEach(point => {
        fill(240);
        noStroke();
        ellipse(point.x, point.y, 3, 3);
    });
}