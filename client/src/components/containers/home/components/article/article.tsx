import { Container, Paper, Typography, Box, Button } from '@material-ui/core'
import { Loader } from 'components/ui'
import React, { useState } from 'react'
import { useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { getOnePost } from 'services/home/api'
import { useStyles } from './styles'
import { Post } from '../../types'

export default ({ id }: { id: string }) => {
  const [post, setPost] = useState<Post[]>([])
  const [loading, setLoading] = useState(false)
  const history = useHistory()
  const { msgBox, paper, container } = useStyles()

  const back = () => {
    history.replace('/blog')
  }

  useEffect(() => {
    setLoading(true)
    const getPost = async () => {
      const post = await getOnePost({ id })
      if ('type' in post) return
      setPost([post])
      setLoading(false)
    }
    getPost()
  }, [])

  if (!post.length)
    return (
      <Container className={container}>
        <Typography align='center'>Sorry, something went wrong. Try another article</Typography>
        <Button variant='contained' onClick={back} className={msgBox} color='primary'>
          Back
        </Button>
      </Container>
    )

  const { title, content, date } = post[0]

  return (
    <Container className={container}>
      <Loader loading={loading} />
      <Paper className={paper}>
        <Typography variant='overline'>{date}</Typography>
        <Typography variant='subtitle1' color='textSecondary'>
          {title}
        </Typography>
        <Box dangerouslySetInnerHTML={{ __html: content }} />

        <Button variant='contained' onClick={back} className={msgBox} color='primary'>
          Back
        </Button>
      </Paper>
    </Container>
  )
}
