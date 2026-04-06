import React from 'react';
import SEO from '../components/SEO';
import { Database, Info, Settings } from 'lucide-react';

export default function Cookie() {
    return (
        <div className="legal-page">
            <SEO
                title="Cookie Policy | PixTool"
                description="Transparency about how we use cookies and local storage to provide a fast and secure experience on PixTool."
                path="/cookie-policy"
            />

            <section className="hero" style={{ padding: '6rem 2rem 3rem', background: 'var(--bg-secondary)' }}>
                <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
                    <div style={{ display: 'inline-flex', padding: '12px', background: 'rgba(239, 68, 68, 0.1)', color: '#fbbf24', borderRadius: '50%', marginBottom: '1.5rem' }}>
                        <Database size={32} />
                    </div>
                    <h1 className="hero-title" style={{ fontSize: '3rem', fontWeight: 900, marginBottom: '1rem' }}>Cookie Policy</h1>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem' }}>Last Updated: February 2026</p>
                </div>
            </section>

            <section style={{ padding: '4rem 2rem 8rem' }}>
                <div style={{ maxWidth: '800px', margin: '0 auto' }}>
                    <div className="tool-card" style={{ padding: '3rem', fontSize: '1.05rem', lineHeight: 1.8 }}>
                        <h2 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <Info size={20} style={{ color: 'var(--accent-primary)' }} /> 1. What are Cookies?
                        </h2>
                        <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>
                            Cookies are small text files stored on your device that help web applications remember information about your visit. We use them sparingly to enhance your experience.
                        </p>

                        <h2 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <Settings size={20} style={{ color: 'var(--accent-primary)' }} /> 2. How we use Cookies
                        </h2>
                        <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
                            PixTool uses the following types of cookies:
                        </p>
                        <ul style={{ color: 'var(--text-secondary)', marginBottom: '2rem', paddingLeft: '1.5rem' }}>
                            <li><strong>Essential Cookies:</strong> Used to remember your site preferences, such as dark mode or search history within the session.</li>
                            <li><strong>Analytical Cookies:</strong> Helps us understand how many people use our tools and which tools are most popular. This data is anonymized.</li>
                            <li><strong>Advertising Cookies:</strong> Third-party partners like Google AdSense may use cookies to show you more relevant ads.</li>
                        </ul>

                        <h2 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '1.5rem' }}>3. Controlling and Managing Cookies</h2>
                        <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
                            You have the right to decide whether to accept or reject cookies. You can set or amend your web browser controls to accept or refuse cookies. If you choose to reject cookies, you may still use our website though your access to some functionality and areas of our website may be restricted.
                        </p>
                        
                        <h3 style={{ fontSize: '1.2rem', color: 'var(--text-primary)', marginBottom: '0.75rem' }}>Opting Out of Advertising Cookies</h3>
                        <p style={{ color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                            To opt-out of the use of cookies for personalized advertising, please visit:
                        </p>
                        <ul style={{ color: 'var(--text-secondary)', marginBottom: '2rem', paddingLeft: '1.5rem' }}>
                            <li style={{ marginBottom: '0.5rem' }}>
                                <a href="https://adssettings.google.com" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--accent-primary)' }}>Google Ad Settings</a>
                            </li>
                            <li style={{ marginBottom: '0.5rem' }}>
                                <a href="https://www.aboutads.info/choices" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--accent-primary)' }}>Digital Advertising Alliance (DAA)</a>
                            </li>
                            <li style={{ marginBottom: '0.5rem' }}>
                                <a href="https://www.networkadvertising.org/choices/" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--accent-primary)' }}>Network Advertising Initiative (NAI)</a>
                            </li>
                        </ul>

                        <h2 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '1.5rem' }}>4. Updates to this Policy</h2>
                        <p style={{ color: 'var(--text-secondary)' }}>
                            We may update this Cookie Policy from time to time in order to reflect, for example, changes to the cookies we use or for other operational, legal, or regulatory reasons. Please therefore re-visit this Cookie Policy regularly to stay informed about our use of cookies and related technologies.
                        </p>
                    </div>
                </div>
            </section>
        </div>
    );
}
