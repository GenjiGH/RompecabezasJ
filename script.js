const canvas = document.getElementById("puzzle-canvas");
const ctx = canvas.getContext("2d");

const imageSrc = "imagen.jpg";
const rows = 4;
const cols = 4;

let pieces = [];
let pieceWidth, pieceHeight;
let draggedPiece = null;

const image = new Image();
image.src = imageSrc;

image.onload = () => {
  canvas.width = image.width;
  canvas.height = image.height;
  pieceWidth = canvas.width / cols;
  pieceHeight = canvas.height / rows;

  createPieces();
  shufflePieces();
  drawPieces();
  setTimeout(() => {
    enableDrag();
  }, 1000);
};

function createPieces() {
  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      pieces.push({
        correctX: x * pieceWidth,
        correctY: y * pieceHeight,
        currentX: x * pieceWidth,
        currentY: y * pieceHeight,
      });
    }
  }
}

function shufflePieces() {
  pieces = pieces.sort(() => Math.random() - 0.5);
  pieces.forEach((piece, index) => {
    const x = (index % cols) * pieceWidth;
    const y = Math.floor(index / cols) * pieceHeight;
    piece.currentX = x;
    piece.currentY = y;
  });
}

function drawPieces() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  pieces.forEach((p) => {
    ctx.drawImage(
      image,
      p.correctX,
      p.correctY,
      pieceWidth,
      pieceHeight,
      p.currentX,
      p.currentY,
      pieceWidth,
      pieceHeight
    );
  });
}

function enableDrag() {
  let offsetX, offsetY;

  canvas.addEventListener("mousedown", (e) => {
    const rect = canvas.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const clickY = e.clientY - rect.top;

    for (let p of pieces) {
      if (
        clickX > p.currentX &&
        clickX < p.currentX + pieceWidth &&
        clickY > p.currentY &&
        clickY < p.currentY + pieceHeight
      ) {
        draggedPiece = p;
        offsetX = clickX - p.currentX;
        offsetY = clickY - p.currentY;
        break;
      }
    }
  });

  canvas.addEventListener("mousemove", (e) => {
    if (draggedPiece) {
      const rect = canvas.getBoundingClientRect();
      draggedPiece.currentX = e.clientX - rect.left - offsetX;
      draggedPiece.currentY = e.clientY - rect.top - offsetY;
      drawPieces();
    }
  });

  canvas.addEventListener("mouseup", () => {
    if (draggedPiece) {
      // Snap to position if close enough
      if (
        Math.abs(draggedPiece.currentX - draggedPiece.correctX) < 20 &&
        Math.abs(draggedPiece.currentY - draggedPiece.correctY) < 20
      ) {
        draggedPiece.currentX = draggedPiece.correctX;
        draggedPiece.currentY = draggedPiece.correctY;
      }

      drawPieces();
      draggedPiece = null;
      checkWin();
    }
  });
}

function checkWin() {
  const allCorrect = pieces.every(
    (p) =>
      p.currentX === p.correctX && p.currentY === p.correctY
  );

  if (allCorrect) {
    setTimeout(() => {
      alert("YEY! 🎉");
    }, 200);
  }
}
