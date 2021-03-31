import React, { useState } from 'react'
import { Button, Tooltip } from '@material-ui/core'
import { DropzoneDialog } from 'material-ui-dropzone'
import { Controller, Control } from 'react-hook-form'
import { useStyles } from './styles'

export const DropZone = ({ control }: { control: Control }) => {
  const [open, setOpen] = useState(false)
  const [readedFiles, setReadedFiles] = useState<string[]>([])
  const { btn, tooltip } = useStyles()

  const readFile = (file: Blob): Promise<string | ArrayBuffer | null> =>
    new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.onload = () => resolve(reader.result)
      reader.readAsDataURL(file)
    })

  const savePhoto = async (data: Blob[]) => {
    const res = await readFile(data[0])
    typeof res === 'string' && setReadedFiles((prev) => [...prev, res])
  }

  const findAndDelete = async (file: Blob) => {
    const readed = await readFile(file)
    const newArr = readedFiles.reduce((acc: any[], file) => {
      if (file !== readed) acc.push(file)
      return acc
    }, [])
    setReadedFiles(newArr)
  }
  const submit = () => {
    setOpen(false)
    return readedFiles
  }

  return (
    <>
      <Tooltip title='Maximum 5 photos. No more than 1 MB each' classes={{ tooltip }}>
        <span>
          <Button onClick={() => setOpen(true)} variant='outlined' className={btn}>
            Add Photo
          </Button>
        </span>
      </Tooltip>
      <Controller
        name='files'
        control={control}
        render={({ onChange }) => (
          <DropzoneDialog
            onDelete={(file) => findAndDelete(file)}
            onDrop={(file) => savePhoto(file)}
            filesLimit={5}
            clearOnUnmount
            open={open}
            onSave={() => onChange(submit())}
            acceptedFiles={['image/jpeg', 'image/png', 'image/bmp']}
            useChipsForPreview={true}
            maxFileSize={1000000}
            onClose={() => setOpen(false)}
          />
        )}
      />
    </>
  )
}
