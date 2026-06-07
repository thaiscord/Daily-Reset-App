'use client'

interface EntryScreenProps {
  onStart: () => void
}

export default function EntryScreen({ onStart }: EntryScreenProps) {
  return (
    <div className="entry-screen">

      <div className="entry-top">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/LOGO.png" alt="Daily Reset" className="entry-logo" />
        <hr className="entry-divider" />
      </div>

      <div className="entry-middle">
        <h1 className="entry-headline">
          Você está cansado...<br />ou está desaparecendo aos poucos?
        </h1>
        <hr className="entry-accent" />
        <p className="entry-subtitle">
          Nem todo cansaço parece cansaço.
        </p>
        <p className="entry-subtitle-2">
          São apenas 7 perguntas.
        </p>
      </div>

      <div className="entry-bottom">
        <button
          type="button"
          onClick={onStart}
          className="tap-target entry-cta"
        >
          Quero descobrir →
        </button>
      </div>

    </div>
  )
}
