import { TPartStep } from '@/pages/parts/manage/[id]'
import { Button } from '../ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../ui/card'
import { Input } from '../ui/input'
import { Label } from '../ui/label'
import { Textarea } from '../ui/textarea'
import { useEffect, useState } from 'react'
import ManagePartSchema from '@/schemas/parts/managePart'
import { toast } from 'react-toastify'
import { TUpdateStep, updateStep } from '@/requestFunctions/steps'
import { useUser } from '@/context/userContext'
import { createReport } from '@/requestFunctions/reports'
import { useRouter } from 'next/router'
import PreviewReport from '../report/PreviewReport'
import FinalStepsSchema from '@/schemas/parts/finalSteps'
import { updateInspection } from '@/requestFunctions/finalSteps'

const ManageCards = ({
  steps,
  setSteps,
  inspection,
  setInspection,
}: { steps: TPartStep[]; setSteps: any; inspection: any; setInspection: any }) => {
  const { query } = useRouter()
  const { accessToken } = useUser()
  const [index, setIndex] = useState(0)
  const currentStep = steps[index]
  const [isLoadingReport, setIsLoadingReport] = useState(false)
  const { register, errors, description, startDate, finishDate, setValue } = ManagePartSchema()
  const [reportInfo, setReportInfo] = useState()
  const [finalSteps, setFinalSteps] = useState(false)
  const {
    register: finalStepsRegister,
    errors: finalStepsErrors,
    setValue: setFinalStepValue,
    inspection: finalStepInspection,
  } = FinalStepsSchema()

  const updateStepFn = async () => {
    try {
      const requestData: TUpdateStep = {
        description,
        finishDate,
        startDate,
        part_id: currentStep.part_id,
      }

      const response = (await updateStep(currentStep.id, requestData, accessToken)) as Response

      if (response.ok) {
        toast('Etapa salva com sucesso!', { type: 'success' })

        setIndex(index + 1)
      } else {
        toast('Ocorreu um erro ao salvar etapa! Tente novamente.', { type: 'error' })
      }
    } catch (error) {
      toast('Ocorreu um erro inesperado! Tente novamente.', { type: 'error' })
    }
  }

  const onHandleNext = async () => {
    await updateStepFn()
  }

  const onHandlePrevious = () => {
    setIndex(index - 1)
  }

  const generateReportFn = async () => {
    try {
      setIsLoadingReport(true)

      const inspectionResponse = (await updateInspection(inspection.id, finalStepInspection, accessToken)) as Response

      if (inspectionResponse.ok) {
        const response = (await createReport(+(query.id as string), accessToken)) as Response

        if (response.ok) {
          const data = await response.json()

          setReportInfo(data)

          toast('Relatório gerado com sucesso!', { type: 'success' })
        } else {
          toast('Ocorreu um erro ao gerar relatório! Tente novamente.', { type: 'error' })
        }
      } else {
        toast('Ocorreu um erro ao gerar relatório! Tente novamente.', { type: 'error' })
      }

      setIsLoadingReport(false)
    } catch (error) {
      toast('Ocorreu um erro inesperado! Tente novamente.', { type: 'error' })
    }
  }

  useEffect(() => {
    if (currentStep) {
      setValue('startDate', currentStep.startDate.split('T')[0])
      setValue('finishDate', currentStep.finishDate.split('T')[0])
      setValue('description', currentStep.description)
    }

    if (inspection) {
      setFinalStepValue('inspection', inspection.description)
    }
  }, [currentStep])

  if (reportInfo) return <PreviewReport report={reportInfo} />

  if (finalSteps) {
    return (
      <Card className="w-[100%] mt-12">
        <CardHeader>
          <CardTitle>Inspeção final</CardTitle>
          <CardDescription>Descreva o estado da peça após a conclusão de todas as etapas.</CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={(e) => e.preventDefault()}>
            <Textarea
              height="min-h-[200px]"
              error={finalStepsErrors.inspection?.message?.toString()}
              {...finalStepsRegister('inspection')}
              placeholder="Descreva sobre o estado final da peça com detalhes"
              className="w-full"
            />
          </form>
        </CardContent>

        <CardFooter className="flex justify-between">
          <Button disabled={index == 0} onClick={() => setFinalSteps(false)} variant="outline">
            Anterior
          </Button>

          <Button loading={isLoadingReport} disabled={isLoadingReport} onClick={generateReportFn}>
            Gerar relatório
          </Button>
        </CardFooter>
      </Card>
    )
  }

  return (
    <Card className="w-[100%] mt-12">
      <CardHeader>
        <CardTitle>Etapa {index + 1}:</CardTitle>
        <CardDescription>{currentStep?.name}</CardDescription>
      </CardHeader>

      <CardContent>
        <form onSubmit={(e) => e.preventDefault()}>
          <div className="flex space-x-4 w-full">
            <div className="flex flex-col space-y-1.5 w-1/2">
              <Label htmlFor="company">Data de início</Label>
              <Input type="date" error={errors.startDate?.message?.toString()} {...register('startDate')} />
            </div>

            <div className="flex flex-col space-y-1.5 w-1/2">
              <Label htmlFor="company">Data de término</Label>
              <Input error={errors.finishDate?.message?.toString()} type="date" {...register('finishDate')} />
            </div>
          </div>

          <div className="flex space-x-4 w-full mt-6">
            <div className="flex flex-col space-y-1.5 w-full">
              <Label htmlFor="description">Descrição da etapa</Label>
              <Textarea
                height="min-h-[200px]"
                error={errors.description?.message?.toString()}
                {...register('description')}
                placeholder="Descreva sobre a peça, sua função no mercado, o estado atual dela, etc..."
                className="w-full"
              />
            </div>
          </div>
        </form>
      </CardContent>

      <CardFooter className="flex justify-between">
        <Button disabled={index == 0} onClick={onHandlePrevious} variant="outline">
          Anterior
        </Button>
        {index + 1 == steps.length ? (
          <Button onClick={() => setFinalSteps(true)}>Preencher dados finais</Button>
          // <Button loading={isLoadingReport} disabled={isLoadingReport} onClick={generateReportFn}>
          //   Gerar relatório
          // </Button>
        ) : (
          <Button onClick={onHandleNext}>Próxima</Button>
        )}
      </CardFooter>
    </Card>
  )
}

export default ManageCards
