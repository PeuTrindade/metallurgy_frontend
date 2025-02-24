export const signIn = async (email: string, password: string) => {
  const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/login`

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email,
      password,
    }),
  })

  return response
}

export const me = async (accessToken: string) => {
  const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/me`

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      token: accessToken,
    }),
  })

  return response
}
