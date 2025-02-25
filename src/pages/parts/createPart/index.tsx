import Layout from '@/components/layout'
import PageContainer from '@/components/PageContainer'
import { PartCard } from '@/components/part/partCard'
import { robotoFlex } from '@/pages/_app'
import { ReactElement } from 'react'

const CreatePart = () => {
  const linksList = [
    {
      name: 'Cadastrar peça',
      href: '/parts/createPart',
    },
  ]

  return (
    <PageContainer linksList={linksList as any}>
      <h1 className="text-3xl font-bold text-gray-900">Cadastrar peça</h1>
      <h2 className="text-md font-regular text-gray-500">
        Preencha os campos abaixo para adicionar uma nova peça ao sistema.
      </h2>

      <PartCard />
    </PageContainer>
  )
}

CreatePart.getLayout = function getLayout(page: ReactElement) {
  return <Layout className={robotoFlex.variable}>{page}</Layout>
}

export default CreatePart
