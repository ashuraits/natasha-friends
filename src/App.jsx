import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import wishes from './wishes.json'
import logo from './assets/logo.png'

function getCookie(name) {
  const value = `; ${document.cookie}`
  const parts = value.split(`; ${name}=`)
  if (parts.length === 2) return decodeURIComponent(parts.pop().split(';').shift())
  return null
}

function setCookie(name, value, days) {
  const expires = new Date(Date.now() + days * 864e5).toUTCString()
  document.cookie = `${name}=${encodeURIComponent(value)}; expires=${expires}; path=/; SameSite=Lax`
}

const HeaderOrnament = () => (
  <motion.div
    initial={{ opacity: 0, y: -15 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
    className="flex flex-col items-center gap-3 w-full"
  >
    {/* Top row: corner + line + diamond + line + corner */}
    <div className="flex items-center w-full gap-2">
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
        <path d="M1 21 L1 1 L21 1" stroke="rgba(212,168,83,0.6)" strokeWidth="1.2" strokeLinecap="round" fill="none" />
        <circle cx="1" cy="1" r="2" fill="rgba(212,168,83,0.55)" />
      </svg>
      <div style={{ flex: 1, height: '1px', background: 'linear-gradient(to right, rgba(212,168,83,0.15), rgba(212,168,83,0.5))' }} />
      <span style={{ color: 'rgba(212,168,83,0.65)', fontSize: '10px', lineHeight: 1 }}>◆</span>
      <div style={{ flex: 1, height: '1px', background: 'linear-gradient(to left, rgba(212,168,83,0.15), rgba(212,168,83,0.5))' }} />
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
        <path d="M21 21 L21 1 L1 1" stroke="rgba(212,168,83,0.6)" strokeWidth="1.2" strokeLinecap="round" fill="none" />
        <circle cx="21" cy="1" r="2" fill="rgba(212,168,83,0.55)" />
      </svg>
    </div>

  </motion.div>
)

const Corner = ({ rotate }) => (
  <svg
    width="36"
    height="36"
    viewBox="0 0 36 36"
    fill="none"
    style={{ transform: `rotate(${rotate}deg)`, display: 'block' }}
  >
    <path
      d="M2 34 L2 4 Q2 2 4 2 L34 2"
      stroke="rgba(212,168,83,0.6)"
      strokeWidth="1.2"
      strokeLinecap="round"
      fill="none"
    />
    <circle cx="2" cy="2" r="2.5" fill="rgba(212,168,83,0.55)" />
    <circle cx="10" cy="2" r="1" fill="rgba(212,168,83,0.3)" />
    <circle cx="2" cy="10" r="1" fill="rgba(212,168,83,0.3)" />
  </svg>
)

export default function App() {
  const [wish, setWish] = useState(null)

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const shouldRefresh = params.get('bless') === 'new'

    const cached = getCookie('natasha_wish')
    if (cached && !shouldRefresh) {
      setWish(cached)
    } else {
      const picked = wishes[Math.floor(Math.random() * wishes.length)]
      setCookie('natasha_wish', picked, 30)
      setWish(picked)
    }
  }, [])

  return (
    <div
      dir="rtl"
      className="relative min-h-dvh flex flex-col items-center justify-center px-5 py-14 md:py-24 overflow-hidden"
      style={{
        fontFamily: "'Frank Ruhl Libre', Georgia, serif",
        background: '#07050f',
      }}
    >
      {/* Background orbs */}
      <div
        className="orb"
        style={{
          width: 'clamp(260px, 70vw, 700px)',
          height: 'clamp(260px, 70vw, 700px)',
          top: '-15%',
          right: '-20%',
          background: 'radial-gradient(circle, rgba(212,140,40,0.1) 0%, transparent 65%)',
          animationDelay: '0s',
        }}
      />
      <div
        className="orb"
        style={{
          width: 'clamp(200px, 55vw, 550px)',
          height: 'clamp(200px, 55vw, 550px)',
          bottom: '-12%',
          left: '-15%',
          background: 'radial-gradient(circle, rgba(90,30,180,0.18) 0%, transparent 65%)',
          animationDelay: '4s',
        }}
      />
      <div
        className="orb"
        style={{
          width: 'clamp(150px, 35vw, 380px)',
          height: 'clamp(150px, 35vw, 380px)',
          top: '45%',
          left: '35%',
          background: 'radial-gradient(circle, rgba(180,60,100,0.08) 0%, transparent 70%)',
          animationDelay: '2s',
        }}
      />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center gap-8 md:gap-10 text-center max-w-xl w-full">

        {/* Logo */}
        <motion.img
          src={logo}
          alt="Natasha Mind Body Soul"
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.0, ease: [0.22, 1, 0.36, 1] }}
          style={{
            width: '100px',
            height: '100px',
            objectFit: 'cover',
            borderRadius: '50%',
            filter: 'drop-shadow(0 0 12px rgba(212,168,83,0.25))',
          }}
        />

        {/* Header ornament */}
        <HeaderOrnament />

        {/* Sentence 1 — before the wish */}
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.3, ease: 'easeOut' }}
          style={{ color: 'rgba(232,198,120,0.95)', letterSpacing: '0.06em' }}
          className="text-base md:text-lg font-normal"
        >
          דברים מדויקים לא קורים במקרה
        </motion.p>

        {/* Wish card with decorative frame */}
        <AnimatePresence>
          {wish && (
            <motion.div
              key={wish}
              initial={{ opacity: 0, y: 30, filter: 'blur(8px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              transition={{ duration: 1.5, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="w-full relative"
            >
              {/* Outer glow */}
              <div
                style={{
                  position: 'absolute',
                  inset: '-12px',
                  borderRadius: '12px',
                  background: 'radial-gradient(ellipse at center, rgba(212,140,40,0.07) 0%, transparent 70%)',
                  pointerEvents: 'none',
                }}
              />

              {/* Card */}
              <div
                style={{
                  position: 'relative',
                  padding: 'clamp(3rem, 9vw, 5rem) clamp(2.5rem, 10vw, 5.5rem)',
                  background: 'rgba(212,168,83,0.03)',
                  border: '1px solid rgba(212,168,83,0.18)',
                  borderRadius: '6px',
                  boxShadow:
                    '0 0 50px rgba(90,30,180,0.12), inset 0 1px 0 rgba(212,168,83,0.08)',
                }}
              >
                {/* Corners */}
                <span style={{ position: 'absolute', top: -3, right: -3 }}>
                  <Corner rotate={0} />
                </span>
                <span style={{ position: 'absolute', top: -3, left: -3 }}>
                  <Corner rotate={90} />
                </span>
                <span style={{ position: 'absolute', bottom: -3, left: -3 }}>
                  <Corner rotate={180} />
                </span>
                <span style={{ position: 'absolute', bottom: -3, right: -3 }}>
                  <Corner rotate={270} />
                </span>

                {/* Small top ornament */}
                <div
                  style={{
                    position: 'absolute',
                    top: -1,
                    left: '50%',
                    transform: 'translateX(-50%)',
                    color: 'rgba(212,168,83,0.55)',
                    fontSize: '14px',
                    lineHeight: 1,
                    background: '#07050f',
                    padding: '0 8px',
                  }}
                >
                  ✦
                </div>

                <blockquote
                  className="text-xl md:text-3xl leading-loose font-light"
                  style={{
                    color: '#f7edd8',
                    textShadow: '0 0 60px rgba(212,140,40,0.15)',
                    margin: 0,
                  }}
                >
                  {wish}
                </blockquote>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Sentence 2 — after the wish */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 1.4, ease: 'easeOut' }}
          style={{ color: 'rgba(232,198,120,0.95)', letterSpacing: '0.06em' }}
          className="text-base md:text-lg font-normal"
        >
          את/ה במרחק קליק אחד מלייצר מציאות טובה יותר
        </motion.p>

        {/* Decorative bottom line — gold */}
        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{ duration: 1.4, delay: 1.6, ease: [0.22, 1, 0.36, 1] }}
          style={{
            width: '3rem',
            height: '1px',
            background: 'linear-gradient(to right, transparent, rgba(212,168,83,0.7), transparent)',
          }}
        />

        {/* CTA button — gold */}
        <motion.a
          href="https://www.natashafriends.com/"
          target="_blank"
          rel="noopener noreferrer"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.9, ease: 'easeOut' }}
          whileHover={{ scale: 1.03, y: -2 }}
          whileTap={{ scale: 0.97 }}
          className="relative group w-full md:w-auto mt-1"
        >
          {/* Glow */}
          <span
            className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            style={{
              background: 'radial-gradient(ellipse, rgba(212,168,83,0.35) 0%, transparent 70%)',
              filter: 'blur(14px)',
              transform: 'scale(1.25)',
            }}
          />
          <span
            className="relative flex items-center justify-center w-full px-8 py-4 md:px-12 rounded-full text-base md:text-lg font-medium"
            style={{
              background: 'linear-gradient(135deg, #b8862a 0%, #e2b94a 45%, #c9920e 100%)',
              color: '#1a0800',
              letterSpacing: '0.06em',
              boxShadow:
                '0 4px 28px rgba(212,168,83,0.3), inset 0 1px 0 rgba(255,255,255,0.2)',
              WebkitFontSmoothing: 'antialiased',
            }}
          >
            לגלות את הריטריט של נטשה
          </span>
        </motion.a>
      </div>
    </div>
  )
}
