export type TUpdateStep = {
  description: string
  part_id: number
  startDate: string
  finishDate: string
}

export const updateStep = async (id: number, data: TUpdateStep, accessToken: string) => {
  const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/step/${id}`

  const response = await fetch(url, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify(data),
  })

  return response
}
