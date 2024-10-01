'use client'
import React, { useState } from 'react'
import { Input } from '@components/ui/input'
import { MinusIcon, PlusIcon } from 'lucide-react'
import { Button } from '@components/ui/button'
import {
  DEFAULT_QR_CODE_IDENTIFIER,
  QrCodeConfig,
} from '@components/qrcode-generator'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@components/ui/form'

type QrCodeByLinkProps = {
  onQrSettingChange: (qrCodeConfig: QrCodeConfig) => void
}

const qrCodeByLinkSchema = z.object({
  baseUrl: z.string().url(),
  numberOfQrCodeToGenerate: z.coerce.number().int().positive(),
  qrCodeIdentifier: z.string().optional(),
})

export default function QrCodeByLink({ onQrSettingChange }: QrCodeByLinkProps) {
  const form = useForm<z.infer<typeof qrCodeByLinkSchema>>({
    resolver: zodResolver(qrCodeByLinkSchema),
    defaultValues: {
      baseUrl: '',
      numberOfQrCodeToGenerate: 1,
      qrCodeIdentifier: '',
    },
  })

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof qrCodeByLinkSchema>) {
    onQrSettingChange({
      type: 'link',
      urls: Array.from({ length: values.numberOfQrCodeToGenerate }).map(
        (_, index) => {
          const url = new URL(values.baseUrl)
          url.searchParams.append(
            values.qrCodeIdentifier ?? DEFAULT_QR_CODE_IDENTIFIER,
            index.toString()
          )
          return url.toString()
        }
      ),
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

        <FormField
          control={form.control}
          name="qrCodeIdentifier"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-left w-full block uppercase text-xs">
                all your url gonna be prepended with this identifier
              </FormLabel>
              <FormControl>
                <Input
                  placeholder={`choose your qrcodelink identifier, default ${DEFAULT_QR_CODE_IDENTIFIER}`}
                  className="text-secondary"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="numberOfQrCodeToGenerate"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-left w-full block uppercase text-xs">
                Number of QR code to generate
              </FormLabel>
              <FormControl>
                <Input type="number" {...field} className="text-secondary" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="text-left w-full">
          Validate settings
        </Button>
      </form>
    </Form>
  )
}
