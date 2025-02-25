import Layout from '@/components/layout'
import PageContainer from '@/components/PageContainer'
import { robotoFlex } from '@/pages/_app'
import { useRouter } from 'next/router'
import { ReactElement } from 'react'

const Part = () => {
  const { asPath } = useRouter()

  const linksList = [
    {
      name: 'Peça',
      href: asPath,
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

Part.getLayout = function getLayout(page: ReactElement) {
  return <Layout className={robotoFlex.variable}>{page}</Layout>
}

export default Part
