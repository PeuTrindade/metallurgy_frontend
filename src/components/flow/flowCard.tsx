import * as React from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '../ui/textarea'
import { toast } from 'react-toastify'
import { createPart, TCreatePart } from '@/requestFunctions/parts'
import { useRouter } from 'next/router'
import { useUser } from '@/context/userContext'
import { Separator } from '../ui/separator'
import CreateFlowSchema from '@/schemas/flows'
import { Trash2 } from 'lucide-react'

export function FlowCard() {
  const { push } = useRouter()
  const [isLoading, setIsLoading] = React.useState(false)
  const { accessToken } = useUser()
  const { isValid, reset, description, errors, name, register, handleAddStep, fields, remove } = CreateFlowSchema()

  const createPartFn = async () => {
    try {
      setIsLoading(true)

      const requestData: TCreatePart = {
        name,
        description,
        tag,
        hiringCompany: company,
        flow_id: +flowId,
      }

      const response = (await createPart(requestData, accessToken)) as Response

      if (response.ok) {
        push('/')
        toast('Peça cadastrada com sucesso!', { type: 'success' })
      } else {
        toast('Ocorreu um erro ao cadastrar a peça! Tente novamente.', { type: 'error' })
      }

      setIsLoading(false)
    } catch (error) {
      toast('Ocorreu um erro inesperado! Tente novamente.', { type: 'error' })
    }
  }

  return (
    <Card className="w-[100%] mt-12 pt-6">
      <CardContent>
        <form onSubmit={(e) => e.preventDefault()}>
          <div className="space-y-1.5">
            <CardTitle>1. Informações gerais</CardTitle>
            <CardDescription>Adicione as informações gerais de identificação ao seu fluxo.</CardDescription>
          </div>

          <div className="flex space-x-4 w-full mt-6">
            <div className="flex flex-col space-y-1.5 w-full">
              <Label htmlFor="name">Nome do fluxo</Label>
              <Input
                error={errors.name?.message?.toString()}
                {...register('name')}
                placeholder="Digite o nome do fluxo"
              />
            </div>
          </div>

          <div className="flex space-x-4 w-full mt-6">
            <div className="flex flex-col space-y-1.5 w-full">
              <Label htmlFor="description">Descrição do fluxo</Label>
              <Textarea
                {...register('description')}
                error={errors.description?.message?.toString()}
                placeholder="Descreva sobre o fluxo, para qual tipo de peça ele é adequado, quais tipos de etapas ele possui, etc..."
                className="w-full"
              />
            </div>
          </div>

          <Separator className="mt-6 mb-6" />

          <div className="space-y-1.5">
            <CardTitle>2. Etapas</CardTitle>
            <CardDescription>Adicione as etapas que pertencerão ao seu fluxo.</CardDescription>
          </div>

          <ul className="mt-4">
            {fields.map((step, index) => (
              <li key={step.id} className="flex items-center justify-between bg-gray-100 p-2 rounded mt-1">
                {step.name}
                <Trash2 className="cursor-pointer" color="red" size={20} onClick={() => remove(index)} />
              </li>
            ))}
          </ul>

          <div className="flex space-x-4 w-full mt-6">
            <div className="flex flex-col space-y-1.5 w-full">
              <Label htmlFor="name">Nome da etapa (Pressione ENTER para adicionar)</Label>
              <Input onKeyDown={handleAddStep} placeholder="Digite o nome da etapa" />
            </div>
          </div>
        </form>
      </CardContent>

      <Separator className="mt-6 mb-6" />

      <CardFooter className="flex justify-between">
        <Button onClick={() => reset()} variant="outline">
          Limpar
        </Button>
        <Button loading={isLoading} disabled={!isValid || isLoading} onClick={createPartFn}>
          Cadastrar
        </Button>
      </CardFooter>
    </Card>
  )
}
