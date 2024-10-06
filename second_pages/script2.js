const form = document.querySelector('form');

form.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        e.preventDefault();
        form.submit();
    }
});
