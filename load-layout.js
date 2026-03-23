/* ===== CARGA ESTABLE DEL LAYOUT GLOBAL SIN BRINCO ===== */
(function () {
  const criticalLayoutStyle = document.createElement("style");
  criticalLayoutStyle.id = "rpm-critical-layout";
  criticalLayoutStyle.textContent = `
    html{
      background:#0b1020;
    }

    body{
      width:100%;
      overflow-x:hidden;
      margin:0;
      padding:128px 0 0 0;
      background:#0b1020;
      font-family:Arial, Helvetica, sans-serif;
      visibility:hidden;
    }

    #siteHeader{
      min-height:0;
      height:0;
    }

    #siteFooter{
      min-height:1px;
    }

    @media (max-width:980px){
      body{
        padding-top:124px;
      }
    }
  `;
  document.head.appendChild(criticalLayoutStyle);
})();

document.addEventListener("DOMContentLoaded", function () {

  function stabilizeInteractiveElements(scope) {
    if (!scope) return;

    const interactive = scope.querySelectorAll(
      'a, button, [role="button"], .rpm-link, .rpm-btn, .rpm-burger, .rpm-dropdown-menu a'
    );

    interactive.forEach(function (el) {
      el.setAttribute("draggable", "false");

      el.addEventListener("mousedown", function () {
        this.blur();
      });

      el.addEventListener("mouseup", function () {
        this.blur();
      });

      el.addEventListener("touchstart", function () {
        this.blur();
      }, { passive: true });

      el.addEventListener("touchend", function () {
        this.blur();
      }, { passive: true });

      el.addEventListener("focus", function () {
        this.blur();
      });
    });
  }

  const headerContainer = document.getElementById("siteHeader");
  const footerContainer = document.getElementById("siteFooter");

  const loadHeader = headerContainer
    ? fetch("header.html")
        .then(response => response.text())
        .then(data => {
         // 🔥 PARSEO LIMPIO DEL HEADER
const temp = document.createElement("div");
temp.innerHTML = data;

// 🔥 EXTRAER Y MOVER <style> ANTES DE INSERTAR
temp.querySelectorAll("style").forEach(style => {
  document.head.appendChild(style.cloneNode(true));
});

// 🔥 INSERTAR HTML LIMPIO (SIN estilos internos duplicados)
headerContainer.innerHTML = temp.innerHTML;

// 🔥 REEJECUTAR SCRIPTS
temp.querySelectorAll("script").forEach(script => {
  const newScript = document.createElement("script");

  if (script.src) {
    newScript.src = script.src;
  } else {
    newScript.textContent = script.textContent;
  }

  document.body.appendChild(newScript);
});

          // 🔥 SOLO estabilización (NO lógica duplicada)
          stabilizeInteractiveElements(headerContainer);
        })
        .catch(error => {
          console.error("ERROR cargando header:", error);
        })
    : Promise.resolve();

  const loadFooter = footerContainer
    ? fetch("footer.html")
        .then(response => response.text())
        .then(data => {
          footerContainer.innerHTML = data;
          stabilizeInteractiveElements(footerContainer);
        })
        .catch(error => {
          console.error("ERROR cargando footer:", error);
        })
    : Promise.resolve();

  Promise.all([loadHeader, loadFooter]).finally(function () {
    document.body.style.visibility = "visible";
  });

});