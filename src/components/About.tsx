import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

const teamMembers = [
  {
    name: 'Sarah Chen',
    role: 'CEO & Growth Strategist',
    bio: '15+ years scaling B2B and B2C companies from seed to Series C.',
    initials: 'SC',
    color: 'emerald',
  },
  {
    name: 'Marcus Rivera',
    role: 'Head of Digital Marketing',
    bio: 'Former Google and Meta ads expert with $200M+ in managed spend.',
    initials: 'MR',
    color: 'teal',
  },
  {
    name: 'Priya Patel',
    role: 'Director of Analytics',
    bio: 'Data scientist turned growth hacker, turning insights into action.',
    initials: 'PP',
    color: 'emerald',
  },
]

const values = [
  { title: 'Data-Driven', description: 'Every decision backed by analytics and measurable outcomes.' },
  { title: 'Transparent', description: 'Clear reporting and honest communication at every step.' },
  { title: 'Long-Term Focus', description: 'We build sustainable growth, not short-term spikes.' },
  { title: 'Collaborative', description: 'We work as an extension of your team, not an outside vendor.' },
]

export default function About() {
  const { ref: headerRef, inView: headerInView } = useInView({ threshold: 0.1, triggerOnce: true })
  const { ref: contentRef, inView: contentInView } = useInView({ threshold: 0.1, triggerOnce: true })
  const { ref: teamRef, inView: teamInView } = useInView({ threshold: 0.1, triggerOnce: true })

  return (
    <section
      id="about"
      className="py-24 lg:py-32 bg-white"
      aria-labelledby="about-heading"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 20 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <span className="text-emerald-600 font-semibold text-sm uppercase tracking-widest mb-3 block">
            Our Story
          </span>
          <h2 id="about-heading" className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 mb-4">
            Growing Businesses Since 2015
          </h2>
          <p className="max-w-3xl mx-auto text-lg text-gray-600">
            Evergreen Scaling was founded with a simple mission: give ambitious businesses access to
            the same growth expertise that Fortune 500 companies enjoy—at a fraction of the cost.
          </p>
        </motion.div>

        {/* Story + Values */}
        <div ref={contentRef} className="grid lg:grid-cols-2 gap-16 items-center mb-24">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={contentInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Mission</h3>
            <p className="text-gray-600 mb-6 leading-relaxed">
              We believe every business deserves access to world-class growth strategy. Our team of
              seasoned experts has helped startups, SMBs, and enterprise companies achieve sustainable,
              predictable revenue growth.
            </p>
            <p className="text-gray-600 mb-8 leading-relaxed">
              Unlike traditional agencies that focus on vanity metrics, we obsess over the numbers
              that actually matter: revenue, profit margins, customer lifetime value, and sustainable
              growth rates.
            </p>
            <div className="flex items-center gap-4 p-6 bg-emerald-50 rounded-2xl border border-emerald-100">
              <div className="flex-shrink-0 w-12 h-12 bg-emerald-600 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                </svg>
              </div>
              <div>
                <p className="font-bold text-gray-900">Award-Winning Agency</p>
                <p className="text-sm text-gray-600">Top Growth Agency 2023 — Inc. Magazine</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={contentInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Our Values</h3>
            <ul className="space-y-4" role="list">
              {values.map((value) => (
                <li key={value.title} className="flex gap-4">
                  <div className="flex-shrink-0 w-6 h-6 bg-emerald-100 rounded-full flex items-center justify-center mt-0.5">
                    <svg className="w-3.5 h-3.5 text-emerald-600" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">{value.title}</p>
                    <p className="text-gray-600 text-sm">{value.description}</p>
                  </div>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* Team */}
        <motion.div
          ref={teamRef}
          initial={{ opacity: 0, y: 30 }}
          animate={teamInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h3 className="text-2xl font-bold text-gray-900 text-center mb-10">Meet the Team</h3>
          <div className="grid sm:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <motion.article
                key={member.name}
                initial={{ opacity: 0, y: 20 }}
                animate={teamInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center p-8 bg-gray-50 rounded-2xl"
                aria-labelledby={`team-${index}-name`}
              >
                <div className="w-20 h-20 bg-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white text-2xl font-bold" aria-hidden="true">{member.initials}</span>
                </div>
                <h4 id={`team-${index}-name`} className="font-bold text-gray-900 text-lg">{member.name}</h4>
                <p className="text-emerald-600 text-sm font-medium mb-2">{member.role}</p>
                <p className="text-gray-600 text-sm">{member.bio}</p>
              </motion.article>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
