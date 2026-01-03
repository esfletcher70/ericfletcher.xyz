'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Quote, Star } from 'lucide-react'

const testimonials = [
  {
    name: 'Senior Product Manager',
    company: 'Kaiser Permanente',
    role: 'Collaboration Partner',
    content:
      'Eric\'s expertise in facilitating PI Planning and coaching our Scrum Masters was instrumental in our successful Azure platform launch. His ability to align multiple teams and drive results is exceptional.',
    rating: 5,
  },
  {
    name: 'Development Team Lead',
    company: 'Centene Corporation',
    role: 'Team Member',
    content:
      'Working with Eric has transformed how our team approaches Agile. His coaching and guidance have made our ceremonies more effective and our delivery more predictable. A true Agile leader.',
    rating: 5,
  },
  {
    name: 'Executive Sponsor',
    company: 'Business Wire',
    role: 'Stakeholder',
    content:
      'Eric\'s work as Product Owner on Business Wire Connect delivered measurable results - reducing our support tickets by 67%. His ability to translate business needs into effective solutions is outstanding.',
    rating: 5,
  },
]

export default function Testimonials() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  return (
    <section id="testimonials" className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
            What People Say
          </h2>
          <div className="w-24 h-1 bg-blue-700 mx-auto mb-6" />
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Trusted by teams and leaders across multiple organizations
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-gradient-to-br from-blue-50 to-slate-50 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all relative"
            >
              <Quote className="w-10 h-10 text-blue-700 opacity-20 absolute top-4 right-4" />
              <div className="flex mb-3">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-5 h-5 text-yellow-400 fill-current"
                  />
                ))}
              </div>
              <p className="text-gray-700 mb-6 leading-relaxed italic">
                "{testimonial.content}"
              </p>
              <div className="border-t border-gray-200 pt-4">
                <p className="font-bold text-gray-900">{testimonial.name}</p>
                <p className="text-sm text-blue-700">{testimonial.role}</p>
                <p className="text-sm text-gray-600">{testimonial.company}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
