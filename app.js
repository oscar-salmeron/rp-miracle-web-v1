(function () {
  const container = document.getElementById('spa-content');

  if (!container) {
    console.error('SPA ERROR: no existe #spa-content');
    return;
  }

  // MAPA MAESTRO: Apuntando cada archivo a su carpeta real según tus capturas
  const routes = {
    // === ESTOS ARCHIVOS ESTÁN DENTRO DE LA CARPETA "spa" ===
    '/': 'spa/inicio.html',
    '/index': 'spa/inicio.html',
    '/inicio': 'spa/inicio.html',
    '/productos': 'spa/productos.html',
    '/servicios': 'spa/servicios.html',
    '/distribuidor': 'spa/distribuidor.html',
    '/unete': 'spa/unete.html',
    '/contacto': 'spa/contacto.html',
    '/aviso-legal': 'spa/aviso-legal.html',
    '/accesorios': 'spa/accesorios.html',
    '/elite-cooking-system': 'spa/elite-cooking-system.html',
    '/elite-5piezas': 'spa/elite-5piezas.html',
    '/elite-sarten-8': 'spa/elite-sarten-8.html',
    '/elite-base-magnetica': 'spa/elite-base-magnetica.html',
    '/elite-protectores': 'spa/elite-protectores.html',
    '/elite-aros-silicromaticos': 'spa/elite-aros-silicromaticos.html',
    '/elite-valvula-reditemp': 'spa/elite-valvula-reditemp.html',

    // === ESTOS ARCHIVOS ESTÁN EN LA RAÍZ (FUERA DE SPA) ===
    '/linea-novel': 'linea-novel.html',
    '/linea-innove': 'linea-innove.html',
    '/linea-5capas': 'linea-5capas.html',
    '/linea_easy_release': 'linea_easy_release.html',
    '/electrodomesticos': 'electrodomesticos.html',
    '/cuchillos-serie-precision-3': 'cuchillos-serie-precision-3.html',
    '/sistemas-filtracion': 'sistemas-filtracion.html',

    '/producto-novel-5': 'producto-novel-5.html',
    '/producto-novel-7': 'producto-novel-7.html',
    '/producto-novel-8': 'producto-novel-8.html',
    '/producto-novel-10': 'producto-novel-10.html',
    '/producto-novel-15': 'producto-novel-15.html',
    '/producto-novel-ollas-grandes': 'producto-novel-ollas-grandes.html',
    '/producto-novel-gourmet': 'producto-novel-gourmet.html',
    '/piezas-individuales-novel': 'piezas-individuales-novel.html',

    '/innove-juego-5': 'innove-juego-5.html',
    '/innove-juego-7': 'innove-juego-7.html',
    '/innove-juego-8': 'innove-juego-8.html',
    '/innove-juego-10': 'innove-juego-10.html',
    '/innove-ollas-grandes': 'innove-ollas-grandes.html',
    '/innove-gourmet': 'innove-gourmet.html',
    '/innove-piezas': 'innove-piezas.html',

    '/5capas-5-esencial': '5capas-5-esencial.html',
    '/5capas-5-complementario': '5capas-5-complementario.html',
    '/5capas-7': '5capas-7.html',
    '/5capas-8': '5capas-8.html',
    '/5capas-10': '5capas-10.html',
    '/5capas-ollas-grandes': '5capas-ollas-grandes.html',
    '/5capas-gourmet': '5capas-gourmet.html',
    '/5capas-piezas-individuales': '5capas-piezas-individuales.html',

    '/easy_release_sartenes_6p': 'easy_release_sartenes_6p.html',
    '/easy_release_ollas_6p': 'easy_release_ollas_6p.html',

    '/power-blender-max': 'power-blender-max.html',
    '/power-blender-go': 'power-blender-go.html',
    '/extractor-de-jugo': 'extractor-de-jugo.html',
    '/cocina-de-induccion': 'cocina-de-induccion.html',

    '/cuchillos-serie-precision-3-juegos': 'cuchillos-serie-precision-3-juegos.html',
    '/cuchillos-serie-precision-3-piezas-accesorios': 'cuchillos-serie-precision-3-piezas-accesorios.html',

    '/frescapure-5500': 'frescapure-5500.html',
    '/frescapure-3500': 'frescapure-3500.html',
    '/frescaflow': 'frescaflow.html',
    '/frescapure-shower': 'frescapure-shower.html',
    '/filtracion-aire': 'filtracion-aire.html',

    '/juegos_servir': 'juegos_servir.html',
    '/cafe_te_chocolate': 'cafe_te_chocolate.html',
    '/miscelaneo': 'miscelaneo.html',
    '/almacenamiento': 'almacenamiento.html'
  };

  const realPages = {};
  let isNavigating = false;

  function normalizePath(p) {
    let path = p.replace('.html', '');
    if (!path.startsWith('/')) {
      path = '/' + path;
    }
    return path;
  }

  function getCurrentPath() {
    const hash = window.location.hash;
    if (hash && hash.startsWith('#')) {
      return '/' + hash.substring(1);
    }
    const pathname = window.location.pathname;
    if (pathname === '/' || pathname === '/index.html') return '/';
    return normalizePath(pathname);
  }

  async function loadRoute(path, pushState = true) {
    const cleanPath = normalizePath(path);
    const file = routes[cleanPath];

    if (!file) {
      container.innerHTML = '<div style="padding:100px 20px; text-align:center; color:#fff;"><h2>Página no encontrada</h2><p>La ruta no está registrada.</p><a href="/" style="color:#d4af37;">Volver al inicio</a></div>';
      return;
    }

    if (isNavigating) return;
    isNavigating = true;

    try {
      const response = await fetch(file, { cache: 'no-store' });
      if (!response.ok) throw new Error('HTTP ' + response.status);

      const html = await response.text();

      // Previene errores en bucle
      if (html.includes('id="spa-content"')) {
         throw new Error('Bucle detectado: el servidor devolvió el index.');
      }

      // Cirugía exacta: Borra los contenedores estorbo de RocketCake
      const temp = document.createElement('div');
      temp.innerHTML = html;

      const headerDiv = temp.querySelector('#siteHeader');
      if (headerDiv) {
        const wrapper = headerDiv.closest('div[id^="html_"]');
        if (wrapper) wrapper.remove();
        else headerDiv.remove();
      }

      const footerDiv = temp.querySelector('#siteFooter');
      if (footerDiv) {
        const wrapper = footerDiv.closest('div[id^="html_"]');
        if (wrapper) wrapper.remove();
        else footerDiv.remove();
      }

      container.innerHTML = temp.innerHTML;

      if (pushState) {
        history.pushState({}, '', '/#' + cleanPath.replace(/^\//, ''));
      }

      window.scrollTo(0, 0);
    } catch (error) {
      console.error('Error cargando ruta SPA:', cleanPath, error);
      container.innerHTML = '<div style="padding:100px 20px; text-align:center; color:#fff;"><h2>Página no encontrada</h2><p>Intenta recargar el sitio web.</p><a href="/" style="color:#d4af37;">Volver al inicio</a></div>';
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

    // Ignorar links externos, correos, teléfonos o anclas internas
    if (
      href.startsWith('http') ||
      href.startsWith('mailto:') ||
      href.startsWith('tel:') ||
      href.startsWith('#')
    ) {
      return;
    }

    const route = normalizePath(href);

    if (realPages[route]) {
      e.preventDefault();
      window.location.href = realPages[route];
      return;
    }

    if (routes[route]) {
      e.preventDefault();
      loadRoute(route);
    }
  });

  window.addEventListener('popstate', () => {
    loadRoute(getCurrentPath(), false);
  });

  loadRoute(getCurrentPath(), false);
})();