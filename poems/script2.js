const form = document.querySelector('form');

form.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        e.preventDefault();
        form.submit();
    }
});



//darkmode whitemode
const currentTheme = localStorage.getItem('theme');

if (currentTheme) {
    document.documentElement.setAttribute('data-theme', currentTheme);

    if (currentTheme === 'dark') {
        toggleSwitch.innerHTML = 'Light Mode';
    } else {
        toggleSwitch.innerHTML = 'Dark Mode';
    }
}