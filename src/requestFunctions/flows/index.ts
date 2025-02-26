export const getFlows = async (accessToken: string) => {
  const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/flows`

  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
  })

  return response
}
