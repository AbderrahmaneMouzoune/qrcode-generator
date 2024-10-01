import React, { useState } from 'react'
import { FileUploadZone } from '@components/ui/file-upload-zone'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@components/ui/form'
import { Input } from '@components/ui/input'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { QrCodeConfig } from '../qrcode-generator'
import { Button } from '@components/ui/button'
import { toast } from 'sonner'

const qrCodeByCsvSchema = z.object({
  baseUrl: z.string().url(),
})

type QrCodeByCsvProps = {
  onQrSettingChange: (qrCodeConfig: QrCodeConfig) => void
}

function QrCodeByCsv({ onQrSettingChange }: QrCodeByCsvProps) {
  const [urls, setUrls] = useState<string[]>([])

  const form = useForm<z.infer<typeof qrCodeByCsvSchema>>({
    resolver: zodResolver(qrCodeByCsvSchema),
    defaultValues: {
      baseUrl: '',
    },
  })

  function onSubmit(values: z.infer<typeof qrCodeByCsvSchema>) {
    const urlsToAdd = urls.map((url) => `${values.baseUrl}?${url}`)

    onQrSettingChange({
      type: 'link',
      urls: urlsToAdd,
    })
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="baseUrl"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-left w-full block uppercase text-xs">
                url that gonna translate
              </FormLabel>
              <FormControl>
                <Input
                  placeholder="https://www.youtube.com"
                  className="text-secondary"
                  {...field}
                />
              </FormControl>
              <FormDescription className="text-left w-full block text-xs">
                Your QR code will open this URL.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FileUploadZone
          onFileChange={(files) => {
            const newUrls = files.map((file) => file.urls).flat()
            toast.success(`Got ${newUrls.length} urls now`)
            setUrls(newUrls)
          }}
        />

        <Button type="submit" className="w-full" disabled={urls.length === 0}>
          {urls.length > 0 && (
            <>
              Generate {urls.length} QR code{urls.length > 1 ? 's' : ''}
            </>
          )}
          {urls.length === 0 && <>Drop a csv</>}
        </Button>
      </form>
    </Form>
  )
}

export { QrCodeByCsv }
