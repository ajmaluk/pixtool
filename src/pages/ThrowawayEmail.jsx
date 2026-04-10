import TempMail from './TempMail'

export default function ThrowawayEmail() {
  return (
    <TempMail
      toolId="ghost-inbox"
      seoPath="/ghost-inbox"
      storageNamespace="ghost-inbox"
    />
  )
}
