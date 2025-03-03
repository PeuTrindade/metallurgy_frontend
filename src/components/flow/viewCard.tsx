import * as React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'

type TViewFlowCard = {
  name: string
  description: string
  flowsNames: string[]
}

export function ViewFlowCard({ name, description, flowsNames }: TViewFlowCard) {
  return (
    <Card className="w-[100%] mb-6">
      <CardHeader>
        <CardTitle>Informações gerais</CardTitle>
        <CardDescription>Abaixo estão listadas as informações gerais do fluxo.</CardDescription>
      </CardHeader>

      <CardContent>
        <form>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Nome:</Label>
              <CardDescription>{name}</CardDescription>
            </div>

            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Descrição:</Label>
              <CardDescription>{description}</CardDescription>
            </div>

            {flowsNames.length > 0 && (
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name">Etapas:</Label>
                {flowsNames.map((f, index) => (
                  <CardDescription key={index}>{`${index + 1}. ${f}`}</CardDescription>
                ))}
              </div>
            )}
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
