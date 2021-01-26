let firstNumbersList;
let secondNumbersList;
let countedNumbers;

let timer;
let totalTime;
let reset;

const timeStart = () => {
    timer = setInterval(() => {
      totalTime++;
  
      // 907 -> 907 % 100 = 07 -> milliSeconds
      // 907 - 7 = 900 -> 900/100 -> 09 seconds
      // 
      let milliSeconds = totalTime % 100;
      let seconds = ((totalTime - milliSeconds) / 100) % 60;
      let minutes = ((((totalTime - milliSeconds) / 100) - seconds) / 60);
      if (milliSeconds < 10) {
        milliSeconds = `0${milliSeconds}`;
      }
  
      if (seconds < 10) {
        seconds = `0${seconds}`;
      }

      if (minutes < 10) {
          minutes = `0${minutes}`;
      }
  
      document.getElementById('timer').innerHTML = `${minutes} : ${seconds} : ${milliSeconds}`;
    }, 10);
}
  
const timeStop = () => clearInterval(timer);
  
// Auto reset
const autoReset = () => {
    if (countedNumbers.length === 0) {
      reset = setInterval(firstDisplay, 20000);
    };
}

const firstDisplay = () => {
  clearInterval(reset);
  timeStop();
  totalTime = 0;

  firstNumbersList = [];
  secondNumbersList = [];
  countedNumbers = [];

  document.getElementById('timer').innerHTML = '00 : 00 : 00';

  for (let i = 1; i < 50; i++) {
    const getNumber = () => {
      const number = Math.floor(Math.random() * 49) + 1;

      const exist = firstNumbersList.find(item => item === number);

      if (exist) return getNumber();

      firstNumbersList.push(number);
    }
    getNumber();
  }

  firstNumbersList.map((num, i) => {
    const html = document.getElementById(`${i + 1}`);
    html.innerHTML = num;

    // Attach onClick function
    html.addEventListener('click', playGame(html));
  });

  autoReset();
}

window.onload = firstDisplay;

const playGame = element => () => {
    clearInterval(reset);
    const value = element.innerHTML;
  
    if (+value !== countedNumbers.length + 1) return;
  
    countedNumbers.push(+value);

    if (countedNumbers.length === 1) {
        // Timer start
        timeStart();
      }
  
    if (+value < 52) {
      const getNumber = () => {
        const number = Math.floor(Math.random() * 51) + 50;
  
        const exist = secondNumbersList.find(item => item === number);
  
        if (exist) return getNumber();
  
        secondNumbersList.push(number);
        element.innerHTML = number;
      }
      getNumber();
    } else {
      element.innerHTML = '';
    }

    if (countedNumbers.length === 100) {
        // Timer stop
        timeStop();
    };
  }

  // Restart
document.getElementById('restart').addEventListener('click', firstDisplay);