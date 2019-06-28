/*
* author: Welto
* catch the pumkin
* move kaaizu with your mouse.
*/

var pumpkins =[];
var pumpkins_on_kaaizu = [];
var increment, base_speed;
var leftX, rightX;
var pumpkin_size;
var lives;
var minisize;
var gameover;
var points;
var numbers = ["hundred", "million", "billion", "thousand", "trillion", "kaaizillonion", "kazillion","flipflopion"];
var num_to_str = ["zero","one","two","three","four","five","six","seven","eight","nine"]
var num_seq;
var vid;
// only works on omnibus server
function preload() {
    pumpkin_pic = loadImage('./pics/pumpkin.png');
    kaaizu = loadImage('./pics/kaaizu.png');
    vid = createVideo(['./pics/Intro.mov']);
    vid.hide();
    vid.pause();
}

function setup() {
    cnv = createCanvas(800,900);
    cnv.mouseClicked(restart);
    increment = 0;
    base_speed = 2;
    pumpkin_size = 50;
    minisize= pumpkin_size/2;
    lives = 20;
    gameover = false;
    points = 0;
    num_seq = [];
    fill(0,0,0);
    textSize(34);
    textAlign(CENTER);
    vid.position(-200,-180);
    vid.onended(vid.hide);
    vid.size(1100);
}

function draw() {
    background(255);
    if(!gameover) {
        increment++;
        draw_pumpkins();
        draw_kaaizu();
        check_collision();
        add_new_pumpkins();
    } else {
        text("click to restart", width/2,height/2);
    }
    
    text("lives: " + lives, 100,50);
    textStyle(BOLD);
    text(points_to_text(), width/2,80);
    textStyle(NORMAL);
}
function restart(){
    if (gameover) {
        points = 0;
        increment = 0;
        pumpkins = [];
        pumpkins_on_kaaizu = [];
        lives = 20;
        num_seq = [];
        vid.hide();
        gameover = false;
    }
}

function check_collision() {
    for(i in pumpkins) {
        if (pumpkins[i][1] > 750 - pumpkin_size/2) {
            if(leftX <= pumpkins[i][0] &&  rightX >= pumpkins[i][0]){
                if(!points) { points++;}
                if(getRandomInt(2)){
                    points++;
                } else {
                    points *= 2;
                }
                pumpkins_on_kaaizu.push(pumpkins[i][0] - leftX);
                pumpkins.splice(i,1);
            } else if(pumpkins[i][1] > 750){
                lives -= 1;
                if (lives == 0){
                    gameover = true;
                    if(vid.duration()){
                        vid.show();
                        vid.play();
                    }
                    return
                }
                pumpkins.splice(i,1);
            }
        }
    }
}
function draw_pumpkins() {
    for(i in pumpkins){
        //ellipse(pumpkins[i][0], pumpkins[i][1], pumpkin_size, pumpkin_size);
        image(pumpkin_pic, pumpkins[i][0]- (pumpkin_size/2 + 5), pumpkins[i][1]- pumpkin_size/2, pumpkin_size+ 10 , pumpkin_size+ 10);
        pumpkins[i][1] = pumpkins[i][1] + Math.floor(pumpkins[i][2]);
    }
}

function add_new_pumpkins() {
    if (Math.random()< spawn_prob(increment, pumpkins.length)){
        pumpkins.push([getRandomInt(width), 0, max_speed(increment) + base_speed])
    }
}

function draw_kaaizu() {
    padLength = 75;
    if (mouseX < padLength) {
        leftX = 0;
        rightX = 2 * padLength;
    } else if(mouseX > width - padLength) {
        leftX = width - 2 * padLength;
        rightX = width;
    } else {
        leftX = mouseX - padLength;
        rightX = mouseX + padLength
    }
    for (i in pumpkins_on_kaaizu){
    //ellipse(leftX + pumpkins_on_kaaizu[i], 750 - minisize/2, minisize);
    image(pumpkin_pic, leftX + pumpkins_on_kaaizu[i] - (minisize/2 + 5), 750 - minisize, minisize+ 5 , minisize+ 5);
    }
    line(leftX, 750, rightX, 750);
    image(kaaizu, leftX, 750, padLength*2 , padLength*2/ 3.385);
}

function points_to_text() {
    var out = "Points: ";
    var temp = points;
    if (!(temp / Math.pow(10,num_seq.length) < 1)) { 
        num_seq.push(numbers[getRandomInt(numbers.length)]);
    }
    var seq = []
    while(temp >= 1) {
        seq.push(temp % 10);
        temp = Math.floor(temp/10);
    }
    var letters = 8;
    const temp_num_seq = [...num_seq];
    temp_num_seq.push("");
    console.log(temp_num_seq);
    for(i in seq) {
        x = seq[seq.length - i - 1];
        var update = num_to_str[x] + "-";
        letters += update.length
        if(letters > 40){
            out += "\n";
            letters = 0;
        }
        out += update;
        update = temp_num_seq[++i] + "-";
        letters += update.length
        if(letters > 40){
            out += "\n";
            letters = 0;
        }
        out += update;
    }
    return out.slice(0,-2);
}
function max_speed(increment) {
    return Math.random() * sqrt(increment/10)/10;
}

function spawn_prob(increment, pump_num) {
    var flatten = 0.1;
    return 1.8*(sigmoid(flatten*(increment/1000)/pump_num + 0.00001) - 0.5);
}

function sigmoid(t) {
    return 1/(1+Math.pow(Math.E, -t));
}

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}