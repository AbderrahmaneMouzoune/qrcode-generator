'use client'

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@components/ui/tabs'
import { LinkIcon, SheetIcon } from 'lucide-react'
import { QRCodeCanvas } from 'qrcode.react'
import { useState } from 'react'
import { FileUploadZone } from '@components/ui/file-upload-zone'
import QrCodeByLink from '@components/qrcode/qrcode-by-link'
import QrCodeDownload from '@components/qrcode/qrcode-download'

export const DEFAULT_QR_CODE_IDENTIFIER = 'qrCodeId'
type QrCodeType = 'link' | 'csv'
export type QrCodeConfig = {
  type: QrCodeType
  urls: string[]
}

export function QrCodeGenerator() {
  const [qrCodePreview, setQrCodePreview] = useState<QrCodeConfig>({
    type: 'link',
    urls: ['https://example.com/1'],
  })

  return (
    <section className="mx-auto p-4 max-w-4xl">
      <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-6 md:gap-2">
        <div className="space-y-6">
          <Tabs defaultValue={'link'}>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger
                value="link"
                className="flex flex-col items-center p-2"
              >
                <LinkIcon className="size-4" />
                <span className="text-xs mt-1">Link</span>
              </TabsTrigger>
              <TabsTrigger
                value="csv"
                className="flex flex-col items-center p-2"
              >
                <SheetIcon className="size-4" />{' '}
                <span className="text-xs mt-1">CSV</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value={'link'}>
              <QrCodeByLink onQrSettingChange={setQrCodePreview} />
            </TabsContent>

            <TabsContent value="csv">
              <FileUploadZone onFileAdd={(files) => {}} />
            </TabsContent>
          </Tabs>
        </div>

        <div className="space-y-6">
          <div className="border-2 mx-auto border-dashed border-gray-300 rounded-lg p-4 h-auto max-w-[256px] w-full flex items-center justify-center">
            <QRCodeCanvas
              size={256}
              style={{ height: 'auto', maxWidth: '100%', width: '100%' }}
              value={qrCodePreview.urls[0]}
            />
          </div>

          <QrCodeDownload urls={qrCodePreview.urls} />
        </div>
      </div>
    </section>
  )
}
