import Layout from '@/components/layout'
import PageContainer from '@/components/PageContainer'
import { ViewPartCard } from '@/components/part/viewCard'
import { useUser } from '@/context/userContext'
import { robotoFlex } from '@/pages/_app'
import { getPart } from '@/requestFunctions/parts'
import { formatDate } from '@/utils/dateFormatter'
import { useRouter } from 'next/router'
import { ReactElement, useCallback, useEffect, useState } from 'react'
import { toast } from 'react-toastify'

const Part = () => {
  const { accessToken } = useUser()
  const { asPath, query } = useRouter()
  const [part, setPart] = useState<any>({})
  const [isLoading, setIsLoading] = useState(true)

  const linksList = [
    {
      name: 'Peça',
      href: asPath,
    },
  ]

  const getPartFn = useCallback(async () => {
    try {
      const response = (await getPart(query.id as string, accessToken)) as Response

      if (response.ok) {
        const data = await response.json()

        setPart(data)
      } else {
        toast('Ocorreu um erro ao buscar peça! Tente novamente.')
      }

      setIsLoading(false)
    } catch (error) {
      toast('Ocorreu um erro inesperado ao buscar peça! Tente novamente.')
    }
  }, [])

  useEffect(() => {
    getPartFn()
  }, [getPartFn])

  if (!isLoading)
    return (
      <PageContainer linksList={linksList as any}>
        <h1 className="text-3xl font-bold text-gray-900">{part.name}</h1>
        <h2 className="text-md font-regular text-gray-500">
          Peça cadastrada em: {formatDate(new Date(part.created_at))}
        </h2>

        <div className="mt-12">
          <ViewPartCard name={part.name} description={part.description} company={part.hiringCompany} tag={part.tag} />
        </div>
      </PageContainer>
    )
}

Part.getLayout = function getLayout(page: ReactElement) {
  return <Layout className={robotoFlex.variable}>{page}</Layout>
}

export default Part
