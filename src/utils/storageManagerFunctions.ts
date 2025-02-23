const verifyWindowType = typeof window !== 'undefined'

export const insertIntoStorage = (key: string, value: unknown, encrypt?: boolean) => {
  let valueToString = JSON.stringify(value)

  if (encrypt) {
    valueToString = btoa(valueToString)
  }

  verifyWindowType ? window.localStorage.setItem(key, valueToString) : false
}

export const getValueIntoStorage = (key: string, isEncrypted?: boolean) => {
  const value = verifyWindowType ? window.localStorage.getItem(key) : false

  if (value) {
    if (isEncrypted) {
      return JSON.parse(atob(value))
    }

    return JSON.parse(value)
  }
}
export const clearLocalStorage = () => {
  window.localStorage.clear()
}

export const removeItemFromStorage = (key: string, isEncrypted?: boolean) => {
  if (getValueIntoStorage(key, isEncrypted)) {
    verifyWindowType ? window.localStorage.removeItem(key) : false
  }
}
