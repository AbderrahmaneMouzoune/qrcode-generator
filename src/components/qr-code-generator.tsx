'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import {
  LinkIcon,
  MailIcon,
  MessageSquareIcon,
  PhoneIcon,
  SmartphoneIcon,
  CreditCardIcon,
  WifiIcon,
  ImageIcon,
  VideoIcon,
  Share2Icon,
  FileTextIcon,
  AppWindowIcon,
} from 'lucide-react'

export function QrCodeGenerator() {
  const [url, setUrl] = useState('')

  return (
    <div className="mx-auto p-4 max-w-4xl">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-6">
          {/* <Tabs defaultValue="link" className="w-full">
            <TabsList className="grid grid-cols-3 sm:grid-cols-5 gap-2">
              <TabsTrigger
                value="link"
                className="flex flex-col items-center p-2"
              >
                <LinkIcon className="size-5" />
                <span className="text-xs mt-1">Link</span>
              </TabsTrigger>
              <TabsTrigger
                value="email"
                className="flex flex-col items-center p-2"
              >
                <MailIcon className="size-5" />
                <span className="text-xs mt-1">E-mail</span>
              </TabsTrigger>
              <TabsTrigger
                value="text"
                className="flex flex-col items-center p-2"
              >
                <MessageSquareIcon className="size-5" />
                <span className="text-xs mt-1">Text</span>
              </TabsTrigger>
            </TabsList>
          </Tabs> */}

          <div>
            <Input
              type="url"
              placeholder="https://"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="w-full"
            />
            <p className="text-sm text-gray-500 mt-1">
              Your QR code will open this URL.
            </p>
          </div>

          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="options">
              <AccordionTrigger>Options</AccordionTrigger>
              <AccordionContent>Options content goes here</AccordionContent>
            </AccordionItem>
            <AccordionItem value="logo">
              <AccordionTrigger>Logo</AccordionTrigger>
              <AccordionContent>Logo content goes here</AccordionContent>
            </AccordionItem>
            <AccordionItem value="frames">
              <AccordionTrigger>
                Frames
                <span className="ml-auto hover:no-underline bg-green-500 text-white text-xs px-2 py-1 rounded-full">
                  NEW!
                </span>
              </AccordionTrigger>
              <AccordionContent>Frames content goes here</AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>

        <div className="space-y-6">
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 h-64 flex items-center justify-center">
            <p className="text-gray-400">QR Code Preview</p>
          </div>

          <div className="flex space-x-4">
            <Button variant="outline" className="w-full">
              <ImageIcon className="size-5 mr-2" />
              Download PNG
            </Button>
            <Button variant="outline" className="w-full">
              <FileTextIcon className="size-5 mr-2" />
              Download SVG
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
