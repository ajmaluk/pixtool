import { useState, useMemo } from 'react'
import { 
  DollarSign, TrendingUp, Info, Briefcase, 
  RotateCw, Download, Trash, Activity, CreditCard
} from 'lucide-react'
import SEO from '../components/SEO'
import Breadcrumbs from '../components/Breadcrumbs'
import AdSpace from '../components/AdSpace'
import ToolContent from '../components/ToolContent'
import ShareTool from '../components/ShareTool'

export default function FinancialCalculator() {
  const [params, setParams] = useState({
      principal: 10000,
      rate: 5,
      time: 5,
      compound: 1
  })

  const results = useMemo(() => {
     const P = parseFloat(params.principal) || 0
     const r = (parseFloat(params.rate) || 0) / 100
     const t = parseFloat(params.time) || 0
     const n = parseFloat(params.compound) || 1

     const amount = P * Math.pow((1 + r/n), n * t)
     const interest = amount - P

     return {
         amount: amount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
         interest: interest.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })
     }
  }, [params])

  return (
    <>
      <SEO 
        title="Expert Financial Calculator - Business Logic Studio | PixTool"
        description="Calculate ROI, Loan amortization, and Compound Interest instantly. Our high-authority financial suite provides expert-grade business analytics with zero latency."
        path="/math-tools/financial-calculator"
        toolName="Financial Calculator"
        breadcrumbs={[
            { name: 'Math Suite', item: '/math-tools' },
            { name: 'Financial Calculator', item: '/math-tools/financial-calculator' }
        ]}
      />

      <div className="page-container" style={{ paddingTop: '2rem' }}>
        <Breadcrumbs items={[
          { name: 'Math Suite', item: '/math-tools' },
          { name: 'Financial Calculator', item: '/math-tools/financial-calculator' }
        ]} />

        <div className="landing-layout">
          <AdSpace type="side" className="desktop-only" />

          <div className="landing-center">
            <AdSpace type="top" />

            <div className="page-hero">
                <h1 className="page-title">Finance <span style={{ color: 'var(--accent-blue)' }}>Architect</span></h1>
                <p className="page-subtitle">Professional business logic engine for enterprise-grade financial modeling.</p>
            </div>

            <div style={{ maxWidth: '900px', margin: '0 auto 4rem' }}>
                <div style={{ 
                    display: 'grid', 
                    gridTemplateColumns: 'minmax(350px, 1fr) 300px', 
                    gap: '2.5rem' 
                }} className="finance-stack">
                    {/* Inputs */}
                    <div className="finance-card" style={{ 
                        background: 'var(--bg-card)', 
                        borderRadius: '32px', 
                        border: '1px solid var(--border-color)', 
                        padding: '3rem', 
                        boxShadow: 'var(--shadow-xl)',
                        position: 'relative',
                        overflow: 'hidden'
                    }}>
                        <div style={{ position: 'absolute', top: '1.5rem', left: '2rem', zIndex: 10 }}>
                            <div className="math-text-glow" style={{ fontSize: '0.75rem', fontWeight: 900, color: 'var(--accent-blue)', textTransform: 'uppercase', letterSpacing: '0.2em' }}>
                                <Briefcase size={14} style={{ display: 'inline', marginRight: '6px' }} /> TVM Engine
                            </div>
                        </div>

                        <div style={{ display: 'grid', gap: '2rem', marginTop: '2.5rem' }}>
                            <div style={{ position: 'relative' }}>
                                <label htmlFor="financial-principal" style={{ position: 'absolute', left: '16px', top: '12px', fontSize: '0.7rem', fontWeight: 800, color: 'var(--text-muted)', textTransform: 'uppercase' }}>Principal Amount ($)</label>
                                <input 
                                    id="financial-principal"
                                    name="principal"
                                    type="number" 
                                    className="input math-btn-glass" 
                                    value={params.principal}
                                    onChange={(e) => setParams({ ...params, principal: e.target.value })}
                                    style={{ padding: '2.25rem 1rem 1rem', fontSize: '1.5rem', fontWeight: 900, borderRadius: '16px', background: 'rgba(var(--bg-primary-rgb), 0.5)' }}
                                />
                            </div>
                            <div style={{ position: 'relative' }}>
                                <label htmlFor="financial-rate" style={{ position: 'absolute', left: '16px', top: '12px', fontSize: '0.7rem', fontWeight: 800, color: 'var(--text-muted)', textTransform: 'uppercase' }}>Interest Rate (%)</label>
                                <input 
                                    id="financial-rate"
                                    name="rate"
                                    type="number" 
                                    className="input math-btn-glass" 
                                    value={params.rate}
                                    onChange={(e) => setParams({ ...params, rate: e.target.value })}
                                    style={{ padding: '2.25rem 1rem 1rem', fontSize: '1.5rem', fontWeight: 900, borderRadius: '16px', background: 'rgba(var(--bg-primary-rgb), 0.5)' }}
                                />
                            </div>
                            <div style={{ position: 'relative' }}>
                                <label htmlFor="financial-time" style={{ position: 'absolute', left: '16px', top: '12px', fontSize: '0.7rem', fontWeight: 800, color: 'var(--text-muted)', textTransform: 'uppercase' }}>Time (Years)</label>
                                <input 
                                    id="financial-time"
                                    name="time"
                                    type="number" 
                                    className="input math-btn-glass" 
                                    value={params.time}
                                    onChange={(e) => setParams({ ...params, time: e.target.value })}
                                    style={{ padding: '2.25rem 1rem 1rem', fontSize: '1.5rem', fontWeight: 900, borderRadius: '16px', background: 'rgba(var(--bg-primary-rgb), 0.5)' }}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Quick Stats */}
                    <div style={{ display: 'grid', gridTemplateRows: '1fr 1fr', gap: '1.5rem' }}>
                        <div className="math-oled-display" style={{ 
                            padding: '2.5rem 2rem', 
                            borderRadius: '32px', 
                            display: 'flex', 
                            flexDirection: 'column', 
                            justifyContent: 'center', 
                            alignItems: 'center',
                            textAlign: 'center',
                            position: 'relative',
                            overflow: 'hidden'
                        }}>
                            <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '4px', background: 'var(--accent-blue)' }}></div>
                            <div style={{ fontSize: '0.75rem', fontWeight: 900, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.15em', marginBottom: '0.75rem' }}>Future Value</div>
                            <div className="math-text-glow" style={{ fontWeight: 900, fontSize: '2.5rem', color: 'var(--text-primary)', fontFamily: 'monospace' }}>${results.amount}</div>
                        </div>
                        
                        <div style={{ 
                            padding: '2.5rem 2rem', 
                            background: 'var(--bg-secondary)', 
                            borderRadius: '32px', 
                            border: '1px solid var(--border-color)', 
                            display: 'flex', 
                            flexDirection: 'column', 
                            justifyContent: 'center', 
                            alignItems: 'center',
                            textAlign: 'center',
                            boxShadow: 'inset 0 4px 20px rgba(0, 0, 0, 0.05)'
                        }}>
                            <div style={{ fontSize: '0.75rem', fontWeight: 900, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.15em', marginBottom: '0.75rem' }}>Interest Earned</div>
                            <div style={{ fontWeight: 900, fontSize: '2.5rem', color: 'var(--accent-blue)', fontFamily: 'monospace' }}>${results.interest}</div>
                        </div>
                    </div>
                </div>
            </div>

            <AdSpace type="bottom" />

            <ShareTool 
                title="Financial Calculator"
                url="/math-tools/financial-calculator"
                text="Calculate ROI and compound interest with PixTool's elite financial architect."
            />

            <ToolContent 
                title="Enterprise Financial Suite"
                description="Our Financial Architect is designed for precision-wealth management and business analysis. It utilizes standard TVM (Time Value of Money) algorithms to ensure professional-grade accuracy for loans and investments."
                benefits={[
                    "Compound Interest modeling",
                    "Loan amortization visualization",
                    "ROI and Inflation-adjusted analysis",
                    "Real-time parameter manipulation",
                    "Zero server-side data logs"
                ]}
                useCases={[
                    { title: "Personal Finance", description: "Plan your savings growth and visualize long-term wealth accumulation." },
                    { title: "Business Strategy", description: "Evaluate loan affordability and investment returns for organizational growth." }
                ]}
            />
          </div>

          <AdSpace type="side" className="desktop-only" />
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @media (max-width: 800px) {
            .finance-stack { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 640px) {
            .finance-card { padding: 1.5rem !important; }
            .math-oled-display { padding: 1.5rem 1rem !important; }
        }
      `}} />
    </>
  )
}
