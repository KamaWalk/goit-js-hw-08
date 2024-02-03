import throttle from 'lodash.throttle';

const form = document.querySelector('.feedback-form');
const localStorageKey = 'feedback-form-state';

const formDiv = document.createElement("div");
formDiv.className = 'form-message';
form.append(formDiv);

const formMessage = form.querySelector('.form-message');
formMessage.style.color = "red";
let formErrors = [];

const formState = JSON.parse(localStorage.getItem(localStorageKey)) || {
  email: '',
  message: ''};
form.elements.email.value = formState.email;
form.elements.message.value = formState.message;

form.addEventListener('input', throttle(({target}) => {
  const element = target.name;
  formState[element] = target.value;
  localStorage.setItem(localStorageKey, JSON.stringify(formState));
}, 500));

form.addEventListener('submit', event => {
  event.preventDefault();
  formErrors.length = 0;
  if (formState.email.trim().length == 0) {
    formErrors.push("Uzupełnij pole 'Email'!");
  }
  if (formState.message.trim().length == 0) {
    formErrors.push("Uzupełnij pole 'Message'!");
  }
  if (!formErrors.length) {
    console.log(formState);
    localStorage.removeItem(localStorageKey);
    formState.email = '';
    formState.message = '';
    form.reset();
    formMessage.innerHTML = ``;
  } else {
    formMessage.innerHTML = `
    <h4>Przed wysłaniem proszę poprawić błędy:</h4>
            <ul>
                ${formErrors.map(el => `<li>${el}</li>`).join('')}
            </ul>
    `;
  }
});
