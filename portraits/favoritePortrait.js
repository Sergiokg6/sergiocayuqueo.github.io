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