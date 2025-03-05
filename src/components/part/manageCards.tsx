import { TPartStep } from '@/pages/parts/manage/[id]'
import { Button } from '../ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../ui/card'
import { Input } from '../ui/input'
import { Label } from '../ui/label'
import { Textarea } from '../ui/textarea'
import { useState } from 'react'
import ManagePartSchema from '@/schemas/parts/managePart'

const ManageCards = ({ steps, setSteps }: { steps: TPartStep[]; setSteps: any }) => {
  const [index, setIndex] = useState(0)
  const currentStep = steps[index]
  const { register, errors } = ManagePartSchema()

  console.log(steps)

  const onHandleNext = () => {
    setIndex(index + 1)
  }

  const onHandlePrevious = () => {
    setIndex(index - 1)
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
        <Button disabled={index + 1 == steps.length} onClick={onHandleNext}>
          Próxima
        </Button>
      </CardFooter>
    </Card>
  )
}

export default ManageCards
