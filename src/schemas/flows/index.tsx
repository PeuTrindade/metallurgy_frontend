import { zodResolver } from '@hookform/resolvers/zod'
import { useForm, useFieldArray } from 'react-hook-form'
import { z } from 'zod'

const CreateFlowSchema = () => {
  const schema = z.object({
    name: z.string().min(1, { message: 'Preencha o campo acima.' }),
    description: z.string().min(1, { message: 'Preencha o campo acima.' }),
    steps: z
      .array(z.object({ name: z.string().min(1, { message: 'O nome da etapa é obrigatório.' }) }))
      .min(1, { message: 'Adicione pelo menos uma etapa.' }),
  })

  const {
    watch,
    register,
    formState: { errors, isValid },
    control,
    reset,
    handleSubmit,
  } = useForm({
    mode: 'all',
    resolver: zodResolver(schema),
    defaultValues: { steps: [] },
  })

  const { fields, append, remove } = useFieldArray({ control, name: 'steps' })

  const handleAddStep = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && e.currentTarget.value.trim() !== '') {
      e.preventDefault()
      append({ name: e.currentTarget.value.trim() })
      e.currentTarget.value = ''
    }
  }

  return {
    name: watch('name'),
    description: watch('description'),
    isValid,
    errors,
    register,
    fields,
    handleAddStep,
    reset,
    handleSubmit,
    remove,
  }
}

export default CreateFlowSchema
