import { LanguageProvider } from './i18n/LanguageContext'
import ScrollProgress from './components/ScrollProgress'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Services from './components/Services'
import Credentials from './components/Credentials'
import Contact from './components/Contact'
import Footer from './components/Footer'
import WhatsAppWidget from './components/WhatsAppWidget'

export default function App() {
  return (
    <LanguageProvider>
      <ScrollProgress />
      <Navbar />
      <main>
        <Hero />
        <About />
        <Services />
        <Credentials />
        <Contact />
      </main>
      <Footer />
      <WhatsAppWidget />
    </LanguageProvider>
  )
}
