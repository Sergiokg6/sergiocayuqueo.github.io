const form = document.querySelector('form');

form.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        e.preventDefault();
        form.submit();
    }
});



//darkmode whitemode
const toggleSwitch = document.getElementById('theme-toggle');
const currentTheme = localStorage.getItem('theme');

if (currentTheme) {
    document.documentElement.setAttribute('data-theme', currentTheme);

    if (currentTheme === 'dark') {
        toggleSwitch.innerHTML = 'Light Mode';
    } else {
        toggleSwitch.innerHTML = 'Dark Mode';
    }
}

toggleSwitch.addEventListener('click', () => {
    let theme = document.documentElement.getAttribute('data-theme');
    if (theme === 'dark') {
        document.documentElement.setAttribute('data-theme', 'light');
        localStorage.setItem('theme', 'light');
        toggleSwitch.innerHTML = 'Dark Mode';
    } else {
        document.documentElement.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');
        toggleSwitch.innerHTML = 'Light Mode';
    }
});
