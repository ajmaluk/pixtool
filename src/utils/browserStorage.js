export const getBrowserStorage = () => {
  if (typeof window === 'undefined') return null

  try {
    return window.localStorage
  } catch {
    return null
  }
}

export const readStoredJson = (key, fallback) => {
  const storage = getBrowserStorage()
  if (!storage) return fallback

  try {
    const stored = storage.getItem(key)
    return stored ? JSON.parse(stored) : fallback
  } catch {
    return fallback
  }
}

export const writeStoredJson = (key, value) => {
  const storage = getBrowserStorage()
  if (!storage) return false

  try {
    storage.setItem(key, JSON.stringify(value))
    return true
  } catch {
    return false
  }
}