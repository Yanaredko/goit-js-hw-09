import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import Notiflix from "notiflix";

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return value.toString().padStart(2, "0");
}

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
      const selectedDate = selectedDates[0];
      const startButton = document.querySelector("[data-start]");
      const dateTimePickerInput = document.querySelector("#datetime-picker");

    if (selectedDate <= new Date()) {
        Notiflix.Notify.failure("Please choose a date in the future"); 
        startButton.setAttribute("disabled", "disabled"); 
    } else {
        startButton.removeAttribute("disabled"); 
    }
  },
};

const dateTimePicker = flatpickr("#datetime-picker", options);

document.querySelector("[data-start]").addEventListener("click", () => {
  const selectedDate = dateTimePicker.selectedDates[0];
    const currentDate = new Date();
    let timeDifference = selectedDate - currentDate;
    
    const daysDisplay = document.querySelector("[data-days]");
    const hoursDisplay = document.querySelector("[data-hours]");
    const minutesDisplay = document.querySelector("[data-minutes]");
    const secondsDisplay = document.querySelector("[data-seconds]");
    
    const startButton = document.querySelector("[data-start]");
    const dateTimePickerInput = document.querySelector("#datetime-picker");

    startButton.setAttribute("disabled", "disabled");
    dateTimePickerInput.setAttribute("disabled", "disabled");

  const countdownInterval = setInterval(() => {
    if (timeDifference <= 0) {
        clearInterval(countdownInterval);
        startButton.removeAttribute("disabled");
        dateTimePickerInput.removeAttribute("disabled");
        Notiflix.Notify.success("Countdown has finished"); 
        return;
    }

    const { days, hours, minutes, seconds } = convertMs(timeDifference);

    daysDisplay.textContent = addLeadingZero(days);
    hoursDisplay.textContent = addLeadingZero(hours);
    minutesDisplay.textContent = addLeadingZero(minutes);
    secondsDisplay.textContent = addLeadingZero(seconds);

    timeDifference -= 1000;
  }, 1000);
});
