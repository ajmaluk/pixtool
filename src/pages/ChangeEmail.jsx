import TempMail from './TempMail'

export default function ChangeEmail() {
  return (
    <TempMail
      seoPath="/temp-mail/change-email"
      seoTitle="🔄 Get New Temporary Email - Change/Regenerate Inbox | DailyTools"
      seoDescription="Need a fresh temp mail? Generate a new disposable email instantly. Keep your signups private & spam-free. 1-click email rotation - 100% free!"
      seoKeywords="change email address temp mail, new temporary email, regenerate disposable email, anonymous email generator"
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
