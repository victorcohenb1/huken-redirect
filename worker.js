addEventListener("fetch", event => {
  event.respondWith(handleRequest(event.request));
});

async function handleRequest(request) {
  let country = request.headers.get("cf-ipcountry"); // Cloudflare detecta la IP del usuario
  let url = new URL(request.url);

  // Evitar redirección si ya está en el país correcto
  if (!url.pathname.startsWith("/mx") && !url.pathname.startsWith("/us") && !url.pathname.startsWith("/es")) {
    if (country === "MX") {
      return Response.redirect("https://huken.com/mx", 302);
    } else if (country === "US") {
      return Response.redirect("https://huken.com/us", 302);
    } else if (country === "ES") {
      return Response.redirect("https://huken.com/es", 302);
    }
  }

  return fetch(request);
}
