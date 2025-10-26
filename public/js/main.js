// Theme toggling functionality
document.addEventListener('DOMContentLoaded', () => {
    const themeToggleBtn = document.getElementById('themeToggle');
    
    // Check for saved user preference, if any, load the value from localStorage
    const currentTheme = localStorage.getItem('theme');
    
    // If the user previously chose a theme, apply it to the document
    if (currentTheme) {
        document.documentElement.setAttribute('data-theme', currentTheme);
    } else {
        // If no theme was previously set, default to dark theme
        document.documentElement.setAttribute('data-theme', 'dark');
    }
    
    // When someone clicks the button
    themeToggleBtn.addEventListener('click', () => {
        // Toggle between dark and light
        let theme = document.documentElement.getAttribute('data-theme');
        let switchToTheme = theme === 'dark' ? 'light' : 'dark';
        
        // Save the choice in localStorage
        localStorage.setItem('theme', switchToTheme);
        
        // Apply the theme to the document
        document.documentElement.setAttribute('data-theme', switchToTheme);
    });
});