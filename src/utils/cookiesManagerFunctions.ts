import Cookies from 'js-cookie'

export const insertIntoCookies = (key: string, value: unknown, encrypt?: boolean) => {
  let valueInString = JSON.stringify(value)

  if (encrypt) {
    valueInString = encodeURIComponent(btoa(valueInString))
  }

  if (process.env.NEXT_PUBLIC_JOBECAM_DOMAIN) {
    Cookies.set(key, valueInString, {
      domain: process.env.NEXT_PUBLIC_JOBECAM_DOMAIN,
    })
  } else {
    Cookies.set(key, valueInString)
  }
}

export const getValueIntoCookies = (key: string, isEncrypted?: boolean) => {
  if (Cookies.get(key)) {
    if (isEncrypted) {
      return JSON.parse(atob(`${decodeURIComponent(Cookies.get(key) as string)}`))
    }

    return JSON.parse(Cookies.get(key) as string)
  }
}

export const removeValueIntoCookies = (key: string) => {
  if (Cookies.get(key)) {
    if (process.env.NEXT_PUBLIC_JOBECAM_DOMAIN) {
      Cookies.remove(key, { domain: process.env.NEXT_PUBLIC_JOBECAM_DOMAIN })
    } else {
      Cookies.remove(key)
    }
  }
}
