import * as React from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '../ui/textarea'
import CreatePartSchema from '@/schemas/parts'
import SelectComponent from '../select'
import { toast } from 'react-toastify'
import { createPart, TCreatePart } from '@/requestFunctions/parts'
import { useRouter } from 'next/router'
import { useUser } from '@/context/userContext'
import { getFlows } from '@/requestFunctions/flows'

export function PartCard() {
  const { push } = useRouter()
  const [flowsOptions, setFlowsOptions] = React.useState<any[]>([])
  const [isLoadingFlows, setIsLoadingFlows] = React.useState(true)
  const [isLoading, setIsLoading] = React.useState(false)
  const { accessToken } = useUser()
  const { company, isValid, reset, description, errors, flowId, tag, setValue, name, register, setError, clearErrors } =
    CreatePartSchema()

  const getFlowsFn = React.useCallback(async () => {
    try {
      const response = (await getFlows(accessToken)) as Response

      if (response.ok) {
        const data = await response.json()

        setFlowsOptions(
          data.flows.map((f: any) => ({
            label: f.name,
            value: String(f.id),
          })),
        )
      }

      setIsLoadingFlows(false)
    } catch (error) {
      toast('Ocorreu um erro inesperado! Tente novamente.', { type: 'error' })
    }
  }, [])

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

  React.useEffect(() => {
    getFlowsFn()
  }, [getFlowsFn])

  return (
    <Card className="w-[100%] mt-12 pt-6">
      <CardContent>
        <form onSubmit={(e) => e.preventDefault()}>
          <div className="flex space-x-4 w-full">
            <div className="flex flex-col space-y-1.5 w-1/2">
              <Label htmlFor="name">Nome da peça</Label>
              <Input
                error={errors.name?.message?.toString()}
                {...register('name')}
                placeholder="Digite o nome da peça"
              />
            </div>
            <div className="flex flex-col space-y-1.5 w-1/2">
              <Label htmlFor="company">Empresa contratante</Label>
              <Input
                error={errors.company?.message?.toString()}
                {...register('company')}
                placeholder="Digite o nome da empresa contrante"
              />
            </div>
          </div>

          <div className="flex space-x-4 w-full mt-6">
            <div className="flex flex-col space-y-1.5 w-1/2">
              <Label htmlFor="tag">Identificação da peça</Label>
              <Input
                error={errors.tag?.message?.toString()}
                {...register('tag')}
                placeholder="Digite a identificação da peça"
              />
            </div>
            <div className="flex flex-col space-y-1.5 w-1/2">
              <Label htmlFor="flowId">Fluxo</Label>
              <SelectComponent
                error={errors.flowId?.message?.toString()}
                setValue={(e: any) => {
                  setValue('flowId', e)
                  clearErrors('flowId')
                }}
                id="flowId"
                placeholder="Selecione o fluxo ao qual a peça pertence"
                values={flowsOptions}
                onBlur={() => {
                  if (!flowId) {
                    setError('flowId', { message: 'Preencha o campo acima.' })
                  }
                }}
              />
            </div>
          </div>

          <div className="flex space-x-4 w-full mt-6">
            <div className="flex flex-col space-y-1.5 w-full">
              <Label htmlFor="description">Descrição da peça</Label>
              <Textarea
                {...register('description')}
                error={errors.description?.message?.toString()}
                placeholder="Descreva sobre a peça, sua função no mercado, o estado atual dela, etc..."
                className="w-full"
              />
            </div>
          </div>
        </form>
      </CardContent>
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
