(function () {
  const container = document.getElementById('spa-content');

  if (!container) {
    console.error('SPA ERROR: no existe #spa-content');
    return;
  }

  const routes = {
    '/': 'spa/inicio.html',
    '/index': 'spa/inicio.html',
    '/productos': 'spa/productos.html',
    '/servicios': 'spa/servicios.html',
    '/distribuidor': 'spa/distribuidor.html',
    '/unete': 'spa/unete.html',
    '/contacto': 'spa/contacto.html'
  };

  function normalizePath(path) {
    if (!path) return '/';
    let p = path.trim();

    if (p.endsWith('.html')) {
      p = p.replace('.html', '');
    }

    if (p !== '/' && p.endsWith('/')) {
      p = p.slice(0, -1);
    }

    if (p === '' || p === '/index') {
      return '/';
    }

    return p;
  }

  async function loadRoute(path, pushState = true) {
    const cleanPath = normalizePath(path);
    const file = routes[cleanPath];

    if (!file) {
      console.error('Ruta no encontrada:', cleanPath);
      return;
    }

    try {
      const response = await fetch(file, { cache: 'no-store' });
      if (!response.ok) {
        throw new Error('HTTP ' + response.status);
      }

      const html = await response.text();
const temp = document.createElement('div');
temp.innerHTML = html;

const pageTitleEl = temp.querySelector('[data-spa-title]');
if (pageTitleEl) {
  document.title = pageTitleEl.textContent.trim();
}
      container.innerHTML = temp.innerHTML;
      const scripts = container.querySelectorAll('script');
scripts.forEach((oldScript) => {
  const newScript = document.createElement('script');

  Array.from(oldScript.attributes).forEach((attr) => {
    newScript.setAttribute(attr.name, attr.value);
  });

  newScript.textContent = oldScript.textContent;
  oldScript.parentNode.replaceChild(newScript, oldScript);
});

      if (pushState) {
        history.pushState({}, '', cleanPath);
      }

      window.scrollTo(0, 0);
    } catch (error) {
      console.error('Error cargando ruta SPA:', cleanPath, error);
    }
  }

  document.addEventListener('click', function (e) {
    const link = e.target.closest('a');
    if (!link) return;

    const href = link.getAttribute('href');
    if (!href) return;

    if (
      href.startsWith('http') ||
      href.startsWith('mailto:') ||
      href.startsWith('tel:') ||
      href.startsWith('#')
    ) {
      return;
    }

    let route = normalizePath(href);

    if (!routes[route]) {
      return;
    }

    e.preventDefault();
    loadRoute(route, true);
  });

  window.addEventListener('popstate', function () {
    loadRoute(window.location.pathname, false);
  });

  loadRoute(window.location.pathname, false);
})();