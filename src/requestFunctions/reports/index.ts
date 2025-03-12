export const createReport = async (partId: number, accessToken: string) => {
  const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/report/${partId}`

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
  })

  return response
}
