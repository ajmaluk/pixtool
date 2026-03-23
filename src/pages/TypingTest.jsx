import { useEffect, useMemo, useRef, useState } from 'react'
import { Type, TimerReset, RefreshCw, Trophy, Keyboard, Copy } from 'lucide-react'
import SEO from '../components/SEO'
import ShareTool from '../components/ShareTool'
import Breadcrumbs from '../components/Breadcrumbs'
import { UTILITY_READ_NEXT } from '../data/utilityToolsData'
import AdSpace from '../components/AdSpace'
import ToolContent from '../components/ToolContent'

const WORDS = [
  'time', 'person', 'year', 'way', 'day', 'thing', 'man', 'world', 'life', 'hand', 'part', 'child', 'eye', 'woman', 'place', 'work', 'week', 'case', 'point', 'government', 'company', 'number', 'group', 'problem', 'fact',
  'learn', 'code', 'type', 'speed', 'quick', 'brown', 'fox', 'jumps', 'over', 'lazy', 'dog', 'react', 'tools', 'daily', 'privacy', 'browser', 'image', 'pdf', 'email', 'qr', 'secure', 'local', 'fast', 'free', 'utility',
  'smart', 'clean', 'modern', 'design', 'pixel', 'canvas', 'merge', 'split', 'compress', 'convert', 'protect', 'watermark', 'reorder', 'resize', 'crop', 'rotate', 'flip', 'grayscale', 'web', 'online', 'instant'
]

function shuffle(arr) {
  const a = arr.slice()
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
      ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

export default function TypingTest() {
  const [duration, setDuration] = useState(60)
  const [timeLeft, setTimeLeft] = useState(60)
  const [running, setRunning] = useState(false)
  const [input, setInput] = useState('')
  const [wordIndex, setWordIndex] = useState(0)
  const [words, setWords] = useState(() => shuffle(WORDS).slice(0, 220))
  const [correctChars, setCorrectChars] = useState(0)
  const [typedChars, setTypedChars] = useState(0)

  const [results, setResults] = useState(null)
  const inputRef = useRef(null)
  const timerRef = useRef(null)

  const accuracy = useMemo(() => {
    if (typedChars === 0) return 100
    return Math.max(0, Math.min(100, Math.round((correctChars / typedChars) * 100)))
  }, [correctChars, typedChars])

  const elapsed = useMemo(() => (duration - timeLeft) || 1, [duration, timeLeft])
  const wpm = useMemo(() => {
    const cpm = correctChars / Math.max(1, elapsed / 60)
    return Math.round(cpm / 5)
  }, [correctChars, elapsed])

  useEffect(() => {
    if (!running) return
    timerRef.current && clearInterval(timerRef.current)
    timerRef.current = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timerRef.current)
          setRunning(false)
          setResults({
            wpm,
            accuracy
          })
          return 0
        }
        return prev - 1
      })
    }, 1000)
    return () => clearInterval(timerRef.current)
  }, [running, wpm, accuracy])

  const restart = (keepDuration = true) => {
    timerRef.current && clearInterval(timerRef.current)
    setRunning(false)
    setTimeLeft(keepDuration ? duration : 60)
    setInput('')
    setWordIndex(0)
    setWords(shuffle(WORDS).slice(0, 220))
    setCorrectChars(0)
    setTypedChars(0)

    setResults(null)
    setTimeout(() => inputRef.current?.focus(), 0)
  }

  const handleInput = (e) => {
    const val = e.target.value
    if (!running && timeLeft > 0 && !results) setRunning(true)

    if (val.endsWith(' ')) {
      const current = words[wordIndex] || ''
      const trimmed = val.trim()
      if (trimmed === current) {

        setCorrectChars(c => c + current.length + 1)
      }
      setWordIndex(i => i + 1)
      setTypedChars(prev => prev + 1) // Count the space
      setInput('')
    } else {
      setInput(val)
      setTypedChars(prev => prev + 1)
    }
  }

  const copyResults = () => {
    if (!results) return
    const text = `My Typing Speed: ${results.wpm} WPM with ${results.accuracy}% accuracy on PixTool!`
    navigator.clipboard.writeText(text)
  }

  const handleKeyDown = (e) => {
    if (e.key === ' ' || e.key === 'Enter') {
      e.preventDefault()
      const current = words[wordIndex] || ''
      const trimmed = input.trim()
      if (trimmed.length > 0) {
        if (trimmed === current) {

          setCorrectChars(c => c + current.length + 1)
        }
      }
      setWordIndex(i => i + 1)
      setInput('')
    } else if (e.key === 'Escape') {
      restart(true)
    }
  }


  return (
    <>
      <SEO
        title="Free Online Typing Test | Check WPM Speed (MonkeyType Alternative)"
        description="Take our free online typing test to check your WPM (Words Per Minute). A fast, privacy-first MonkeyType alternative with distraction-free typing practice."
        keywords="online typing test, free typing test online, wpm test run, typing speed test, MonkeyType alternative, typing practice"
        path="/typing-test"
        toolName="Typing Test"
        toolSteps={[
          "Choose your preferred test duration: 15s, 30s, or 60s.",
          "Click the input field and start typing the words shown.",
          "Press SPACE or ENTER after each word to move to the next.",
          "Review your final WPM and accuracy metrics instantly."
        ]}
        screenshot="/screenshots/professional-typing-speed-test-online.png"
        imageAlt="PixTool Typing Test - Professional WPM and accuracy tracking interface"
        imageTitle="MonkeyType Alternative Typing Test Online"
        breadcrumbs={[
          { name: 'Utility Tools', item: '/utility-tools' },
          { name: 'Typing Test', item: '/typing-test' }
        ]}
      />


      <div className="page-container">
        <Breadcrumbs items={[
          { name: 'Utility Tools', item: '/utility-tools' },
          { name: 'Typing Test', item: '/typing-test' }
        ]} />

        <div className="landing-layout">
          <AdSpace type="side" className="desktop-only" />

          <div className="landing-center">
            <AdSpace type="top" />

            <div className="page-hero">
              <div className="page-hero-content">
                <h1 className="page-title">Typing Test</h1>
                <p className="page-subtitle">
                  Practice typing like a pro. Track your speed (WPM) and accuracy in real-time. Completely free.
                </p>
              </div>
            </div>

            <div className="tool-panel" style={{ marginBottom: '4rem', minHeight: '400px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              {!results ? (
                <>
                  <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginBottom: '3rem' }}>
                    {[15, 30, 60].map(t => (
                      <button
                        key={t}
                        className={`btn ${duration === t ? 'btn-primary' : 'btn-secondary'}`}
                        onClick={() => { setDuration(t); setTimeLeft(t); restart(); }} // Call restart when changing time limit
                      >
                        {t}s
                      </button>
                    ))}
                  </div>

                  <div
                    className="typing-area"
                    style={{
                      position: 'relative',
                      fontSize: '1.75rem',
                      lineHeight: 1.6,
                      color: 'var(--text-muted)',
                      fontFamily: 'monospace',
                      userSelect: 'none',
                      marginBottom: '3rem',
                      padding: '1.5rem',
                      minHeight: '180px'
                    }}
                  >
                    <div style={{ position: 'absolute', top: 0, left: 0, right: 0, color: 'var(--accent-primary)', opacity: 0.1, fontSize: '0.8rem', fontWeight: 700, textAlign: 'center', padding: '0.5rem' }}>TYPE THE WORDS BELOW</div>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.6rem' }}>
                      {words.slice(wordIndex, wordIndex + 50).map((word, i) => { // Display a reasonable number of words
                        const currentWordIdx = wordIndex + i;
                        const isCurrentWord = currentWordIdx === wordIndex;
                        const currentInputWord = input;

                        let wordColor = 'inherit';
                        let borderBottom = 'none';

                        if (currentWordIdx < wordIndex) { // Already typed words
                          // This logic is simplified for display. Actual correctness is tracked in state.
                          // For display, we can assume words before currentWordIdx are 'typed'.
                          // A more robust display would compare `typedWords[currentWordIdx - wordIndex]` with `word`.
                          wordColor = 'var(--text-primary)'; // Assume correct for display purposes
                        } else if (isCurrentWord) {
                          borderBottom = '2px solid var(--accent-primary)';
                          if (currentInputWord.length > 0) {
                            // Check character by character for current word
                            const chars = word.split('').map((char, charIdx) => {
                              let charClass = '';
                              if (charIdx < currentInputWord.length) {
                                charClass = char === currentInputWord[charIdx] ? 'correct-char' : 'incorrect-char';
                              }
                              return <span key={charIdx} className={charClass}>{char}</span>;
                            });
                            // If input is longer than the word, show extra as incorrect
                            if (currentInputWord.length > word.length) {
                              for (let j = word.length; j < currentInputWord.length; j++) {
                                chars.push(<span key={`extra-${j}`} className="incorrect-char">{currentInputWord[j]}</span>);
                              }
                            }
                            return <span key={currentWordIdx} style={{ borderBottom }}>{chars}</span>;
                          }
                        }

                        return (
                          <span key={currentWordIdx} style={{ color: wordColor, borderBottom }}>
                            {word}
                          </span>
                        );
                      })}
                    </div>
                  </div>

                  <input
                    ref={inputRef}
                    type="text"
                    className="input"
                    value={input}
                    onChange={handleInput}
                    onKeyDown={handleKeyDown}
                    autoFocus
                    placeholder={running ? 'Keep typing...' : 'Start typing to begin'}
                    style={{ fontSize: '1.25rem', padding: '1.25rem', textAlign: 'center', background: 'var(--bg-secondary)', border: '2px solid var(--border-color)', borderRadius: '16px' }}
                  />

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '2.5rem' }}>
                    <div style={{ display: 'flex', gap: '2rem' }}>
                      <div style={{ textAlign: 'center' }}>
                        <div style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--text-muted)', textTransform: 'uppercase' }}>Time</div>
                        <div style={{ fontSize: '1.5rem', fontWeight: 900, color: 'var(--accent-primary)' }}>{timeLeft}s</div>
                      </div>
                      <div style={{ textAlign: 'center' }}>
                        <div style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--text-muted)', textTransform: 'uppercase' }}>WPM</div>
                        <div style={{ fontSize: '1.5rem', fontWeight: 900 }}>{wpm}</div>
                      </div>
                    </div>
                    <button className="btn btn-secondary" onClick={restart}>
                      <RefreshCw size={18} style={{ marginRight: '0.5rem' }} /> Reset
                    </button>
                  </div>
                </>
              ) : (
                <div style={{ textAlign: 'center', padding: '2rem' }}>
                  <h2 style={{ fontSize: '2.5rem', fontWeight: 900, marginBottom: '0.5rem' }}>Test Results</h2>
                  <p style={{ color: 'var(--text-secondary)', marginBottom: '3rem' }}>Great job! Here is how you performed.</p>

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '1.5rem', marginBottom: '3.5rem' }}>
                    <div style={{ padding: '2rem', background: 'var(--bg-secondary)', borderRadius: '24px', border: '1px solid var(--border-color)' }}>
                      <div style={{ fontSize: '0.8rem', fontWeight: 800, color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '0.5rem' }}>WPM</div>
                      <div style={{ fontSize: '3rem', fontWeight: 900, color: 'var(--accent-primary)' }}>{results.wpm}</div>
                    </div>
                    <div style={{ padding: '2rem', background: 'var(--bg-secondary)', borderRadius: '24px', border: '1px solid var(--border-color)' }}>
                      <div style={{ fontSize: '0.8rem', fontWeight: 800, color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '0.5rem' }}>Accuracy</div>
                      <div style={{ fontSize: '3rem', fontWeight: 900, color: 'var(--accent-emerald)' }}>{results.accuracy}%</div>
                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
                    <button className="btn btn-primary" onClick={restart} style={{ padding: '1rem 2.5rem' }}>
                      <RefreshCw size={20} /> Try Again
                    </button>
                    <button className="btn btn-secondary" onClick={copyResults} style={{ padding: '1rem 2.5rem' }}>
                      <Copy size={20} /> Share Result
                    </button>
                  </div>
                </div>
              )}
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem' }}>
              <div className="tool-card" style={{ padding: '1rem', textAlign: 'center' }}>
                <Type size={24} style={{ color: 'var(--accent-primary)', marginBottom: '0.5rem' }} />
                <div style={{ fontWeight: 800 }}>Accurate WPM</div>
                <div style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Standard 5-char WPM calculation using correct characters only</div>
              </div>
              <div className="tool-card" style={{ padding: '1rem', textAlign: 'center' }}>
                <TimerReset size={24} style={{ color: 'var(--accent-cyan)', marginBottom: '0.5rem' }} />
                <div style={{ fontWeight: 800 }}>Flexible Timers</div>
                <div style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Choose 15s, 30s, or 60s to match your practice style</div>
              </div>
              <div className="tool-card" style={{ padding: '1rem', textAlign: 'center' }}>
                <RefreshCw size={24} style={{ color: 'var(--accent-emerald)', marginBottom: '0.5rem' }} />
                <div style={{ fontWeight: 800 }}>Distraction-Free</div>
                <div style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Clean, fast, and privacy-first — no login, no tracking</div>
              </div>
            </div>

            <div style={{ marginTop: '5rem' }}>
              <ToolContent
                title="Professional Typing Speed Test — Practice & Improve WPM"
                description="Our Typing Speed Test is a professional-grade tool designed for developers, writers, and students who want to improve their typing efficiency. Inspired by popular platforms like MonkeyType and 10FastFingers, our test focuses on a distraction-free experience with real-time WPM (Words Per Minute) and accuracy tracking. Practice with a variety of common English words and monitor your progress instantly in your browser."
                benefits={[
                  "Real-time WPM calculation based on 5-character segments",
                  "Detailed accuracy tracking to identify common mistakes",
                  "Flexible test durations: 15s, 30s, or 60s sprints",
                  "Minimalist design for maximum focus during practice sessions",
                  "Randomized word banks ensuring every test is fresh",
                  "100% Private local processing — your data stays yours",
                  "Instant result sharing to challenge friends or colleagues",
                  "No registration required — practice as much as you want for free"
                ]}
                howTo={[
                  "Choose your preferred test duration (15s, 30s, or 60s)",
                  "Click the input field and start typing the words shown",
                  "Press SPACE or ENTER after each word to move to the next",
                  "Review your final WPM and accuracy once the timer expires",
                  "Click 'Try Again' to instantly restart and beat your score"
                ]}
                tips={[
                  "Focus on accuracy first — speed naturally follows as you build muscle memory.",
                  "Try to keep your eyes on the upcoming words rather than looking at your fingers.",
                  "Practice in short, frequent sessions (5-10 minutes daily) for the best long-term improvement.",
                  "Maintain a comfortable posture and keep your wrists straight to avoid fatigue during longer sessions."
                ]}
                useCases={[
                  { title: "Developer Productivity", description: "Increase your coding speed by mastering touch typing and reducing the time spent looking at your keyboard." },
                  { title: "Exam Preparation", description: "Practice for online exams or professional certifications that require significant written input under timed conditions." },
                  { title: "Workplace Efficiency", description: "Boost your professional communication speed for emails, reports, and real-time messaging apps." }
                ]}
                relatedTools={[
                  { name: 'QR Generator', path: '/qr-generator' },
                  { name: 'Temp Mail', path: '/temp-mail' },
                  { name: 'Utility Tools', path: '/utility-tools' }
                ]}
                readNext={UTILITY_READ_NEXT['typing-test']}
                alternativeTo={["MonkeyType", "10FastFingers", "TypeRacer", "Keybr"]}
              />
            </div>
          </div>
          <AdSpace type="side" className="desktop-only" />
        </div>
      </div>
      <ShareTool title="Free Typing Test | MonkeyType Alternative - PixTool" />
    </>
  )
}
