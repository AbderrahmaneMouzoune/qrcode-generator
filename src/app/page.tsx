import { QrCodeGenerator } from '@components/qr-code-generator'
import { Headline } from '@components/ui/headline'

export default function Home() {
  return (
    <main className="container my-auto text-center">
      <Headline className="pb-5">
        ListQrCode <span className="text-accent">Generator</span>
      </Headline>
      <p>
        Générer et télécharger une liste de qr code à partir d&apos;une url de
        base
      </p>

      <QrCodeGenerator />
    </main>
  )
}
