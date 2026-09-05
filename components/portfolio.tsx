'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import Image from 'next/image'
import { Award } from 'lucide-react'

const projects = [
  {
    title: 'Healthcare Claims Recovery Program',
    problem: 'Overpaid claims across a large healthcare payer were going unrecovered, with no clear prioritization or executive visibility.',
    role: 'Owned prioritization for the recovery roadmap and reported progress directly to executive leadership.',
    result: '$1.5B in projected claims recovery.',
    image: 'https://cdn.abacus.ai/images/44d6d642-0958-4b52-9ec1-a543bbe5f39a.jpg',
    tags: ['Healthcare', 'Enterprise', 'Executive Reporting'],
  },
  {
    title: 'Member Portal & Mobile App: Cloud Platform Launch',
    problem: 'A legacy member portal and mobile app needed to move to a new cloud platform without breaking delivery across multiple teams.',
    role: 'Owned the product and program plan across teams and aligned roadmaps end-to-end.',
    result: 'First product in the solution train to launch on the new Azure cloud platform.',
    image: 'https://cdn.abacus.ai/images/f4504f06-c8a1-45df-92d7-e91cc9ba3e76.jpg',
    tags: ['Healthcare', 'Mobile', 'Cloud Platform'],
    award: true,
  },
  {
    title: 'Operations Mobile App: CIO Innovation Award',
    problem: 'Medical center staff relied on manual, paper-based workflows that slowed daily operations.',
    role: 'Owned product vision and requirements for a mobile-first replacement, working directly with engineering and end users.',
    result: 'CIO Magazine Innovation Award and a measurable gain in staff efficiency.',
    image: 'https://cdn.abacus.ai/images/11e90c1b-98bf-4ea3-b859-f1ef038ead1c.jpg',
    tags: ['Healthcare', 'Mobile', 'Innovation'],
    award: true,
  },
  {
    title: 'E-commerce Order Management Platform',
    problem: 'Order management support tickets had climbed past 750 a month, signaling a broken user experience.',
    role: 'Sole product owner — diagnosed root causes, redefined requirements, and drove fixes with engineering.',
    result: 'Support tickets cut from 750+ to under 250 in 6 months (a 67% reduction).',
    image: 'https://cdn.abacus.ai/images/4fd741a8-1872-4b62-8166-3239128d2cf0.jpg',
    tags: ['E-commerce', 'Product Ownership'],
  },
]

export default function Portfolio() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  return (
    <section id="portfolio" className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
            Featured Projects
          </h2>
          <div className="w-24 h-1 bg-blue-700 mx-auto mb-6" />
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Selected outcomes: the problem, my role, and the result
          </p>
        </motion.div>

        <div className="space-y-12">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-gradient-to-br from-slate-50 to-blue-50 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all"
            >
              <div className="grid md:grid-cols-2 gap-8">
                <div className="relative aspect-video bg-gray-200 overflow-hidden">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>

                <div className="p-8 flex flex-col justify-center">
                  <div className="flex items-start justify-between mb-4">
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">
                      {project.title}
                    </h3>
                    {project.award && (
                      <Award className="w-8 h-8 text-yellow-500 flex-shrink-0" />
                    )}
                  </div>

                  <dl className="space-y-3 mb-4">
                    <div>
                      <dt className="text-xs font-semibold uppercase tracking-wide text-gray-500">Problem</dt>
                      <dd className="text-gray-600 leading-relaxed">{project.problem}</dd>
                    </div>
                    <div>
                      <dt className="text-xs font-semibold uppercase tracking-wide text-gray-500">My Role</dt>
                      <dd className="text-gray-600 leading-relaxed">{project.role}</dd>
                    </div>
                    <div>
                      <dt className="text-xs font-semibold uppercase tracking-wide text-blue-700">Result</dt>
                      <dd className="text-gray-900 font-semibold leading-relaxed">{project.result}</dd>
                    </div>
                  </dl>

                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 bg-blue-100 text-blue-700 text-sm font-medium rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
