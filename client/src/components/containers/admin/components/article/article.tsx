import { Container, Paper, Typography, Box, Button } from '@material-ui/core'
import { useStyles } from './styles'

type Data = {
  date: string
  title: string
  content: string
  description: string
  preview: {
    file: File
    data: string | ArrayBuffer | null
  }[]
}
type Props = Data & { back: (data: Data) => void }

export default (props: Props) => {
  const { date = '', title = '', content = '', back } = props
  const { msgBox, paper, container } = useStyles()

  return (
    <Container className={container}>
      <Paper className={paper}>
        <Typography variant='overline'>{date}</Typography>
        <Typography variant='subtitle1' color='textSecondary'>
          {title}
        </Typography>
        <Box dangerouslySetInnerHTML={{ __html: content }} />

        <Button variant='contained' onClick={() => back(props)} className={msgBox} color='primary'>
          Back
        </Button>
      </Paper>
    </Container>
  )
}
