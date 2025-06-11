import html2canvas from 'html2canvas';

const options = {
  scale: 2,
  quality: 1.0,
  useCORS: true,
};

export default function downloadElementAsImage2(
  element: HTMLElement,
  filename: string
) {
  html2canvas(element, options).then(async (canvas) => {
    canvas.toBlob(
      (blob) => {
        if (!blob) {
          alert('Failed to download image as blob');
          return;
        }

        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = filename;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
      },
      'image/png',
      1.0
    );
  });
}
