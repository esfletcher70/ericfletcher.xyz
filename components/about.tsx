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
              Driving Excellence Through{' '}
              <span className="text-blue-700">Agile Leadership</span>
            </h3>
            <p className="text-lg text-gray-600 mb-6 leading-relaxed">
              As a <strong>Product Owner and Agile leader</strong> with over 15 years of experience,
              I specialize in transforming complex challenges into successful digital products
              across healthcare, finance, and technology sectors.
            </p>
            <p className="text-lg text-gray-600 mb-6 leading-relaxed">
              My approach centers on translating business needs into actionable user stories,
              fostering cross-functional collaboration, and delivering customer-focused solutions
              that drive measurable results.
            </p>
            <p className="text-lg text-gray-600 leading-relaxed">
              With certifications in SAFe, CSPO, and CSM, I bring proven expertise in scaling
              agile practices, coaching teams, and aligning product roadmaps with organizational strategy.
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
              <h4 className="text-xl font-bold text-gray-900 mb-2">Strategic Vision</h4>
              <p className="text-gray-600">
                Aligning product roadmaps with business objectives and delivering solutions
                that drive organizational success.
              </p>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
              <Zap className="w-10 h-10 text-blue-700 mb-3" />
              <h4 className="text-xl font-bold text-gray-900 mb-2">Agile Transformation</h4>
              <p className="text-gray-600">
                Leading teams through agile adoption, coaching Scrum Masters and Product Owners,
                and facilitating PI Planning at scale.
              </p>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
              <Shield className="w-10 h-10 text-blue-700 mb-3" />
              <h4 className="text-xl font-bold text-gray-900 mb-2">Proven Results</h4>
              <p className="text-gray-600">
                Track record of managing high-visibility projects, reducing support tickets by 67%,
                and delivering $1.5B in value recovery.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
