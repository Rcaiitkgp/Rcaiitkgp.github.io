const scriptURL = 'https://script.google.com/macros/s/AKfycbzWR0IwkDwx7pCjJKqpZGwxXvOXghZ42e7VXKTKgvHnACRHhBcSFchgBhbej0Ob1Uc/exec'

const form = document.forms['contact-form']



form.addEventListener('submit', e => {
    e.preventDefault();

    fetch(scriptURL, { method: 'POST', body: new FormData(form) })
        .then(response => alert("Thank you! your form is submitted successfully."))
        .then(() => { window.location.reload(); })
        .catch(error => console.error('Error!', error.message))
});
