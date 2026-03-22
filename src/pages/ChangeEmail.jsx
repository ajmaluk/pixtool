import TempMail from './TempMail'

export default function ChangeEmail() {
  return (
    <TempMail
      seoPath="/temp-mail/change-email"
      seoTitle="🔄 Get New Temporary Email - Change/Regenerate Inbox | PixTool"
      seoDescription="Need a fresh temp mail? Generate a new disposable email address instantly with 1-click rotation. Keep your signups private, avoid spam, and stay anonymous online. Unlimited free email changes."
      seoKeywords="new temp mail, new temp mail 2026, change email address temp mail, new temporary email, regenerate disposable email, new burner email, best temp mail 2026, rotate temp mail, fresh disposable inbox, swap temp email, get another temp mail, instant email change"
      storageNamespace="change-mail"
      breadcrumbs={[
        { name: 'Utility Tools', item: '/utility-tools' },
        { name: 'Change Email', item: '/temp-mail/change-email' }
      ]}
      heroTitle="Change Temporary Email"
      heroSubtitle="Generate a brand-new disposable mailbox instantly"
    />
  )
}
