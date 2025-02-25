import { ReactElement, useCallback, useEffect, useState } from 'react'
import Layout from '../components/layout'
import { robotoFlex } from './_app'
import PageContainer from '@/components/PageContainer'
import { DataTableDemo } from '@/components/partTable'
import { useUser } from '@/context/userContext'
import { getParts } from '@/requestFunctions/parts'
import { toast } from 'react-toastify'

function Home() {
  const { accessToken } = useUser()
  const [parts, setParts] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)

  const linksList = [
    {
      name: 'Peças',
      href: '/',
    },
  ]

  const getPartsData = useCallback(async () => {
    try {
      const response = (await getParts(accessToken)) as Response

      if (response.ok) {
        const data = await response.json()

        setParts(data.parts)
      } else {
        toast('Ocorreu um erro ao buscar as peças! Tente novamente.', { type: 'error' })
      }

      setIsLoading(false)
    } catch (error) {
      toast('Ocorreu um erro inesperado ao buscar as peças! Tente novamente.', { type: 'error' })
    }
  }, [])

  useEffect(() => {
    getPartsData()
  }, [getPartsData])

  return (
    <PageContainer linksList={linksList as any}>
      <h1 className="text-3xl font-bold text-gray-900">Peças</h1>
      <h2 className="text-md font-regular text-gray-500">
        Aqui está uma lista de todas as suas peças cadastradas na plataforma.
      </h2>

      <div className="mt-8">
        <DataTableDemo parts={parts} />
      </div>
    </PageContainer>
  )
}

Home.getLayout = function getLayout(page: ReactElement) {
  return <Layout className={robotoFlex.variable}>{page}</Layout>
}

export default Home
