export type TCreatePart = {
  name: string
  description: string
  tag: string
  hiringCompany: string
  flow_id: number
  image?: File[]
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
  const formData = new FormData()

  formData.append('part[name]', data.name)
  formData.append('part[description]', data.description)
  formData.append('part[hiringCompany]', data.hiringCompany)
  formData.append('part[tag]', data.tag)
  formData.append('part[flow_id]', String(data.flow_id))

  if (data.image) {
    data.image.forEach((img) => {
      formData.append('part[images][]', img)
    })
  }

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    body: formData,
  })

  return response
}
