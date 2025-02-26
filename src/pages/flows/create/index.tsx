import { FlowCard } from '@/components/flow/flowCard'
import Layout from '@/components/layout'
import PageContainer from '@/components/PageContainer'
import { robotoFlex } from '@/pages/_app'
import { ReactElement } from 'react'

const CreateFlow = () => {
  const linksList = [
    {
      name: 'Criar fluxo',
      href: '/flows/create',
    },
  ]

  return (
    <PageContainer linksList={linksList as any}>
      <h1 className="text-3xl font-bold text-gray-900">Cadastrar fluxo</h1>
      <h2 className="text-md font-regular text-gray-500">
        Preencha os campos abaixo para adicionar um novo fluxo ao sistema.
      </h2>

      <div className="pb-12">
        <FlowCard />
      </div>
    </PageContainer>
  )
}

CreateFlow.getLayout = function getLayout(page: ReactElement) {
  return <Layout className={robotoFlex.variable}>{page}</Layout>
}

export default CreateFlow
