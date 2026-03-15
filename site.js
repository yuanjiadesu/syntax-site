/* Syntax Fitness — Theme Toggle + Mobile Nav */
(function () {
  /* --- Theme --- */
  var themes = ['auto', 'light', 'dark', 'high-contrast'];
  var icons = {
    auto: '<svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="2" y="3" width="12" height="8" rx="1"/><path d="M5 14h6M8 11v3"/></svg>',
    light: '<svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="8" cy="8" r="3"/><path d="M8 1v2M8 13v2M1 8h2M13 8h2M3.05 3.05l1.41 1.41M11.54 11.54l1.41 1.41M3.05 12.95l1.41-1.41M11.54 4.46l1.41-1.41"/></svg>',
    dark: '<svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M13.36 10.05A5.5 5.5 0 015.95 2.64 6 6 0 1013.36 10.05z"/></svg>',
    'high-contrast': '<svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M1 8s2.5-5 7-5 7 5 7 5-2.5 5-7 5-7-5-7-5z"/><circle cx="8" cy="8" r="2"/></svg>'
  };
  var labels = { auto: 'System', light: 'Light', dark: 'Dark', 'high-contrast': 'High contrast' };

  function getStored() { return localStorage.getItem('syntax-theme') || 'auto'; }

  function apply(theme) {
    if (theme === 'auto') document.documentElement.removeAttribute('data-theme');
    else document.documentElement.setAttribute('data-theme', theme);
    var btn = document.getElementById('theme-toggle');
    if (btn) {
      btn.innerHTML = icons[theme];
      btn.title = labels[theme];
      btn.setAttribute('aria-label', labels[theme] + ' theme');
    }
  }

  // Apply on load (before DOM ready to prevent flash)
  apply(getStored());

  document.addEventListener('click', function (e) {
    var btn = e.target.closest('#theme-toggle');
    if (!btn) return;
    var current = getStored();
    var next = themes[(themes.indexOf(current) + 1) % themes.length];
    localStorage.setItem('syntax-theme', next);
    apply(next);
  });

  /* --- Mobile hamburger --- */
  document.addEventListener('click', function (e) {
    var hamburger = e.target.closest('#nav-hamburger');
    if (hamburger) {
      var menu = document.getElementById('nav-menu');
      var open = menu.classList.toggle('open');
      hamburger.setAttribute('aria-expanded', open);
      hamburger.classList.toggle('active', open);
      return;
    }
    var trigger = e.target.closest('.nav-trigger');
    if (trigger && window.innerWidth <= 700) {
      e.preventDefault();
      var group = trigger.parentElement;
      group.classList.toggle('expanded');
      trigger.setAttribute('aria-expanded', group.classList.contains('expanded'));
    }
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
      var menu = document.getElementById('nav-menu');
      if (menu && menu.classList.contains('open')) {
        menu.classList.remove('open');
        var h = document.getElementById('nav-hamburger');
        h.setAttribute('aria-expanded', 'false');
        h.classList.remove('active');
        h.focus();
      }
    }
  });
})();
