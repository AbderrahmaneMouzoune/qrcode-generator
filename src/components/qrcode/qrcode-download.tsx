'use client'

import React, { useRef, useState } from 'react'
import { Button } from '@components/ui/button'
import { FileTextIcon, ImageIcon } from 'lucide-react'
import JSZip from 'jszip'
import { saveAs } from 'file-saver'
import { QRCodeSVG } from 'qrcode.react'
import { LoaderButton } from '@components/ui/loader-button'
import { toast } from 'sonner'

type QrCodeDownloadProps = {
  urls: string[]
}

function QrCodeDownload({ urls }: QrCodeDownloadProps) {
  const svgRefs = useRef<(SVGSVGElement | null)[]>([])
  const [isLoading, setIsLoading] = useState(false) // Loading state

  const downloadAllQrCodes = async () => {
    toast.info('Generating ZIP file...')
    setIsLoading(true)
    const zip = new JSZip()
    const folder = zip.folder('qr-codes') // Create a folder for QR codes

    try {
      await Promise.all(
        urls.map((url, index) => {
          return new Promise<void>((resolve) => {
            // Use a ref to get the serialized SVG
            const svgString = svgRefs.current[index]?.outerHTML || ''
            const fileName = `qr_code_${index + 1}.svg`
            folder?.file(fileName, svgString) // Add SVG QR code to the ZIP
            resolve()
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
        <Button variant="outline" className="w-full" disabled>
          <FileTextIcon className="size-5 mr-2" />
          Download {urls.length} SVG
        </Button>
        <LoaderButton
          variant="outline"
          className="w-full"
          onClick={downloadAllQrCodes}
          isLoading={isLoading}
        >
          <ImageIcon className="size-5 mr-2" />
          Download {urls.length} PNG
        </LoaderButton>
      </div>

      {urls.map((url, index) => (
        <QRCodeSVG
          key={index}
          value={url}
          size={256}
          level="H"
          // @ts-expect-error
          ref={(el) => (svgRefs.current[index] = el as SVGSVGElement)}
          style={{ display: 'none' }} // Hide the SVG elements
        />
      ))}
    </div>
  )
}

export { QrCodeDownload }
