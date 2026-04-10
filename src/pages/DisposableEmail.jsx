import TempMail from './TempMail'

export default function DisposableEmail() {
  return (
    <TempMail
      toolId="burner-inbox"
      seoPath="/burner-inbox"
      storageNamespace="burner-inbox"
    />
  )
}
