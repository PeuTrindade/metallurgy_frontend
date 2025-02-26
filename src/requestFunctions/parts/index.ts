export type TCreatePart = {
  name: string
  description: string
  tag: string
  hiringCompany: string
  flow_id: number
}

export const getParts = async (accessToken: string) => {
  const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/parts`

  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
  })

  return response
}

export const getPart = async (id: string, accessToken: string) => {
  const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/part/${id}`

  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
  })

  return response
}

export const createPart = async (data: TCreatePart, accessToken: string) => {
  const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/part`

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify(data),
  })

  return response
}
