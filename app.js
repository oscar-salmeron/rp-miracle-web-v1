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
    '/elite-5piezas': 'spa/elite-5piezas.html',
    '/elite-sarten-8': 'spa/elite-sarten-8.html',
    '/elite-base-magnetica': 'spa/elite-base-magnetica.html',
    '/elite-protectores': 'spa/elite-protectores.html',
    '/elite-aros-silicromaticos': 'spa/elite-aros-silicromaticos.html',
    '/elite-valvula-reditemp': 'spa/elite-valvula-reditemp.html'
  };

  const realPages = {
    '/elite-cooking-system': '/elite-cooking-system.html'
  };

  let isNavigating = false;

  function getCurrentPath() {
    const hash = window.location.hash;

    if (hash && hash.startsWith('#')) {
      const p = hash.slice(1).trim();
      return p.startsWith('/') ? p : '/' + p;
    }

    return window.location.pathname;
  }

  function normalizePath(path) {
    if (!path) return '/';

    let p = path.trim();

    if (p.includes('#')) {
      const hashPart = p.split('#')[1].trim();
      if (!hashPart) return '/';
      p = hashPart;
    }

    if (p.startsWith('#')) {
      p = p.slice(1);
    }

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
        history.pushState({}, '', '/#' + cleanPath.replace(/^\//, ''));
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

    const route = normalizePath(href);

    if (realPages[route]) {
      e.preventDefault();
      window.location.href = realPages[route];
      return;
    }

    if (!routes[route]) return;

    e.preventDefault();
    loadRoute(route, true);
  });

  window.addEventListener('popstate', function () {
    loadRoute(getCurrentPath(), false);
  });

  window.addEventListener('hashchange', function () {
    loadRoute(getCurrentPath(), false);
  });

  loadRoute(getCurrentPath(), false);
})();