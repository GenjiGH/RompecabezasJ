// Espera a que la imagen se cargue
window.onload = function() {
  const puzzleContainer = document.getElementById('puzzle');

  // Configura el rompecabezas
  const puzzle = new headbreaker.Canvas(puzzleContainer, {
    width: 800,
    height: 800,
    pieceSize: 80,
    proximity: 20,
    borderFill: 10,
    strokeWidth: 2,
    lineSoftness: 0.18,
  });

  // Carga la imagen y genera las piezas
  const image = new Image();
  image.src = 'assets/imagen.jpg';
  image.onload = () => {
    puzzle.autogenerate({
      horizontalPiecesCount: 10,
      verticalPiecesCount: 10,
      image: image,
    });
    puzzle.draw();
  };
};
