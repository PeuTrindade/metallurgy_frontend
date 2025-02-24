import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import LoginSchema from '@/schemas/login'
import { toast } from 'react-toastify'
import { signIn } from '@/requestFunctions/login'
import { useState } from 'react'
import { insertIntoCookies } from '@/utils/cookiesManagerFunctions'
import { insertIntoSessionStorage } from '@/utils/sessionStorageFunctions'
import { useRouter } from 'next/router'

export function LoginForm({ className, ...props }: React.ComponentProps<'div'>) {
  const { email, password, errors, register } = LoginSchema()
  const [isLoading, setIsLoading] = useState(false)
  const { push } = useRouter()

  const handleLogin = async () => {
    try {
      setIsLoading(true)

      const response = (await signIn(email, password)) as Response

      if (response.ok) {
        const data = await response.json()

        insertIntoCookies(
          'loginData',
          { token: data.token, expiresIn: new Date().getTime() + 24 * 60 * 60 * 1000 },
          true,
        )
        insertIntoSessionStorage('userInfo', data.user, true)

        push('/')
      } else {
        toast('Ocorreu um erro ao validar credenciais! Confime se email e senha estão corretos.', { type: 'error' })
      }

      setIsLoading(false)
    } catch (error) {
      toast('Ocorreu um erro inesperado! Por favor, tente novamente.', { type: 'error' })
    }
  }

  return (
    <div className={cn('flex flex-col gap-6', className)} {...props}>
      <Card className="overflow-hidden">
        <CardContent className="grid p-0 md:grid-cols-2">
          <form onSubmit={(e) => e.preventDefault()} className="p-6 md:p-8">
            <div className="flex flex-col gap-7">
              <div className="flex flex-col items-center text-center">
                <h1 className="text-2xl font-bold">Bem-vindo(a)!</h1>
                <p className="text-balance text-muted-foreground">Preencha os campos e entre em sua conta.</p>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  error={errors.email?.message?.toString()}
                  {...register('email')}
                  id="email"
                  type="email"
                  placeholder="Digite seu email"
                  required
                />
              </div>

              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Senha</Label>
                  <a href="/" className="ml-auto text-sm underline-offset-2 hover:underline">
                    Esqueceu sua senha?
                  </a>
                </div>
                <Input
                  error={errors.password?.message?.toString()}
                  {...register('password')}
                  placeholder="Digite sua senha"
                  id="password"
                  type="password"
                  required
                />
              </div>

              <Button
                loading={isLoading}
                disabled={!email || !password || isLoading}
                onClick={handleLogin}
                className="w-full"
              >
                Entrar
              </Button>

              <div className="text-center text-sm">
                Não possui uma conta?{' '}
                <a href="/" className="underline underline-offset-4">
                  Cadastre-se
                </a>
              </div>
            </div>
          </form>
          <div className="relative hidden bg-muted md:block">
            <img
              src="../login_img.jpg"
              alt=""
              className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
            />
          </div>
        </CardContent>
      </Card>
      <div className="text-balance text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 hover:[&_a]:text-primary">
        Ao clicar em entrar, você concorda com nossos <a href="/">Termos de serviço</a> e{' '}
        <a href="/">Política de privacidade</a>.
      </div>
    </div>
  )
}
