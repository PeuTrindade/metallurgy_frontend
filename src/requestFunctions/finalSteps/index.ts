export const updateInspection = async (id: number, description: string, accessToken: string) => {
  const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/inspection/${id}`

  const response = await fetch(url, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify({ description }),
  })

  return response
}
