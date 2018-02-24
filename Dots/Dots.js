var gif;
// only works on omnibus server because of http 
function setup() {
  createCanvas(400,400);
  gif = loadGif('acc/earth.gif');
}

function draw() {
  image(gif, 0, 0);
}
