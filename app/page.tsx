import Hero from '@/components/hero'
import About from '@/components/about'
import Services from '@/components/services'
import Portfolio from '@/components/portfolio'
import Skills from '@/components/skills'
import Testimonials from '@/components/testimonials'
import Contact from '@/components/contact'
import Header from '@/components/header'
import Footer from '@/components/footer'

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100">
      <Header />
      <Hero />
      <About />
      <Services />
      <Portfolio />
      <Skills />
      <Testimonials />
      <Contact />
      <Footer />
    </main>
  )
}
