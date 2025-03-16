'use client'

import { useEffect, useRef } from 'react'

declare global {
  interface Window {
    Quill: any
  }
}

interface EditorProps {
  value: string
  onChange: (content: string) => void
}

export default function Editor({ value, onChange }: EditorProps) {
  const editorRef = useRef<HTMLDivElement>(null)
  const quillInstance = useRef<any>(null)

  useEffect(() => {
    if (typeof window !== 'undefined' && window.Quill && editorRef.current) {
      if (!quillInstance.current) {
        quillInstance.current = new window.Quill(editorRef.current, {
          theme: 'snow',
          modules: {
            toolbar: [
              [{ header: [1, 2, false] }],
              ['bold', 'italic', 'underline'],
              [{ list: 'ordered' }, { list: 'bullet' }],
              ['link'],
              ['clean'],
            ],
          },
        })

        quillInstance.current.on('text-change', () => {
          const content = quillInstance.current.root.innerHTML
          onChange(content)
        })
      }

      if (quillInstance.current.root.innerHTML !== value) {
        quillInstance.current.root.innerHTML = value
      }
    }
  }, [value])

  return (
    <div className="border p-4 rounded-md">
      <div ref={editorRef} className="h-40"></div>
    </div>
  )
}
