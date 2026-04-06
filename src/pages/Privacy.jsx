import React from 'react';
import SEO from '../components/SEO';
import { ShieldCheck, Lock, Eye, FileText } from 'lucide-react';

export default function Privacy() {
    return (
        <div className="legal-page">
            <SEO
                title="Privacy Policy | PixTool"
                description="Your privacy is our priority. Learn how PixTool uses local browser-based processing to ensure your files never leave your device."
                path="/privacy-policy"
            />

            <section className="hero" style={{ padding: '6rem 2rem 3rem', background: 'var(--bg-secondary)' }}>
                <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
                    <div style={{ display: 'inline-flex', padding: '12px', background: 'rgba(16, 185, 129, 0.1)', color: '#10b981', borderRadius: '50%', marginBottom: '1.5rem' }}>
                        <ShieldCheck size={32} />
                    </div>
                    <h1 className="hero-title" style={{ fontSize: '3rem', fontWeight: 900, marginBottom: '1rem' }}>Privacy Policy</h1>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem' }}>Last Updated: February 2026</p>
                </div>
            </section>

            <section style={{ padding: '4rem 2rem 8rem' }}>
                <div style={{ maxWidth: '800px', margin: '0 auto' }}>
                    <div className="tool-card" style={{ padding: '3rem', fontSize: '1.05rem', lineHeight: 1.8 }}>
                        <h2 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <Lock size={20} style={{ color: 'var(--accent-primary)' }} /> 1. The "Edge-First" Philosophy
                        </h2>
                        <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
                            At <strong>UTHAKKAN</strong>, we believe that your data is exactly that — <em>yours</em>. Our core architecture is built on the principle of <strong>Local browser-side computation</strong>.
                        </p>
                        <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>
                            Unlike traditional online tools that require you to upload files to a remote server for processing (where they could be intercepted, stored, or analyzed), PixTool uses <strong>WebAssembly (WASM)</strong> and <strong>modern Canvas APIs</strong> to perform all transformations directly in your browser's memory.
                        </p>

                        <h2 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <Eye size={20} style={{ color: 'var(--accent-primary)' }} /> 2. Data Zero-Retention Policy
                        </h2>
                        <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
                            We operate under a strict <strong>Zero-Retention</strong> policy for all user-generated content:
                        </p>
                        <ul style={{ color: 'var(--text-secondary)', marginBottom: '2.5rem', paddingLeft: '1.5rem' }}>
                            <li style={{ marginBottom: '0.75rem' }}><strong>Zero File Uploads:</strong> Your images, PDFs, and documents are never transmitted to our servers. Processing happens in a secure, isolated sandbox within your browser.</li>
                            <li style={{ marginBottom: '0.75rem' }}><strong>No Account Requirements:</strong> We do not require registration or login to use our core tools, eliminating the need to collect names, emails, or personal identifiers.</li>
                            <li style={{ marginBottom: '0.75rem' }}><strong>Temporary Mail Privacy:</strong> Our Temp Mail service uses secure API calls to create volatile mailboxes that are permanently deleted once you close your session.</li>
                            <li style={{ marginBottom: '0.75rem' }}><strong>Local Storage:</strong> Any settings (like theme preference) are stored locally on your device via <code>localStorage</code> and are never synced to a cloud database.</li>
                        </ul>

                        <h2 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <ShieldCheck size={20} style={{ color: 'var(--accent-primary)' }} /> 3. Security Framework
                        </h2>
                        <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>
                            PixTool leverages <strong>Content Security Policy (CSP)</strong> and <strong>HTTPS encryption</strong> to ensure that your interaction with our tools remains secure. Our browser-first architecture is designed to support privacy-by-default practices aligned with frameworks like <strong>GDPR and CCPA</strong> because user files are processed locally and are not uploaded to our servers.
                        </p>

                        <h2 id="advertising" style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <FileText size={20} style={{ color: 'var(--accent-primary)' }} /> 4. Third-Party Services & Advertising
                        </h2>
                        <div style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>
                            <p style={{ marginBottom: '1rem' }}>
                                We may use third-party advertising partners (like <strong>Google AdSense</strong>) to keep our tools free for everyone. These partners may use cookies, web beacons, or similar technologies to serve ads based on your interests.
                            </p>
                            
                            <h3 style={{ fontSize: '1.2rem', color: 'var(--text-primary)', marginBottom: '0.75rem' }}>Google AdSense & DoubleClick DART Cookie</h3>
                            <ul style={{ paddingLeft: '1.5rem', marginBottom: '1.5rem' }}>
                                <li style={{ marginBottom: '0.5rem' }}>Google, as a third-party vendor, uses cookies to serve ads on PixTool.</li>
                                <li style={{ marginBottom: '0.5rem' }}>Google's use of the DART cookie enables it to serve ads to our users based on their visit to PixTool and other sites on the Internet.</li>
                                <li style={{ marginBottom: '0.5rem' }}>Users may opt-out of the use of the DART cookie by visiting the <strong>Google Ad and Content Network privacy policy</strong>.</li>
                            </ul>

                            <h3 style={{ fontSize: '1.2rem', color: 'var(--text-primary)', marginBottom: '0.75rem' }}>Opting Out of Personalized Ads</h3>
                            <p style={{ marginBottom: '1rem' }}>
                                You can choose to disable or selectively turn off our cookies or third-party cookies in your browser settings. Alternatively, you can opt-out of some third-party vendor's use of cookies for personalized advertising by visiting:
                            </p>
                            <ul style={{ paddingLeft: '1.5rem', marginBottom: '1.5rem' }}>
                                <li><a href="https://www.aboutads.info" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--accent-primary)' }}>www.aboutads.info</a></li>
                                <li><a href="https://optout.networkadvertising.org" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--accent-primary)' }}>networkadvertising.org</a></li>
                            </ul>
                        </div>

                        <h2 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <ShieldCheck size={20} style={{ color: 'var(--accent-primary)' }} /> 5. Data Privacy Rights (GDPR & CCPA)
                        </h2>
                        <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
                            Depending on your location, you may have the following rights regarding your personal data:
                        </p>
                        <ul style={{ color: 'var(--text-secondary)', marginBottom: '2.5rem', paddingLeft: '1.5rem' }}>
                            <li style={{ marginBottom: '0.75rem' }}><strong>Right to Access:</strong> You can request copies of your personal data.</li>
                            <li style={{ marginBottom: '0.75rem' }}><strong>Right to Rectification:</strong> You can request that we correct any information you believe is inaccurate.</li>
                            <li style={{ marginBottom: '0.75rem' }}><strong>Right to Erasure:</strong> You can request that we erase your personal data, under certain conditions.</li>
                            <li style={{ marginBottom: '0.75rem' }}><strong>Right to Object:</strong> You have the right to object to our processing of your personal data.</li>
                        </ul>
                        <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>
                            Note: Since PixTool is a <strong>Zero-Registration</strong> platform and processes files <strong>locally</strong>, we do not store your files or personal identity on our servers, making exercise of these rights naturally inherit in our design.
                        </p>

                        <h2 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '1.5rem' }}>6. Contact</h2>
                        <p style={{ color: 'var(--text-secondary)' }}>
                            If you have any questions about this Privacy Policy, please contact us at <a href="mailto:contact@uthakkan.com" style={{ color: 'var(--accent-primary)', textDecoration: 'none', fontWeight: 600 }}>contact@uthakkan.com</a>.
                        </p>
                    </div>
                </div>
            </section>
        </div>
    );
}
