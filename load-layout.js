document.addEventListener("DOMContentLoaded", function () {

  /* ===== CARGAR HEADER ===== */
  const headerContainer = document.getElementById("siteHeader");

  if (headerContainer) {
    fetch("header.html")
  .then(response => response.text())
  .then(data => {
    headerContainer.innerHTML = data;

    /* ===== ACTIVAR MENU MOVIL ===== */
    const header = document.getElementById("rpm-header");
    const burger = header ? header.querySelector(".rpm-burger") : null;
    const nav = document.getElementById("rpmNav");
    const dropdown = header ? header.querySelector(".rpm-dropdown") : null;
    const dropLink = header ? header.querySelector(".rpm-link--drop") : null;

    if (burger && nav) {
      burger.addEventListener("click", function(){
        const open = header.classList.toggle("rpm-open");
        burger.setAttribute("aria-expanded", open ? "true" : "false");
      });
    }

    if (dropdown && dropLink) {
      dropLink.addEventListener("click", function(e){
        if (window.matchMedia("(max-width: 980px)").matches) {
          if (!dropdown.classList.contains("rpm-dd-open")) {
            e.preventDefault();
            dropdown.classList.add("rpm-dd-open");
          }
        }
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
      })
      .catch(error => {
        console.error("ERROR cargando footer:", error);
      });
  }

});