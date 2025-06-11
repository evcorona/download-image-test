import html2canvas from 'html2canvas';

const options = {
  scale: 2,
  quality: 1.0,
  useCORS: true,
};

export default function downloadElementAsImage3(
  element: HTMLElement,
  filename: string
) {
  html2canvas(element, options).then((canvas) => {
    const dataUrl = canvas.toDataURL('image/png', 1.0);

    const imgElement = document.createElement('img');
    imgElement.src = dataUrl;
    imgElement.alt = filename;

    element.parentNode?.replaceChild(imgElement, element);
  });
}
