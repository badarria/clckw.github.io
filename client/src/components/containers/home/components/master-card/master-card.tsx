import React, { useCallback } from 'react'
import { useStyles } from './styles'
import { Box, Button, Card, CardContent, Typography } from '@material-ui/core'
import Rating from '@material-ui/lab/Rating'
import { useTranslation } from 'react-i18next'

type Data = { id: number; name: string; surname: string; rating: number }
type Props = {
  data: Data
  confirm: (data: Data) => void
}

export const MasterCard = ({ data, confirm }: Props) => {
  const { name, surname, rating } = data
  const { content, stars, card } = useStyles()
  const masterName = `${name} ${surname}`
  const confirmMaster = useCallback(() => confirm(data), [])
  const { t } = useTranslation('masters')

  return (
    <Card className={card}>
      <CardContent className={content}>
        <Typography gutterBottom variant='h5' component='h2' align='center'>
          {masterName}
        </Typography>
        <Box component='fieldset' borderColor='transparent' className={stars}>
          <Typography component='legend' align='center'>
            {t('rating')}
          </Typography>
          <Rating name='read-only' value={Number(rating)} readOnly />
        </Box>
      </CardContent>
      <Button variant='contained' color='primary' fullWidth size='large' onClick={confirmMaster}>
        {t('chooseBtn')}
      </Button>
    </Card>
  )
}
