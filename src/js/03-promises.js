import Notiflix from 'notiflix';

document.addEventListener('DOMContentLoaded', function () {
  const form = document.querySelector('.form');

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    const delayInput = form.querySelector('input[name="delay"]');
    const stepInput = form.querySelector('input[name="step"]');
    const amountInput = form.querySelector('input[name="amount"]');

    const initialDelay = parseInt(delayInput.value);
    const step = parseInt(stepInput.value);
    const amount = parseInt(amountInput.value);

    if (isNaN(initialDelay) || isNaN(step) || isNaN(amount)) {
      Notiflix.Notify.failure('Please fill in all fields with valid numbers.');
      return;
    }

    for (let i = 1; i <= amount; i+=1) {
      createPromise(i, initialDelay + (i - 1) * step)
        .then(({ position, delay }) => {
          Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
        })
        .catch(({ position, delay }) => {
          Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
        });
    }
  });

  function createPromise(position, delay) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const shouldResolve = Math.random() > 0.3;
        if (shouldResolve) {
          resolve({ position, delay });
        } else {
          reject({ position, delay });
        }
      }, delay);
    });
  }
});
