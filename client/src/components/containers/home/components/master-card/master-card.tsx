import { useStyles } from './styles'
import { Box, Button, Card, CardContent, Typography } from '@material-ui/core'
import Rating from '@material-ui/lab/Rating'
import React from 'react'
import { MasterCardProps } from 'types'

export const MasterCard = ({ id, name, surname, rating, confirm }: MasterCardProps) => {
  const { content, stars, card } = useStyles()
  const masterName = `${name} ${surname}`
  return (
    <Card className={card}>
      <CardContent className={content}>
        <Typography gutterBottom variant='h5' component='h2' align='center'>
          {masterName}
        </Typography>
        <Box component='fieldset' borderColor='transparent' className={stars}>
          <Typography component='legend' align='center'>
            Rating
          </Typography>
          <Rating name='read-only' value={Number(rating)} readOnly />
        </Box>
      </CardContent>
      <Button variant='contained' color='primary' fullWidth size='large' onClick={() => confirm({ id, masterName })}>
        Choose!
      </Button>
    </Card>
  )
}
