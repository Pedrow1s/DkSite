document.addEventListener('DOMContentLoaded', () => {
  // Elementos do DOM
  const filterButtons = document.querySelectorAll('.filter-btn');
  const galleryItems = document.querySelectorAll('.gallery-item');
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxCaption = document.getElementById('lightbox-caption');
  const lightboxClose = document.getElementById('lightbox-close');
  const lightboxPrev = document.getElementById('lightbox-prev');
  const lightboxNext = document.getElementById('lightbox-next');

  // --- FILTRO DE IMAGENS ---
  if (filterButtons.length > 0 && galleryItems.length > 0) {
    filterButtons.forEach(button => {
      button.addEventListener('click', () => {
        // Remover classe ativa de todos
        filterButtons.forEach(btn => btn.classList.remove('active'));
        // Adicionar classe ativa no botão clicado
        button.classList.add('active');

        const filterValue = button.getAttribute('data-filter');

        galleryItems.forEach(item => {
          const category = item.getAttribute('data-category');
          
          if (filterValue === 'all' || category === filterValue) {
            item.style.display = 'block';
            // Animação de entrada suave
            setTimeout(() => {
              item.style.opacity = '1';
              item.style.transform = 'scale(1)';
            }, 50);
          } else {
            item.style.opacity = '0';
            item.style.transform = 'scale(0.8)';
            setTimeout(() => {
              item.style.display = 'none';
            }, 300); // Tempo igual ao CSS transform
          }
        });
      });
    });
  }

  // --- LIGHTBOX CAROUSEL E MODAL DO ÁLBUM ---
  const albumModal = document.getElementById('album-modal');
  const albumModalClose = document.getElementById('album-modal-close');

  let activeImagesList = [];
  let currentActiveIndex = -1;

  // Função para abrir o Lightbox com uma lista específica de fotos e um índice
  const openLightbox = (imagesList, index) => {
    activeImagesList = imagesList;
    currentActiveIndex = index;
    updateLightboxContent();
    if (lightbox) {
      lightbox.classList.add('open');
      document.body.style.overflow = 'hidden';
    }
  };

  // Atualiza conteúdo interno do Lightbox
  const updateLightboxContent = () => {
    if (lightboxImg && lightboxCaption && currentActiveIndex >= 0 && currentActiveIndex < activeImagesList.length) {
      const activePhoto = activeImagesList[currentActiveIndex];
      lightboxImg.src = activePhoto.src;
      lightboxCaption.textContent = activePhoto.caption;
    }
  };

  // Navegar pelo Lightbox
  const navigateLightbox = (direction) => {
    if (activeImagesList.length <= 1) return;
    if (direction === 'next') {
      currentActiveIndex = (currentActiveIndex + 1) % activeImagesList.length;
    } else if (direction === 'prev') {
      currentActiveIndex = (currentActiveIndex - 1 + activeImagesList.length) % activeImagesList.length;
    }
    updateLightboxContent();
  };

  // Capturar lista de imagens visíveis na galeria geral (exclui itens de álbuns)
  const getVisibleGalleryImages = () => {
    const list = [];
    galleryItems.forEach(item => {
      if (!item.classList.contains('album-item') && item.style.display !== 'none') {
        const img = item.querySelector('img');
        const title = item.querySelector('h4') ? item.querySelector('h4').textContent : 'Foto';
        const category = item.querySelector('span') ? item.querySelector('span').textContent : '';
        if (img) {
          list.push({
            src: img.src,
            caption: `${title} (${category})`
          });
        }
      }
    });
    return list;
  };

  // Capturar lista de imagens de dentro do álbum ECS 2026
  const getAlbumImages = () => {
    const list = [];
    const albumPhotos = document.querySelectorAll('.album-photo-item img');
    albumPhotos.forEach((img, idx) => {
      list.push({
        src: img.src,
        caption: `ECS 2026 - Encontro Carioca de Swordplay (Foto ${idx + 1} de ${albumPhotos.length})`
      });
    });
    return list;
  };

  if (galleryItems.length > 0) {
    galleryItems.forEach(item => {
      item.addEventListener('click', () => {
        // Se for um item de álbum, abre o modal do álbum
        if (item.classList.contains('album-item')) {
          if (albumModal) {
            albumModal.classList.add('open');
            document.body.style.overflow = 'hidden';
          }
          return;
        }

        // Caso contrário, abre o lightbox com as imagens da galeria geral
        const visibleImages = getVisibleGalleryImages();
        const clickedImg = item.querySelector('img');
        if (clickedImg) {
          const index = visibleImages.findIndex(imgObj => imgObj.src === clickedImg.src);
          openLightbox(visibleImages, index !== -1 ? index : 0);
        }
      });
    });

    // Clique nas fotos de dentro do álbum para abrir no Lightbox
    const albumPhotoItems = document.querySelectorAll('.album-photo-item');
    albumPhotoItems.forEach((photoItem, index) => {
      photoItem.addEventListener('click', () => {
        const albumImages = getAlbumImages();
        openLightbox(albumImages, index);
      });
    });

    // Clique nas setas de navegação
    if (lightboxPrev) {
      lightboxPrev.addEventListener('click', (e) => {
        e.stopPropagation(); // Evita fechar o lightbox ao clicar na seta
        navigateLightbox('prev');
      });
    }

    if (lightboxNext) {
      lightboxNext.addEventListener('click', (e) => {
        e.stopPropagation(); // Evita fechar o lightbox ao clicar na seta
        navigateLightbox('next');
      });
    }

    // Fechar Lightbox
    const closeLightbox = () => {
      if (lightbox) {
        lightbox.classList.remove('open');
        // Só restaura rolagem do body se o modal do álbum também estiver fechado
        if (!albumModal || !albumModal.classList.contains('open')) {
          document.body.style.overflow = 'auto';
        }
        setTimeout(() => {
          if (lightboxImg) lightboxImg.src = '';
          if (lightboxCaption) lightboxCaption.textContent = '';
        }, 300);
      }
    };

    if (lightboxClose) {
      lightboxClose.addEventListener('click', closeLightbox);
    }

    if (lightbox) {
      lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
          closeLightbox();
        }
      });
    }

    // Fechar Modal do Álbum
    const closeAlbumModal = () => {
      if (albumModal) {
        albumModal.classList.remove('open');
        document.body.style.overflow = 'auto';
      }
    };

    if (albumModalClose) {
      albumModalClose.addEventListener('click', closeAlbumModal);
    }

    if (albumModal) {
      albumModal.addEventListener('click', (e) => {
        if (e.target === albumModal) {
          closeAlbumModal();
        }
      });
    }

    // Navegação via teclado (Setas e ESC)
    document.addEventListener('keydown', (e) => {
      if (lightbox && lightbox.classList.contains('open')) {
        if (e.key === 'Escape') {
          closeLightbox();
        } else if (e.key === 'ArrowRight') {
          navigateLightbox('next');
        } else if (e.key === 'ArrowLeft') {
          navigateLightbox('prev');
        }
      } else if (albumModal && albumModal.classList.contains('open')) {
        if (e.key === 'Escape') {
          closeAlbumModal();
        }
      }
    });
  }
});
