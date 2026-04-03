import { useState, useMemo } from 'react'
import { Scale, RefreshCw, ArrowLeftRight, Activity, Zap, Shield, Globe, Copy, Check } from 'lucide-react'
import { motion } from 'framer-motion'
import SEO from '../components/SEO'
import Breadcrumbs from '../components/Breadcrumbs'
import ShareTool from '../components/ShareTool'
import ToolContent from '../components/ToolContent'
import AdSpace from '../components/AdSpace'
import { useRatePopup } from '../hooks/useRatePopup'

const UNITS_DATA = {
  length: {
    meters: 1,
    kilometers: 0.001,
    centimeters: 100,
    millimeters: 1000,
    miles: 0.000621371,
    yards: 1.09361,
    feet: 3.28084,
    inches: 39.3701
  },
  weight: {
    kilograms: 1,
    grams: 1000,
    milligrams: 1000000,
    metric_tons: 0.001,
    pounds: 2.20462,
    ounces: 35.274,
    stones: 0.157473
  },
  temperature: {
    celsius: (v) => v,
    fahrenheit: (v) => (v * 9/5) + 32,
    kelvin: (v) => v + 273.15
  },
  volume: {
    liters: 1,
    milliliters: 1000,
    cubic_meters: 0.001,
    gallons_us: 0.264172,
    quarts_us: 1.05669,
    pints_us: 2.11338,
    cups_us: 4.22675
  }
}

const TEMP_CONVERSIONS = {
  celsius: {
    fahrenheit: (v) => (v * 9/5) + 32,
    kelvin: (v) => v + 273.15,
    celsius: (v) => v
  },
  fahrenheit: {
    celsius: (v) => (v - 32) * 5/9,
    kelvin: (v) => (v - 32) * 5/9 + 273.15,
    fahrenheit: (v) => v
  },
  kelvin: {
    celsius: (v) => v - 273.15,
    fahrenheit: (v) => (v - 273.15) * 9/5 + 32,
    kelvin: (v) => v
  }
}

export default function UnitConverter() {
  const [category, setCategory] = useState('length')
  const [value, setValue] = useState('1')
  const [fromUnit, setFromUnit] = useState('meters')
  const [toUnit, setToUnit] = useState('kilometers')
  const [copied, setCopied] = useState(false)
  const { triggerRating } = useRatePopup()

  const result = useMemo(() => {
    const num = parseFloat(value)
    if (isNaN(num)) return '0'

    if (category === 'temperature') {
      const converted = TEMP_CONVERSIONS[fromUnit][toUnit](num)
      return converted.toFixed(4).replace(/\.?0+$/, '')
    }

    const base = num / UNITS_DATA[category][fromUnit]
    const converted = base * UNITS_DATA[category][toUnit]
    return converted.toFixed(6).replace(/\.?0+$/, '')
  }, [category, value, fromUnit, toUnit])

  const handleCategoryChange = (cat) => {
    setCategory(cat)
    const units = Object.keys(UNITS_DATA[cat])
    setFromUnit(units[0])
    setToUnit(units[1] || units[0])
  }

  const copyResult = () => {
    if (!result) return
    navigator.clipboard.writeText(result).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
      triggerRating('unit-converter')
    })
  }

  const swapUnits = () => {
    setFromUnit(toUnit)
    setToUnit(fromUnit)
  }

  return (
    <>
      <SEO
        title="Free Online Unit Converter | Precision Length, Weight, Temperature - PixTool"
        description="Convert instantly between Length, Weight, Temperature, and Volume units. PixTool provides high-precision calculations with zero delays. 100% private, secure, and mobile-friendly measurement tool for 2026."
        keywords="unit converter 2026, convert meters to miles online, weight converter free, temperature converter celsius to fahrenheit, volume conversion online, best unit converter browser, online measurement converter, precise unit calculator, free web conversion suite"
        path="/unit-converter"
        toolName="Unit Converter"
        toolSteps={[
          'Select a measurement category (e.g., Length or Weight).',
          'Enter the value you wish to convert.',
          'Choose the source (From) and target (To) units.',
          'The converted result appears instantly below.'
        ]}
        breadcrumbs={[
          { name: 'Utility Tools', item: '/utility-tools' },
          { name: 'Unit Converter', item: '/unit-converter' }
        ]}
      />

      <motion.div 
        className="page-container"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Breadcrumbs items={[
          { name: 'Utility Tools', item: '/utility-tools' },
          { name: 'Unit Converter', item: '/unit-converter' }
        ]} />

        <div className="landing-layout">
          <AdSpace type="side" className="desktop-only" />

          <div className="landing-center">
            <AdSpace type="top" />

            <div className="page-hero">
              <div className="page-hero-content">
                <h1 className="page-title">Unit <span style={{ color: 'var(--accent-emerald)' }}>Converter</span></h1>
                <p className="page-subtitle">
                  Universal measurement conversion at your fingertips. High-precision calculations for length, mass, thermodynamics, and more.
                </p>
              </div>
            </div>

            <div className="tool-panel" style={{ maxWidth: '800px', margin: '0 auto 3rem auto' }}>
              {/* Category Selector */}
              <div style={{ display: 'flex', gap: '0.6rem', marginBottom: '1.5rem', flexWrap: 'wrap', justifyContent: 'center' }}>
                {Object.keys(UNITS_DATA).map(cat => (
                  <button
                    key={cat}
                    className={`btn ${category === cat ? 'btn-primary' : 'btn-secondary'}`}
                    onClick={() => handleCategoryChange(cat)}
                    style={{ 
                      background: category === cat ? 'var(--accent-emerald)' : 'transparent',
                      borderColor: category === cat ? 'var(--accent-emerald)' : 'var(--border-color)',
                      textTransform: 'capitalize',
                      minWidth: '120px'
                    }}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr auto 1fr', gap: '1rem', alignItems: 'flex-end', marginBottom: '2rem' }}>
                {/* From */}
                <div>
                  <label htmlFor="unit-converter-value" style={{ display: 'block', marginBottom: '0.75rem', fontWeight: 800, fontSize: '0.9rem', color: 'var(--text-secondary)' }}>From</label>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                    <input
                      id="unit-converter-value"
                      name="value"
                      type="number"
                      className="input"
                      value={value}
                      onChange={(e) => setValue(e.target.value)}
                      style={{ fontSize: '1.25rem', fontWeight: 700 }}
                      placeholder="0.00"
                    />
                    <select 
                      id="unit-converter-from-unit"
                      name="fromUnit"
                      className="input" 
                      value={fromUnit} 
                      onChange={(e) => setFromUnit(e.target.value)}
                      style={{ textTransform: 'capitalize' }}
                    >
                      {Object.keys(UNITS_DATA[category]).map(u => (
                        <option key={u} value={u}>{u.replace('_', ' ')}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Swap Button */}
                <div style={{ paddingBottom: '0.5rem' }}>
                  <button className="btn btn-secondary" onClick={swapUnits} style={{ borderRadius: '50%', width: '48px', height: '48px', padding: 0 }}>
                    <ArrowLeftRight size={20} />
                  </button>
                </div>

                {/* To */}
                <div>
                  <label htmlFor="unit-converter-to-unit" style={{ display: 'block', marginBottom: '0.75rem', fontWeight: 800, fontSize: '0.9rem', color: 'var(--text-secondary)' }}>To</label>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                    <div 
                      className="input" 
                      style={{ 
                        fontSize: '1.25rem', 
                        fontWeight: 900, 
                        color: 'var(--accent-emerald)', 
                        background: 'var(--bg-secondary)',
                        minHeight: '52px',
                        display: 'flex',
                        alignItems: 'center'
                      }}
                    >
                      {result}
                    </div>
                    <select 
                      id="unit-converter-to-unit"
                      name="toUnit"
                      className="input" 
                      value={toUnit} 
                      onChange={(e) => setToUnit(e.target.value)}
                      style={{ textTransform: 'capitalize' }}
                    >
                      {Object.keys(UNITS_DATA[category]).map(u => (
                        <option key={u} value={u}>{u.replace('_', ' ')}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              <div style={{ textAlign: 'center', background: 'rgba(16, 185, 129, 0.05)', padding: '2rem', borderRadius: '24px', border: '1px dashed var(--accent-emerald)', position: 'relative' }}>
                <p style={{ margin: 0, fontSize: '1.1rem', fontWeight: 700 }}>
                  {value} {fromUnit.replace('_', ' ')} = <span style={{ color: 'var(--accent-emerald)', fontSize: '1.5rem' }}>{result}</span> {toUnit.replace('_', ' ')}
                </p>
                <button 
                  className="btn btn-secondary" 
                  onClick={copyResult}
                  style={{ padding: '0.4rem 0.8rem', fontSize: '0.8rem', marginTop: '1rem' }}
                >
                  {copied ? <Check size={14} /> : <Copy size={14} />} {copied ? 'Copied' : 'Copy Result'}
                </button>
              </div>
            </div>

            <AdSpace type="bottom" />

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem', marginTop: '4rem', marginBottom: '4rem' }}>
              {[
                { icon: Zap, title: 'Instant Math', desc: 'No calculation delay. Results update in real-time as you type.', color: 'var(--accent-emerald)' },
                { icon: Globe, title: 'Universal Units', desc: 'Metric, Imperial, and Scientific standards all supported in one place.', color: 'var(--accent-primary)' },
                { icon: Activity, title: 'High Precision', desc: 'Up to 6 decimal places of accuracy for professional measurement needs.', color: 'var(--accent-pink)' }
              ].map((feat, i) => (
                <div key={i} className="tool-card" style={{ textAlign: 'center', padding: '2.5rem 2rem' }}>
                  <div className="tool-card-icon" style={{ background: `${feat.color}15`, color: feat.color, margin: '0 auto' }}>
                    <feat.icon size={26} />
                  </div>
                  <h2 style={{ fontWeight: 900, marginBottom: '0.5rem', fontSize: '1.1rem' }}>{feat.title}</h2>
                  <p className="tool-card-description" style={{ fontSize: '0.9rem' }}>{feat.desc}</p>
                </div>
              ))}
            </div>

            <ShareTool
              title="Unit Converter"
              url="/unit-converter"
              text="Convert Length, Weight, and Temperature instantly with PixTool's high-precision measurement utility"
            />

            <div style={{ marginTop: '5rem' }}>
              <ToolContent
                title="Fast, Precise & Private Conversions"
                description="Our Unit Converter is designed for efficiency. Whether you're a student, professional, or casual user, you need accurate conversions without the bloat of traditional websites. PixTool runs all calculations client-side, ensuring your data remains private while providing results at lightning speed."
                benefits={[
                  "Comprehensive support for Length, Weight, Temperature, and Volume",
                  "Swap functionality for bidirectional conversions",
                  "Mobile-responsive design for on-the-go measuring",
                  "Works offline once loaded - no server requests",
                  "Zero tracking and 100% free usage"
                ]}
                useCases={[
                  { title: "Academic & Science", description: "Quickly convert between Celsius and Kelvin or Grams and Kilograms for lab reports and homework." },
                  { title: "Cooking & Household", description: "Convert US Gallons to Liters or Pounds to Kilograms for recipes and shopping." },
                  { title: "Engineering & DIY", description: "Switch between Feet, Meters, and Inches with high precision for construction and design projects." }
                ]}
              />
            </div>
          </div>

          <AdSpace type="side" className="desktop-only" />
        </div>
      </motion.div>
    </>
  )
}
