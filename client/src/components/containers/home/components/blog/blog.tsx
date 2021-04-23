import { Box, Typography } from '@material-ui/core'
import { Post } from '../../types'
import React, { useState } from 'react'
import { useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { getPosts } from 'services/home/api'
import { BlogCard } from '../'
import { useStyles } from './styles'

export default () => {
  const { container, msg } = useStyles()
  const [posts, setPosts] = useState<Post[]>([])
  const history = useHistory()

  const expand = ({ id }: { id: string }) => {
    console.log(id)
    history.push(`/blog/${id}`)
  }

  useEffect(() => {
    const getArticles = async () => {
      const list = await getPosts()
      if (list instanceof Array) setPosts(list)
    }
    getArticles()
  }, [])

  return (
    <Box className={container}>
      <Typography variant='h4' align='center'>
        Our Blog
      </Typography>
      {posts.length ? (
        <>
          {posts.map((post, inx) => {
            const { id, description, title, preview, date } = post
            const blogProps = { id, description, title, preview, expand, date }
            return <BlogCard key={inx} {...blogProps} />
          })}
        </>
      ) : (
        <Typography align='center' variant='h6' className={msg}>
          There is no articles yet
        </Typography>
      )}
    </Box>
  )
}
