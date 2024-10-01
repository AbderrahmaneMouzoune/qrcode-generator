'use client'

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@components/ui/tabs'
import { LinkIcon, SheetIcon } from 'lucide-react'
import { useState } from 'react'
import { QrCodeByLink } from '@components/qrcode/qrcode-by-link'
import { QrCodePreview } from '@components/qrcode/qrcode-preview'
import { QrCodeDownload } from '@components/qrcode/qrcode-download'
import { QrCodeByCsv } from '@components/qrcode/qrcode-by-csv'

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
    <section className="mx-auto max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-2">
      <Tabs defaultValue={'csv'}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="link" className="flex flex-col items-center p-2">
            <LinkIcon className="size-4" />
            <span className="text-xs mt-1">Link</span>
          </TabsTrigger>
          <TabsTrigger value="csv" className="flex flex-col items-center p-2">
            <SheetIcon className="size-4" />{' '}
            <span className="text-xs mt-1">CSV</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value={'link'} className="p-2">
          <QrCodeByLink onQrSettingChange={setQrCodePreview} />
        </TabsContent>

        <TabsContent value={'csv'} className="p-2">
          <QrCodeByCsv onQrSettingChange={setQrCodePreview} />
        </TabsContent>
      </Tabs>

      <div className="space-y-6">
        <QrCodePreview url={qrCodePreview.urls[0]} />
        <QrCodeDownload urls={qrCodePreview.urls} />
      </div>
    </section>
  )
}
