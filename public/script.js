fetch('/images')
  .then(res => res.json())
  .then(data => {
    const gallery = document.getElementById('gallery');
    data.forEach(item => {
      const img = document.createElement('img');
      img.src = item.url;  // tu campo de Cloudinary
      img.width = 300;
      gallery.appendChild(img);
    });
  })
  .catch(console.error);
