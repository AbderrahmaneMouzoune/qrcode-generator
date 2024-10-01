import React, { useMemo } from 'react'
import { QRCodeCanvas } from 'qrcode.react'

type QrCodePreviewProps = {
  id: string
  url: string
}

const qrCodeSettings: {
  maxLength: number
  minVersion: number
  size: number
  errorCorrectionLevel: 'L' | 'M' | 'Q' | 'H'
}[] = [
  { maxLength: 25, minVersion: 1, size: 256, errorCorrectionLevel: 'H' },
  { maxLength: 50, minVersion: 2, size: 256, errorCorrectionLevel: 'H' },
  { maxLength: 100, minVersion: 5, size: 256, errorCorrectionLevel: 'M' },
  { maxLength: 200, minVersion: 10, size: 512, errorCorrectionLevel: 'L' },
  { maxLength: 400, minVersion: 20, size: 512, errorCorrectionLevel: 'L' },
  { maxLength: 700, minVersion: 30, size: 512, errorCorrectionLevel: 'L' },
  { maxLength: Infinity, minVersion: 40, size: 512, errorCorrectionLevel: 'L' }, // Catch-all
]

function getQrCodeSettings(urlLength: number) {
  const settings = qrCodeSettings.find(
    (setting) => urlLength <= setting.maxLength
  )
  return settings || qrCodeSettings[qrCodeSettings.length - 1] // Default to the last setting if none match
}

function QrCodePreview({ id, url }: QrCodePreviewProps) {
  const { minVersion, size, errorCorrectionLevel } = useMemo(
    () => getQrCodeSettings(url.length),
    [url]
  )

  return (
    <div className="md:mt-12 border-2 mx-auto border-dashed border-gray-300 rounded-lg p-4 h-auto max-w-[256px] w-full flex items-center justify-center">
      <QRCodeCanvas
        id={id}
        size={size}
        style={{ height: 'auto', maxWidth: '100%', width: '100%' }}
        value={url}
        minVersion={minVersion}
        level={errorCorrectionLevel}
      />
    </div>
  )
}

export { QrCodePreview }
