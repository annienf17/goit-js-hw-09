"use strict";
import Notiflix from 'notiflix';

// form handling
const form = document.querySelector('.form');
const delayInput = document.querySelector('input[name="delay"]');
const stepInput = document.querySelector('input[name="step"]');
const amountInput = document.querySelector('input[name="amount"]');

form.addEventListener('submit', submitForm);

function submitForm(event) {
  event.preventDefault();

  let delay = parseInt(delayInput.value);
  const step = parseInt(stepInput.value);
  const amount = parseInt(amountInput.value);

    for (let i = 0; i < amount; i++) {
// Promise starts from number 1 i+1
      createPromise(i+1, delay)
        .then(({ position, delay }) => {
          Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
        })
        .catch(({ position, delay }) => {
          Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
        });
// The delay for each subsequent promise is increased by the value of step.
        delay += step;
    }
// reset the form fields
  event.currentTarget.reset();
}

// The function creates a promise using the Promise constructor. Inside the promise executor function, it generates a random value between 0 and 1, greater than 0.3, shouldResolve is set to true, indicating that the promise should resolve. Otherwise, shouldResolve is set to false, indicating that the promise should reject.
function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
// setTimeout() is commonly used for scenarios where you want to delay a specific action, such as animations, updates, or asynchronous operations.
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}