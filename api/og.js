export default function handler(req, res) {
  const url = req.url || "";

  let title = "RP Miracle";
  let description = "Tecnología premium para el hogar.";
  let image = "https://rpmiracle.com/og-images/default.jpg";

  if (url.includes("elite-cooking-system")) {
    title = "Elite Cooking System - RP Miracle";
    description = "Tecnología premium para cocinar con autoridad y excelencia.";
    image = "https://rpmiracle.com/og-images/og-elite-cooking-system-rp-miracle.jpg";
  }

  if (url.includes("extractor-de-jugos")) {
    title = "Extractor de Jugos - RP Miracle";
    description = "Salud, frescura y tecnología en cada gota.";
    image = "https://rpmiracle.com/og-images/og-extractor.jpg";
  }

  if (url.includes("filtracion-agua")) {
    title = "Sistemas de Filtración - RP Miracle";
    description = "Agua pura, vida saludable.";
    image = "https://rpmiracle.com/og-images/og-filtracion.jpg";
  }

  res.setHeader("Content-Type", "text/html");

  res.send(`
<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="UTF-8">

<meta property="og:title" content="${title}">
<meta property="og:description" content="${description}">
<meta property="og:image" content="${image}">
<meta property="og:url" content="https://rpmiracle.com${url}">
<meta property="og:type" content="website">

<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:image" content="${image}">

</head>
<body>

<img src="${image}" width="1200" height="630" />

<script>
setTimeout(() => {
  window.location.href = "/";
}, 500);
</script>

</body>
</html>
  `);
}