'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Target, Zap, Shield } from 'lucide-react'

export default function About() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  return (
    <section id="about" className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
            About Me
          </h2>
          <div className="w-24 h-1 bg-blue-700 mx-auto" />
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h3 className="text-3xl font-bold text-gray-900 mb-6">
              Products That Ship —{' '}
              <span className="text-blue-700">And Move the Numbers</span>
            </h3>
            <p className="text-lg text-gray-600 mb-6 leading-relaxed">
              15+ years leading product strategy and delivery across{' '}
              <strong>healthcare, fintech, enterprise SaaS, and consumer tech</strong>. I get
              teams clear on what to build, then get it shipped.
            </p>
            <p className="text-lg text-gray-600 mb-6 leading-relaxed">
              Highlights: a flagship recovery program projected to return{' '}
              <strong>$1.5B</strong>, a mobile analytics product that earned{' '}
              a <strong>CIO Magazine innovation award</strong>, product changes that cut support tickets
              by <strong>67%</strong>, and an enterprise <strong>Azure platform launch</strong>.
            </p>
            <p className="text-lg text-gray-600 leading-relaxed">
              Scrum, Agile, and SAFe are how I work — not the headline. They're the toolkit
              I use to keep teams focused and moving, whatever the org needs.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="space-y-6"
          >
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
              <Target className="w-10 h-10 text-blue-700 mb-3" />
              <h4 className="text-xl font-bold text-gray-900 mb-2">Product Outcomes</h4>
              <p className="text-gray-600">
                $1.5B recovery program, a CIO Magazine innovation award for a mobile analytics
                product, and a 67% cut in support tickets through better product decisions.
              </p>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
              <Zap className="w-10 h-10 text-blue-700 mb-3" />
              <h4 className="text-xl font-bold text-gray-900 mb-2">How I Work</h4>
              <p className="text-gray-600">
                Scrum, Agile, and SAFe as tools — used to keep prioritization sharp and
                delivery on track, not as a facilitation checklist.
              </p>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
              <Shield className="w-10 h-10 text-blue-700 mb-3" />
              <h4 className="text-xl font-bold text-gray-900 mb-2">Available January</h4>
              <p className="text-gray-600">
                Open for fractional/contract PM work in SaaS, consumer tech, EV/tech
                hardware, or social-impact tech.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
