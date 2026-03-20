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

  /* ===== CARGAR HEADER ===== */
  const headerContainer = document.getElementById("siteHeader");

  if (headerContainer) {
    fetch("header.html")
      .then(response => response.text())
      .then(data => {
        headerContainer.innerHTML = data;

        const header = document.getElementById("rpm-header");
        const burger = header ? header.querySelector(".rpm-burger") : null;
        const nav = document.getElementById("rpmNav");
        const dropdown = header ? header.querySelector(".rpm-dropdown") : null;
        const dropLink = header ? header.querySelector(".rpm-link--drop") : null;

        stabilizeInteractiveElements(headerContainer);

        /* ===== ACTIVAR MENU MOVIL ===== */
        if (burger && nav && header) {
          burger.addEventListener("click", function (e) {
            e.preventDefault();
            const open = header.classList.toggle("rpm-open");
            burger.setAttribute("aria-expanded", open ? "true" : "false");
            burger.blur();
          });
        }

        /* ===== DROPDOWN MOVIL ===== */
        if (dropdown && dropLink) {
          dropLink.addEventListener("click", function (e) {
            if (window.matchMedia("(max-width: 980px)").matches) {
              if (!dropdown.classList.contains("rpm-dd-open")) {
                e.preventDefault();
                dropdown.classList.add("rpm-dd-open");
              } else {
                dropdown.classList.remove("rpm-dd-open");
                e.preventDefault();
              }
              dropLink.blur();
            }
          });
        }

        /* ===== CERRAR MENU MOVIL AL TOCAR ENLACES NORMALES ===== */
        if (header && nav) {
          const navLinks = nav.querySelectorAll("a:not(.rpm-link--drop)");

          navLinks.forEach(function (link) {
            link.addEventListener("click", function () {
              if (window.matchMedia("(max-width: 980px)").matches) {
                header.classList.remove("rpm-open");
                if (burger) {
                  burger.setAttribute("aria-expanded", "false");
                  burger.blur();
                }
              }
              this.blur();
            });
          });
        }
      })
      .catch(error => {
        console.error("ERROR cargando header:", error);
      });
  }

  /* ===== CARGAR FOOTER ===== */
  const footerContainer = document.getElementById("siteFooter");

  if (footerContainer) {
    fetch("footer.html")
      .then(response => response.text())
      .then(data => {
        footerContainer.innerHTML = data;
        stabilizeInteractiveElements(footerContainer);
      })
      .catch(error => {
        console.error("ERROR cargando footer:", error);
      });
  }

});