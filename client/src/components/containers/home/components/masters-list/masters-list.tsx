import React from 'react'
import { Box, Button, Container, Paper, Typography } from '@material-ui/core'
import { useStyles } from './styles'
import { MasterCard } from '..'
import ArrowBackIcon from '@material-ui/icons/ArrowBack'
import { useTranslation } from 'react-i18next'

type Data = { id: number; name: string; surname: string; rating: number }
type Props = {
  data: Data[]
  back: () => void
  confirm: (data: Data) => void
}

export const MastersList = ({ data, back, confirm }: Props) => {
  const { wrap, title } = useStyles()
  const { t } = useTranslation()

  return (
    <Container>
      <Paper className={wrap}>
        <Typography align='center' className={title}>
          {t('masters.title')}
        </Typography>

        {data.map((master, inx) => {
          const masterCardProps = { data: master, confirm }
          return <MasterCard {...masterCardProps} key={inx} />
        })}

        <Box className={title}>
          <Button startIcon={<ArrowBackIcon />} onClick={back} variant='contained'>
            {t('masters.back')}
          </Button>
        </Box>
      </Paper>
    </Container>
  )
}
