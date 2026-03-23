import TempMail from './TempMail'

export default function DisposableEmail() {
  return (
    <TempMail
      seoPath="/disposable-email"
      seoTitle="Disposable Email - Free Temp Mail for Signups | PixTool"
      seoDescription="Generate a free disposable email address instantly. Perfect for website signups, one-time verifications, and avoiding spam in your real inbox. 100% anonymous, no registration required."
      seoKeywords="disposable email, disposable email address, free disposable email, disposable gmail, disposable mail, disposable email with password, disposable email and password, disposable email generator, temp mail, temporary email address, throwaway email, anonymous disposable mail, guerrilla mail alternative, one time use email address"
      storageNamespace="disposable-mail"
      breadcrumbs={[
        { name: 'Utility Tools', item: '/utility-tools' },
        { name: 'Disposable Email', item: '/disposable-email' }
      ]}
      heroTitle="Disposable Email Service"
      heroSubtitle="Your one-time use email address - stay anonymous and keep your real inbox clean from junk"
    />
  )
}
