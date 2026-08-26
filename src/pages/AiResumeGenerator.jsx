import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import AiToolTemplate from '../components/AiToolTemplate'
import { FileSignature, User, Briefcase, GraduationCap, Star, CheckCircle, Plus, Trash2, ArrowRight, ArrowLeft, Download, Sparkles, RefreshCw } from 'lucide-react'
import { fetchTextResponse } from '../services/aiApi'
import MarkdownRenderer from '../components/MarkdownRenderer'

export default function AiResumeGenerator() {
  const [step, setStep] = useState(1);
  const [resumeText, setResumeText] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  const [formData, setFormData] = useState({
    personal: { name: '', title: '', email: '', phone: '', location: '', linkedin: '', github: '' },
    summary: '',
    experience: [{ company: '', role: '', duration: '', description: '' }],
    education: [{ school: '', degree: '', year: '' }],
    skills: ''
  });

  const updatePersonal = (field, value) => setFormData(prev => ({ ...prev, personal: { ...prev.personal, [field]: value } }));
  const updateSummary = (value) => setFormData(prev => ({ ...prev, summary: value }));
  
  const addExperience = () => setFormData(prev => ({ ...prev, experience: [...prev.experience, { company: '', role: '', duration: '', description: '' }] }));
  const removeExperience = (index) => setFormData(prev => ({ ...prev, experience: prev.experience.filter((_, i) => i !== index) }));
  const updateExperience = (index, field, value) => {
    const newExp = [...formData.experience];
    newExp[index][field] = value;
    setFormData(prev => ({ ...prev, experience: newExp }));
  };

  const addEducation = () => setFormData(prev => ({ ...prev, education: [...prev.education, { school: '', degree: '', year: '' }] }));
  const removeEducation = (index) => setFormData(prev => ({ ...prev, education: prev.education.filter((_, i) => i !== index) }));
  const updateEducation = (index, field, value) => {
    const newEdu = [...formData.education];
    newEdu[index][field] = value;
    setFormData(prev => ({ ...prev, education: newEdu }));
  };

  const updateSkills = (value) => setFormData(prev => ({ ...prev, skills: value }));

  const buildPrompt = () => {
    return `You are a Senior Technical Recruiter and ATS Optimization Expert. 
Based on the provided details, generate a professional, high-impact, ATS-friendly resume in Markdown format.

PERSONAL DETAILS:
Name: ${formData.personal.name || 'Candidate Name'}
Title: ${formData.personal.title || 'Professional'}
Email: ${formData.personal.email}
Phone: ${formData.personal.phone}
Location: ${formData.personal.location}
Links: LinkedIn: ${formData.personal.linkedin}, GitHub: ${formData.personal.github}

PROFESSIONAL SUMMARY:
${formData.summary || 'Results-driven professional with proven expertise.'}

WORK EXPERIENCE:
${formData.experience.map(exp => `- ${exp.role} at ${exp.company} (${exp.duration})\n  ${exp.description}`).join('\n')}

EDUCATION:
${formData.education.map(edu => `- ${edu.degree} from ${edu.school} (${edu.year})`).join('\n')}

SKILLS:
${formData.skills}

INSTRUCTIONS:
- Use clear, action-oriented bullet points starting with strong power verbs.
- Ensure the layout is clean, ATS-compliant, and easy to parse.
- Highlight achievements and quantifiable impact where possible.
- Output ONLY the resume content formatted in clean Markdown.`
  };

  const handleGenerate = async () => {
    setLoading(true);
    setError(null);
    setResumeText('');
    try {
      const res = await fetchTextResponse(buildPrompt());
      setResumeText(res);
      setStep(6);
    } catch (err) {
      console.error('Resume Generation Error:', err);
      setError(err.message || 'Failed to synthesize resume. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  const handleDownload = () => {
    const element = document.createElement('a');
    const file = new Blob([resumeText], {type: 'text/markdown'});
    element.href = URL.createObjectURL(file);
    element.download = `${(formData.personal.name || 'Resume').replace(/\s+/g, '_')}_Resume.md`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  }

  const steps = [
    { num: 1, title: 'Identity', icon: User },
    { num: 2, title: 'Summary', icon: FileSignature },
    { num: 3, title: 'Experience', icon: Briefcase },
    { num: 4, title: 'Education', icon: GraduationCap },
    { num: 5, title: 'Skills', icon: Star },
    { num: 6, title: 'Download', icon: CheckCircle },
  ];

  const wizardContent = (
    <div 
      className="resume-wizard-container" 
      style={{ 
        background: 'var(--bg-glass)', 
        borderRadius: '24px', 
        padding: 'clamp(1.5rem, 4vw, 2.5rem)',
        border: '1px solid var(--border-color)',
        boxShadow: 'var(--shadow-md)',
        backdropFilter: 'blur(20px)'
      }}
    >
      {/* Progress Bar */}
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2.5rem', position: 'relative' }}>
        <div style={{ position: 'absolute', top: '20px', left: '20px', right: '20px', height: '2px', background: 'var(--border-color)', zIndex: 0 }}></div>
        {steps.map(s => (
          <div key={s.num} style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', flex: 1 }}>
            <button
              onClick={() => s.num <= step && setStep(s.num)}
              style={{ 
                width: '40px', height: '40px', 
                borderRadius: '50%', 
                background: step >= s.num ? 'var(--accent-purple)' : 'var(--bg-primary)', 
                color: step >= s.num ? '#fff' : 'var(--text-muted)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                border: step >= s.num ? 'none' : '1.5px solid var(--border-color)',
                boxShadow: step === s.num ? '0 0 0 4px var(--accent-glow)' : 'none',
                cursor: s.num <= step ? 'pointer' : 'default',
                transition: 'all 0.3s ease'
              }}
            >
              <s.icon size={16} />
            </button>
            <span style={{ fontSize: '0.68rem', fontWeight: 800, marginTop: '0.5rem', color: step >= s.num ? 'var(--text-primary)' : 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
              {s.title}
            </span>
          </div>
        ))}
      </div>

      {/* Error Alert */}
      {error && (
        <div style={{ background: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239, 68, 68, 0.3)', padding: '1rem', borderRadius: '12px', color: 'var(--accent-red)', marginBottom: '1.5rem', fontSize: '0.85rem' }}>
          {error}
        </div>
      )}

      {/* Step Panels */}
      <div className="step-content" style={{ minHeight: '350px' }}>
        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div key="step1" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.25rem' }}>
                {[
                  { label: 'Full Name', field: 'name', placeholder: 'e.g. John Doe' },
                  { label: 'Target Job Title', field: 'title', placeholder: 'e.g. Senior Frontend Engineer' },
                  { label: 'Email Address', field: 'email', placeholder: 'e.g. john@example.com' },
                  { label: 'Phone Number', field: 'phone', placeholder: 'e.g. +1 234 567 890' },
                  { label: 'Location', field: 'location', placeholder: 'e.g. San Francisco, CA' },
                  { label: 'LinkedIn URL', field: 'linkedin', placeholder: 'e.g. linkedin.com/in/johndoe' },
                  { label: 'GitHub / Portfolio', field: 'github', placeholder: 'e.g. github.com/johndoe' }
                ].map(f => (
                  <div key={f.field} className="form-group">
                    <label htmlFor={`ai-resume-personal-${f.field}`} style={{ display: 'block', fontSize: '0.75rem', fontWeight: 800, color: 'var(--text-muted)', marginBottom: '0.4rem', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                      {f.label}
                    </label>
                    <input 
                      id={`ai-resume-personal-${f.field}`}
                      name={f.field}
                      type="text" 
                      style={{ width: '100%', padding: '0.75rem 1rem', borderRadius: '12px', border: '1px solid var(--border-color)', background: 'var(--bg-secondary)', fontSize: '0.92rem', color: 'var(--text-primary)', outline: 'none', boxSizing: 'border-box' }}
                      placeholder={f.placeholder}
                      value={formData.personal[f.field]}
                      onChange={(e) => updatePersonal(f.field, e.target.value)}
                    />
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div key="step2" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
              <label htmlFor="ai-resume-summary" style={{ display: 'block', fontSize: '0.75rem', fontWeight: 800, color: 'var(--text-muted)', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                Executive Career Summary
              </label>
              <textarea 
                id="ai-resume-summary"
                name="summary"
                className="dalam-textarea" 
                style={{ width: '100%', minHeight: '220px', padding: '1.25rem', borderRadius: '16px', border: '1px solid var(--border-color)', background: 'var(--bg-secondary)', fontSize: '0.95rem', color: 'var(--text-primary)', outline: 'none', lineHeight: 1.6, boxSizing: 'border-box' }}
                placeholder="Describe your career highlights, domain expertise, and key technical capabilities..."
                value={formData.summary}
                onChange={(e) => updateSummary(e.target.value)}
              />
            </motion.div>
          )}

          {step === 3 && (
            <motion.div key="step3" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
              <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 800, color: 'var(--text-muted)', marginBottom: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                Work Experience Nodes
              </label>
              {formData.experience.map((exp, idx) => (
                <div key={idx} style={{ padding: '1.25rem', borderRadius: '16px', border: '1px solid var(--border-color)', marginBottom: '1rem', background: 'var(--bg-secondary)', position: 'relative' }}>
                  {formData.experience.length > 1 && (
                    <button 
                      type="button"
                      onClick={() => removeExperience(idx)} 
                      style={{ position: 'absolute', top: '1rem', right: '1rem', background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}
                    >
                      <Trash2 size={16} />
                    </button>
                  )}
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '0.75rem', marginBottom: '0.75rem' }}>
                    <div>
                      <label htmlFor={`ai-resume-exp-company-${idx}`} style={{ display: 'block', fontSize: '0.7rem', fontWeight: 800, color: 'var(--text-muted)', marginBottom: '0.3rem' }}>Company</label>
                      <input id={`ai-resume-exp-company-${idx}`} name={`expCompany${idx}`} placeholder="e.g. Google" style={{ width: '100%', padding: '0.65rem 0.85rem', borderRadius: '10px', border: '1px solid var(--border-color)', background: 'var(--bg-primary)', fontSize: '0.88rem', outline: 'none', boxSizing: 'border-box' }} value={exp.company} onChange={(e) => updateExperience(idx, 'company', e.target.value)} />
                    </div>
                    <div>
                      <label htmlFor={`ai-resume-exp-role-${idx}`} style={{ display: 'block', fontSize: '0.7rem', fontWeight: 800, color: 'var(--text-muted)', marginBottom: '0.3rem' }}>Role</label>
                      <input id={`ai-resume-exp-role-${idx}`} name={`expRole${idx}`} placeholder="e.g. Lead Software Engineer" style={{ width: '100%', padding: '0.65rem 0.85rem', borderRadius: '10px', border: '1px solid var(--border-color)', background: 'var(--bg-primary)', fontSize: '0.88rem', outline: 'none', boxSizing: 'border-box' }} value={exp.role} onChange={(e) => updateExperience(idx, 'role', e.target.value)} />
                    </div>
                    <div>
                      <label htmlFor={`ai-resume-exp-duration-${idx}`} style={{ display: 'block', fontSize: '0.7rem', fontWeight: 800, color: 'var(--text-muted)', marginBottom: '0.3rem' }}>Timeline</label>
                      <input id={`ai-resume-exp-duration-${idx}`} name={`expDuration${idx}`} placeholder="e.g. 2021 - Present" style={{ width: '100%', padding: '0.65rem 0.85rem', borderRadius: '10px', border: '1px solid var(--border-color)', background: 'var(--bg-primary)', fontSize: '0.88rem', outline: 'none', boxSizing: 'border-box' }} value={exp.duration} onChange={(e) => updateExperience(idx, 'duration', e.target.value)} />
                    </div>
                  </div>
                  <div>
                    <label htmlFor={`ai-resume-exp-impact-${idx}`} style={{ display: 'block', fontSize: '0.7rem', fontWeight: 800, color: 'var(--text-muted)', marginBottom: '0.3rem' }}>Responsibilities & Quantifiable Achievements</label>
                    <textarea id={`ai-resume-exp-impact-${idx}`} name={`expImpact${idx}`} placeholder="Describe your key achievements, metrics boosted, and technologies used..." style={{ width: '100%', minHeight: '80px', padding: '0.75rem', borderRadius: '12px', border: '1px solid var(--border-color)', background: 'var(--bg-primary)', fontSize: '0.88rem', outline: 'none', lineHeight: 1.5, boxSizing: 'border-box' }} value={exp.description} onChange={(e) => updateExperience(idx, 'description', e.target.value)} />
                  </div>
                </div>
              ))}
              <button 
                type="button" 
                onClick={addExperience} 
                style={{ width: '100%', padding: '0.85rem', border: '1.5px dashed var(--border-color)', color: 'var(--accent-purple)', borderRadius: '12px', background: 'transparent', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', fontWeight: 800, fontSize: '0.85rem' }}
              >
                <Plus size={16} /> Add Experience Node
              </button>
            </motion.div>
          )}

          {step === 4 && (
            <motion.div key="step4" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
              <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 800, color: 'var(--text-muted)', marginBottom: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                Academic Qualifications
              </label>
              {formData.education.map((edu, idx) => (
                <div key={idx} style={{ padding: '1.25rem', borderRadius: '16px', border: '1px solid var(--border-color)', marginBottom: '1rem', background: 'var(--bg-secondary)', position: 'relative' }}>
                  {formData.education.length > 1 && (
                    <button 
                      type="button" 
                      onClick={() => removeEducation(idx)} 
                      style={{ position: 'absolute', top: '1rem', right: '1rem', background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}
                    >
                      <Trash2 size={16} />
                    </button>
                  )}
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '0.75rem' }}>
                    <div>
                      <label htmlFor={`ai-resume-edu-school-${idx}`} style={{ display: 'block', fontSize: '0.7rem', fontWeight: 800, color: 'var(--text-muted)', marginBottom: '0.3rem' }}>Institution</label>
                      <input id={`ai-resume-edu-school-${idx}`} name={`eduSchool${idx}`} placeholder="e.g. Stanford University" style={{ width: '100%', padding: '0.65rem 0.85rem', borderRadius: '10px', border: '1px solid var(--border-color)', background: 'var(--bg-primary)', fontSize: '0.88rem', outline: 'none', boxSizing: 'border-box' }} value={edu.school} onChange={(e) => updateEducation(idx, 'school', e.target.value)} />
                    </div>
                    <div>
                      <label htmlFor={`ai-resume-edu-degree-${idx}`} style={{ display: 'block', fontSize: '0.7rem', fontWeight: 800, color: 'var(--text-muted)', marginBottom: '0.3rem' }}>Degree / Field of Study</label>
                      <input id={`ai-resume-edu-degree-${idx}`} name={`eduDegree${idx}`} placeholder="e.g. B.S. Computer Science" style={{ width: '100%', padding: '0.65rem 0.85rem', borderRadius: '10px', border: '1px solid var(--border-color)', background: 'var(--bg-primary)', fontSize: '0.88rem', outline: 'none', boxSizing: 'border-box' }} value={edu.degree} onChange={(e) => updateEducation(idx, 'degree', e.target.value)} />
                    </div>
                    <div>
                      <label htmlFor={`ai-resume-edu-year-${idx}`} style={{ display: 'block', fontSize: '0.7rem', fontWeight: 800, color: 'var(--text-muted)', marginBottom: '0.3rem' }}>Graduation Year</label>
                      <input id={`ai-resume-edu-year-${idx}`} name={`eduYear${idx}`} placeholder="e.g. 2020" style={{ width: '100%', padding: '0.65rem 0.85rem', borderRadius: '10px', border: '1px solid var(--border-color)', background: 'var(--bg-primary)', fontSize: '0.88rem', outline: 'none', boxSizing: 'border-box' }} value={edu.year} onChange={(e) => updateEducation(idx, 'year', e.target.value)} />
                    </div>
                  </div>
                </div>
              ))}
              <button 
                type="button" 
                onClick={addEducation} 
                style={{ width: '100%', padding: '0.85rem', border: '1.5px dashed var(--border-color)', color: 'var(--accent-purple)', borderRadius: '12px', background: 'transparent', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', fontWeight: 800, fontSize: '0.85rem' }}
              >
                <Plus size={16} /> Add Education Node
              </button>
            </motion.div>
          )}

          {step === 5 && (
            <motion.div key="step5" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
              <label htmlFor="ai-resume-skills" style={{ display: 'block', fontSize: '0.75rem', fontWeight: 800, color: 'var(--text-muted)', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                Technical & Leadership Competencies
              </label>
              <textarea 
                id="ai-resume-skills"
                name="skills"
                className="dalam-textarea" 
                style={{ width: '100%', minHeight: '180px', padding: '1.25rem', borderRadius: '16px', border: '1px solid var(--border-color)', background: 'var(--bg-secondary)', fontSize: '0.95rem', color: 'var(--text-primary)', outline: 'none', lineHeight: 1.6, boxSizing: 'border-box' }}
                placeholder="e.g. React, Node.js, Cloud Architecture, PostgreSQL, Docker, Agile Scrum, System Design..."
                value={formData.skills}
                onChange={(e) => updateSkills(e.target.value)}
              />
            </motion.div>
          )}

          {step === 6 && (
            <motion.div key="step6" initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                  <CheckCircle size={20} color="var(--accent-emerald)" />
                  <span style={{ fontWeight: 800, fontSize: '1.1rem' }}>Resume Manuscript Synthesized</span>
                </div>
                <div style={{ display: 'flex', gap: '0.6rem' }}>
                  <button 
                    onClick={handleGenerate} 
                    style={{ display: 'flex', gap: '0.4rem', alignItems: 'center', padding: '0.55rem 1rem', fontSize: '0.82rem', fontWeight: 700, borderRadius: '10px', background: 'var(--bg-secondary)', color: 'var(--text-primary)', border: '1px solid var(--border-color)', cursor: 'pointer' }}
                  >
                    <RefreshCw size={14} /> Regenerate
                  </button>
                  <button 
                    onClick={handleDownload} 
                    style={{ display: 'flex', gap: '0.4rem', alignItems: 'center', padding: '0.55rem 1rem', fontSize: '0.82rem', fontWeight: 800, borderRadius: '10px', background: 'var(--accent-gradient)', color: '#fff', border: 'none', cursor: 'pointer', boxShadow: 'var(--shadow-sm)' }}
                  >
                    <Download size={14} /> Download Markdown (.md)
                  </button>
                </div>
              </div>

              <div style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: '16px', padding: '2rem', minHeight: '400px', fontSize: '0.95rem', lineHeight: 1.7 }}>
                <MarkdownRenderer content={resumeText} />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Wizard Bottom Controls */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '2rem', paddingTop: '1.5rem', borderTop: '1px solid var(--border-color)' }}>
        <button 
          type="button"
          onClick={() => setStep(prev => Math.max(1, prev - 1))} 
          disabled={step === 1 || loading}
          style={{ padding: '0.65rem 1.25rem', borderRadius: '10px', border: '1px solid var(--border-color)', background: 'var(--bg-secondary)', color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '0.4rem', cursor: step === 1 ? 'not-allowed' : 'pointer', opacity: step === 1 ? 0.4 : 1, fontWeight: 700, fontSize: '0.85rem' }}
        >
          <ArrowLeft size={16} /> Back
        </button>

        {step < 5 && (
          <button 
            type="button"
            onClick={() => setStep(prev => prev + 1)}
            style={{ padding: '0.65rem 1.5rem', background: 'var(--accent-gradient)', color: '#fff', borderRadius: '10px', fontSize: '0.88rem', fontWeight: 800, border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem', boxShadow: 'var(--shadow-sm)' }}
          >
            Continue <ArrowRight size={16} />
          </button>
        )}

        {step === 5 && (
          <button 
            type="button"
            onClick={handleGenerate}
            disabled={loading}
            style={{ padding: '0.75rem 1.75rem', background: 'var(--accent-gradient)', color: '#fff', borderRadius: '12px', fontSize: '0.92rem', fontWeight: 800, border: 'none', cursor: loading ? 'not-allowed' : 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem', boxShadow: 'var(--shadow-md)' }}
          >
            {loading ? <RefreshCw className="spin" size={18} /> : <Sparkles size={18} />}
            {loading ? 'Synthesizing Resume...' : 'Architect Final Resume'}
          </button>
        )}

        {step === 6 && (
          <button 
            type="button"
            onClick={() => setStep(1)}
            style={{ padding: '0.65rem 1.25rem', background: 'transparent', color: 'var(--text-muted)', border: 'none', fontWeight: 800, cursor: 'pointer', fontSize: '0.82rem' }}
          >
            Start Over
          </button>
        )}
      </div>
    </div>
  );

  return (
    <AiToolTemplate 
      title="Resume Architect"
      description="Architect a precision-engineered, world-class ATS resume through an interactive interview."
      icon={FileSignature}
      path="/ai-tools/resume-generator"
      customWorkspace={wizardContent}
      seoKeywords="ai resume builder, ats friendly resume, professional resume generator, cv maker ai"
    />
  )
}
