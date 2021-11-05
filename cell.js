function Cell(x, y){
    this.x = x;
    this.y = y;
    this.walls = [true, true, true, true];
    this.visited = false;

    this.checkNeighbours = function(){
      var neighbours = [];
      var top = board[index(x, y - 1)];
      var right = board[index(x + 1, y)];
      var bottom = board[index(x, y + 1)];
      var left = board[index(x - 1, y)];

      if (top && !top.visited) {
        neighbours.push(top);
      }
      if (right && !right.visited) {
        neighbours.push(right)
      }
      if (bottom && !bottom.visited) {
        neighbours.push(bottom);
      }
      if (left && !left.visited) {
        neighbours.push(left);
      }
      
      if(neighbours.length > 0){
        var r = floor(random(0, neighbours.length));
        return neighbours[r];
      } else {
        return undefined;
      }
    }

    this.show = function(){
      var x = this.x * size;
      var y = this.y * size;
      stroke(color('black'));
      strokeWeight(3)
      if (this.walls[0]) {
        line(x, y, x  + size, y);
      }
      if (this.walls[1]){
        line(x + size, y, x + size , y + size);
      }
      if (this.walls[2]){
         line(x + size, y + size, x , y + size);
      }
      if (this.walls[3]){
        line(x, y + size, x , y);
      }
      if (this.visited) {
        noStroke();
        fill(color('white'));
      }
    }
    this.highlight = function(){
      noStroke();
      fill(color('green'));
      rect(x * size,y * size ,size,size)
    }
    this.showcorner = function(){
        if(corners.length < 0){
            var r = floor(random(0, corners.length));
        }
        noStroke();
        fill(color('red'));
        rect(x * size,y * size ,size,size)
    }

}
function getCorners(){
    var topleft = board[index(0, 0)];
    var topright = board[index(cols -1 , 0)];
    var bottomleft = board[index(0, rows -1)];
    var bottomright = board[index(cols -1, rows -1)];
    corners.push(topleft, topright, bottomleft, bottomright);
}
function index(x,y){
  if (x < 0 || y < 0 || x > cols - 1 || y > rows - 1) {
    return -1;
  }
  return x + y * cols;
}
function removeWalls(a,b){
  var x = a.x - b.x;
  if (x === 1) {
    a.walls[3] = false;
    b.walls[1] = false;
  } else if(x === -1) {
    a.walls[1] = false;
    b.walls[3] = false;
  }
  var y = a.y - b.y;
  if (y === 1) {
    a.walls[0] = false;
    b.walls[2] = false;
  } else if(y === -1) {
    a.walls[2] = false;
    b.walls[0] = false;
  }
}