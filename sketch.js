var board = [];
var stack = [];
var corners = [];
var cols, rows
var size = 50;

var startpos;
var endpos;
var current;

function setup() {
  createCanvas(1200, 1200);
  cols = floor(width / size);
  rows = floor(height / size);
  //frameRate(200);
  createBoard();
  getCorners();
  startpos = corners[Math.floor(Math.random()*corners.length)];
  endpos = corners[Math.floor(Math.random()*corners.length)];
  startposind = index(startpos.x,startpos.y);
  endposind = index(endpos.x,endpos.y)
  console.log(startposind);
  console.log(endposind);
  current = board[index(startpos.x,startpos.y)];
}
function createBoard(){
    for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      var cell = new Cell(x,y)
      board.push(cell);
    }
  };
}
function getEndpos(startpos){
  for (let i = 0; i < corners.length; i++) {
    if (startpos == endpos) {
     corners.splice(i, startpos) 
    }
  }
}

function draw() {
  background(250);
  for (let i = 0; i < board.length; i++) {
    board[i].show();
  }
  current.visited = true;
  current.highlight();

  let next = current.checkNeighbours();
  if (next) {
    next.visited = true;
    stack.push(current);
    removeWalls(current, next);
    current = next;
  } else if(stack.length > 0) {
    current = stack.pop();
  } else if (stack.length == 0){
      // var r = floor(random(0, corners.length));
      // corners[r].showcorner();
  }
}

