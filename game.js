$(document).ready(function() {
            var canvas = $('#canvas')[0];
            var ctx = canvas.getContext('2d');
            var w = $('#canvas').width();
            var h = $('#canvas').height();
            var cellWidth = 10;
            var d;
            var food;
            var snake_array;
            var score;

            function init(){
              d = 'right';

              createSnake();
              if(typeof gameLoop != 'undefined') clearInterval(gameLoop);
              var speed = 120;
              gameLoop = setInterval(paint, speed);
              createFood();
              score = 0;
            }
            init();

            function createSnake() {
                var length = 5;
                snake_array = [];
                for (var i = length; i > 0; i--) {
                    snake_array.push({
                        x: i,
                        y: 0
                    });
                }
            }

            function createFood(){
              food = {
                x: Math.round(Math.random()*(w-cellWidth)/cellWidth),
                y:Math.round(Math.random()*(h-cellWidth)/cellWidth),
              };
            }

            function paint() {

                ctx.fillStyle = 'white';
                ctx.fillRect(0, 0, w, h);
                ctx.strokeStyle = 'black';
                ctx.strokeRect(0, 0, w, h);
                var tail;

                var nx = snake_array[0].x;
                var ny = snake_array[0].y;

                if (d == "right") nx++;
                else if (d == "left") nx--;
                else if (d == "up") ny--;
                else if (d == "down") ny++;

                if(nx == -1 || nx == w/cellWidth || ny == -1 || ny == h/cellWidth || checkCollision(nx,ny,snake_array)){
                  init();
                  return;
                }

                if (nx === food.x && ny === food.y){
                  tail =  {
                    x:nx,
                    y:ny
                  };
                  score++;
                  createFood();
                }else{
                 tail = snake_array.pop();
			           tail.x = nx; tail.y = ny;
                }

                snake_array.unshift(tail);

                for (var i = 0; i < snake_array.length; i++) {
                    var c = snake_array[i];
                    paintCell(c.x,c.y,'black');
                    }

                paintCell(food.x,food.y,'red');
                var scoreText = "Score:" + score;
                paintCell(5,h-5,'black');
                ctx.fillText(scoreText,5,h-5);
            }


            function paintCell(x,y,color){
              ctx.fillStyle = color;
              ctx.fillRect(x * cellWidth, y * cellWidth, cellWidth, cellWidth);
              ctx.strokeStyle = 'white';
              ctx.strokeRect(x * cellWidth, y * cellWidth, cellWidth, cellWidth);
            }

            function checkCollision(x, y, array){

		for(var i = 0; i < array.length; i++)
		{
			if(array[i].x == x && array[i].y == y)
			 return true;
		}
		return false;
	}

            $(document).keydown(function(e) {

                var key = e.which;
                if(key == "37" && d != "right") d = "left";
		            else if(key == "38" && d != "down") d = "up";
		            else if(key == "39" && d != "left") d = "right";
  		          else if(key == "40" && d != "up") d = "down";
              });

            });
