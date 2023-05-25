const canvas = document.querySelector("#game");
const game = canvas.getContext("2d");
const btnUp = document.querySelector("#up");
const btnLeft = document.querySelector("#left");
const btnRight = document.querySelector("#right");
const btnDowm = document.querySelector("#down");

const playerPosition = {
  x: undefined,
  y: undefined,
};

const gitPosition = {
  x: undefined,
  y: undefined,
};

let enemyPosition = [];

let canvasSize;
let elementsSize;
let level = 0
let lives = 3

window.addEventListener("load", setCanvasSize);
window.addEventListener("resize", setCanvasSize);

function setCanvasSize() {
  if (window.innerHeight > window.innerWidth) {
    canvasSize = window.innerWidth * 0.8;
  } else {
    canvasSize = window.innerHeight * 0.8;
  }

  canvas.setAttribute("width", canvasSize);
  canvas.setAttribute("height", canvasSize);

  elementsSize = canvasSize / 10 - 1;

  startGame();
}

function startGame() {
  console.log({ canvasSize, elementsSize });

  game.font = `${elementsSize}px Verdana`;
  game.textAlign = "";

  const map = maps[level];
  if(!map){
    gameWin()
    return
  }
  const mapRows = map.trim().split("\n");
  const mapRowsCols = mapRows.map((row) => row.trim().split(""));
  console.log({ map, mapRows, mapRowsCols });

  game.clearRect(0, 0, canvasSize, canvasSize);
  enemyPosition = []

  mapRowsCols.forEach((row, rowI) => {
    row.forEach((col, colI) => {
      const emoji = emojis[col];
      const posX = elementsSize * colI;
      const posY = elementsSize * (rowI + 1);

      if (col == "O") {
        if (!playerPosition.x && !playerPosition.y) {
          playerPosition.x = posX;
          playerPosition.y = posY;
          console.log({ playerPosition });
        }
      } else if (col == "I") {
        gitPosition.x = posX;
        gitPosition.y = posY;
        console.log({ gitPosition });
      } else if (col == "X") {
        enemyPosition.push({
          x: posX,
          y: posY,
        });
      }
      game.fillText(emoji, posX, posY);
    });
  });

  movePLayer();
}

function movePLayer() {

  const gitCollisionX = playerPosition.x.toFixed(2) == gitPosition.x.toFixed(2);
  const gitCollitionY = playerPosition.y.toFixed(2) == gitPosition.y.toFixed(2);
  const gitCollition = gitCollisionX && gitCollitionY;
  if (gitCollition) {
    levelWin()
  }

  const enemyCollision = enemyPosition.find(enemy => {
    const enemyCollisionX = enemy.x.toFixed(2) == playerPosition.x.toFixed(2)
    const enemyCollisionY = enemy.y.toFixed(2) == playerPosition.y.toFixed(2)
    return enemyCollisionX && enemyCollisionY
  })

  if(enemyCollision) {
    levelFalil()
  }

  game.fillText(emojis["PLAYER"], playerPosition.x, playerPosition.y);
  console.log(playerPosition.x, playerPosition.y);
}

function levelWin() {
  console.log('subiste de nivel')
  level++
  startGame()
}

function gameWin(){
  console.log('ganaste')
}

function levelFalil() {
  lives--
  if(lives <= 0){
    level = 0
    lives = 3 
  }
  playerPosition.x = undefined
  playerPosition.y = undefined
  startGame()
}

window.addEventListener("keydown", moveByKeys);
btnUp.addEventListener("click", moveUp);
btnLeft.addEventListener("click", moveLeft);
btnRight.addEventListener("click", moveRight);
btnDowm.addEventListener("click", moveDown);

function moveByKeys(event) {
  if (event.key === "ArrowUp") moveUp();
  else if (event.key == "ArrowLeft") moveLeft();
  else if (event.key === "ArrowRight") moveRight();
  else if (event.key === "ArrowDown") moveDown();
}

function moveUp() {
  if (playerPosition.y - elementsSize < elementsSize) {
    console.log("out");
  } else {
    playerPosition.y -= elementsSize;
    startGame();
    console.log("me muevo hacia arriba");
  }
}
function moveLeft() {
  if (playerPosition.x - elementsSize < elementsSize - elementsSize) {
  } else {
    playerPosition.x -= elementsSize;
    startGame();
    console.log("me muevo hacia izquierda");
  }
}
function moveRight() {
  if (playerPosition.x + elementsSize > canvasSize - elementsSize) {
    console.log("out");
  } else {
    playerPosition.x += elementsSize;
    startGame();
    console.log("me muevo hacia derecha");
  }
}
function moveDown() {
  if (playerPosition.y + elementsSize > canvasSize) {
    console.log("out");
  } else {
    playerPosition.y += elementsSize;
    startGame();
    console.log("me muevo hacia derecha");
  }
}
