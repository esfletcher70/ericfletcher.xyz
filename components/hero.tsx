'use client'

import { motion } from 'framer-motion'
import { ArrowRight, Award, Users, Briefcase } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function Hero() {
  const scrollToContact = () => {
    document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center pt-16 overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob" />
        <div className="absolute top-40 right-10 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-2000" />
        <div className="absolute bottom-20 left-1/2 w-72 h-72 bg-blue-100 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-4000" />
      </div>

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-gray-900 mb-6">
              Senior Product Manager
              <span className="block text-blue-700 mt-2">Fractional & Contract PM</span>
            </h1>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl sm:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto"
          >
            15+ years shipping digital products. I help small teams get clear on{' '}
            <span className="font-semibold text-blue-700">what to build</span>, prioritize
            ruthlessly, and deliver it — without a full-time hire.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-wrap justify-center gap-3 mb-8 text-sm sm:text-base"
          >
            {['SaaS', 'Consumer Tech', 'EV / Tech Hardware', 'Social-Impact Tech'].map((tag) => (
              <span
                key={tag}
                className="bg-blue-50 text-blue-700 border border-blue-200 rounded-full px-4 py-1.5 font-medium"
              >
                {tag}
              </span>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-wrap justify-center gap-4 mb-4"
          >
            <Button
              onClick={scrollToContact}
              size="lg"
              className="bg-blue-700 hover:bg-blue-800 text-lg px-8 py-6"
            >
              Book a 15-Minute Intro
              <ArrowRight className="ml-2" size={20} />
            </Button>
            <Button
              onClick={() =>
                document.querySelector('#portfolio')?.scrollIntoView({ behavior: 'smooth' })
              }
              size="lg"
              variant="outline"
              className="border-blue-700 text-blue-700 hover:bg-blue-50 text-lg px-8 py-6"
            >
              View Work
            </Button>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="text-sm sm:text-base text-gray-500 mb-12"
          >
            Available for fractional/contract PM work starting January.
          </motion.p>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-4xl mx-auto mt-16"
          >
            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
              <Award className="w-12 h-12 text-blue-700 mx-auto mb-3" />
              <div className="text-4xl font-bold text-gray-900 mb-2">15+</div>
              <div className="text-gray-600">Years in Product</div>
            </div>
            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
              <Briefcase className="w-12 h-12 text-blue-700 mx-auto mb-3" />
              <div className="text-4xl font-bold text-gray-900 mb-2">$1.5B</div>
              <div className="text-gray-600">Product Value Shipped</div>
            </div>
            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
              <Users className="w-12 h-12 text-blue-700 mx-auto mb-3" />
              <div className="text-4xl font-bold text-gray-900 mb-2">50+</div>
              <div className="text-gray-600">Product Teams Led</div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
