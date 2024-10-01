import React from 'react'
import { QRCodeCanvas } from 'qrcode.react'

type QrCodePreviewProps = {
  url: string
}

function QrCodePreview({ url }: QrCodePreviewProps) {
  return (
    <div className="border-2 mx-auto border-dashed border-gray-300 rounded-lg p-4 h-auto max-w-[256px] w-full flex items-center justify-center">
      <QRCodeCanvas
        size={256}
        style={{ height: 'auto', maxWidth: '100%', width: '100%' }}
        value={url}
      />
    </div>
  )
}

export { QrCodePreview }
