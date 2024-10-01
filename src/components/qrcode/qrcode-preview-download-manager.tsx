'use client'
import React, { useState } from 'react'
import { QrCodePreview } from '@components/qrcode/qrcode-preview'
import { Button } from '@components/ui/button'
import { Headline } from '@components/ui/headline'
import { QrCodePreviewDownload } from './qrcode-preview-download'

function downloadStringAsFile(data: string, filename: string) {
  let a = document.createElement('a')
  a.download = filename
  a.href = data
  a.click()
}

function QrCodePreviewDownloadManager({ urls }: { urls: string[] }) {
  const [qrCodeGenerated, setQrCodeGenerated] = useState<string[]>([])

  const download = (qrCodeId: string) => {
    const element = document.getElementById(qrCodeId) as HTMLCanvasElement

    const dataAsString = element?.toDataURL('image/png')

    downloadStringAsFile(dataAsString, `qrcode-${qrCodeId}.png`)
  }

  const downloadAll = () => {
    qrCodeGenerated.forEach((url, index) => {
      download(`download-${index}`)
    })
  }

  return (
    <article>
      <div className="flex w-full justify-between">
        <Headline>We got {urls.length} QRCode</Headline>
        <div className="space-x-2">
          <Button onClick={() => setQrCodeGenerated(urls)}>
            Preview QRCode
          </Button>
          <Button
            variant={'secondary'}
            disabled={qrCodeGenerated.length === 0}
            onClick={downloadAll}
          >
            Download {qrCodeGenerated.length} QRCode
          </Button>
        </div>
      </div>

      <ul>
        {qrCodeGenerated.map((url, index) => {
          return (
            <QrCodePreviewDownload
              key={index}
              id={`download-${index}`}
              url={url}
              onDownload={() => download(`download-${index}`)}
            />
          )
        })}
      </ul>
    </article>
  )
}

export { QrCodePreviewDownloadManager }
