import Editor from '@/components/editor'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Download } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import generatePDF, { Margin } from 'react-to-pdf'

type TPreviewReport = {
  report: any
}

const PreviewReport: React.FC<TPreviewReport> = ({ report }) => {
  const contentRef = useRef<HTMLDivElement>(null)
  const [reportText, setReportText] = useState('')

  const generatePagePDF = () => {
    const style = {
      method: 'open',
      page: {
        margin: { top: 10, left: 10, right: 10, bottom: 20 }, // Margem inferior maior
        format: 'A4',
        orientation: 'portrait',
      },
      overrides: {
        pdf: {
          compress: true,
        },
        canvas: {
          useCORS: true,
        },
      },
    }

    generatePDF(contentRef as any, style as any)
  }

  useEffect(() => {
    if (report) {
      const intro = report?.intro?.choices[0]?.message?.content
      const specifications = report?.specifications?.choices[0]?.message?.content

      const formattedIntro = `<h2>Condições gerais</h2><br />${intro}`
      const formattedSpecs = `<h2>Condições específicas</h2><br />${specifications}`

      setReportText(formattedIntro + '\n\n' + formattedSpecs)
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
            <Editor value={reportText} onChange={(text: any) => setReportText(text)} />
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="password">
        <Card>
          <CardHeader>
            <CardTitle>Pré-visualização</CardTitle>
            <CardDescription>Veja nesta aba como seu relatório está ficando.</CardDescription>

            <div className="pt-3">
              <Button onClick={generatePagePDF}>
                <Download /> Baixar relatório
              </Button>
            </div>
          </CardHeader>
          <Separator />
          <CardContent className="space-y-2 pt-6">
            <div
              ref={contentRef as any}
              className="preview whitespace-pre-wrap text-justify pb-12"
              // biome-ignore lint/security/noDangerouslySetInnerHtml: <explanation>
              dangerouslySetInnerHTML={{ __html: reportText }}
            />
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  )
}

export default PreviewReport
