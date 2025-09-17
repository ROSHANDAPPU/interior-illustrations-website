(function () {
  try {
    var path = window.location.pathname || '';
    // Normalize: remove trailing slash
    if (path.length > 1 && path.endsWith('/')) path = path.slice(0, -1);

    // Helper: resolve an element's absolute pathname from its href
    function resolvedPath(href) {
      var a = document.createElement('a');
      a.href = href;
      return a.pathname.replace(/\/index\.html$/, '/').replace(/\/+/g, '/');
    }

    // Mark matching desktop links active
    var navLinks = document.querySelectorAll('.nav .links a');
    navLinks.forEach(function (link) {
      var linkPath = resolvedPath(link.getAttribute('href'));
      if (!linkPath) return;
      // For top-level anchors with hashes (index), skip
      if (linkPath === '#') return;
      // If pathname ends with linkPath or matches exactly
      if (path.endsWith(linkPath) || path === linkPath) {
        link.classList.add('active');
      }
    });

    // Dropdown logic
    var dropdownToggle = document.querySelector('.dropdown .dropdown-toggle');
    var dropdownLinks = document.querySelectorAll('.dropdown-menu a');
    var isPortfolio = /\/portfolio\//.test(path);

    var residentialLink = Array.from(dropdownLinks).find(function (l) {
      return /residential-projects\.html$/.test(resolvedPath(l.getAttribute('href')));
    });
    var commercialLink = Array.from(dropdownLinks).find(function (l) {
      return /commercial-projects\.html$/.test(resolvedPath(l.getAttribute('href')));
    });

    if (/residential-projects\.html$/.test(path) && residentialLink) {
      residentialLink.classList.add('active');
      if (dropdownToggle) dropdownToggle.classList.add('active');
    } else if (/commercial-projects\.html$/.test(path) && commercialLink) {
      commercialLink.classList.add('active');
      if (dropdownToggle) dropdownToggle.classList.add('active');
    } else if (isPortfolio && dropdownToggle) {
      // For individual project detail pages under portfolio, highlight the Our Projects button
      dropdownToggle.classList.add('active');
    }
  } catch (e) {
    // Fail silently to avoid breaking pages
  }
})();
