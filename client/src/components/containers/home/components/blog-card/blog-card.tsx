import { Card, CardContent, CardMedia, Link, Typography, Box, Button } from '@material-ui/core'
import React, { MouseEvent } from 'react'
import { useStyles } from './styles'

type Props = {
  id: string
  description: string
  title: string
  preview: string
  date: string
  expand: (data: { id: string }) => void
}

export default ({ id, title, date, description, preview, expand }: Props) => {
  const { card, descr, content, img, link } = useStyles()

  const click = () => expand({ id })
  console.log(preview)
  return (
    <Card className={card}>
      <CardContent className={content}>
        <Box>
          <Typography variant='overline'>{title}</Typography>
          <Typography variant='subtitle1' color='textSecondary'>
            {date}
          </Typography>
          <Box className={descr} dangerouslySetInnerHTML={{ __html: description }} />
          <Box className={link}>
            <Button color='primary' onClick={click}>
              Continue reading...
            </Button>
          </Box>
        </Box>
        <CardMedia image={preview} src={preview} component='img' className={img} />
      </CardContent>
    </Card>
  )
}
