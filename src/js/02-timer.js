  import flatpickr from "flatpickr";
  import Notiflix from 'notiflix';
  import "flatpickr/dist/flatpickr.min.css";

  const date = new Date();
  console.log("Date: ", date);

  const buttonStart = document.querySelector("[data-start]");

  const days = document.querySelector("[data-days]");
  const hours = document.querySelector("[data-hours]");
  const minutes = document.querySelector("[data-minutes]");
  const seconds = document.querySelector("[data-seconds]");

  let selectedDate;
  let leftTime;
  let timerId = 0;

  const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {

      if (selectedDates[0] < new Date()) {
        // window.alert("Please choose a date in the future");
        Notiflix.Notify.failure("Please choose a date in the future");

      } else {
        buttonStart.disabled = false;
        selectedDate = selectedDates[0];
        Notiflix.Notify.success("The selected date is later than current one");
      }
    },
  };

  buttonStart.disabled = true;
  flatpickr("#datetime-picker", options);

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
      return value.toString().padStart(2, '0');
    }

  function setTime() {
      const defaultDate = new Date();
      leftTime = convertMs(selectedDate - defaultDate);
      days.innerHTML = addLeadingZero(leftTime.days);
      hours.innerHTML = addLeadingZero(leftTime.hours);
      minutes.innerHTML = addLeadingZero(leftTime.minutes);
      seconds.innerHTML = addLeadingZero(leftTime.seconds);
    }

    buttonStart.addEventListener('click', (e) => {
// call function to count left time
      setTime();
      timerId = setInterval(() => {
        setTime();
        if (Object.values(leftTime).every()) {
          clearInterval(timerId);
        }
      }, 1000);
      buttonStart.disabled = true;
      e.currentTarget.reset();
    });
   