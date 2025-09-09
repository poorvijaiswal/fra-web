"use client"

import type React from "react"
import { useState, useCallback, useRef } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Upload, FileText, ImageIcon, X, Eye } from "lucide-react"

interface UploadStepProps {
  data: any
  onUpdate: (data: any) => void
  onNext: () => void
}

export function UploadStep({ data, onUpdate, onNext }: UploadStepProps) {
  const [dragActive, setDragActive] = useState(false)
  const [files, setFiles] = useState<File[]>(data.files || [])
  const [previewFile, setPreviewFile] = useState<File | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }, [])

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const newFiles = Array.from(e.dataTransfer.files).filter(
        (file) => file.type === "application/pdf" || file.type.startsWith("image/"),
      )
      setFiles((prev) => [...prev, ...newFiles])
    }
  }, [])

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files).filter(
        (file) => file.type === "application/pdf" || file.type.startsWith("image/"),
      )
      setFiles((prev) => [...prev, ...newFiles])
      // Reset input value to allow selecting same file again
      e.target.value = ""
    }
  }

  const handleSelectFiles = () => {
    fileInputRef.current?.click()
  }

  const removeFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index))
  }

  const handleNext = () => {
    onUpdate({ files })
    onNext()
  }

  const getFileIcon = (file: File) => {
    if (file.type === "application/pdf") return FileText
    if (file.type.startsWith("image/")) return ImageIcon
    return FileText
  }

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes"
    const k = 1024
    const sizes = ["Bytes", "KB", "MB", "GB"]
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
  }

  const handlePreview = (file: File) => {
    setPreviewFile(file)
  }

  const getFilePreviewUrl = (file: File) => {
    if (file.type.startsWith("image/")) {
      return URL.createObjectURL(file)
    }
    return null
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Upload className="h-5 w-5" />
            Upload FRA Documents
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div
            className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors cursor-pointer ${
              dragActive ? "border-primary bg-primary/5" : "border-muted-foreground/25 hover:border-primary/50"
            }`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
            onClick={handleSelectFiles}
          >
            <Upload className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
            <h3 className="text-lg font-semibold mb-2">Drop files here or click to upload</h3>
            <p className="text-muted-foreground mb-4">Supports PDF and image files (JPG, PNG, TIFF)</p>
            <input
              ref={fileInputRef}
              type="file"
              multiple
              accept=".pdf,image/*"
              onChange={handleFileInput}
              className="hidden"
            />
            <Button variant="outline" className="cursor-pointer bg-transparent" onClick={handleSelectFiles}>
              Select Files
            </Button>
          </div>

          {files.length > 0 && (
            <div className="mt-6 space-y-3">
              <h4 className="font-medium">Uploaded Files ({files.length})</h4>
              {files.map((file, index) => {
                const IconComponent = getFileIcon(file)
                return (
                  <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      <IconComponent className="h-5 w-5 text-primary" />
                      <div>
                        <p className="font-medium text-sm">{file.name}</p>
                        <p className="text-xs text-muted-foreground">{formatFileSize(file.size)}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge variant="secondary" className="text-xs">
                        {file.type === "application/pdf" ? "PDF" : "Image"}
                      </Badge>
                      {file.type.startsWith("image/") && (
                        <Button variant="ghost" size="sm" onClick={() => handlePreview(file)}>
                          <Eye className="h-4 w-4" />
                        </Button>
                      )}
                      <Button variant="ghost" size="sm" onClick={() => removeFile(index)}>
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </CardContent>
      </Card>

      {previewFile && (
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm">Document Preview</CardTitle>
              <Button variant="ghost" size="sm" onClick={() => setPreviewFile(null)}>
                <X className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            {previewFile.type.startsWith("image/") ? (
              <div className="max-h-96 overflow-hidden rounded-lg border">
                <img
                  src={getFilePreviewUrl(previewFile) || ""}
                  alt={previewFile.name}
                  className="w-full h-auto object-contain"
                />
              </div>
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                <FileText className="h-12 w-12 mx-auto mb-2" />
                <p>PDF preview not available</p>
                <p className="text-sm">File: {previewFile.name}</p>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      <div className="flex justify-end">
        <Button onClick={handleNext} disabled={files.length === 0}>
          Process Files
          <Upload className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}
