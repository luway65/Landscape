import { memo, useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

const stats = [
  { value: 500, suffix: '+', label: 'Clients Served', description: 'Businesses scaled across industries' },
  { value: 10, suffix: 'x', label: 'Average ROI', description: 'Return on investment for our clients' },
  { value: 98, suffix: '%', label: 'Satisfaction Rate', description: 'Client retention and satisfaction' },
  { value: 50, prefix: '$', suffix: 'M+', label: 'Revenue Generated', description: 'Total client revenue attributed' },
]

const CountUp = memo(({ end, duration = 2000 }: { end: number; duration?: number }) => {
  const [count, setCount] = useState(0)
  const { ref, inView } = useInView({ threshold: 0.5, triggerOnce: true })
  const startTimeRef = useRef<number | null>(null)
  const frameRef = useRef<number | null>(null)

  useEffect(() => {
    if (!inView) return

    const animate = (timestamp: number) => {
      if (startTimeRef.current === null) startTimeRef.current = timestamp
      const elapsed = timestamp - startTimeRef.current
      const progress = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(Math.floor(eased * end))

      if (progress < 1) {
        frameRef.current = requestAnimationFrame(animate)
      }
    }

    frameRef.current = requestAnimationFrame(animate)
    return () => {
      if (frameRef.current !== null) cancelAnimationFrame(frameRef.current)
    }
  }, [inView, end, duration])

  return <span ref={ref}>{count}</span>
})

CountUp.displayName = 'CountUp'

export default function Stats() {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true })

  return (
    <section
      className="py-24 bg-gradient-to-br from-emerald-900 to-teal-800"
      aria-labelledby="stats-heading"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 id="stats-heading" className="text-3xl sm:text-4xl font-extrabold text-white mb-4">
            Results That Speak for Themselves
          </h2>
          <p className="text-emerald-200 text-lg max-w-xl mx-auto">
            Our track record of success spans hundreds of businesses and millions in revenue.
          </p>
        </motion.div>

        <dl className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="text-center p-8 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/10"
            >
              <dd className="text-5xl font-extrabold text-white mb-2" aria-label={`${stat.value}${stat.suffix} ${stat.label}`}>
                <span aria-hidden="true">
                  {stat.prefix}
                  <CountUp end={stat.value} />
                  {stat.suffix}
                </span>
              </dd>
              <dt className="text-emerald-300 font-bold text-lg mb-1">{stat.label}</dt>
              <p className="text-emerald-200/70 text-sm">{stat.description}</p>
            </motion.div>
          ))}
        </dl>
      </div>
    </section>
  )
}
