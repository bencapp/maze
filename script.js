//for "maze" index.html

//class for each cell

class Cell {
  constructor(x, y) {
    this.name = "cell";
    this.x = x;
    this.y = y;
    this.visited = false;
    let cell = document.createElement("div");
    cell.className = "cell";

    cell.id = `${x}, ${y}`;
    document.getElementById("maze").append(cell);
  }
}

//replaces existing #maze element with a new one
function createMaze(width, height) {
  if (document.getElementById("maze")) {
    document.getElementById("maze").remove();
  }

  let newMaze = document.createElement("div");
  newMaze.id = "maze";
  newMaze.style.width = `${width * 32 + 2}px`;
  newMaze.style.height = `${height * 32 + 2}px`;
  document.body.append(newMaze);

  const visitedArr = [];

  for (let j = 0; j < height; j++) {
    visitedArr.push([]);
    for (let i = 0; i < width; i++) {
      const cell = new Cell(i, j);
      const cellElem = document.getElementById(`${i}, ${j}`);
      visitedArr[j].push(false);
      if (i == 0) {
        cellElem.style.borderLeftWidth = "2px";
      }
      if (i == width - 1) {
        cellElem.style.borderRightWidth = "2px";
      }
      if (j == 0) {
        cellElem.style.borderBottomWidth = "2px";
      }
      if (j == height - 1) {
        cellElem.style.borderTopWidth = "2px";
      }
    }
  }
  //create pathway

  function createPath() {
    const stack = [];
    //choose the initial cell,  and push to the stack
    let yValue = Math.floor(Math.random() * height);
    let startCell = document.getElementById(`0, ${yValue}`);

    //mark as visited
    visitedArr[yValue][0] = true;
    //push it to the stack
    stack.push(startCell);

    while (stack.length > 0) {
      //pop a cell from the stack and make it a current cell
      let current = stack.pop();
      let xy = current.id.split(", ");
      let x = parseInt(xy[0]);
      let y = parseInt(xy[1]);

      //if the current cell has any neighbors who have not been visited
      let visitedTop = true;
      if (y < visitedArr.length - 1) {
        visitedTop = visitedArr[y + 1][x];
      }
      let visitedBottom = true;
      if (y != 0) {
        visitedBottom = visitedArr[y - 1][x];
      }
      let visitedRight = true;
      if (x < visitedArr[0].length - 1) {
        visitedRight = visitedArr[y][x + 1];
      }
      let visitedLeft = true;
      if (x != 0) {
        visitedLeft = visitedArr[y][x - 1];
      }

      if (
        visitedTop === false ||
        visitedBottom === false ||
        visitedRight === false ||
        visitedLeft === false
      ) {
        //push the current cell to the stack
        stack.push(current);

        //choose one of the unvisited neighbors
        const unvisited = [];
        if (visitedTop == false) {
          unvisited.push("top");
        }
        if (visitedBottom == false) {
          unvisited.push("bottom");
        }
        if (visitedRight == false) {
          unvisited.push("right");
        }
        if (visitedLeft == false) {
          unvisited.push("left");
        }
        let nextCellDirection =
          unvisited[Math.floor(Math.random() * unvisited.length)];

        //remove the wall between the current cell and the chosen cell
        //mark the chosen cell as visited and push it to the stack

        switch (nextCellDirection) {
          case "top":
            document.getElementById(`${x}, ${y + 1}`).style.borderBottomColor =
              "transparent";
            document.getElementById(`${x}, ${y}`).style.borderTopColor =
              "transparent";
            visitedArr[y + 1][x] = true;
            stack.push(document.getElementById(`${x}, ${y + 1}`));
            break;
          case "bottom":
            document.getElementById(`${x}, ${y - 1}`).style.borderTopColor =
              "transparent";
            document.getElementById(`${x}, ${y}`).style.borderBottomColor =
              "transparent";
            visitedArr[y - 1][x] = true;
            stack.push(document.getElementById(`${x}, ${y - 1}`));
            break;
          case "right":
            document.getElementById(`${x + 1}, ${y}`).style.borderLeftColor =
              "transparent";
            document.getElementById(`${x}, ${y}`).style.borderRightColor =
              "transparent";
            visitedArr[y][x + 1] = true;
            stack.push(document.getElementById(`${x + 1}, ${y}`));
            break;
          case "left":
            document.getElementById(`${x - 1}, ${y}`).style.borderRightColor =
              "transparent";
            document.getElementById(`${x}, ${y}`).style.borderLeftColor =
              "transparent";
            visitedArr[y][x - 1] = true;
            stack.push(document.getElementById(`${x - 1}, ${y}`));
            break;
        }
      }
    }
    //choose an ending cell

    let endYValue = Math.floor(Math.random() * height);
    let endCell = document.getElementById(`${width - 1}, ${endYValue}`);
    endCell.style.borderRightColor = "transparent";

    //create the player object
    let ball = document.createElement("div");
    ball.id = "ball";
    document.getElementById(`0, ${yValue}`).append(ball);

    //create event listeners to move the ball
    let currentX = 0;
    let currentY = yValue;

    let justWonGame = false;

    function handleKeyPress(event) {
      const key = event.key;
      let currentStyle = window.getComputedStyle(
        document.getElementById(`${currentX}, ${currentY}`)
      );
      switch (key) {
        case "ArrowUp":
          event.preventDefault();
          if (
            currentY < height &&
            currentStyle.getPropertyValue("border-top-color") ==
              "rgba(0, 0, 0, 0)"
          ) {
            document
              .getElementById(`${currentX}, ${currentY + 1}`)
              .append(ball);
            currentY++;
          }
          break;
        case "ArrowDown":
          event.preventDefault();

          if (
            currentY >= 0 &&
            currentStyle.getPropertyValue("border-bottom-color") ==
              "rgba(0, 0, 0, 0)"
          ) {
            document
              .getElementById(`${currentX}, ${currentY - 1}`)
              .append(ball);
            currentY--;
          }
          break;
        case "ArrowRight":
          event.preventDefault();

          if (
            currentX < width &&
            currentStyle.getPropertyValue("border-right-color") ==
              "rgba(0, 0, 0, 0)"
          ) {
            document
              .getElementById(`${currentX + 1}, ${currentY}`)
              .append(ball);
            currentX++;
          }
          break;
        case "ArrowLeft":
          event.preventDefault();

          if (
            currentX >= 0 &&
            currentStyle.getPropertyValue("border-left-color") ==
              "rgba(0, 0, 0, 0)"
          ) {
            document
              .getElementById(`${currentX - 1}, ${currentY}`)
              .append(ball);
            currentX--;
          }
          break;
      }
      if (currentX == width - 1 && currentY == endYValue) {
        document.getElementById("win-box").style.display = "initial";
        document.getElementById("overlay").style.display = "initial";
        window.removeEventListener("keydown", handleKeyPress);
        justWonGame = true;
      }
    }

    window.addEventListener("keydown", handleKeyPress);

    //when reset buttons are pressed, reset maze according to difficulty setting
    document.querySelectorAll(".new-game").forEach(
      (item) =>
        (item.onclick = function () {
          window.removeEventListener("keydown", handleKeyPress);
          document.getElementById("win-box").style.display = "none";
          document.getElementById("overlay").style.display = "none";

          let difficulty = justWonGame
            ? document.querySelector("#difficulty-won").value
            : document.querySelector("#difficulty-main").value;

          let size = "";
          if (difficulty == "Easy") {
            size = 5;
          } else if (difficulty == "Medium") {
            size = 10;
          } else if (difficulty == "Hard") {
            size = 20;
          } else if (difficulty == "Very Hard") {
            size = 40;
          }
          createMaze(size, size);
        })
    );
  }
  createPath();
}

//execution code
createMaze(5, 5);
