(function () {
  const container = document.getElementById('spa-content');
function ensurePageStylesheet(href) {
  const existing = document.getElementById('spa-page-css');
  if (existing) existing.remove();

  if (!href) return;

  const link = document.createElement('link');
  link.id = 'spa-page-css';
  link.rel = 'stylesheet';
  link.href = href;
  document.head.appendChild(link);
}

  async function loadPage(url) {
    try {
      const response = await fetch(url);
      const html = await response.text();
      container.innerHTML = html;
      window.scrollTo(0, 0);
    } catch (e) {
      console.error('Error SPA:', e);
    }
  }

 document.addEventListener('click', function(e){

  const link = e.target.closest('a');
  if (!link) return;

  const href = link.getAttribute('href');
  if (!href) return;

  // ignorar externos y especiales
  if (
    href.startsWith('http') ||
    href.startsWith('mailto:') ||
    href.startsWith('tel:') ||
    href.startsWith('#')
  ) return;

  // SOLO interceptar rutas internas válidas
  if (
    href.includes('.html') ||
    href.startsWith('/')
  ) {

    e.preventDefault();

    let route = href.replace('.html','');

    if (route === '' || route === 'index') route = '/';
    if (!route.startsWith('/')) route = '/' + route;

    navigate(route);
  }

});

    if (href === '/' || href === 'index.html') {
  ensurePageStylesheet(null);
  window.scrollTo(0, 0);
  loadPage('spa/inicio.html');
  history.pushState({}, '', '/');
  return;
}

if (href === '/contacto') {
  ensurePageStylesheet(null);
  window.scrollTo(0, 0);
  loadPage('spa/contacto.html');
  history.pushState({}, '', '/contacto');
  return;
}

if (href === '/productos') {
  ensurePageStylesheet('productos_html.css?h=263f3033');
  window.scrollTo(0, 0);
  loadPage('spa/productos.html');
  history.pushState({}, '', '/productos');
  return;
}

if (href === '/servicios') {
  ensurePageStylesheet(null);
  window.scrollTo(0, 0);
  loadPage('spa/servicios.html');
  history.pushState({}, '', '/servicios');
  return;
}

if (href === '/distribuidor') {
  ensurePageStylesheet(null);
  window.scrollTo(0, 0);
  loadPage('spa/distribuidor.html');
  history.pushState({}, '', '/distribuidor');
  return;
}

if (href === '/unete') {
  ensurePageStylesheet(null);
  window.scrollTo(0, 0);
  loadPage('spa/unete.html');
  history.pushState({}, '', '/unete');
  return;
}

  });

  window.addEventListener('popstate', function(){
    loadPage('spa/inicio.html');
  });

  // carga inicial
  loadPage('spa/inicio.html');

})();

function navigate(path){

  const routes = {
    "/": "spa/inicio.html",
    "/productos": "spa/productos.html",
    "/servicios": "spa/servicios.html",
    "/distribuidor": "spa/distribuidor.html",
    "/unete": "spa/unete.html",
    "/contacto": "spa/contacto.html"
  };

  const file = routes[path];

  if (!file) {
    console.error("Ruta no encontrada:", path);
    return;
  }

  fetch(file)
    .then(res => res.text())
    .then(html => {

      document.querySelector("#spa-content").innerHTML = html;

      window.scrollTo(0, 0);

      history.pushState({}, "", path);

    })
    .catch(err => console.error("Error cargando:", err));
}