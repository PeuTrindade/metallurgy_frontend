import Layout from '@/components/layout'
import PageContainer from '@/components/PageContainer'
import { useUser } from '@/context/userContext'
import { getFlows } from '@/requestFunctions/flows'
import { ReactElement, useCallback, useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { robotoFlex } from '../_app'
import { DataFlowDemo } from '@/components/flowTable'

const Flows = () => {
  const { accessToken } = useUser()
  const [flows, setFlows] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)

  const linksList = [
    {
      name: 'Fluxos',
      href: '/flows',
    },
  ]

  const getFlowsData = useCallback(async () => {
    try {
      const response = (await getFlows(accessToken)) as Response

      if (response.ok) {
        const data = await response.json()

        setFlows(data.flows)
      } else {
        toast('Ocorreu um erro ao buscar as fluxos! Tente novamente.', { type: 'error' })
      }

      setIsLoading(false)
    } catch (error) {
      toast('Ocorreu um erro inesperado ao buscar os fluxos! Tente novamente.', { type: 'error' })
    }
  }, [])

  useEffect(() => {
    getFlowsData()
  }, [getFlowsData])

  return (
    <PageContainer linksList={linksList as any}>
      <h1 className="text-3xl font-bold text-gray-900">Fluxos</h1>
      <h2 className="text-md font-regular text-gray-500">
        Aqui está uma lista de todos os fluxos cadastrados na plataforma.
      </h2>

      <div className="mt-8">
        <DataFlowDemo flows={flows} />
      </div>
    </PageContainer>
  )
}

Flows.getLayout = function getLayout(page: ReactElement) {
  return <Layout className={robotoFlex.variable}>{page}</Layout>
}

export default Flows
