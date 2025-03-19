import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const FinalStepsSchema = () => {
  const schema = z.object({
    inspection: z.string({ required_error: 'Preencha o campo acima.' }).min(1, { message: 'Preencha o campo acima.' }),
    comments: z.string().optional().nullable(),
    suggestions: z.string().optional().nullable(),
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

  const inspection = watch('inspection')
  const comments = watch('comments')
  const suggestions = watch('suggestions')

  return {
    isValid,
    inspection,
    errors,
    register,
    control,
    setValue,
    setError,
    clearErrors,
    comments,
    suggestions,
    reset,
  }
}

export default FinalStepsSchema
