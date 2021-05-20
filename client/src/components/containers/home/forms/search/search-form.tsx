import React, { Ref } from 'react'
import { Box, Button } from '@material-ui/core'
import { useStyles } from './styles'
import { DatePicker, AutocompleteField, InputField, DropZone } from '../../components'
import { SelectHours } from 'components/ui/select/select-hours'
import { Control, RegisterOptions, FieldErrors } from 'react-hook-form'
import { RootState } from 'store'
import { useTranslation } from 'react-i18next'

type Props = {
  control: Control
  register: Ref<RegisterOptions>
  errors: FieldErrors
  initState: RootState['initState']
  hours: { hour: string; booked: boolean }[]
}

export const SearchForm = ({ control, register, errors, initState, hours }: Props) => {
  const { btn, wrapInput } = useStyles()
  const { t } = useTranslation()

  const selectProps = { control, data: hours, name: 'hours' }
  const inputsLabel: InputsLabel = {
    name: t('search.form.name'),
    surname: t('search.form.surname'),
    email: t('search.form.email'),
  }
  type InputsLabel = { name: string; surname: string; email: string }
  const inputs: Array<keyof InputsLabel> = ['name', 'surname', 'email']

  return (
    <>
      <Box className={wrapInput}>
        {inputs.map((label, inx) => {
          const inputFieldProp = { register, errors, name: label, label: inputsLabel[label] }
          return <InputField {...inputFieldProp} key={inx} />
        })}
        <AutocompleteField
          key='city'
          control={control}
          name='city'
          data={initState?.city || []}
          keyToSelect='name'
          errors={errors}
          label={t('search.form.city')}
        />
        <AutocompleteField
          key='service'
          control={control}
          name='service'
          data={initState?.service || []}
          keyToSelect='name'
          errors={errors}
          label={t('search.form.service')}
        />
        <DatePicker control={control} />
        <SelectHours {...selectProps} />
        <DropZone control={control} />
      </Box>
      <Box className={wrapInput}>
        <Button type='submit' variant='contained' color='primary' className={btn}>
          {t('search.form.findBtn')}
        </Button>
      </Box>
    </>
  )
}
