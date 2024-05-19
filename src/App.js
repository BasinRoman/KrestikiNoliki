import './App.css';
import React from 'react';


const symbol_x = "X";
const symbol_o = "O";

const fieldWidth = 5;
const fieldHeight = 5;
const winCount = 3;

function App() {
  let currentStep = symbol_x;
  const [state, setState] = React.useState(currentStep);

  const winningCombinations = [];

  // Generate horizontal combinations
  for (let i = 1; i <= fieldWidth; i++) {
    for (let j = 1; j <= fieldHeight - winCount + 1; j++) {
      const combination = [];
      for (let k = 0; k < winCount; k++) {
        combination.push(`${i}-${j + k}`);
      }
      winningCombinations.push(combination);
    }
  }

  // Generate vertical combinations
  for (let i = 1; i <= fieldWidth - winCount + 1; i++) {
    for (let j = 1; j <= fieldHeight; j++) {
      const combination = [];
      for (let k = 0; k < winCount; k++) {
        combination.push(`${i + k}-${j}`);
      }
      winningCombinations.push(combination);
    }
  }

  // Generate diagonal combinations
  for (let i = 0; i < fieldWidth - winCount + 1; i++) {
    for (let j = 0; j < fieldHeight - winCount + 1; j++) {
      const combination = [];
      for (let k = 0; k < winCount; k++) {
        combination.push(`${i + k}-${j + k}`);
      }
      winningCombinations.push(combination);

      if (winCount === 4) {
        combination.pop();
        winningCombinations.push(combination);
      }
    }
  }

  const DrawLine = (Weight, currentLine) => {

    let index = 0;
    var result = Array.from(Array(Weight), () => {
      index++;
      var curId = `${currentLine}-${index}`;

      return (
        <td key={curId}
          onClick={() => {
            HandleClick(curId);
          }}>
          <div class="inner" id={curId}></div>
        </td>);
    });

    return (
      result
    );
  }

  const DrawField = (Weight, Height) => {

    var result = new Array(Height);

    for (var i = 1; i <= Height; i++) {
      result[i] = <tr>{DrawLine(Weight, i)}</tr>;
    }

    return (
      result
    );
  }

  const HandleClick = (curId) => {
    setState(state === symbol_x ? symbol_o : symbol_x);
    currentStep = state;

    document.getElementById(curId).innerHTML = state;

    CheckWin(currentStep);
  }

  const CheckWin = (currentStep) => {
    var totaFilled = document.querySelectorAll(".inner");
    var classesWithText = Array.from(totaFilled).filter((element) => {
      const text = element.textContent.trim();
      return text === currentStep;
    });

    var classesWithTextIds = Array.from(classesWithText).map((element) => {
      return element.id;
    })
    for (let i = 0; i < winningCombinations.length; i++) {
      const combination = winningCombinations[i];
      if (arraysHaveEqualElements(classesWithTextIds, combination)) {
        setTimeout(() => { alert(`Победил игрок ${currentStep}!`) }, 1);

        document.querySelector(".winning").innerHTML = `Победил игрок ${currentStep}!`;
        document.querySelector(".winning").style.display = "block";
        setTimeout(() => totaFilled.forEach((element) => {
          element.textContent = ''
        }), 1)
      }
    }
  }

  function arraysHaveEqualElements(currentPlayGroundConditionArray, winConditionArray) {
    const currentSet = new Set(currentPlayGroundConditionArray);
    const winConditionSet = new Set(winConditionArray);

    if (currentSet.size < winConditionSet.size) {
      return false;
    }

    var counter = 0;
    for (const element of currentSet) {

      if (winConditionSet.has(element)) {
        counter++;

        if (counter >= winCount) {
          return true;
        }
      }
    }
  }

  return (

    <div class="GameField">

      <div class="table">
        <div class="current_player">Текущий ход у игрока : {state}</div>
        <div class="choosen_weight">Выбранная ширина поля: {fieldWidth}</div>
        <div class="choosen_height">Выбранная высота поля: {fieldHeight}</div>
        <div class="win_count">Количество клеток для победы: {winCount}</div>
        <table cellpadding="0" cellspacing="0">
          <tbody>          {
            DrawField(fieldWidth, fieldHeight)}
          </tbody>
        </table>
        <div class="winning"></div>
      </div>
      <div id="win_block">
        <span class="winner"></span>
        <span class="again">Играть еще!</span>
      </div>
    </div>
  );
}

export default App;
