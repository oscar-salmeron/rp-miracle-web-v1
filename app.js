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
    '/contacto': 'spa/contacto.html',
    '/elite-cooking-system': 'spa/elite-cooking-system.html',
    '/elite-5piezas': 'spa/elite-5piezas.html',
    '/elite-sarten-8': 'spa/elite-sarten-8.html',
    '/elite-base-magnetica': 'spa/elite-base-magnetica.html',
    '/elite-protectores': 'spa/elite-protectores.html',
    '/elite-aros-silicromaticos': 'spa/elite-aros-silicromaticos.html',
    '/elite-valvula-reditemp': 'spa/elite-valvula-reditemp.html'
  };

  let isNavigating = false;

  function getCurrentPath() {
    return window.location.pathname;
  }

  function normalizePath(path) {
    if (!path) return '/';

    let p = path.trim();

    if (!p.startsWith('/')) {
      p = '/' + p;
    }

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

    if (!file) return;
    if (isNavigating) return;

    isNavigating = true;

    try {
      const response = await fetch(file, { cache: 'no-store' });
      if (!response.ok) throw new Error('HTTP ' + response.status);

      const html = await response.text();
      container.innerHTML = html;

      if (pushState) {
        history.pushState({}, '', cleanPath);
      }

      window.scrollTo(0, 0);
    } catch (error) {
      console.error('Error cargando ruta SPA:', cleanPath, error);
    }

    setTimeout(() => {
      isNavigating = false;
    }, 80);
  }

  document.addEventListener('click', function (e) {
    const link = e.target.closest('a');
    if (!link) return;

    const href = link.getAttribute('href');
    if (!href) return;

    if (
      href.startsWith('http') ||
      href.startsWith('mailto:') ||
      href.startsWith('tel:')
    ) {
      return;
    }

    const url = new URL(link.href);

    if (url.origin !== location.origin) return;

    const route = normalizePath(url.pathname);

    if (!routes[route]) return;

    e.preventDefault();
    loadRoute(route, true);
  });

  window.addEventListener('popstate', function () {
    loadRoute(getCurrentPath(), false);
  });

  loadRoute(getCurrentPath(), false);
})();