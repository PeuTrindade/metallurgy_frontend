import { ViewFlowCard } from '@/components/flow/viewCard'
import Layout from '@/components/layout'
import PageContainer from '@/components/PageContainer'
import { ViewPartCard } from '@/components/part/viewCard'
import { useUser } from '@/context/userContext'
import { robotoFlex } from '@/pages/_app'
import { getFlow } from '@/requestFunctions/flows'
import { getPart } from '@/requestFunctions/parts'
import { formatDate } from '@/utils/dateFormatter'
import { useRouter } from 'next/router'
import { ReactElement, useCallback, useEffect, useState } from 'react'
import { toast } from 'react-toastify'

const Flow = () => {
  const { accessToken } = useUser()
  const { asPath, query } = useRouter()
  const [flow, setFlow] = useState<any>({})
  const [isLoading, setIsLoading] = useState(true)

  const linksList = [
    {
      name: 'Fluxo',
      href: asPath,
    },
  ]

  const getFlowFn = useCallback(async () => {
    try {
      const response = (await getFlow(accessToken, query.id as string)) as Response

      if (response.ok) {
        const data = await response.json()

        setFlow(data.flows)
      } else {
        toast('Ocorreu um erro ao buscar fluxo! Tente novamente.', { type: 'error' })
      }

      setIsLoading(false)
    } catch (error) {
      toast('Ocorreu um erro inesperado ao buscar fluxo! Tente novamente.', { type: 'error' })
    }
  }, [])

  useEffect(() => {
    getFlowFn()
  }, [getFlowFn])

  if (!isLoading)
    return (
      <PageContainer linksList={linksList as any}>
        <h1 className="text-3xl font-bold text-gray-900">{flow.name}</h1>
        <h2 className="text-md font-regular text-gray-500">
          Fluxo cadastrado em: {formatDate(new Date(flow.created_at))}
        </h2>

        <div className="mt-12">
          <ViewFlowCard
            flowsNames={flow.steps_flows.map((s: any) => s.name)}
            name={flow.name}
            description={flow.description}
          />
        </div>
      </PageContainer>
    )
}

Flow.getLayout = function getLayout(page: ReactElement) {
  return <Layout className={robotoFlex.variable}>{page}</Layout>
}

export default Flow
