const scriptURL = 'https://script.google.com/macros/s/AKfycbyz39UZWhOuS8GkMs6Pc7eNGu2Iy7VSy22aFfd6WrgtUrJJ3bEaRlllQsr7925QMQ5X/exec'

const form = document.forms['contact-form']



form.addEventListener('submit', e => {
    e.preventDefault();

    fetch(scriptURL, { method: 'POST', body: new FormData(form) })
        .then(response => alert("Thank you! your form is submitted successfully."))
        .then(() => { window.location.reload(); })
        .catch(error => console.error('Error!', error.message))
});
