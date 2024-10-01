'use client'

import React, { useState, useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import { Upload, X } from 'lucide-react'
import { Button } from '@components/ui/button'

interface FileData {
  name: string
  content: string
  headers: string[]
}

interface FileUploadZoneProps {
  onFileAdd: (files: FileData[]) => void
}

function FileUploadZone({ onFileAdd }: FileUploadZoneProps) {
  const [fileData, setFileData] = useState<FileData[]>([])

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const csvFiles = acceptedFiles.filter((file) => file.type === 'text/csv')

      if (csvFiles.length > 0) {
        const newFileData: FileData[] = []

        csvFiles.forEach((file) => {
          const reader = new FileReader()
          reader.onload = () => {
            const content = reader.result as string
            const headers = content.split('\n')[0].split(',')

            const fileObj: FileData = {
              name: file.name,
              content,
              headers,
            }

            newFileData.push(fileObj)
            setFileData((prevData) => [...prevData, fileObj])
            onFileAdd([...fileData, ...newFileData])
          }
          reader.readAsText(file)
        })
      } else {
        alert('Only CSV files are allowed')
      }
    },
    [fileData, onFileAdd]
  )

  const removeFile = useCallback((fileToRemove: string) => {
    setFileData((prevData) =>
      prevData.filter((file) => file.name !== fileToRemove)
    )
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'text/csv': ['.csv'],
    },
  })

  return (
    <div className="w-full max-w-md mx-auto">
      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
          isDragActive ? 'border-accent bg-accent/10' : 'hover:border-accent'
        }`}
      >
        <input {...getInputProps()} />
        <Upload className="mx-auto size-8" />
        <p className="mt-2 text-sm">
          Drag &amp; drop files here, or click to select files{' '}
          <span className="text-accent block">(CSV only)</span>
        </p>
      </div>
      {fileData.length > 0 && (
        <div className="mt-4">
          <h3 className="text-sm font-semibold">Selected files:</h3>
          <ul className="mt-2 text-sm">
            {fileData.map((file, index) => (
              <li
                key={index}
                className="flex items-center justify-between py-1"
              >
                <span className="truncate max-w-[calc(100%-2rem)]">
                  {file.name}
                </span>
                <Button
                  onClick={() => removeFile(file.name)}
                  size={'icon'}
                  variant={'destructive'}
                  aria-label={`Remove ${file.name}`}
                >
                  <X className="h-4 w-4" />
                </Button>
              </li>
            ))}
          </ul>

          <div className="mt-4">
            <h3 className="text-sm font-semibold">File contents:</h3>
            {fileData.map((file, index) => (
              <div key={index} className="mb-4">
                <h4 className="text-sm font-medium">{file.name}</h4>
                <pre className="text-xs p-2 rounded">{file.content}</pre>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export { FileUploadZone }
