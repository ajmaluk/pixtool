import React from 'react';
import SEO from '../../components/SEO';
import { ShieldCheck, Camera, Wifi, History, Mail, Database, Clock, Lock, AppWindow } from 'lucide-react';

export default function KallanCopPrivacy() {
    return (
        <div className="legal-page">
            <SEO
                title="Privacy Policy for KallanCop | Uthakkan"
                description="KallanCop is built with a Privacy First philosophy. Learn about our zero-data collection policy and local multiplayer security."
                path="/uthakkan/apps/kallan-cop"
            />

            <section className="hero" style={{ padding: '6rem 2rem 3rem', background: 'var(--bg-secondary)' }}>
                <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
                    <div style={{ display: 'inline-flex', padding: '12px', background: 'rgba(99, 102, 241, 0.1)', color: 'var(--accent-primary)', borderRadius: '50%', marginBottom: '1.5rem' }}>
                        <ShieldCheck size={32} />
                    </div>
                    <h1 className="hero-title" style={{ fontSize: '3rem', fontWeight: 900, marginBottom: '1rem' }}>Privacy Policy for KallanCop</h1>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem' }}>Last Updated: April 13, 2026</p>
                </div>
            </section>

            <section style={{ padding: '4rem 2rem 8rem' }}>
                <div style={{ maxWidth: '800px', margin: '0 auto' }}>
                    <div className="tool-card" style={{ padding: '3rem', fontSize: '1.05rem', lineHeight: 1.8 }}>
                        <p style={{ color: 'var(--text-secondary)', marginBottom: '2.5rem' }}>
                            <strong>Uthakkan</strong> ("we," "our," or "us") operates the KallanCop mobile application. This Privacy Policy informs you of our policies regarding the collection, use, and disclosure of personal data when you use our app and the choices you have associated with that data.
                        </p>

                        <h2 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <Database size={20} style={{ color: 'var(--accent-primary)' }} /> 1. Current Data Collection Status
                        </h2>
                        <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
                            KallanCop is currently designed with a <strong>"Privacy First"</strong> philosophy. In its current version, we do not collect, store, share, or sell any personal data.
                        </p>
                        <ul style={{ color: 'var(--text-secondary)', marginBottom: '2.5rem', paddingLeft: '1.5rem' }}>
                            <li style={{ marginBottom: '0.75rem' }}><strong>No User Accounts:</strong> You do not need to create an account to play.</li>
                            <li style={{ marginBottom: '0.75rem' }}><strong>No Tracking:</strong> We do not use third-party analytics, cookies, or tracking pixels.</li>
                            <li style={{ marginBottom: '0.75rem' }}><strong>Local Storage:</strong> Any data entered (such as your player name or choice of avatar) stays strictly on your local device and is never uploaded to our servers.</li>
                        </ul>

                        <h2 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <Lock size={20} style={{ color: 'var(--accent-primary)' }} /> 2. Permissions & Usage
                        </h2>
                        <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
                            KallanCop requires specific device permissions to enable local multiplayer functionality. These are used strictly for in-game purposes:
                        </p>
                        
                        <div style={{ marginBottom: '1.5rem' }}>
                            <h3 style={{ fontSize: '1.2rem', color: 'var(--text-primary)', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                                <Camera size={18} /> Camera Access
                            </h3>
                            <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
                                <strong>Purpose:</strong> To scan QR codes provided by the host to join a local game session.<br />
                                <strong>Data Handling:</strong> The camera stream is processed in real-time only. No images, videos, or facial data are recorded, stored, or transmitted.
                            </p>
                        </div>

                        <div style={{ marginBottom: '2.5rem' }}>
                            <h3 style={{ fontSize: '1.2rem', color: 'var(--text-primary)', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                                <Wifi size={18} /> Local Network Connectivity
                            </h3>
                            <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
                                <strong>Purpose:</strong> To discover and connect with other players on the same Wi-Fi or Hotspot network.<br />
                                <strong>Data Handling:</strong> The app uses local Peer-to-Peer communication (mDNS/multicast). Game data is exchanged only between the devices in your physical location. No data leaves your local network.
                            </p>
                        </div>

                        <h2 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <AppWindow size={20} style={{ color: 'var(--accent-primary)' }} /> 3. Advertising (Future Roadmap)
                        </h2>
                        <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
                            Currently, <strong>KallanCop is 100% Ad-Free.</strong> To support the ongoing development of the app, we may introduce advertisements in future updates.
                        </p>
                        <ul style={{ color: 'var(--text-secondary)', marginBottom: '2.5rem', paddingLeft: '1.5rem' }}>
                            <li style={{ marginBottom: '0.75rem' }}><strong>Future Providers:</strong> We may partner with trusted advertising networks such as Google AdMob.</li>
                            <li style={{ marginBottom: '0.75rem' }}><strong>Data Handling:</strong> If ads are introduced, those third-party networks may collect your mobile device's Advertising ID to provide relevant ads.</li>
                            <li style={{ marginBottom: '0.75rem' }}><strong>Transparency:</strong> Before any ad-related data collection begins, we will update this Privacy Policy and, where required by law, request your explicit consent within the app.</li>
                        </ul>

                        <h2 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <ShieldCheck size={20} style={{ color: 'var(--accent-primary)' }} /> 4. Children's Privacy
                        </h2>
                        <p style={{ color: 'var(--text-secondary)', marginBottom: '2.5rem' }}>
                            We do not knowingly collect personal information from children under the age of 13. Since we currently collect no data, KallanCop is safe for all age groups. If we implement advertisements in the future, we will ensure they are configured to comply with the Children's Online Privacy Protection Act (COPPA).
                        </p>

                        <h2 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <History size={20} style={{ color: 'var(--accent-primary)' }} /> 5. Security of Data
                        </h2>
                        <p style={{ color: 'var(--text-secondary)', marginBottom: '2.5rem' }}>
                            Your privacy is protected by our <strong>offline-first architecture.</strong> Because communication happens directly between player devices, your gameplay and identity are shielded from third-party servers and internet-based threats.
                        </p>

                        <h2 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <Clock size={20} style={{ color: 'var(--accent-primary)' }} /> 6. Changes to This Policy
                        </h2>
                        <p style={{ color: 'var(--text-secondary)', marginBottom: '2.5rem' }}>
                            We reserve the right to update this policy as we add new features or monetization models. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last Updated" date at the top.
                        </p>

                        <h2 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <Mail size={20} style={{ color: 'var(--accent-primary)' }} /> 7. Contact Us
                        </h2>
                        <p style={{ color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                            If you have any questions about this Privacy Policy, please contact us:
                        </p>
                        <ul style={{ color: 'var(--text-secondary)', paddingLeft: '1.5rem' }}>
                            <li style={{ marginBottom: '0.5rem' }}>By email: <a href="mailto:contact.uthakkan@gmail.com" style={{ color: 'var(--accent-primary)', fontWeight: 600 }}>contact.uthakkan@gmail.com</a></li>
                            <li style={{ marginBottom: '0.5rem' }}>By visiting our website: <a href="https://www.uthakkan.in" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--accent-primary)', fontWeight: 600 }}>www.uthakkan.in</a></li>
                        </ul>
                    </div>
                </div>
            </section>
        </div>
    );
}
