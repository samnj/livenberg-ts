import { EB_Garamond, Fira_Mono, Lato, Montserrat } from "next/font/google"
import "@/styles/globals.css"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import TailwindToaster from "@/components/TailwindToaster"
import { ClerkProvider } from "@clerk/nextjs"
import { dark } from "@clerk/themes"

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
})

const garamond = EB_Garamond({
  subsets: ["latin"],
  variable: "--font-garamond",
})

const firaMono = Fira_Mono({
  weight: ["400"],
  subsets: ["latin"],
  variable: "--font-firaMono",
})

const lato = Lato({
  weight: ["400"],
  subsets: ["latin"],
  variable: "--font-lato",
})

export const metadata = {
  title: "Livenberg",
  description: "The Project Gutenberg frontend",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider appearance={{ baseTheme: dark }}>
      <html
        lang="en"
        className={`${lato.variable} ${montserrat.variable} ${firaMono.variable}  ${garamond.variable}`}
      >
        <body className="dark min-h-screen">
          <div className="relative flex min-h-screen flex-col">
            <header className="sticky top-0 z-50 mb-14 border-b border-solid border-b-border shadow-sm backdrop-blur-lg">
              <Navbar />
            </header>
            <main className="flex flex-1 flex-col font-lato">{children}</main>
            <Footer />
            <TailwindToaster />
          </div>
        </body>
      </html>
    </ClerkProvider>
  )
}
