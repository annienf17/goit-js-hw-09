import flatpickr from 'flatpickr';
import Notiflix from 'notiflix';
import 'flatpickr/dist/flatpickr.min.css';
import 'notiflix/dist/notiflix-3.2.6.min.css';

// form handling
const buttonStart = document.querySelector('[data-start]');
const datetimePicker = document.querySelector('#datetime-picker');
// inputs 
const inputDays = document.querySelector('[data-days]');
const inputHours = document.querySelector('[data-hours]');
const inputMinutes = document.querySelector('[data-minutes]');
const inputSeconds = document.querySelector('[data-seconds]');

let selectedDate = 0;
let leftTime = 0;
let timerId = 0;
const oneSecond = 1000;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] < new Date()) {
      // window.alert("Please choose a date in the future");
      Notiflix.Notify.failure('Please choose a date in the future');
    } else {
      buttonStart.disabled = false;
      selectedDate = selectedDates[0].getTime();
      console.log(`selectedDate = ${selectedDate}`);
      Notiflix.Notify.success('The selected date is later than current one');
    }
  },
};

buttonStart.disabled = true;

// biblioteka Flatpickr, która jest biblioteką JavaScript do wybierania dat i godzin.
flatpickr(datetimePicker, options);

// function counts remaining time
function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

// In the counter interface add 0 if the number contains less than two symbols
function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

buttonStart.addEventListener('click', () => {
  // call function to execute counting left time every second
  timerId = setInterval(() => {
        leftTime = selectedDate - Date.now();
        console.log(`leftTime = ${leftTime}`);
        
  /* funkcja `convertMs()` przekształca `leftTime` (w milisekundach) na dni, godziny, minuty i sekundy, 
  a następnie zwraca obiekt z tymi wartościami. Kod wykorzystuje destrukturyzację obiektu 
  do przypisania wartości tych właściwości do osobnych zmiennych (`days`, `hours`, `minutes` i `seconds`). 
  Na końcu wartości tych zmiennych są wypisywane w konsoli. */
        const { days, hours, minutes, seconds } = convertMs(leftTime);

  //funkcja, która przyjmuje liczbę dni jako argument, a następnie dodaje zero na początku, jeśli liczba dni jest mniejsza niż 10.      
        inputDays.innerHTML = addLeadingZero(days);
        console.log(` days innerHTML ${inputDays.innerHTML}`)
        inputHours.innerHTML = addLeadingZero(hours);
        inputMinutes.innerHTML = addLeadingZero(minutes);
        inputSeconds.innerHTML = addLeadingZero(seconds);
    if (leftTime <= oneSecond) {
    // stop execution
      clearInterval(timerId);
    }
  }, oneSecond);

  buttonStart.disabled = true;
});

