import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const LoginSchema = () => {
  const schema = z.object({
    email: z
      .string({ required_error: 'Preencha o campo acima.' })
      .email({ message: 'Digite um email válido.' })
      .min(1, { message: 'Preencha o campo acima.' }),
    password: z.string({ required_error: 'Preencha o campo acima.' }).min(1, { message: 'Preencha o campo acima.' }),
  })

  const {
    watch,
    register,
    formState: { errors },
  } = useForm({
    mode: 'all',
    resolver: zodResolver(schema),
  })

  const email = watch('email')
  const password = watch('password')

  return { email, password, register, errors }
}

export default LoginSchema
