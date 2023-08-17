import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

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

        if (selectedDate <= new Date()) {
            window.alert("Please choose a date in the future");
        } else {
            document.querySelector("[data-start]").removeAttribute("disabled");
        }
    },
};

const dateTimePicker = flatpickr("#datetime-picker", options);

const daysDisplay = document.querySelector("[data-days]");
const hoursDisplay = document.querySelector("[data-hours]");
const minutesDisplay = document.querySelector("[data-minutes]");
const secondsDisplay = document.querySelector("[data-seconds]");

document.querySelector("[data-start]").addEventListener("click", () => {
    const selectedDate = dateTimePicker.selectedDates[0];
    const currentDate = new Date();
    const timeDifference = selectedDate - currentDate;

    const countdownInterval = setInterval(() => {
        if (timeDifference <= 0) {
            clearInterval(countdownInterval);
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