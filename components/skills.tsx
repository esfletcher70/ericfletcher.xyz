'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import {
  Target,
  Users2,
  BarChart3,
  GitBranch,
  Workflow,
} from 'lucide-react'

const skillCategories = [
  {
    icon: Target,
    title: 'Product Management',
    skills: [
      'Roadmap & Strategy',
      'Backlog Prioritization',
      'User Stories & Acceptance Criteria',
      'Release Planning',
    ],
  },
  {
    icon: Users2,
    title: 'Leadership & Program Management',
    skills: [
      'Stakeholder & Executive Communication',
      'Cross-functional Team Leadership',
      'Risk & Budget Management',
      'Change Management',
    ],
  },
  {
    icon: BarChart3,
    title: 'Domain Expertise',
    skills: [
      'Healthcare IT',
      'Financial Services',
      'Enterprise SaaS',
      'Mobile & E-commerce',
    ],
  },
  {
    icon: GitBranch,
    title: 'Tools',
    skills: [
      'JIRA & Confluence',
      'Azure DevOps',
      'Business Analytics',
    ],
  },
  {
    icon: Workflow,
    title: 'Delivery Method: Agile / Scrum / SAFe',
    skills: [
      'CSM, CSPO, SAFe RTE & Product Owner certified',
      'Used to keep prioritization sharp and delivery predictable',
    ],
  },
]

export default function Skills() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  return (
    <section id="skills" className="py-20 bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
            Skills & Expertise
          </h2>
          <div className="w-24 h-1 bg-blue-700 mx-auto mb-6" />
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Product management skills, backed by an Agile/Scrum/SAFe delivery toolkit
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skillCategories.map((category, index) => {
            const Icon = category.icon
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all"
              >
                <div className="flex items-center mb-4">
                  <div className="bg-blue-100 w-12 h-12 rounded-lg flex items-center justify-center mr-3">
                    <Icon className="w-6 h-6 text-blue-700" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">{category.title}</h3>
                </div>
                <ul className="space-y-2">
                  {category.skills.map((skill, idx) => (
                    <li key={idx} className="flex items-start text-gray-600">
                      <div className="w-1.5 h-1.5 bg-blue-700 rounded-full mr-2 mt-2 flex-shrink-0" />
                      <span className="text-sm">{skill}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
