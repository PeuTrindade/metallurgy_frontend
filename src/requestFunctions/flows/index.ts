export type TCreateFlow = {
  name: string
  description: string
}

export type TCreateStepModel = {
  flow_id: number
  name: string
}

export const getFlow = async (accessToken: string, id: string) => {
  const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/flow/${id}`

  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
  })

  return response
}

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

export const createFlow = async (accessToken: string, data: TCreateFlow) => {
  const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/flow`

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

export const createFlowStepModel = async (accessToken: string, data: TCreateStepModel) => {
  const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/steps_flow`

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
