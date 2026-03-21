(function () {

  console.log('APP JS FINAL FUNCIONANDO');

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

  const titles = {
    '/': 'Inicio | RP Miracle',
    '/productos': 'Productos | RP Miracle',
    '/servicios': 'Servicios | RP Miracle',
    '/distribuidor': 'Distribuidor | RP Miracle',
    '/unete': 'Únete | RP Miracle',
    '/contacto': 'Contacto | RP Miracle'
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

      console.log('Cargando:', file);

      const response = await fetch(file + '?v=' + Date.now());

      if (!response.ok) {
        throw new Error('HTTP ' + response.status);
      }

      const html = await response.text();

      // 👉 LIMPIAR CONTENIDO ANTES (CLAVE)
      container.innerHTML = '';

      // 👉 INSERTAR
      container.innerHTML = html;

      // 👉 CAMBIAR TÍTULO
      document.title = titles[cleanPath] || 'RP Miracle';

      // 👉 REACTIVAR SCRIPTS
      const scripts = container.querySelectorAll('script');
      scripts.forEach(oldScript => {
        const newScript = document.createElement('script');

        Array.from(oldScript.attributes).forEach(attr => {
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
      console.error('ERROR SPA:', error);
    }
  }

  // 👉 CLICK NAV
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

    const route = normalizePath(href);

    if (!routes[route]) return;

    e.preventDefault();
    loadRoute(route, true);
  });

  // 👉 BACK / FORWARD
  window.addEventListener('popstate', function () {
    loadRoute(window.location.pathname, false);
  });

  // 👉 ⚠️ CLAVE ABSOLUTA
  // SIEMPRE cargar inicio si entra vacío
  if (!window.location.pathname || window.location.pathname === '/') {
    loadRoute('/', false);
  } else {
    loadRoute(window.location.pathname, false);
  }

})();