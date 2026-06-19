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
    '/aviso-legal': 'spa/aviso-legal.html',

    /* LÍNEAS */
    '/linea-novel': 'spa/linea-novel.html',
    '/linea-innove': 'spa/linea-innove.html',
    '/linea-5capas': 'spa/linea-5capas.html',
    '/linea_easy_release': 'spa/linea_easy_release.html',
    '/elite-cooking-system': 'spa/elite-cooking-system.html',
    '/electrodomesticos': 'spa/electrodomesticos.html',
    '/cuchillos-serie-precision-3': 'spa/cuchillos-serie-precision-3.html',
    '/sistemas-filtracion': 'spa/sistemas-filtracion.html',
    '/accesorios': 'spa/accesorios.html',

    /* PRODUCTOS ESPECÍFICOS */
    '/producto-novel-5': 'spa/producto-novel-5.html',
    '/producto-novel-7': 'spa/producto-novel-7.html',
    '/producto-novel-8': 'spa/producto-novel-8.html',
    '/producto-novel-10': 'spa/producto-novel-10.html',
    '/producto-novel-15': 'spa/producto-novel-15.html',
    '/producto-novel-ollas-grandes': 'spa/producto-novel-ollas-grandes.html',
    '/producto-novel-gourmet': 'spa/producto-novel-gourmet.html',
    '/piezas-individuales-novel': 'spa/piezas-individuales-novel.html',

    '/innove-juego-5': 'spa/innove-juego-5.html',
    '/innove-juego-7': 'spa/innove-juego-7.html',
    '/innove-juego-8': 'spa/innove-juego-8.html',
    '/innove-juego-10': 'spa/innove-juego-10.html',
    '/innove-ollas-grandes': 'spa/innove-ollas-grandes.html',
    '/innove-gourmet': 'spa/innove-gourmet.html',
    '/innove-piezas': 'spa/innove-piezas.html',

    '/5capas-5-esencial': 'spa/5capas-5-esencial.html',
    '/5capas-5-complementario': 'spa/5capas-5-complementario.html',
    '/5capas-7': 'spa/5capas-7.html',
    '/5capas-8': 'spa/5capas-8.html',
    '/5capas-10': 'spa/5capas-10.html',
    '/5capas-ollas-grandes': 'spa/5capas-ollas-grandes.html',
    '/5capas-gourmet': 'spa/5capas-gourmet.html',
    '/5capas-piezas-individuales': 'spa/5capas-piezas-individuales.html',

    '/easy_release_sartenes_6p': 'spa/easy_release_sartenes_6p.html',
    '/easy_release_ollas_6p': 'spa/easy_release_ollas_6p.html',

    '/elite-5piezas': 'spa/elite-5piezas.html',
    '/elite-sarten-8': 'spa/elite-sarten-8.html',
    '/elite-base-magnetica': 'spa/elite-base-magnetica.html',
    '/elite-protectores': 'spa/elite-protectores.html',
    '/elite-aros-silicromaticos': 'spa/elite-aros-silicromaticos.html',
    '/elite-valvula-reditemp': 'spa/elite-valvula-reditemp.html',

    '/power-blender-max': 'spa/power-blender-max.html',
    '/power-blender-go': 'spa/power-blender-go.html',
    '/extractor-de-jugo': 'spa/extractor-de-jugo.html',
    '/cocina-de-induccion': 'spa/cocina-de-induccion.html',

    '/cuchillos-serie-precision-3-juegos': 'spa/cuchillos-serie-precision-3-juegos.html',
    '/cuchillos-serie-precision-3-piezas-accesorios': 'spa/cuchillos-serie-precision-3-piezas-accesorios.html',

    '/frescapure-5500': 'spa/frescapure-5500.html',
    '/frescapure-3500': 'spa/frescapure-3500.html',
    '/frescaflow': 'spa/frescaflow.html',
    '/frescapure-shower': 'spa/frescapure-shower.html',
    '/filtracion-aire': 'spa/filtracion-aire.html',

    '/juegos_servir': 'spa/juegos_servir.html',
    '/cafe_te_chocolate': 'spa/cafe_te_chocolate.html',
    '/miscelaneo': 'spa/miscelaneo.html',
    '/almacenamiento': 'spa/almacenamiento.html'
  };

 const realPages = {};

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