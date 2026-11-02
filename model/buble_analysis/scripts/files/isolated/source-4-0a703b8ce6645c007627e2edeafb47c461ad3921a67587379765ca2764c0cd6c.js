
(function() {
  try {
    var defaultTheme = "system";
    var storedTheme = localStorage.getItem('theme');
    var theme = storedTheme || defaultTheme;
    if (theme !== 'light' && theme !== 'dark' && theme !== 'system') {
      theme = 'system';
    }
    var resolvedTheme = theme === 'system'
      ? (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
      : theme;
    var root = document.documentElement;
    root.classList.remove('light', 'dark');
    root.classList.add(resolvedTheme);
    root.style.colorScheme = resolvedTheme;
  } catch (_) {}
})();
