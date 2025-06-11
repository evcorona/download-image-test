const STYLES = `
      body {
        margin: 0;
        padding: 20px;
        background-color: #f5f5f5;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        min-height: 100vh;
        font-family: -apple-system, system-ui, sans-serif;
      }
      .image-container { position: relative; }
      img {
        max-width: 100%;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        border-radius: 8px;
      }
      .download-link {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 56px;
        height: 56px;
        margin-top: 16px;
        background: black;
        color: white;
        text-decoration: none;
        border-radius: 50%;
        box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        transition: transform 0.2s, box-shadow 0.2s;
      }
      .download-link:hover {
        transform: translateY(-2px);
        box-shadow: 0 4px 8px rgba(0,0,0,0.2);
      }
      .download-link svg {
        width: 24px;
        height: 24px;
        fill: currentColor;
      }      
      .filename {
        margin-top: 12px;
        color: #666;
        font-size: 14px;
      }
    `

const DOWNLOAD_ICON = `
  <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z"/>
  </svg>
`

export default function openImageInNewWindow(
  filename: string,
  dataUrl: string,
): void {
  const formattedImageName = filename.endsWith('.png')
    ? filename
    : `${filename}.png`

  const newWindow = window.open('', '_blank')

  if (!newWindow) {
    alert('Window could not be opened')
    return
  }

  const doc = newWindow.document
  doc.title = formattedImageName

  // Add meta tags
  doc.head.appendChild(createMetaTag(doc, { charset: 'utf-8' }))
  doc.head.appendChild(
    createMetaTag(doc, {
      name: 'viewport',
      content: 'width=device-width, initial-scale=1',
    }),
  )

  // Add styles
  const style = doc.createElement('style')
  style.textContent = STYLES
  doc.head.appendChild(style)

  // Create and append elements
  const container = createImageContainer(doc, dataUrl, formattedImageName)

  const filenameP = doc.createElement('p')
  filenameP.className = 'filename'
  filenameP.textContent = formattedImageName

  const downloadLink = createDownloadLink(doc, dataUrl, formattedImageName)

  // Append elements to body
  doc.body.appendChild(container)
  doc.body.appendChild(filenameP)
  doc.body.appendChild(downloadLink)

  doc.close()
}

const createMetaTag = (doc: Document, attributes: Record<string, string>) => {
  const meta = doc.createElement('meta')
  Object.entries(attributes).forEach(([key, value]) => {
    meta.setAttribute(key, value)
  })
  return meta
}

const createImageContainer = (
  doc: Document,
  dataUrl: string,
  filename: string,
) => {
  const container = doc.createElement('div')
  container.className = 'imageContainer'

  const img = doc.createElement('img')
  img.src = dataUrl
  img.alt = filename
  img.title = filename
  img.className = 'image'

  container.appendChild(img)
  return container
}

const createDownloadLink = (
  doc: Document,
  dataUrl: string,
  filename: string,
) => {
  const link = doc.createElement('a')
  link.className = 'download-link'
  link.href = dataUrl
  link.download = filename
  link.innerHTML = DOWNLOAD_ICON

  return link
}
