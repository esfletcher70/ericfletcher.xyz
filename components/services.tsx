'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import {
  Target,
  Users,
  TrendingUp,
  GitBranch,
  CheckCircle,
  MessageSquare,
} from 'lucide-react'

const services = [
  {
    icon: Users,
    title: 'Scrum Master Services',
    description:
      'Facilitate Agile ceremonies, coach teams on best practices, and remove impediments to enable high-performing teams.',
    highlights: ['Daily Stand-ups', 'Sprint Planning', 'Retrospectives', 'Team Coaching'],
  },
  {
    icon: Target,
    title: 'Product Ownership',
    description:
      'Define product vision, manage backlogs, prioritize features, and ensure delivery of customer-focused solutions.',
    highlights: ['Backlog Management', 'User Story Creation', 'Acceptance Criteria', 'Stakeholder Management'],
  },
  {
    icon: TrendingUp,
    title: 'Release Train Engineer',
    description:
      'Facilitate Program Increment planning, coordinate multiple teams, and drive alignment across Agile Release Trains.',
    highlights: ['PI Planning', 'ART Coordination', 'Risk Management', 'Value Stream Delivery'],
  },
  {
    icon: GitBranch,
    title: 'Agile Transformation',
    description:
      'Lead organizational change initiatives, establish agile frameworks, and coach leaders on agile principles.',
    highlights: ['Framework Implementation', 'Leadership Coaching', 'Process Optimization', 'Change Management'],
  },
  {
    icon: CheckCircle,
    title: 'Project Management',
    description:
      'Manage complex projects with competing priorities, coordinate cross-functional teams, and ensure on-time delivery.',
    highlights: ['Budget Management', 'Timeline Planning', 'Resource Allocation', 'Risk Mitigation'],
  },
  {
    icon: MessageSquare,
    title: 'Team Leadership & Coaching',
    description:
      'Mentor team members, facilitate collaboration, and create environments where teams can thrive and deliver excellence.',
    highlights: ['Team Building', 'Conflict Resolution', 'Performance Coaching', 'Culture Development'],
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
            Comprehensive Agile leadership and project management services tailored to drive results
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
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
      </div>
    </section>
  )
}
