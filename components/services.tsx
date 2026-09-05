'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import {
  Briefcase,
  Compass,
  ListChecks,
  Users,
} from 'lucide-react'

const services = [
  {
    icon: Briefcase,
    title: 'Fractional / Contract Product Management',
    description:
      'Embedded product leadership for as long as you need it — full ownership of your roadmap and team without a full-time hire.',
    highlights: [
      'Product decisions owned from day one',
      'Ramps up faster than a full-time search',
      'Scales up or down with your needs',
    ],
  },
  {
    icon: Compass,
    title: 'Product Roadmap & Strategy',
    description:
      'Turn business goals into a roadmap that engineering, sales, and leadership can all rally around.',
    highlights: [
      'A prioritized roadmap tied to business outcomes',
      'Shared alignment across leadership and teams',
      'A living plan that adapts as priorities shift',
    ],
  },
  {
    icon: ListChecks,
    title: 'Backlog Prioritization & Release Planning',
    description:
      'Keep the backlog sharp and releases predictable, so teams always know what to build next and why.',
    highlights: [
      'A backlog ranked by impact, not noise',
      'Predictable, dependable release cadence',
      'Less rework from clearer acceptance criteria',
    ],
  },
  {
    icon: Users,
    title: 'Stakeholder Alignment & Product Cadence',
    description:
      'Establish the rhythms and reporting that keep execs, customers, and teams moving in sync.',
    highlights: [
      'Fewer surprises for stakeholders',
      'A consistent cadence for decisions and updates',
      'Clear visibility into progress and tradeoffs',
    ],
  },
]

export default function Services() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  return (
    <section id="services" className="py-20 bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
            Services
          </h2>
          <div className="w-24 h-1 bg-blue-700 mx-auto mb-6" />
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Product leadership that turns strategy into shipped outcomes
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {services.map((service, index) => {
            const Icon = service.icon
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all hover:-translate-y-1"
              >
                <div className="bg-blue-100 w-14 h-14 rounded-lg flex items-center justify-center mb-4">
                  <Icon className="w-7 h-7 text-blue-700" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{service.title}</h3>
                <p className="text-gray-600 mb-4">{service.description}</p>
                <ul className="space-y-2">
                  {service.highlights.map((highlight, idx) => (
                    <li key={idx} className="flex items-center text-sm text-gray-600">
                      <div className="w-1.5 h-1.5 bg-blue-700 rounded-full mr-2" />
                      {highlight}
                    </li>
                  ))}
                </ul>
              </motion.div>
            )
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-12 max-w-3xl mx-auto text-center bg-white rounded-xl p-6 shadow-md"
        >
          <h3 className="text-lg font-bold text-gray-900 mb-2">How I work</h3>
          <p className="text-gray-600">
            I deliver through Agile, Scrum, and SAFe practices — not as services in themselves,
            but as the operating rhythm that keeps roadmaps, backlogs, and stakeholders moving in sync.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
