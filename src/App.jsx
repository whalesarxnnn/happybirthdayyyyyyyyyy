import React, { useState, useEffect } from 'react'

function Heart({ style }) {
  return <div className="heart absolute w-6 h-6 transform -rotate-45 bg-pink-400" style={style}></div>
}

export default function App() {
  const [open, setOpen] = useState(false)
  const [hearts, setHearts] = useState([])
  const [confetti, setConfetti] = useState([])
  const [emojis, setEmojis] = useState([])

  useEffect(() => {
    createEmojis()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  function triggerHearts() {
    const next = Array.from({ length: 18 }).map((_, i) => ({
      id: i + Date.now(),
      left: Math.random() * 80 + '%',
      delay: Math.random() * 1 + 's',
      size: Math.random() * 14 + 10
    }))
    setHearts(next)
  }

  function triggerConfetti() {
    // create many small paper confetti pieces (square/rect) for a slow full-screen burst
    const colors = ['#F43F5E', '#FB923C', '#F59E0B', '#10B981', '#3B82F6', '#8B5CF6', '#EC4899', '#06B6D4']
    const count = 180
    const pieces = Array.from({ length: count }).map((_, i) => {
      // random angle + distance to explode from center
      const angle = Math.random() * Math.PI * 2
      const distance = Math.round(200 + Math.random() * 1100)
      const tx = Math.round(Math.cos(angle) * distance)
      const ty = Math.round(Math.sin(angle) * distance + Math.random() * 300)
      const rot = Math.round(Math.random() * 720 - 360)
      const delay = (Math.random() * 0.5).toFixed(2) + 's'
      const dur = Math.round(3000 + Math.random() * 2200) + 'ms' // ~3s-5.2s
      const size = Math.round(Math.random() * 10) + 6 // small square/rect
      const aspect = Math.random() > 0.6 ? (1 + Math.random() * 1.2) : 1 // sometimes rectangle
      const w = Math.round(size * aspect)
      const h = Math.round(size / aspect)
      return {
        id: i + Date.now(),
        tx,
        ty,
        rot,
        delay,
        dur,
        w,
        h,
        color: colors[i % colors.length]
      }
    })
    setConfetti(pieces)
    // clear after longest animation
    setTimeout(() => setConfetti([]), 6200)
  }

  function createEmojis() {
    const chars = ['🎉', '🎂', '❤️', '💐', '😍', '✨', '🎈', '🥳', '🌟', '💖']
  const count = 30
    const pieces = Array.from({ length: count }).map((_, i) => {
      const left = Math.round(Math.random() * 100) + '%'
      const top = Math.round(Math.random() * 100) + '%'
      const size = Math.round(14 + Math.random() * 30) // font size px
      const delay = (Math.random() * 3).toFixed(2) + 's'
      const dur = Math.round(6000 + Math.random() * 8000) + 'ms' // slow floating
      const opacity = (0.25 + Math.random() * 0.75).toFixed(2)
      return {
        id: i + Date.now(),
        char: chars[i % chars.length],
        left,
        top,
        size,
        delay,
        dur,
        opacity,
      }
    })
    setEmojis(pieces)
  }

  function openSurprise() {
    setOpen(true)
    triggerHearts()
    triggerConfetti()
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-500 via-pink-500 to-yellow-300 flex items-center justify-center p-6">

      {/* background emojis (floating, pointer-events-none) */}
      {emojis.length > 0 && (
        <div className="pointer-events-none fixed inset-0" style={{ zIndex: 10 }} aria-hidden>
          {emojis.map((e) => (
            <span
              key={e.id}
              className="emoji-piece absolute"
              style={{
                left: e.left,
                top: e.top,
                fontSize: e.size + 'px',
                opacity: e.opacity,
                transform: 'translate(-50%,-50%)',
                animationDelay: e.delay,
                ['--dur']: e.dur,
              }}
            >
              {e.char}
            </span>
          ))}
        </div>
      )}

      <div className="max-w-3xl w-full bg-white/70 backdrop-blur-md rounded-3xl shadow-2xl p-8 text-center relative z-20">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4">สุขสันต์วันเกิด 🎂</h1>
        <p className="text-lg text-gray-700 mb-6">เซอร์ไพรส์เล็กๆ จากใจ — กดปุ่มด้านล่างเพื่อเปิดของขวัญ</p>

        <button
          onClick={openSurprise}
          className="inline-flex items-center gap-2 px-6 py-3 bg-pink-500 hover:bg-pink-600 text-white rounded-full font-semibold shadow-lg transition"
        >
          เปิดเซอร์ไพรส์
        </button>

        <div className="mt-8 text-sm text-gray-600">เคล็ดลับ: คลิกอีกครั้งในกล่องเซอร์ไพรส์เพื่อปิด</div>
      </div>

      {open && (
        <div
          className="fixed inset-0 flex items-center justify-center z-50"
          onClick={() => setOpen(false)}
          role="dialog"
          aria-modal="true"
        >
          <div className="absolute inset-0 bg-black/50"></div>

          <div className="relative bg-white rounded-2xl p-8 max-w-xl w-full mx-4 shadow-2xl text-center" onClick={(e) => e.stopPropagation()}>
            <h2 className="text-3xl font-bold text-pink-600 mb-4">สุขสันต์วันเกิดนะหนูน้อย💕</h2>
            <p className="mb-6 text-gray-700">สุขสันต์วันเกิดนะน้องคนเก่ง 🎂✨ <br />
ขอให้ปีนี้เป็นปีที่สดใสเหมือนรอยยิ้มของหนูนะ
มีความสุขมาก ๆ สมหวังในสิ่งที่ตั้งใจ
เรียนเก่งขึ้น โตขึ้นอย่างมีความสุข
และขอให้มีแต่เรื่องดี ๆ เข้ามาในทุกวันเลยนะ 💖</p>
            <button
              className="px-5 py-2 bg-gray-200 text-gray-800 rounded-full font-semibold shadow hover:bg-gray-300"
              onClick={() => setOpen(false)}
              aria-label="ปิด"
            >
              ปิด
            </button>

            <div className="hearts-container pointer-events-none">
              {hearts.map((h) => (
                <span
                  key={h.id}
                  className="heart absolute bg-pink-400"
                  style={{
                    left: h.left,
                    width: h.size,
                    height: h.size,
                    animationDelay: h.delay,
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      )}

      {/* confetti pieces (shown on open) */}
      {confetti.length > 0 && (
        <div className="pointer-events-none fixed inset-0" style={{ zIndex: 99999 }} aria-hidden>
          {confetti.map((c) => (
            <span
              key={c.id}
              className="confetti-piece block absolute"
              style={{
                left: '50%',
                top: '50%',
                width: c.w,
                height: c.h,
                background: c.color,
                transform: `translate(-50%,-50%) rotate(${c.rot}deg)`,
                animationDelay: c.delay,
                ['--tx']: `${c.tx}px`,
                ['--ty']: `${c.ty}px`,
                ['--dur']: c.dur,
              }}
            />
          ))}
        </div>
      )}


      <style>{`
        .heart::before, .heart::after {
          content: "";
          position: absolute;
          width: inherit;
          height: inherit;
          background: inherit;
          border-radius: 50%;
        }
        .heart::before { top: -50%; left: 0; }
        .heart::after { left: 50%; top: 0; }
        .heart { transform: rotate(-45deg); animation: floatUp 3s linear forwards; }
        @keyframes floatUp {
          0% { transform: translateY(0) rotate(-45deg); opacity: 1; }
          100% { transform: translateY(-400px) rotate(-45deg); opacity: 0; }
        }

        /* ribbon-like confetti */
        .confetti-piece {
          left: 50%;
          top: 50%;
          transform-origin: center;
          border-radius: 3px;
          box-shadow: 0 2px 6px rgba(0,0,0,0.12);
          will-change: transform, opacity;
          /* duration controlled via CSS var --dur (set inline) */
          animation: ribbonFall var(--dur, 3200ms) cubic-bezier(.2,.7,.2,1) forwards;
          opacity: 1;
        }

        /* confetti paper pieces - fluttering burst */
        .confetti-piece {
          left: 50%;
          top: 50%;
          transform-origin: center;
          border-radius: 2px;
          box-shadow: 0 2px 6px rgba(0,0,0,0.12);
          will-change: transform, opacity;
          animation: confettiBurst var(--dur, 3600ms) cubic-bezier(.2,.7,.2,1) forwards;
          opacity: 1;
        }

        @keyframes confettiBurst {
          0% {
            transform: translate(-50%,-50%) translate(0,0) rotate(0deg);
            opacity: 1;
          }
          20% {
            transform: translate(-50%,-50%) translate(calc(var(--tx) * 0.28), calc(var(--ty) * 0.12)) rotate(60deg);
          }
          40% {
            transform: translate(-50%,-50%) translate(calc(var(--tx) * -0.15), calc(var(--ty) * 0.35)) rotate(-30deg);
            opacity: 0.95;
          }
          60% {
            transform: translate(-50%,-50%) translate(calc(var(--tx) * 0.5), calc(var(--ty) * 0.6)) rotate(160deg);
          }
          80% {
            transform: translate(-50%,-50%) translate(calc(var(--tx) * -0.06), calc(var(--ty) * 0.85)) rotate(260deg);
            opacity: 0.85;
          }
          100% {
            transform: translate(-50%,-50%) translate(var(--tx), var(--ty)) rotate(480deg);
            opacity: 0;
          }
        }

        /* emoji background pieces */
        .emoji-piece {
          position: absolute;
          display: inline-block;
          transform-origin: center;
          will-change: transform, opacity;
          animation: floatEmoji var(--dur, 9000ms) ease-in-out infinite alternate;
        }

        @keyframes floatEmoji {
          0% { transform: translate(-50%,-50%) translateY(0) rotate(0deg); opacity: 0.6; }
          25% { transform: translate(-50%,-50%) translateY(-20px) rotate(10deg); opacity: 0.9; }
          50% { transform: translate(-50%,-50%) translateY(-40px) rotate(-8deg); opacity: 0.8; }
          75% { transform: translate(-50%,-50%) translateY(-20px) rotate(6deg); opacity: 0.9; }
          100% { transform: translate(-50%,-50%) translateY(0) rotate(0deg); opacity: 0.6; }
        }
      `}</style>
    </div>
  )
}
