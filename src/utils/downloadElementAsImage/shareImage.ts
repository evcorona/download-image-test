export default async function shareImage(dataUrl: string, filename: string) {
  try {
    const response = await fetch(dataUrl)
    const blob = await response.blob()

    if (navigator.share) {
      const file = new File([blob], filename, { type: 'image/png' })
      await navigator.share({
        files: [file],
        title: filename,
      })
    } else window.location.href = dataUrl
  } catch (error) {
    window.location.href = dataUrl
  }
  return
}

// - bloqueo el popup en celular
// - boton descarga si funciona
// - safari no funciona
