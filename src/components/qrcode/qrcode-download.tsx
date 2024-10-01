import React, { useRef } from 'react'
import { Button } from '@components/ui/button'
import { FileTextIcon, ImageIcon } from 'lucide-react'
import { DEFAULT_QR_CODE_IDENTIFIER } from '../qrcode-generator'

type QrCodeDownloadProps = {
  urls: string[]
}

function QrCodeDownload({ urls }: QrCodeDownloadProps) {
  const canvasRefs = useRef<(HTMLCanvasElement | null)[]>([])

  // const generateUrl = (id: number): string => {
  //   const url = new URL(baseUrl)
  //   url.searchParams.append(
  //     qrCodeIdentifier ?? DEFAULT_QR_CODE_IDENTIFIER,
  //     id.toString()
  //   )
  //   return url.toString()
  // }

  // const downloadQRCode = (index: number) => {
  //   const canvas = canvasRefs.current[index]
  //   if (canvas) {
  //     const url = canvas.toDataURL('image/png')
  //     const a = document.createElement('a')
  //     a.href = url
  //     a.download = `qrcode_${index + 1}.png` // Nom du fichier
  //     a.click()
  //   }
  // }

  // const downloadAll = () => {
  //   for (let i = 0; i < urls.length; i++) {
  //     downloadQRCode(i)
  //   }
  // }

  return (
    <div className="flex space-y-2 justify-center">
      <div className="flex space-x-4">
        <Button variant="outline" className="w-full" disabled>
          <FileTextIcon className="size-5 mr-2" />
          Download {urls.length} SVG
        </Button>
        <Button variant="outline" className="w-full">
          <ImageIcon className="size-5 mr-2" />
          Download {urls.length} PNG
        </Button>
      </div>
    </div>
  )
}

export { QrCodeDownload }
