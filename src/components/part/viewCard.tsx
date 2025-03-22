import * as React from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Separator } from '../ui/separator'

type TViewPartCard = {
  name: string
  description: string
  tag: string
  company: string
  images: string[]
}

export function ViewPartCard({ name, description, tag, company, images }: TViewPartCard) {
  return (
    <Card className="w-[100%] mb-6">
      <CardHeader>
        <CardTitle>Informações gerais</CardTitle>
        <CardDescription>Abaixo estão listadas as informações gerais da peça.</CardDescription>
      </CardHeader>

      <CardContent>
        <form>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Nome:</Label>
              <CardDescription>{name}</CardDescription>
            </div>

            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Tag:</Label>
              <CardDescription>{tag}</CardDescription>
            </div>

            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Empresa contratante:</Label>
              <CardDescription>{company}</CardDescription>
            </div>

            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Descrição:</Label>
              <CardDescription>{description}</CardDescription>
            </div>

            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Imagens:</Label>
              <div className="flex space-x-2">
                {images.map((img, key) => (
                  <img key={key} src={img} className="w-48 h-48 object-cover rounded-lg border" alt={`Imagem ${key}`} />
                ))}
              </div>
            </div>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
