import { Shield, Zap, Lock } from 'lucide-react'

export default function TechnicalAuthority() {
  return (
    <>
      {/* Deep-Dive Technical Content - High E-E-A-T & Quality Expansion */}
      <div className="container-pro" style={{ marginTop: '8rem', textAlign: 'left' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h2 style={{ fontSize: 'clamp(2.5rem, 5vw, 3.5rem)', fontWeight: 900, marginBottom: '2.5rem', letterSpacing: '-0.04em', lineHeight: 1.1 }}>
            The Future of <span style={{ color: 'var(--accent-primary)' }}>Secure Productivity</span>
          </h2>
          
          <div style={{ display: 'grid', gap: '3.5rem' }}>
            <section>
              <h3 style={{ fontSize: '1.8rem', fontWeight: 800, marginBottom: '1.25rem' }}>1. The Science of Client-Side Processing</h3>
              <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8, fontSize: '1.1rem', marginBottom: '1.5rem' }}>
                Unlike traditional cloud-based tools that require you to upload your sensitive data to remote servers, PixTool leverages the power of <b>modern browser technologies</b> to process everything locally. By utilizing <b>WebAssembly (Wasm)</b>, <b>HTML5 Canvas</b>, and <b>Web Workers</b>, we deliver desktop-class performance directly in your browser tab.
              </p>
              <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8, fontSize: '1.1rem' }}>
                This "local-first" architecture eliminates the latency of file uploads and downloads, providing near-instant results even for large PDFs and high-resolution images. Your device's CPU and GPU do the heavy lifting, ensuring that your data <b>never leaves your machine</b>.
              </p>
            </section>

            <section>
              <h3 style={{ fontSize: '1.8rem', fontWeight: 800, marginBottom: '1.25rem' }}>2. Military-Grade Privacy by Design</h3>
              <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8, fontSize: '1.1rem', marginBottom: '1.5rem' }}>
                At PixTool, privacy isn't just a feature—it's our fundamental philosophy. Because our tools operate entirely on the client side, they are inherently compliant with strict data protection regulations like <b>GDPR</b>, <b>HIPAA</b>, and <b>CCPA</b>. We don't store your files, we don't see your data, and we don't track your content.
              </p>
              <div style={{ padding: '2rem', background: 'var(--bg-secondary)', borderRadius: '24px', border: '1px solid var(--border-color)', borderLeft: '4px solid var(--accent-primary)' }}>
                <p style={{ color: 'var(--text-primary)', fontWeight: 600, margin: 0 }}>
                  "PixTool provides a zero-knowledge environment. Once you close your browser tab, every trace of your session is permanently wiped from your device's memory."
                </p>
              </div>
            </section>

            <section>
              <h3 style={{ fontSize: '1.8rem', fontWeight: 800, marginBottom: '1.25rem' }}>3. Professional Workflow Integration</h3>
              <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8, fontSize: '1.1rem', marginBottom: '1.5rem' }}>
                Whether you're a developer optimizing assets for production, a legal professional managing confidential contracts, or a student organizing research materials, PixTool fits seamlessly into your daily stack.
              </p>
              <ul style={{ listStyle: 'none', padding: 0, display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem' }}>
                <li style={{ padding: '1.5rem', background: 'var(--bg-glass)', borderRadius: '16px', border: '1px solid var(--border-color)' }}>
                  <strong style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--accent-primary)' }}>For Developers</strong>
                  Rapidly format JSON, compare code diffs, and optimize web assets without external dependencies.
                </li>
                <li style={{ padding: '1.5rem', background: 'var(--bg-glass)', borderRadius: '16px', border: '1px solid var(--border-color)' }}>
                  <strong style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--accent-primary)' }}>For Legal & Finance</strong>
                  Merge, split, and password-protect sensitive documents with the assurance of 100% local processing.
                </li>
                <li style={{ padding: '1.5rem', background: 'var(--bg-glass)', borderRadius: '16px', border: '1px solid var(--border-color)' }}>
                  <strong style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--accent-primary)' }}>For Content Creators</strong>
                  Batch-resize photos, generate viral social captions, and architect long-form narratives with specialized AI.
                </li>
              </ul>
            </section>
          </div>
        </div>
      </div>

      {/* Comparison Table / Benchmarks */}
      <div className="container-pro" style={{ padding: 'clamp(2rem, 5vw, 4rem) 1.5rem', background: 'var(--text-primary)', color: 'var(--bg-primary)', borderRadius: '40px', marginBottom: 'clamp(3rem, 8vw, 6rem)', textAlign: 'left', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: '-100px', right: '-100px', width: '300px', height: '300px', background: 'var(--accent-primary)', filter: 'blur(150px)', opacity: 0.2 }}></div>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 1rem' }}>
          <h2 style={{ fontSize: '2.5rem', fontWeight: 900, marginBottom: '2rem', letterSpacing: '-0.03em' }}>Why Professionals Switch to PixTool</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '4rem' }}>
            <div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <span style={{ color: '#ef4444' }}>✕</span> Legacy Productivity Sites
              </h3>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '1.25rem', opacity: 0.8, fontSize: '1.05rem' }}>
                <li>Bulk file uploads to third-party clouds</li>
                <li>Limited credits and paywalled AI usage</li>
                <li>Generic, one-size-fits-all AI prompts</li>
                <li>Mandatory registration for saving work</li>
                <li>Data harvesting for model training</li>
              </ul>
            </div>
            <div style={{ position: 'relative' }}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <span style={{ color: '#10b981' }}>✓</span> The PixTool Standard
              </h3>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '1.25rem', fontWeight: 600, fontSize: '1.05rem' }}>
                <li>100% On-device browser processing</li>
                <li>14+ Specialized AI Intelligence tools</li>
                <li>Unlimited local usage with no registration</li>
                <li>Zero-knowledge privacy architecture</li>
                <li>Professional-grade editorial output</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Trust Bar */}
      <div className="container-pro" style={{ display: 'flex', justifyContent: 'center', gap: '4rem', padding: '2rem', borderTop: '1px solid var(--border-color)', borderBottom: '1px solid var(--border-color)', opacity: 0.7, flexWrap: 'wrap', marginBottom: '4rem' }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '1.8rem', fontWeight: 900, color: 'var(--text-primary)' }}>45+</div>
          <div style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-muted)' }}>Professional Tools</div>
        </div>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '1.8rem', fontWeight: 900, color: 'var(--text-primary)' }}>14</div>
          <div style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-muted)' }}>Specialized AIs</div>
        </div>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '1.8rem', fontWeight: 900, color: 'var(--text-primary)' }}>100%</div>
          <div style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-muted)' }}>Private Context</div>
        </div>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '1.8rem', fontWeight: 900, color: 'var(--text-primary)' }}>∞</div>
          <div style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-muted)' }}>Zero Cloud Uploads</div>
        </div>
      </div>

      {/* Technical Authority Cards */}
      <div className="container-pro" style={{ marginTop: 'clamp(3rem, 8vw, 6rem)', padding: 'clamp(2rem, 5vw, 4rem) 1.5rem', background: 'var(--bg-secondary)', borderRadius: '40px', border: '1px solid var(--border-color)', textAlign: 'center' }}>
        <div style={{ marginBottom: '3rem' }}>
          <h2 style={{ fontSize: '2.8rem', fontWeight: 900, marginBottom: '1rem', letterSpacing: '-0.02em' }}>Technical <span style={{ color: 'var(--accent-primary)' }}>Authority</span></h2>
          <p style={{ fontSize: '1.1rem', color: 'var(--text-secondary)', maxWidth: '700px', margin: '0 auto' }}>
            Why thousands of professionals and corporate clients trust PixTool with their most sensitive data.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2.5rem', textAlign: 'left' }}>
          <div style={{ padding: '2rem', background: 'var(--bg-primary)', borderRadius: '24px', border: '1px solid var(--border-color)', height: '100%' }}>
            <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'rgba(16, 185, 129, 0.1)', color: '#10b981', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem' }}>
              <Shield size={24} />
            </div>
            <h3 style={{ fontSize: '1.3rem', fontWeight: 800, marginBottom: '0.75rem' }}>Client-Side Security</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: 1.6, margin: 0 }}>
              Unlike traditional tools that upload files to a remote server, PixTool uses <b>modern WebAssembly</b> to process everything 100% locally in your browser. <b>Your data never leaves your computer.</b>
            </p>
          </div>

          <div style={{ padding: '2rem', background: 'var(--bg-primary)', borderRadius: '24px', border: '1px solid var(--border-color)', height: '100%' }}>
            <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'rgba(59, 130, 246, 0.1)', color: '#3b82f6', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem' }}>
              <Zap size={24} />
            </div>
            <h3 style={{ fontSize: '1.3rem', fontWeight: 800, marginBottom: '0.75rem' }}>Zero Server Latency</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: 1.6, margin: 0 }}>
              By eliminating large file uploads, we provide near-instant results. Whether you're compressing a 100MB PDF or resizing 50 images, the speed is limited only by your device's local CPU power.
            </p>
          </div>

          <div style={{ padding: '2rem', background: 'var(--bg-primary)', borderRadius: '24px', border: '1px solid var(--border-color)', height: '100%' }}>
            <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'rgba(168, 85, 247, 0.1)', color: '#a855f7', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem' }}>
              <Lock size={24} />
            </div>
            <h3 style={{ fontSize: '1.3rem', fontWeight: 800, marginBottom: '0.75rem' }}>GDPR & HIPAA Compliance</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: 1.6, margin: 0 }}>
              Because we don't store, process, or see your data, our platform is inherently compliant with strict data protection regulations. Ideal for healthcare workers, legal firms, and corporate professionals.
            </p>
          </div>
        </div>
      </div>
    </>
  )
}
