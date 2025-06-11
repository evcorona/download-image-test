import html2canvas from 'html2canvas';
import openImageInNewWindow from 'utils/downloadElementAsImage/openImageInNewWindow';
import shareImage from 'utils/downloadElementAsImage/shareImage';
import { DeviceType, matchesDeviceType } from 'utils/getDeviceType';

const options = {
  scale: 2,
  quality: 1.0,
  useCORS: true,
};

export default function downloadElementAsImage(
  element: HTMLElement,
  filename: string
) {
  html2canvas(element, options).then(async (canvas) => {
    const dataUrl = canvas.toDataURL('image/png', 1.0);

    const isIOs = matchesDeviceType([DeviceType.iOS]);

    if (isIOs) {
      shareImage(dataUrl, filename);
      return;
    }

    canvas.toBlob(
      (blob) => {
        if (!blob) {
          openImageInNewWindow(filename, dataUrl);
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
