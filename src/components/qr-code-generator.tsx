'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { FileTextIcon, ImageIcon, MinusIcon, PlusIcon } from 'lucide-react'
import React, { useRef, useState } from 'react'
import { QRCodeCanvas } from 'qrcode.react'

const DEFAULT_QR_CODE_IDENTIFIER = 'qrCodeId'

export function QrCodeGenerator() {
  const [baseUrl, setBaseUrl] = useState('')
  const [countQrCode, setCountQrCode] = useState<number>(1)
  const [qrCodeIdentifier, setQrCodeIndentifier] = useState<string>('')
  const canvasRefs = useRef<(HTMLCanvasElement | null)[]>([])

  const generateUrl = (id: number): string => {
    if (!baseUrl) return ''

    const url = new URL(baseUrl)
    url.searchParams.append(
      qrCodeIdentifier ?? DEFAULT_QR_CODE_IDENTIFIER,
      id.toString()
    )
    return url.toString()
  }

  const downloadQRCode = (index: number) => {
    const canvas = canvasRefs.current[index]
    if (canvas) {
      const url = canvas.toDataURL('image/png')
      const a = document.createElement('a')
      a.href = url
      a.download = `qrcode_${index + 1}.png` // Nom du fichier
      a.click()
    }
  }

  const downloadAll = () => {
    for (let i = 0; i < countQrCode; i++) {
      downloadQRCode(i)
    }
  }

  return (
    <>
      <div className="mx-auto p-4 max-w-4xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-6">
            <div>
              <Input
                type="url"
                placeholder="https://"
                value={baseUrl}
                onChange={(e) => setBaseUrl(e.target.value)}
                className="w-full"
              />
              <p className="text-sm text-gray-500 mt-1">
                Your QR code will open this URL.
              </p>
            </div>

            <div>
              <Input
                type="text"
                placeholder={`choose your qrcodelink identifier, default ${DEFAULT_QR_CODE_IDENTIFIER}`}
                value={qrCodeIdentifier}
                onChange={(e) => setQrCodeIndentifier(e.target.value)}
                className="w-full"
              />
            </div>

            <div className="flex space-x-2 items-center">
              <Button
                size={'icon'}
                variant={'destructive'}
                onClick={() => setCountQrCode((prev) => Math.max(prev - 1, 1))}
              >
                <MinusIcon className="size-5" />
              </Button>
              <Input
                type="number"
                value={countQrCode}
                onChange={(e) => setCountQrCode(e.target.valueAsNumber)}
                className="w-fit"
              />
              <Button
                size={'icon'}
                variant={'secondary'}
                onClick={() => setCountQrCode((prev) => prev + 1)}
              >
                <PlusIcon className="size-5" />
              </Button>
            </div>
          </div>

          <div className="space-y-6">
            <div className="border-2 mx-auto border-dashed border-gray-300 rounded-lg p-4 h-auto max-w-[256px] w-full flex items-center justify-center">
              <QRCodeCanvas
                size={256}
                style={{ height: 'auto', maxWidth: '100%', width: '100%' }}
                value={baseUrl}
              />
            </div>

            <div className="flex space-y-2 justify-center">
              <div className="flex space-x-4">
                <Button variant="outline" className="w-full" disabled>
                  <FileTextIcon className="size-5 mr-2" />
                  Download {countQrCode} SVG
                </Button>
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={downloadAll}
                >
                  <ImageIcon className="size-5 mr-2" />
                  Download {countQrCode} PNG
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="hidden">
        {Array.from({ length: countQrCode }).map((_, index) => {
          const qrUrl = generateUrl(index + 1)
          return (
            <QRCodeCanvas
              key={index}
              value={qrUrl}
              size={128}
              // @ts-expect-error canvasRefs is a ref
              ref={(el: HTMLCanvasElement | null) =>
                (canvasRefs.current[index] = el)
              }
            />
          )
        })}
      </div>
    </>
  )
}
