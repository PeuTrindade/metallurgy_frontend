import { ReactElement } from 'react'
import Layout from '../components/layout'
import { robotoFlex } from './_app'
import PageContainer from '@/components/PageContainer'

function Home() {
  const linksList = [
    {
      name: 'Peças',
      href: '/',
    },
  ]

  return (
    <PageContainer linksList={linksList as any}>
      <h1 className="text-3xl font-bold text-gray-900">Peças</h1>
      <h2 className="text-md font-regular text-gray-500">
        Aqui está uma lista de todas as suas peças cadastradas na plataforma.
      </h2>
    </PageContainer>
  )
}

Home.getLayout = function getLayout(page: ReactElement) {
  return <Layout className={robotoFlex.variable}>{page}</Layout>
}

export default Home
