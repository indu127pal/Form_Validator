const form = document.getElementById('form');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const password2 = document.getElementById('password2');

// showError
function showError(input, message) {
  const formControl = input.parentElement;
  formControl.classList.add('error');
  const small = formControl.querySelector('small');
  small.textContent = message;
}

// Show Sccess
function showSuccess(input) {
  const formControl = input.parentElement;
  formControl.classList.add('success');
}

// Check required fields
function checkRequired(inputArr) {
  inputArr.forEach(input => {
    if (input.value.trim() === '') {
      showError(input, `${getFieldNames(input)} is required`)
    } else {
      showSuccess(input)
    }
  });
}

//check the email
function checkEmail(input) {
  const check = input.value.trim().match(
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  );

  if (check) showSuccess(input);
  else  showError(input, `Email-Id is not valid`);
}

//Password Match
function checkPassword(input1, input2) {
  if(input1.value.trim() !== input2.value.trim()) {
    showError(input2, `Password is not matched`);
  } else {
    showSuccess(input2)
  }
}

//Get names
function getFieldNames(input) {
  return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}

// checkLength 
function checkLength(input, minL, maxL) {
  if (input.value.length < minL) {
    showError(input, `${getFieldNames(input)} must be at least ${minL} 
    characters`)
  } else if (input.value.length > maxL) {
    showError(input, `${getFieldNames(input)} must be less than
    ${maxL} characters`)
  }
}

form.addEventListener('submit', function(e) {
  e.preventDefault();

  checkRequired([username, email, password, password2])
  checkLength(username, 3, 15);
  checkLength(password, 6, 25);

  // check Email
  checkEmail(email);

  // Password check
  checkPassword(password, password2)
})