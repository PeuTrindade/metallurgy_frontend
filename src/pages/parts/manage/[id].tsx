import Layout from '@/components/layout'
import PageContainer from '@/components/PageContainer'
import ManageCards from '@/components/part/manageCards'
import { useUser } from '@/context/userContext'
import { robotoFlex } from '@/pages/_app'
import { getPart } from '@/requestFunctions/parts'
import { useRouter } from 'next/router'
import { ReactElement, useCallback, useEffect, useState } from 'react'
import { toast } from 'react-toastify'

export type TPartStep = {
  id: number
  part_id: number
  description: string
  startDate: string
  finishDate: string
}

const ManagePart = () => {
  const { asPath, query } = useRouter()
  const { accessToken } = useUser()
  const [part, setPart] = useState<any>({})
  const [isLoading, setIsLoading] = useState(true)
  const [steps, setSteps] = useState<TPartStep[]>([])

  const linksList = [
    {
      name: 'Gerenciar peça',
      href: asPath,
    },
  ]

  const getPartFn = useCallback(async () => {
    try {
      const response = (await getPart(query.id as string, accessToken)) as Response

      if (response.ok) {
        const data = await response.json()

        setPart(data.part)
        setSteps(data.part.steps)
      } else {
        toast('Ocorreu um erro ao buscar peça! Tente novamente.', { type: 'error' })
      }

      setIsLoading(false)
    } catch (error) {
      toast('Ocorreu um erro inesperado ao buscar peça! Tente novamente.', { type: 'error' })
    }
  }, [])

  useEffect(() => {
    getPartFn()
  }, [getPartFn])

  return (
    <PageContainer linksList={linksList as any}>
      <h1 className="text-3xl font-bold text-gray-900">{part.name}</h1>
      <h2 className="text-md font-regular text-gray-500">
        Gerencie as etapas da peça, sendo o mais detalhista possível.
      </h2>

      <ManageCards steps={steps} />
    </PageContainer>
  )
}

ManagePart.getLayout = function getLayout(page: ReactElement) {
  return <Layout className={robotoFlex.variable}>{page}</Layout>
}

export default ManagePart
