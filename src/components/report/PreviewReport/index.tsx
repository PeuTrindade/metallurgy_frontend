import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Textarea } from '@/components/ui/textarea'
import { useEffect, useState } from 'react'

type TPreviewReport = {
  report: any
}

const PreviewReport: React.FC<TPreviewReport> = ({ report }) => {
  const [reportText, setReportText] = useState('')

  useEffect(() => {
    if (report) {
      const intro = report?.intro?.choices[0]?.message?.content
      const specifications = report?.specifications?.choices[0]?.message?.content

      setReportText(intro + '\n\n' + specifications)
    }
  }, [])

  return (
    <Tabs defaultValue="account" className="w-[100%] mt-16 pb-12">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="account">Editar relatório</TabsTrigger>
        <TabsTrigger value="password">Pré-visualizar</TabsTrigger>
      </TabsList>

      <TabsContent value="account">
        <Card>
          <CardHeader>
            <CardTitle>Editar relatório</CardTitle>
            <CardDescription>Aqui você poderá editar e complementar o relatório gerado pela IA.</CardDescription>
          </CardHeader>

          <CardContent className="space-y-2">
            <Textarea
              value={reportText}
              onChange={(e) => setReportText(e.target.value)}
              defaultValue={reportText}
              height="min-h-[300px]"
            />
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="password">
        <Card>
          <CardHeader>
            <CardTitle>Pré-visualização</CardTitle>
            <CardDescription>Veja nesta aba como seu relatório está ficando.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="whitespace-pre-wrap text-justify indent-8">
              {reportText.split('\n').map((line, index) => (
                <div key={index}>
                  <p>{line}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  )
}

export default PreviewReport
