import { Card } from '@components/ui/card'
import { badgeVariants } from '@components/ui/badge'
import { Button } from '@components/ui/button'
import { Headline } from '@components/ui/headline'
import { GitHubLogoIcon, TwitterLogoIcon } from '@radix-ui/react-icons'
import { ChevronRight } from 'lucide-react'
import Link from 'next/link'
import { QrCodeGenerator } from '@components/qr-code-generator'

export default function Home() {
  return (
    <main className="container my-auto text-center">
      <Headline className="pb-5">QrCode Generator</Headline>

      <QrCodeGenerator />
    </main>
  )
}
