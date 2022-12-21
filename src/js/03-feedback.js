import throttle from 'lodash.throttle';

const formRef = document.querySelector(`.feedback-form`);
const { email, message } = formRef;
const FEEDBACK_FORM_KEY = 'feedback-form-state';
const formData = {};
let savedData;

formRef.addEventListener(`input`, throttle(onGetFormValues, 1000));
formRef.addEventListener(`submit`, onFormSubmit);

onPrintValuesFromStoreToTheForm();

function onGetFormValues(e) {
  const { name, value } = e.target;

  formData[name] = value;

  localStorage.setItem(FEEDBACK_FORM_KEY, JSON.stringify(formData));
}

function onPrintValuesFromStoreToTheForm() {
  try {
    savedData = JSON.parse(localStorage.getItem(FEEDBACK_FORM_KEY));
  } catch (error) {
    error.message;
  }
  // ===============================
  // if (savedData) {
  //   email.value = savedData.email;
  //   message.value = savedData.message;
  //   console.dir(email.value);
  // }
  // =======ALTERNATIVE================
  // для будьякої кількості полей у формі
  if (savedData) {
    for (const key in savedData) {
      if (savedData.hasOwnProperty(key)) {
        formRef.elements[key].value = savedData[key];
      }
    }
  }
}
// ========================================
function onFormSubmit(e) {
  e.preventDefault();

  // console.log(`Дані введені в форму:
  // Email => ${email.value}
  // Message => ${message.value}`);

  // ===================Alternative=====================

  // for (const key in savedData) {
  //       if (savedData.hasOwnProperty(key)) {
  //         console.log(formRef.elements[key].value);;
  //       }
  // ==================Alternative=======================

  const formData = new FormData(e.currentTarget);
  formData.forEach((value, name) => {
    console.log({ name, value });
  });

  e.currentTarget.reset();
  localStorage.removeItem(FEEDBACK_FORM_KEY);
}
