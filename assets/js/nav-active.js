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

/* Mobile Menu Handler */
(function(){
  // Mobile menu functionality
  const hamburgerMenu = document.querySelector('.hamburger-menu');
  if (hamburgerMenu) {
    hamburgerMenu.addEventListener('click', function(e) {
      if (!e.target.closest('.mobile-overlay') || e.target.classList.contains('mobile-link')) {
        this.classList.toggle('active');
      }
    });
  }
})();
// Guarded Lightbox helper: only initialize if a modal exists on the page
(function(){
  try{
    var modal = document.getElementById('lightboxModal') || document.getElementById('lightbox') || document.querySelector('.lightbox-modal') || document.querySelector('.lightbox');
    if(!modal) return; // nothing to do on pages without a lightbox

    // Ensure we have the footnote element when present
    var footnote = modal.querySelector('#lightboxFootnote');

    // Wrap any existing closeLightbox to clear footnote content
    var origClose = window.closeLightbox;
    if(typeof origClose === 'function'){
      window.closeLightbox = function(){
        try{ origClose.apply(this, arguments); }catch(e){ try{ origClose(arguments[0]); }catch(e){} }
        try{ if(footnote) footnote.innerHTML = ''; }catch(_){}
      };
    }

    // If there's any global lightbox-open function expected, provide a safe noop
    if(typeof window.openLightbox !== 'function'){
      window.openLightbox = function(src, clicked){
        try{
          var img = modal.querySelector('#lightboxImage');
          if(img) img.src = src || '';
          if(footnote && clicked && clicked.dataset && clicked.dataset.footnote){
            footnote.innerHTML = '<span class="footnote-desc">'+clicked.dataset.footnote+'</span>';
          }
          modal.classList.add('active');
          modal.style.display = 'flex';
          document.body.style.overflow = 'hidden';
        }catch(e){}
      };
    }
  }catch(e){/* silent */}
})();
