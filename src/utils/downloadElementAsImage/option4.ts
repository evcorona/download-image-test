import html2canvas from 'html2canvas';

const options = {
  scale: 2,
  quality: 1.0,
  useCORS: true,
};

export default function downloadElementAsImage4(
  element: HTMLElement,
  filename: string
) {
  html2canvas(element, options).then((canvas) => {
    const dataUrl = canvas.toDataURL('image/png', 1.0);

    fetch(dataUrl)
      .then((res) => res.blob())
      .then((blob) => {
        const imageFile = new File([blob], filename, { type: 'image/png' });

        if (navigator.canShare && navigator.canShare({ files: [imageFile] })) {
          navigator
            .share({
              files: [imageFile],
              title: 'Compartir imagen',
              text: '¡Mira esta imagen!',
            })
            .catch((error) => {
              alert('Error al compartir: ' + error);
            });
        } else {
          alert('La opción de compartir no está disponible en este navegador.');
        }
      })
      .catch((error) => {
        alert('Error al preparar la imagen para compartir: ' + error);
      });
  });
}
