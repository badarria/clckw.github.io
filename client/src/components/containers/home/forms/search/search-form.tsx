import React, { Ref } from 'react'
import { Box, Button } from '@material-ui/core'
import { useStyles } from './styles'
import { DatePicker, AutocompleteField, InputField, DropZone } from '../../components'
import { SelectHours } from 'components/ui/select/select-hours'
import { Control, RegisterOptions, FieldErrors } from 'react-hook-form'

type Props = { control: Control; register: Ref<RegisterOptions>; errors: FieldErrors; initState: any; hours: any }

export const SearchForm = ({ control, register, errors, initState, hours }: Props) => {
  const { btn, wrapInput } = useStyles()

  const selectProps = { control, data: hours, name: 'hours' }
  const inputs = ['name', 'surname', 'email']

  return (
    <>
      <Box className={wrapInput}>
        {inputs.map((label, inx) => {
          const inputFieldProp = { register, errors, label }
          return <InputField {...inputFieldProp} key={inx} />
        })}
        <AutocompleteField
          key='city'
          control={control}
          name='city'
          data={initState?.city || []}
          keyToSelect='name'
          errors={errors}
        />
        <AutocompleteField
          key='service'
          control={control}
          name='service'
          data={initState?.service || []}
          keyToSelect='name'
          errors={errors}
        />
        <DatePicker control={control} />
        <SelectHours {...selectProps} />
        <DropZone control={control} />
      </Box>
      <Box className={wrapInput}>
        <Button type='submit' variant='contained' color='primary' className={btn}>
          Find Master
        </Button>
      </Box>
    </>
  )
}
