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
type InputsLabel = { name: string; surname: string; email: string }

export const SearchForm = ({ control, register, errors, initState, hours }: Props) => {
  const { btn, wrapInput } = useStyles()
  const { t } = useTranslation('search')

  const selectProps = { control, data: hours, name: 'hours' }
  const inputsLabel: InputsLabel = {
    name: t('form.name'),
    surname: t('form.surname'),
    email: t('form.email'),
  }

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
          label={t('form.city')}
        />
        <AutocompleteField
          key='service'
          control={control}
          name='service'
          data={initState?.service || []}
          keyToSelect='name'
          errors={errors}
          label={t('form.service')}
        />
        <DatePicker control={control} />
        <SelectHours {...selectProps} />
        <DropZone control={control} />
      </Box>
      <Box className={wrapInput}>
        <Button type='submit' variant='contained' color='primary' className={btn}>
          {t('form.findBtn')}
        </Button>
      </Box>
    </>
  )
}
