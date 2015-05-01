function startSnake()
  {
  var Game = function() {
        var canvas = document.getElementById("snake");
        var context = canvas.getContext('2d');
        var gameSize = { x: canvas.width, y: canvas.height }
        this.map = [0,0,0,0]
        this.bodies = [];
        this.bodies = this.bodies.concat(new Snake(this, gameSize, "DOWN", "green"));
        this.bodies = this.bodies.concat(new Snake(this, gameSize, "RIGHT", "orange"));

        var self = this;

      var interval = function() {
        self.update();
        self.draw(context, gameSize);
        setTimeout(function() {
        requestAnimationFrame(interval);
      }, 60);
      };
      interval();
    };
  Game.prototype = {
    update: function() {
      var self = this;
      for (var i = 0; i < this.bodies.length; i++) {
        this.bodies[i].update();
      }

    },

    draw: function(context, gameSize) {
      context.clearRect(0, 0, gameSize.x, gameSize.y);
      for (var i = 0; i < this.bodies.length; i++)
        {
        drawSnake(context, this.bodies[i], this.bodies[i].color);
        drawBorder(context);
        drawBarrier(context, this.map)
        }
    },
    addBody: function(body) {
      this.bodies.push(body);
    },
    checkCollision: function() {
      checkCollision();
    }
  };

  var Barrier = function(game, gameSize){
    this.game = game;
    this.barrier_array = []
  };


  var Snake = function (game, gameSize,direction, color){
        this.game = game;
        this.direction = direction;
        this.snake_array = []
        this.color = color
        this.length = 10;
          for(var i = this.length; i>=0; i--)
          {
          this.snake_array.push({x: i, y:0});
          }
  };

    Snake.prototype = {
      update: function(){
          var nose_x= this.snake_array[0].x
          var nose_y= this.snake_array[0].y

          if(this.direction == "RIGHT") nose_x++;
        	else if(this.direction == "LEFT") nose_x--;
        	else if(this.direction == "UP") nose_y--;
        	else if(this.direction == "DOWN") nose_y++;

          var tail = this.snake_array.pop();
            tail.x = nose_x;
            tail.y = nose_y;
            this.snake_array.unshift(tail);

    }
};
  var checkCollision = function(context){
      // if (body.snake_array[0].x > context.canvas.width/10 || body.snake_array[0].x/10 < 0)
      // {
      //
      //   console.log("Dead");
      // }
      // else if (body.snake_array[0].y > context.canvas.height/10 || body.snake_array[0].y/10 < 0)
      // {
      //   console.log("Dead");
      // }

  };

  var drawBorder = function(context){
    context.beginPath();
    context.lineWidth="1";
    context.strokeStyle="red";
    context.rect(0,0, context.canvas.height,context.canvas.width);
    context.stroke();

  };

  var drawBarrier = function(context, map){
    context.beginPath();
    context.fillStyle= "red"
    context.lineWidth="1";
    context.fillRect(map[0],map[1],map[2],map[3]);
    context.stroke();
  };

  var drawSnake = function(context, body, color){

              for(var i = 0; i < body.snake_array.length; i++)
                  {
                    var cell = body.snake_array[i];
                    context.fillStyle = color;
                    context.fillRect(cell.x*10, cell.y*10, 10, 10);
                  }
    };

    window.addEventListener('keydown', function(key)
         {
          if(key.which == "37")
          game.bodies[1].direction = "LEFT";
          else if(key.which == "39")
          game.bodies[1].direction = "RIGHT";
          else if(key.which == "38")
          game.bodies[1].direction = "UP";
          else if(key.which == "40")
          game.bodies[1].direction = "DOWN";

          else if(key.which == "65")
          game.bodies[0].direction = "LEFT";
          else if(key.which == "68")
          game.bodies[0].direction = "RIGHT";
          else if(key.which == "87")
          game.bodies[0].direction = "UP";
          else if(key.which == "83")
          game.bodies[0].direction = "DOWN";

          });

      window.addEventListener('load', function() {
        game =   new Game();
      });
};
