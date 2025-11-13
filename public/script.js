fetch('/imagenes')
  .then(res => res.json())
  .then(data => {
    const contenedor = document.getElementById('imagenes');
    data.forEach(img => {
      const elemento = document.createElement('img');
      elemento.src = img.url;
      elemento.alt = img.nombre;
      elemento.style.width = '300px';
      elemento.style.margin = '10px';
      contenedor.appendChild(elemento);
    });
  });
