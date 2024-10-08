'use client'

import React, { useState, useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import { Upload, X } from 'lucide-react'
import { Button } from '@components/ui/button'
import { cn } from '@lib/utils'
import { toast } from 'sonner'

type Col = string
type Row = Col[]

interface FileData {
  name: string
  urls: string[]
}

interface FileUploadZoneProps {
  onFileChange: (files: FileData[]) => void
}

function generateLinkFromCsvRows(header: string[], row: Row): string {
  return header
    .map((key, index) => {
      const col = row[index]
      if (!col || col === '') {
        return null
      }

      return `${encodeURIComponent(key)}=${encodeURIComponent(col)}`
    })
    .filter((v) => v !== null)
    .join('&')
}

function FileUploadZone({ onFileChange }: FileUploadZoneProps) {
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
            const headers = content.split('\n')[0].split(';')
            const rows = content
              .split('\n')
              .slice(1)
              .map((row) => row.split(';'))

            const fileObj: FileData = {
              name: file.name,
              urls: rows.map((row) => generateLinkFromCsvRows(headers, row)),
            }

            newFileData.push(fileObj)
            setFileData((prevData) => [...prevData, fileObj])
            onFileChange([...fileData, ...newFileData])
          }
          reader.readAsText(file)
        })
      } else {
        toast.error('Only CSV files are allowed')
      }
    },
    [fileData, onFileChange]
  )

  const removeFile = useCallback(
    (fileToRemove: string) => {
      setFileData((prevData) =>
        prevData.filter((file) => file.name !== fileToRemove)
      )
      onFileChange(fileData.filter((file) => file.name !== fileToRemove))
    },
    [fileData, onFileChange]
  )

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
        className={cn(
          'border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors',
          {
            'border-accent bg-accent': isDragActive,
            'hover:border-accent': !isDragActive,
          }
        )}
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
        </div>
      )}
    </div>
  )
}

export { FileUploadZone }
