'use client'

import React, { useCallback, useRef, useState } from 'react'
import { Button } from '@components/ui/button'
import { FileTextIcon, ImageIcon } from 'lucide-react'
import JSZip from 'jszip'
import { saveAs } from 'file-saver'
import { QRCodeCanvas, QRCodeSVG } from 'qrcode.react'
import { LoaderButton } from '@components/ui/loader-button'
import { toast } from 'sonner'
import { format } from 'date-fns/format'

type QrCodeDownloadProps = {
  urls: string[]
}

function QrCodeDownload({ urls }: QrCodeDownloadProps) {
  const qrCodesRefs = useRef<(SVGSVGElement | HTMLCanvasElement | null)[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [formatToDownload, setFormatToDownload] = useState<'SVG' | 'PNG'>('SVG')

  const downloadAllQrCodes = async () => {
    toast.info('Generating ZIP file...')
    setIsLoading(true)
    const zip = new JSZip()
    const folder = zip.folder('qr-codes') // Create a folder for QR codes

    try {
      await Promise.all(
        urls.map((url, index) => {
          return new Promise<void>((resolve) => {
            const node = qrCodesRefs.current[index]
            if (node === null) {
              return
            }

            if (
              formatToDownload === 'PNG' &&
              node instanceof HTMLCanvasElement
            ) {
              const content = node.toDataURL('image/png')
              const fileName = `qr_code_${index + 1}.png`
              folder?.file(fileName, content)
              resolve()
            }

            if (formatToDownload === 'SVG' && node instanceof SVGSVGElement) {
              const serializer = new XMLSerializer()
              const content =
                'data:image/svg+xml;charset=utf-8,' +
                encodeURIComponent(
                  '<?xml version="1.0" standalone="no"?>' +
                    serializer.serializeToString(node)
                )
              const fileName = `qr_code_${index + 1}.svg`
              folder?.file(fileName, content)
              resolve()
            }
          })
        })
      )

      const content = await zip.generateAsync({ type: 'blob' })
      saveAs(content, 'qr_codes.zip')
      toast.success('QR codes zipped successfully!') // Add this line
    } catch (error) {
      console.error('Error generating ZIP:', error)
      toast.error('Error generating ZIP file')
    } finally {
      setIsLoading(false) // Reset loading state
    }
  }

  return (
    <div className="flex space-y-2 justify-center">
      <div className="flex space-x-4">
        <LoaderButton
          variant="outline"
          className="w-full"
          onClick={() => {
            setFormatToDownload('SVG')
            downloadAllQrCodes()
          }}
          isLoading={isLoading && formatToDownload === 'SVG'}
        >
          <FileTextIcon className="size-5 mr-2" />
          Download {urls.length} SVG
        </LoaderButton>
        <LoaderButton
          variant="outline"
          className="w-full"
          onClick={() => {
            setFormatToDownload('PNG')
            downloadAllQrCodes()
          }}
          isLoading={isLoading && formatToDownload === 'PNG'}
        >
          <ImageIcon className="size-5 mr-2" />
          Download {urls.length} PNG
        </LoaderButton>
      </div>

      {formatToDownload === 'SVG' &&
        urls.map((url, index) => (
          <QRCodeSVG
            key={index}
            value={url}
            size={256}
            level="H"
            // @ts-expect-error
            ref={(el) => (qrCodesRefs.current[index] = el as SVGSVGElement)}
            style={{ display: 'none' }}
          />
        ))}

      {formatToDownload === 'PNG' &&
        urls.map((url, index) => (
          <QRCodeCanvas
            key={index}
            value={url}
            size={256}
            level="H"
            // @ts-expect-error
            ref={(el) => (qrCodesRefs.current[index] = el as HTMLCanvasElement)}
            style={{ display: 'none' }}
          />
        ))}
    </div>
  )
}

export { QrCodeDownload }
