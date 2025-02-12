document.querySelector('.btn-draw').addEventListener('click', drawNumbers);

let drawSettings = {};

function drawNumbers() {
  const quantity = parseInt(document.getElementById('quantity').value);
  const rangeStart = parseInt(document.getElementById('from').value);
  const rangeEnd = parseInt(document.getElementById('to').value);
  const allowRepeats = !document.getElementById('norepeat').checked;

  if (isNaN(quantity) || isNaN(rangeStart) || isNaN(rangeEnd) || quantity <= 0 || rangeStart >= rangeEnd) {
    alert('Preencha os campos corretamente. Verifique o intervalo e a quantidade.');
    return;
  }

  if (!allowRepeats && quantity > (rangeEnd - rangeStart + 1)) {
    alert('O intervalo é pequeno demais para a quantidade de números sem repetição.');
    return;
  }

  const drawnNumbers = generateNumbers(quantity, rangeStart, rangeEnd, allowRepeats);

  drawSettings = { quantity, rangeStart, rangeEnd, allowRepeats };

  displayResult(drawnNumbers);
}

function generateNumbers(quantity, rangeStart, rangeEnd, allowRepeats) {
  const numbers = [];
  while (numbers.length < quantity) {
    const number = Math.floor(Math.random() * (rangeEnd - rangeStart + 1)) + rangeStart;
    if (allowRepeats || !numbers.includes(number)) {
      numbers.push(number);
    }
  }
  return numbers;
}

function displayResult(numbers) {
  const rightSide = document.querySelector('.rightside');
  rightSide.innerHTML = '';

  let diceHTML = numbers.map((num, index) => `
    <div class="draw2" id="draw2-${index}">
      <img src="assets/icons/diceiconempty.svg" alt="dice" class="imgbgdice">
      <div class="result" id="result-${index}">${num}</div>
    </div>
  `).join('');

  rightSide.innerHTML = `
    <div class="draw">
      <div class="draw1">
        <h2>RESULTADO DO SORTEIO</h2>
        <p>${numbers.length > 1 ? 'RESULTADOS' : '1º RESULTADO'}</p>
      </div>
      <div class="draw-container">
        ${diceHTML}
      </div>
      <button class="btn-redraw" id="btn-redraw" style="display: none;">
        SORTEAR NOVAMENTE
        <img class="arrow" src="assets/icons/playicon.svg" alt="">
      </button>
    </div>
  `;

  startDiceAnimation(numbers.length);
}

function startDiceAnimation(quantity) {
  let completed = 0;
  const redrawButton = document.getElementById('btn-redraw');

  for (let i = 0; i < quantity; i++) {
    setTimeout(() => {
      const draw2Div = document.getElementById(`draw2-${i}`);
      const diceImage = draw2Div.querySelector('.imgbgdice');
      const resultDiv = document.getElementById(`result-${i}`);

      resultDiv.style.opacity = "1";
      resultDiv.style.color = "#030203";

      diceImage.style.animation = "spinIn 1s ease-out forwards";
      diceImage.addEventListener("animationend", function () {
        setTimeout(() => {
          diceImage.style.display = "none";
          resultDiv.style.opacity = "1";
          resultDiv.style.color = "#C58DE7";
          completed++;
          if (completed === quantity) {
            redrawButton.style.display = "flex";
            redrawButton.addEventListener('click', () => location.reload());
          }
        }, 500);
      });
    }, i * 1200);
  }
}