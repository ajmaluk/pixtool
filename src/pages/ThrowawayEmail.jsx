import TempMail from './TempMail'

export default function ThrowawayEmail() {
  return (
    <TempMail
      seoPath="/throwaway-email"
      seoTitle="🗑️ Throwaway Email - Free One-Time Use Inbox | PixTool"
      seoDescription="Generate a free throwaway email for one-time use. Our disposable inbox service lets you receive messages instantly, protecting your primary email from spam, tracking, and subscriptions."
      seoKeywords="throwaway email, trash mail, one time email, disposal email, single use email, anonymous inbox, burn after reading email, free throwaway mail address, throwaway inbox, temporary throwaway email, junk email throwaway, one use email address, delete after use email, ephemeral email, privacy throwaway mail"
      storageNamespace="throwaway-mail"
      breadcrumbs={[
        { name: 'Utility Tools', item: '/utility-tools' },
        { name: 'Throwaway Email', item: '/throwaway-email' }
      ]}
      heroTitle="Throwaway Email"
      heroSubtitle="Secure one-time-use temporary inbox - perfect for avoiding junk mail and protecting your digital identity"
    />
  )
}
