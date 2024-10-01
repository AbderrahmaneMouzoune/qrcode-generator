import React from 'react'
import { QrCodePreview } from '@components/qrcode/qrcode-preview'
import { Button } from '@components/ui/button'

type QrCodePreviewDownloadProps = {
  id: string
  url: string
  onDownload: () => void
}
function QrCodePreviewDownload({
  id,
  url,
  onDownload,
}: QrCodePreviewDownloadProps) {
  return (
    <li className="grid grid-cols-3 items-center">
      <span>{url}</span>
      <QrCodePreview url={url} id={id} />
      <Button onClick={onDownload}>Download</Button>
    </li>
  )
}

export { QrCodePreviewDownload }
