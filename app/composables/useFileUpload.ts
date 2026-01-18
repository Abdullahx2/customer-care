// Temporary dummy implementation - hub module disabled for Vercel
import { ref, computed } from 'vue'

interface BlobResult {
  pathname: string
  url?: string
  contentType?: string
  size: number
}

interface FileWithStatus {
  file: File
  id: string
  previewUrl: string
  status: 'uploading' | 'uploaded' | 'error'
  uploadedUrl?: string
  uploadedPathname?: string
  error?: string
}

export function useFileUploadWithStatus(chatId: string) {
  const files = ref<FileWithStatus[]>([])

  // Dummy dropzone refs
  const dropzoneRef = ref<HTMLElement | null>(null)
  const isDragging = ref(false)

  async function uploadFiles(_newFiles: File[]) {
    // Upload disabled on Vercel
    console.warn('File upload disabled (hub module removed)')
  }

  const isUploading = computed(() => false)
  const uploadedFiles = computed(() => [])

  function removeFile(_id: string) {
    // no-op
  }

  function clearFiles() {
    files.value = []
  }

  return {
    dropzoneRef,
    isDragging,
    files,
    isUploading,
    uploadedFiles,
    addFiles: uploadFiles,
    removeFile,
    clearFiles
  }
}
