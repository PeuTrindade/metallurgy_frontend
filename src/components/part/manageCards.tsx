import { TPartStep } from '@/pages/parts/manage/[id]'
import { Button } from '../ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../ui/card'
import { Input } from '../ui/input'
import { Label } from '../ui/label'
import { Textarea } from '../ui/textarea'

const ManageCards = ({ steps }: { steps: TPartStep[] }) => {
  console.log(steps)

  return (
    <Card className="w-[100%] mt-12">
      <CardHeader>
        <CardTitle>Etapa:</CardTitle>
        <CardDescription>Limpeza</CardDescription>
      </CardHeader>

      <CardContent>
        <form onSubmit={(e) => e.preventDefault()}>
          <div className="flex space-x-4 w-full">
            <div className="flex flex-col space-y-1.5 w-1/2">
              <Label htmlFor="company">Data de início</Label>
              <Input type="date" />
            </div>

            <div className="flex flex-col space-y-1.5 w-1/2">
              <Label htmlFor="company">Data de término</Label>
              <Input type="date" />
            </div>
          </div>

          <div className="flex space-x-4 w-full mt-6">
            <div className="flex flex-col space-y-1.5 w-full">
              <Label htmlFor="description">Descrição da etapa</Label>
              <Textarea
                placeholder="Descreva sobre a peça, sua função no mercado, o estado atual dela, etc..."
                className="w-full"
              />
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline">Anterior</Button>
        <Button>Próxima</Button>
      </CardFooter>
    </Card>
  )
}

export default ManageCards
