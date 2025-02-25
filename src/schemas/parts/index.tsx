import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const CreatePartSchema = () => {
  const schema = z.object({
    name: z.string({ required_error: 'Preencha o campo acima.' }).min(1, { message: 'Preencha o campo acima.' }),
    company: z.string({ required_error: 'Preencha o campo acima.' }).min(1, { message: 'Preencha o campo acima.' }),
    tag: z.string({ required_error: 'Preencha o campo acima.' }).min(1, { message: 'Preencha o campo acima.' }),
    flowId: z.string({ required_error: 'Preencha o campo acima.' }).min(1, { message: 'Preencha o campo acima.' }),
    description: z.string({ required_error: 'Preencha o campo acima.' }).min(1, { message: 'Preencha o campo acima.' }),
  })

  const {
    watch,
    register,
    formState: { errors, isValid },
    control,
    setValue,
    setError,
    clearErrors,
    reset,
  } = useForm({
    mode: 'all',
    resolver: zodResolver(schema),
  })

  const name = watch('name')
  const company = watch('company')
  const tag = watch('tag')
  const flowId = watch('flowId')
  const description = watch('description')

  return {
    name,
    isValid,
    company,
    tag,
    flowId,
    description,
    errors,
    register,
    control,
    setValue,
    setError,
    clearErrors,
    reset,
  }
}

export default CreatePartSchema
