const verifyWindowType = typeof window !== 'undefined'

export const insertIntoSessionStorage = (key: string, value: unknown, encrypt?: boolean) => {
  let valueToString = JSON.stringify(value)

  if (encrypt) {
    valueToString = btoa(encodeURIComponent(valueToString))
  }

  verifyWindowType ? window.sessionStorage.setItem(key, valueToString) : false
}

export const getValueIntoSessionStorage = (key: string, isEncrypted?: boolean) => {
  const value = verifyWindowType ? window.sessionStorage.getItem(key) : false

  if (value) {
    if (isEncrypted) {
      return JSON.parse(decodeURIComponent(atob(value)))
    }

    return JSON.parse(value)
  }
}

export const clearSessionStorage = () => {
  window.sessionStorage.clear()
}

export const removeItemFromSessionStorage = (key: string, isEncrypted?: boolean) => {
  if (getValueIntoSessionStorage(key, isEncrypted)) {
    verifyWindowType ? window.sessionStorage.removeItem(key) : false
  }
}
