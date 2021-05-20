import React, { useState } from 'react'
import { Button, Tooltip } from '@material-ui/core'
import { DropzoneDialog } from 'material-ui-dropzone'
import { Controller, Control } from 'react-hook-form'
import { useStyles } from './styles'
import { useCallback } from 'react'
import { useTranslation } from 'react-i18next'
const maxMegaBytes = 1
const maxFileSize = maxMegaBytes * 1024 ** 2
const filesLimit = 5
const formats = ['image/jpeg', 'image/png', 'image/jpg']

export const DropZone = ({ control }: { control: Control }) => {
  const [open, setOpen] = useState(false)
  const [readedFiles, setReadedFiles] = useState<string[]>([])
  const { btn, tooltip } = useStyles()
  const { t } = useTranslation()

  const readFile = (file: Blob): Promise<string | ArrayBuffer | null> =>
    new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.onload = () => resolve(reader.result)
      reader.readAsDataURL(file)
    })

  const savePhoto = useCallback(async (data: Blob[]) => {
    const res = await readFile(data[0])
    typeof res === 'string' && setReadedFiles((prev) => [...prev, res])
  }, [])

  const findAndDelete = useCallback(async (file: Blob) => {
    const readed = await readFile(file)
    const newArr = readedFiles.reduce((acc: string[], file) => {
      if (file !== readed) acc.push(file)
      return acc
    }, [])
    setReadedFiles(newArr)
  }, [])

  const submit = useCallback(() => {
    setOpen(false)
    return readedFiles
  }, [readedFiles])

  const openZone = useCallback(() => setOpen(true), [])
  const closeZone = useCallback(() => setOpen(false), [])

  return (
    <>
      <Tooltip
        title={`${t('search.dropZone.p1')} ${filesLimit} ${t('search.dropZone.p2')} ${maxMegaBytes} ${t(
          'search.dropZone.p3'
        )}`}
        classes={{ tooltip }}>
        <span>
          <Button onClick={openZone} variant='outlined' className={btn}>
            {t('search.dropZone.title')}
          </Button>
        </span>
      </Tooltip>
      <Controller
        name='files'
        control={control}
        render={({ onChange }) => (
          <DropzoneDialog
            onDelete={findAndDelete}
            onDrop={savePhoto}
            filesLimit={filesLimit}
            clearOnUnmount
            open={open}
            onSave={() => onChange(submit())}
            acceptedFiles={formats}
            useChipsForPreview={true}
            maxFileSize={maxFileSize}
            onClose={closeZone}
          />
        )}
      />
    </>
  )
}
