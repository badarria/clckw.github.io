import React, { useState, ChangeEvent } from 'react'
import { Box, Button, TextField, Container } from '@material-ui/core'
import { Editor } from '@tinymce/tinymce-react'
import { downloadFile, savePost } from '../../../../../services/admin/post'
import { useStyles } from './styles'
import { Response } from '../../../../../types'
import { Loader, Toast } from '../../../../ui'
import { tinyAPI } from '../../../../../config'
import { DropzoneAreaBase, FileObject } from 'material-ui-dropzone'
import { Article } from '../../components'
import { newDateToFormat } from 'services/utils/datetime-func'

type DropZone = {
  file: File
  data: string | ArrayBuffer | null
}[]

export default () => {
  const [toast, setToast] = useState<Response>({ type: 'success', msg: '' })
  const [loading, setLoading] = useState(false)
  const [content, setContent] = useState('')
  const [description, setDescription] = useState('')
  const [title, setTitle] = useState('')
  const [preview, setPreview] = useState<DropZone>([])
  const [isPreview, setIsPreview] = useState(false)
  const { container, hidden, btns, btn, box, root, drag, textArea, upperBox, fieldsBox } = useStyles()

  const setToastMsg = (toast: Response) => {
    setToast(toast)
    setTimeout(() => {
      setToast({ type: toast.type, msg: '' })
    }, 3000)
  }

  const readFile = (file: File): Promise<string | ArrayBuffer | null> =>
    new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.onload = () => resolve(reader.result)
      reader.readAsDataURL(file)
    })

  const uploadImage = async (callback: Function, value: any, meta: Record<string, any>) => {
    if (meta.filetype == 'image') {
      const input = document.getElementById('hiddenUpload') as HTMLInputElement
      input.click()
      input.onchange = async () => {
        const files = input.files || []
        if (files.length) {
          const { name } = files[0]
          const file64 = await readFile(files[0])
          if (!file64 || file64 instanceof ArrayBuffer) return
          const link = await downloadFile({ file: file64 })

          callback(link, {
            alt: name,
          })
        }
      }
    }
  }

  const createPost = async () => {
    setLoading(true)
    const res = await savePost({ content, description, preview: preview[0].data, title })
    setLoading(false)
    if (res.type === 'success') {
      setToastMsg(res)
      reset()
    }
    setToastMsg(res)
  }

  const reset = () => {
    setContent('')
    setDescription('')
    setTitle('')
    setPreview([])
  }
  const handleEditor = (a: string) => {
    setContent(a)
  }
  const handleDescription = (event: ChangeEvent<HTMLInputElement>) => {
    if (!event) return
    const value = event.target.value
    return setDescription(value)
  }
  const handleTitle = (event: ChangeEvent<HTMLInputElement>) => {
    if (!event) return
    setTitle(event.target.value)
  }
  const setPreviewImg = async (fileObjs: FileObject[]) => {
    if (typeof fileObjs[0].data === 'string') {
      const link = await downloadFile({ file: fileObjs[0].data })
      const [{ file }] = fileObjs
      if (typeof link === 'string') {
        setPreview([{ file, data: link }])
      }
    }
  }
  const deletePreviewImg = () => setPreview([])

  const returnBack = (data: { title: string; content: string; description: string; preview: DropZone }) => {
    const { title, content, description, preview } = data
    setDescription(description)
    setContent(content)
    setTitle(title)
    setPreview(preview)
    setIsPreview(false)
  }

  if (isPreview) {
    const articleProps = { description, title, content, preview, back: returnBack, date: newDateToFormat() }
    return <Article {...articleProps} />
  }

  return (
    <Container className={container}>
      <Loader loading={loading} />
      <Box>
        <Box className={box}>
          <Toast toast={toast} />
        </Box>
        <Box className={root}>
          <Box className={upperBox}>
            <Box className={drag}>
              <DropzoneAreaBase
                onAdd={setPreviewImg}
                onDelete={deletePreviewImg}
                fileObjects={preview}
                dropzoneText='Drop here image for preview'
                useChipsForPreview={true}
                filesLimit={1}
                showFileNames
              />
            </Box>
            <Box className={fieldsBox}>
              <TextField name='title' label='Enter a title' variant='outlined' onChange={handleTitle} value={title} />
              <TextField
                name='description'
                label='Enter a short description what about this post'
                className={textArea}
                variant='outlined'
                multiline={true}
                rows={5}
                rowsMax={5}
                onChange={handleDescription}
                value={description}
              />
            </Box>
          </Box>
          <input className={hidden} id='hiddenUpload' type='file' name='hiddenUpload' />
          <Editor
            apiKey={tinyAPI}
            initialValue={content}
            onEditorChange={handleEditor}
            init={{
              height: 500,
              menubar: false,
              plugins: [
                'advlist autolink lists link image charmap print preview anchor',
                'searchreplace wordcount visualblocks code fullscreen',
                'insertdatetime media table contextmenu paste code',
              ],
              toolbar:
                'insertfile undo redo | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image',
              file_browser_callback_types: 'image',
              file_picker_callback: uploadImage,
              paste_data_images: true,
            }}
            value={content}
          />
          <Box className={btns}>
            <Button color='primary' onClick={() => setIsPreview(true)}>
              Preview
            </Button>
            <Box>
              <Button className={btn} variant='contained' color='primary' onClick={createPost}>
                Create
              </Button>
              <Button variant='contained' onClick={reset}>
                Reset
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>
    </Container>
  )
}
