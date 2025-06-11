import html2canvas from 'html2canvas'

const options = {
  scale: 2,
  quality: 1.0,
  useCORS: true,
}

export default function downloadElementAsImage(
  element: HTMLElement,
  filename: string,
) {
  html2canvas(element, options).then((canvas) => {
    const dataUrl = canvas.toDataURL('image/png', 1.0)

    const link = document.createElement('a')
    link.href = dataUrl
    link.download = filename
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  })
}
