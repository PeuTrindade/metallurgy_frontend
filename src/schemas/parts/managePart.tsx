import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const ManagePartSchema = () => {
  const schema = z.object({
    description: z.string({ required_error: 'Preencha o campo acima.' }).min(1, { message: 'Preencha o campo acima.' }),
    startDate: z.string({ required_error: 'Preencha o campo acima.' }).min(1, { message: 'Preencha o campo acima.' }),
    finishDate: z.string({ required_error: 'Preencha o campo acima.' }).min(1, { message: 'Preencha o campo acima.' }),
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

  const startDate = watch('startDate')
  const finishDate = watch('finishDate')
  const description = watch('description')

  return {
    isValid,
    startDate,
    finishDate,
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

export default ManagePartSchema
