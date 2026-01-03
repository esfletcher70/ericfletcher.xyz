'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import {
  Award,
  GitBranch,
  FileCheck,
  BarChart3,
  Users2,
  Workflow,
} from 'lucide-react'

const skillCategories = [
  {
    icon: Award,
    title: 'Certifications',
    skills: [
      'Certified Scrum Master (CSM)',
      'Certified Scrum Product Owner (CSPO)',
      'SAFe 5 Release Train Engineer',
      'SAFe 5 Scrum Master',
      'SAFe 4 Product Owner/Product Manager',
    ],
  },
  {
    icon: Workflow,
    title: 'Agile Frameworks',
    skills: [
      'Scrum',
      'SAFe (Scaled Agile Framework)',
      'Kanban',
      'Lean',
      'Program Increment Planning',
      'Agile Release Train (ART)',
    ],
  },
  {
    icon: FileCheck,
    title: 'Project Management',
    skills: [
      'Product Backlog Management',
      'User Story Creation',
      'Sprint Planning & Execution',
      'Risk Management',
      'Budget Management',
      'Stakeholder Communication',
    ],
  },
  {
    icon: Users2,
    title: 'Leadership & Coaching',
    skills: [
      'Team Facilitation',
      'Agile Coaching',
      'Conflict Resolution',
      'Change Management',
      'Cross-functional Collaboration',
      'Mentoring & Training',
    ],
  },
  {
    icon: GitBranch,
    title: 'Tools & Technologies',
    skills: [
      'JIRA & Confluence',
      'Azure DevOps',
      'Microsoft Office Suite',
      'ServiceNow',
      'Slack & MS Teams',
      'Version Control (Git)',
    ],
  },
  {
    icon: BarChart3,
    title: 'Domain Expertise',
    skills: [
      'Healthcare IT',
      'Financial Services',
      'Enterprise Software',
      'Mobile Applications',
      'Ecommerce Platforms',
      'Business Analytics',
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
            A comprehensive toolkit for driving agile transformation and delivering excellence
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
