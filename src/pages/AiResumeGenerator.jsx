import { useState } from 'react'
 
import { motion, AnimatePresence } from 'framer-motion'
import AiToolTemplate from '../components/AiToolTemplate'
import { FileSignature, User, Briefcase, GraduationCap, Star, CheckCircle, Plus, Trash2, ArrowRight, ArrowLeft, Download } from 'lucide-react'
import { fetchTextResponse } from '../services/aiApi'

export default function AiResumeGenerator() {
  const [step, setStep] = useState(1);
  const [resumeText, setResumeText] = useState('');
  
  const [formData, setFormData] = useState({
    personal: { name: '', email: '', phone: '', location: '', linkedin: '', github: '' },
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
Name: ${formData.personal.name}
Email: ${formData.personal.email}
Phone: ${formData.personal.phone}
Location: ${formData.personal.location}
Links: LinkedIn: ${formData.personal.linkedin}, GitHub: ${formData.personal.github}

PROFESSIONAL SUMMARY:
${formData.summary}

WORK EXPERIENCE:
${formData.experience.map(exp => `- ${exp.role} at ${exp.company} (${exp.duration})\n  ${exp.description}`).join('\n')}

EDUCATION:
${formData.education.map(edu => `- ${edu.degree} from ${edu.school} (${edu.year})`).join('\n')}

SKILLS:
${formData.skills}

INSTRUCTIONS:
- Use clear, action-oriented bullet points.
- Ensure the layout is clean and readable by ATS systems.
- Highlight achievements and quantifiable impact where possible.
- Output ONLY the resume content in Markdown.`
  };

  const handleGenerate = async () => {
    setResumeText('');
    try {
      const res = await fetchTextResponse(buildPrompt());
      setResumeText(res);
      setStep(6); // Final step
    } catch (err) {
      console.error('Resume Generation Error:', err);
    }
  }

  const handleDownload = () => {
    const element = document.createElement('a');
    const file = new Blob([resumeText], {type: 'text/plain'});
    element.href = URL.createObjectURL(file);
    element.download = `${formData.personal.name.replace(/\s+/g, '_')}_Resume.txt`;
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

  return (
    <AiToolTemplate 
      title="Resume Architect"
      description="Architect a precision-engineered, world-class ATS resume through an interactive interview."
      icon={FileSignature}
      path="/ai-tools/resume-generator"
      onGenerate={step === 5 ? handleGenerate : () => setStep(prev => prev + 1)}
      buttonText={step === 5 ? "Architect Final Resume" : "Continue to Next Phase"}
      seoKeywords="ai resume builder, ats friendly resume, professional resume generator, cv maker ai"
    >
      <div className="resume-wizard" style={{ marginBottom: '2.5rem' }}>
        {/* Progress Bar */}
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4rem', position: 'relative' }}>
          <div style={{ position: 'absolute', top: '22px', left: '0', right: '0', height: '1px', background: '#f4f4f5', zIndex: 0 }}></div>
          {steps.map(s => (
            <div key={s.num} style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', flex: 1 }}>
              <div style={{ 
                width: '44px', height: '44px', 
                borderRadius: '50%', 
                background: step >= s.num ? '#09090b' : '#fff', 
                color: step >= s.num ? '#fff' : '#d4d4d8',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                border: step >= s.num ? 'none' : '1.5px solid #f4f4f5',
                boxShadow: step === s.num ? '0 10px 20px rgba(0,0,0,0.06)' : 'none',
                transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)'
              }}>
                <s.icon size={18} />
              </div>
              <span style={{ fontSize: '0.7rem', fontWeight: 900, marginTop: '1rem', color: step >= s.num ? '#09090b' : '#d4d4d8', textTransform: 'uppercase', letterSpacing: '0.1em' }}>{s.title}</span>
            </div>
          ))}
        </div>

        {/* Step Panels */}
        <div className="step-content" style={{ minHeight: '400px' }}>
          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div key="step1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
                   {[
                     { label: 'Full Name', field: 'name', placeholder: 'e.g. John Doe' },
                     { label: 'Role Title', field: 'title', placeholder: 'e.g. Senior Frontend Engineer' },
                     { label: 'Email Address', field: 'email', placeholder: 'e.g. john@example.com' },
                     { label: 'Phone Number', field: 'phone', placeholder: 'e.g. +1 234 567 890' },
                     { label: 'Location', field: 'location', placeholder: 'e.g. New York, USA' },
                     { label: 'LinkedIn URL', field: 'linkedin', placeholder: 'e.g. linkedin.com/in/johndoe' }
                   ].map(f => (
                     <div key={f.field} className="form-group">
                       <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 900, color: '#a1a1aa', marginBottom: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.15em' }}>{f.label}</label>
                       <input 
                         type="text" 
                         className="dalam-input-field" 
                         style={{ width: '100%', padding: '1.25rem 1.5rem', borderRadius: '18px', border: '1px solid #f4f4f5', background: '#fdfdfd', fontSize: '1.1rem', color: '#1a1a1a', outline: 'none' }}
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
              <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                 <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 900, color: '#a1a1aa', marginBottom: '1.25rem', textTransform: 'uppercase', letterSpacing: '0.2em' }}>Philosophical Summary</label>
                 <textarea 
                   className="dalam-textarea" 
                   style={{ width: '100%', minHeight: '300px', padding: '2rem', borderRadius: '32px', border: '1px solid #f4f4f5', background: '#fdfdfd', fontSize: '1.2rem', color: '#18181b', outline: 'none', lineHeight: 1.6 }}
                   placeholder="Describe your professional journey and key value propositions..."
                   value={formData.summary}
                   onChange={(e) => updateSummary(e.target.value)}
                 />
              </motion.div>
            )}

            {step === 3 && (
              <motion.div key="step3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                 <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 900, color: '#a1a1aa', marginBottom: '1.5rem', textTransform: 'uppercase', letterSpacing: '0.2em' }}>Professional Lineage</label>
                 {formData.experience.map((exp, idx) => (
                   <div key={idx} style={{ padding: '2.5rem', borderRadius: '32px', border: '1px solid #f4f4f5', marginBottom: '2rem', background: '#fff', position: 'relative', boxShadow: '0 10px 30px rgba(0,0,0,0.02)' }}>
                     <button onClick={() => removeExperience(idx)} style={{ position: 'absolute', top: '1.5rem', right: '1.5rem', background: 'none', border: 'none', color: '#d4d4d8', cursor: 'pointer', transition: 'color 0.2s' }} onMouseEnter={(e) => e.target.style.color = '#ef4444'} onMouseLeave={(e) => e.target.style.color = '#d4d4d8'}><Trash2 size={20} /></button>
                     <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '1.5rem' }}>
                        <div className="form-group">
                           <label style={{ display: 'block', fontSize: '0.7rem', fontWeight: 900, color: '#d4d4d8', marginBottom: '0.5rem', textTransform: 'uppercase' }}>Company</label>
                           <input placeholder="e.g., SpaceX" className="dalam-input-field" value={exp.company} onChange={(e) => updateExperience(idx, 'company', e.target.value)} style={{ width: '100%', padding: '1rem 1.25rem', borderRadius: '14px', border: '1px solid #f4f4f5', background: '#fdfdfd', fontSize: '1rem', outline: 'none' }} />
                        </div>
                        <div className="form-group">
                           <label style={{ display: 'block', fontSize: '0.7rem', fontWeight: 900, color: '#d4d4d8', marginBottom: '0.5rem', textTransform: 'uppercase' }}>Role</label>
                           <input placeholder="e.g., Propulsion Engineer" className="dalam-input-field" value={exp.role} onChange={(e) => updateExperience(idx, 'role', e.target.value)} style={{ width: '100%', padding: '1rem 1.25rem', borderRadius: '14px', border: '1px solid #f4f4f5', background: '#fdfdfd', fontSize: '1rem', outline: 'none' }} />
                        </div>
                     </div>
                     <div style={{ marginBottom: '1.5rem' }}>
                        <label style={{ display: 'block', fontSize: '0.7rem', fontWeight: 900, color: '#d4d4d8', marginBottom: '0.5rem', textTransform: 'uppercase' }}>Timeline</label>
                        <input placeholder="e.g., 2020 - Present" className="dalam-input-field" value={exp.duration} onChange={(e) => updateExperience(idx, 'duration', e.target.value)} style={{ width: '100%', padding: '1rem 1.25rem', borderRadius: '14px', border: '1px solid #f4f4f5', background: '#fdfdfd', fontSize: '1rem', outline: 'none' }} />
                     </div>
                     <div>
                        <label style={{ display: 'block', fontSize: '0.7rem', fontWeight: 900, color: '#d4d4d8', marginBottom: '0.5rem', textTransform: 'uppercase' }}>Legacy & Impact</label>
                        <textarea placeholder="Bullet points of achievements..." className="dalam-input-pane" value={exp.description} onChange={(e) => updateExperience(idx, 'description', e.target.value)} style={{ width: '100%', minHeight: '120px', padding: '1.25rem', borderRadius: '18px', border: '1px solid #f4f4f5', background: '#fdfdfd', fontSize: '1rem', outline: 'none', lineHeight: 1.6 }} />
                     </div>
                   </div>
                 ))}
                 <button onClick={addExperience} style={{ width: '100%', padding: '2rem', border: '1.5px dashed #f4f4f5', color: '#a1a1aa', borderRadius: '32px', background: 'transparent', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.75rem', fontWeight: 800, fontSize: '0.9rem', transition: 'all 0.2s' }} className="add-btn-hover">
                    <Plus size={20} /> Append Experience Node
                 </button>
              </motion.div>
            )}

            {step === 4 && (
              <motion.div key="step4" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                 <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 900, color: '#a1a1aa', marginBottom: '1.5rem', textTransform: 'uppercase', letterSpacing: '0.2em' }}>Academic Foundation</label>
                 {formData.education.map((edu, idx) => (
                    <div key={idx} style={{ padding: '2.5rem', borderRadius: '32px', border: '1px solid #f4f4f5', marginBottom: '2rem', background: '#fff', position: 'relative', boxShadow: '0 10px 30px rgba(0,0,0,0.02)' }}>
                      <button onClick={() => removeEducation(idx)} style={{ position: 'absolute', top: '1.5rem', right: '1.5rem', background: 'none', border: 'none', color: '#d4d4d8', cursor: 'pointer' }}><Trash2 size={20} /></button>
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '1.5rem' }}>
                         <div className="form-group">
                            <label style={{ display: 'block', fontSize: '0.7rem', fontWeight: 900, color: '#d4d4d8', marginBottom: '0.5rem', textTransform: 'uppercase' }}>Institution</label>
                            <input placeholder="e.g., MIT" className="dalam-input-field" value={edu.school} onChange={(e) => updateEducation(idx, 'school', e.target.value)} style={{ width: '100%', padding: '1rem 1.25rem', borderRadius: '14px', border: '1px solid #f4f4f5', background: '#fdfdfd', fontSize: '1rem', outline: 'none' }} />
                         </div>
                         <div className="form-group">
                            <label style={{ display: 'block', fontSize: '0.7rem', fontWeight: 900, color: '#d4d4d8', marginBottom: '0.5rem', textTransform: 'uppercase' }}>Degree</label>
                            <input placeholder="e.g., MS Computer Science" className="dalam-input-field" value={edu.degree} onChange={(e) => updateEducation(idx, 'degree', e.target.value)} style={{ width: '100%', padding: '1rem 1.25rem', borderRadius: '14px', border: '1px solid #f4f4f5', background: '#fdfdfd', fontSize: '1rem', outline: 'none' }} />
                         </div>
                      </div>
                      <div>
                        <label style={{ display: 'block', fontSize: '0.7rem', fontWeight: 900, color: '#d4d4d8', marginBottom: '0.5rem', textTransform: 'uppercase' }}>Year of Completion</label>
                        <input placeholder="e.g., 2018" className="dalam-input-field" value={edu.year} onChange={(e) => updateEducation(idx, 'year', e.target.value)} style={{ width: '100%', padding: '1rem 1.25rem', borderRadius: '14px', border: '1px solid #f4f4f5', background: '#fdfdfd', fontSize: '1rem', outline: 'none' }} />
                      </div>
                    </div>
                 ))}
                 <button onClick={addEducation} style={{ width: '100%', padding: '2rem', border: '1.5px dashed #f4f4f5', color: '#a1a1aa', borderRadius: '32px', background: 'transparent', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.75rem', fontWeight: 800, fontSize: '0.9rem', transition: 'all 0.2s' }}>
                    <Plus size={20} /> Append Education Node
                 </button>
              </motion.div>
            )}

            {step === 5 && (
              <motion.div key="step5" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                 <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 900, color: '#a1a1aa', marginBottom: '1.5rem', textTransform: 'uppercase', letterSpacing: '0.2em' }}>Core Architectures & Skills</label>
                 <textarea 
                   className="dalam-textarea" 
                   style={{ width: '100%', minHeight: '250px', padding: '2rem', borderRadius: '32px', border: '1px solid #f4f4f5', background: '#fdfdfd', fontSize: '1.2rem', color: '#18181b', outline: 'none', lineHeight: 1.6 }}
                   placeholder="e.g. JavaScript, React, System Architecture, Team Leadership..."
                   value={formData.skills}
                   onChange={(e) => updateSkills(e.target.value)}
                 />
                 <div style={{ marginTop: '3rem', padding: '2rem', background: '#fafafa', borderRadius: '28px', border: '1px solid #f4f4f5', display: 'flex', gap: '1.25rem', alignItems: 'center' }}>
                    <div style={{ color: '#8b5cf6' }}><Sparkles size={28} strokeWidth={1.5} /></div>
                    <div style={{ fontSize: '0.95rem', color: '#71717a', lineHeight: 1.5 }}>
                       Final preparation complete. The AI will now synthesize your professional data into a high-authority, ATS-optimized manuscript.
                    </div>
                 </div>
              </motion.div>
            )}

            {step === 6 && (
               <motion.div key="step6" initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }}>
                  <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                    <div style={{ width: '72px', height: '72px', background: '#10b981', color: '#fff', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem', boxShadow: '0 10px 25px rgba(16, 185, 129, 0.2)' }}>
                       <CheckCircle size={36} />
                    </div>
                    <h2 style={{ fontSize: '2.5rem', fontWeight: 950, marginBottom: '0.75rem', letterSpacing: '-0.02em' }}>Manuscript Built</h2>
                    <p style={{ color: '#71717a', fontSize: '1.1rem' }}>The architectural synthesis of your professional profile is complete.</p>
                  </div>
                  
                  <div style={{ background: '#fafafa', border: '1px solid #f4f4f5', borderRadius: '40px', padding: '3.5rem', minHeight: '500px', whiteSpace: 'pre-wrap', fontFamily: 'Inter, sans-serif', fontSize: '1.1rem', color: '#18181b', position: 'relative', lineHeight: 1.8 }}>
                     <button onClick={handleDownload} style={{ position: 'absolute', top: '2rem', right: '2rem', display: 'flex', gap: '0.6rem', alignItems: 'center', padding: '0.75rem 1.25rem', fontSize: '0.9rem', fontWeight: 800, borderRadius: '16px', background: '#18181b', color: '#fff', border: 'none', cursor: 'pointer', boxShadow: '0 10px 20px rgba(0,0,0,0.1)' }}>
                        <Download size={18} /> Export Document
                     </button>
                     {resumeText}
                  </div>
                  
                  <div style={{ textAlign: 'center', marginTop: '3rem' }}>
                     <button onClick={() => setStep(1)} style={{ background: 'transparent', color: '#a1a1aa', border: 'none', fontWeight: 800, cursor: 'pointer', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                        Start New Architecture Phase
                     </button>
                  </div>
               </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Wizard Controls */}
        {step < 5 && (
          <div style={{ display: 'grid', gridTemplateColumns: 'auto 1fr', gap: '1.5rem', marginTop: '4rem' }}>
            <button 
              onClick={() => setStep(prev => prev - 1)} 
              disabled={step === 1}
              style={{ width: '64px', height: '64px', borderRadius: '50%', border: '1.5px solid #f4f4f5', background: '#fff', color: '#09090b', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', opacity: step === 1 ? 0 : 1, transition: 'all 0.2s' }}
            >
              <ArrowLeft size={24} />
            </button>
            <button 
              onClick={() => setStep(prev => prev + 1)}
              style={{ height: '64px', padding: '0 3rem', background: '#09090b', color: '#fff', borderRadius: '32px', fontSize: '1.15rem', fontWeight: 800, border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.75rem', boxShadow: '0 15px 35px rgba(0,0,0,0.1)' }}
            >
              Confirm and Traverse Phase <ArrowRight size={22} />
            </button>
          </div>
        )}
      </div>
    </AiToolTemplate>
  )
}
