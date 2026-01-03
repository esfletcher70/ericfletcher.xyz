'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import Image from 'next/image'
import { ExternalLink, Award } from 'lucide-react'

const projects = [
  {
    title: 'Healthcare Claims Recovery System',
    description:
      'Leading Agile ceremonies for high-visibility teams developing an enterprise claims recovery application projected to return $1.5 billion in overpaid claims. Coaching Product Owners and leaders on Agile best practices while collecting and reporting key metrics to executive leadership.',
    image: 'https://cdn.abacus.ai/images/44d6d642-0958-4b52-9ec1-a543bbe5f39a.jpg',
    tags: ['Scrum Master', 'Agile Coaching', 'Healthcare', 'Enterprise'],
    highlights: ['$1.5B Value Recovery', 'Cross-functional Teams', 'Executive Reporting'],
  },
  {
    title: 'Healthcare Member Portal & Mobile App',
    description:
      'Served as Release Train Engineer and Agile Product Owner for mobile application and member website transformation. Led PI Planning, coached Scrum Masters and Product Managers, and facilitated ART-level meetings. First in solution train to launch on new cloud platform.',
    image: 'https://cdn.abacus.ai/images/f4504f06-c8a1-45df-92d7-e91cc9ba3e76.jpg',
    tags: ['RTE', 'Product Owner', 'Mobile', 'Cloud Platform'],
    highlights: ['Cloud Platform Launch', 'PI Planning Facilitation', 'Team Alignment'],
    award: true,
  },
  {
    title: 'Healthcare Operations Mobile Application',
    description:
      'Led development of innovative mobile application used by medical center staff for operational workflows. Received CIO Award for Innovation for transforming healthcare operations and improving staff efficiency through mobile-first design.',
    image: 'https://cdn.abacus.ai/images/11e90c1b-98bf-4ea3-b859-f1ef038ead1c.jpg',
    tags: ['Product Owner', 'Healthcare', 'Innovation', 'Mobile'],
    highlights: ['CIO Award Winner', 'Staff Efficiency', 'Mobile Innovation'],
    award: true,
  },
  {
    title: 'E-commerce Order Management Platform',
    description:
      'Product Owner for an online order entry and management system. Investigated business needs, documented requirements, and worked with engineering teams to deliver solutions. Reduced application support tickets from 750+ to under 250 in just 6 months.',
    image: 'https://cdn.abacus.ai/images/4fd741a8-1872-4b62-8166-3239128d2cf0.jpg',
    tags: ['Product Owner', 'E-commerce', 'Process Improvement'],
    highlights: ['67% Ticket Reduction', 'Process Optimization', 'User Experience'],
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
            Delivering impactful solutions across healthcare, finance, and technology sectors
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

                  <p className="text-gray-600 mb-4 leading-relaxed">
                    {project.description}
                  </p>

                  <div className="mb-4">
                    <h4 className="font-semibold text-gray-900 mb-2">Key Achievements:</h4>
                    <ul className="space-y-1">
                      {project.highlights.map((highlight, idx) => (
                        <li key={idx} className="flex items-center text-sm text-gray-600">
                          <ExternalLink className="w-4 h-4 text-blue-700 mr-2 flex-shrink-0" />
                          {highlight}
                        </li>
                      ))}
                    </ul>
                  </div>

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
