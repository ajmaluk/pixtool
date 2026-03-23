import TempMail from './TempMail'

export default function FakeEmail() {
  return (
    <TempMail
      seoPath="/fake-email"
      seoTitle="Fake Email Generator - Free Fake Mail & Password | PixTool"
      seoDescription="Generate a free random fake email address and password for testing, verifications, and avoiding spam. High-speed fake mail generator for instant working inboxes without registration."
      seoKeywords="fake email generator, fake mail, fake email and password, fake email with password, fake gmail, fake email, fake emails with password, fake gmail generator, fake gmail account, fake mail and password, random email generator, dummy email address, test email, fake inbox, generate fake email, fake email for testing, burner email generator"
      storageNamespace="fake-mail"
      breadcrumbs={[
        { name: 'Utility Tools', item: '/utility-tools' },
        { name: 'Fake Email Generator', item: '/fake-email' }
      ]}
      heroTitle="Fake Email Generator"
      heroSubtitle="Instant random fake email for testing and privacy - no registration, completely free"
    />
  )
}
