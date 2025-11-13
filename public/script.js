async function cargarImagenes() {
  try {
    const res = await fetch('/api/images');
    const data = await res.json();

    const contenedor = document.getElementById('imagenes');
    contenedor.innerHTML = '';

    data.forEach(img => {
      const div = document.createElement('div');
      div.innerHTML = `
        <h3>${img.nombre}</h3>
        <img src="${img.url}" alt="${img.nombre}" width="300">
      `;
      contenedor.appendChild(div);
    });
  } catch (error) {
    console.error('Error al cargar imágenes:', error);
  }
}

cargarImagenes();
