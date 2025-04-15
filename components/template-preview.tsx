interface TemplatePreviewProps {
  template: string
  className?: string
}

export function TemplatePreview({ template, className = "" }: TemplatePreviewProps) {
  // Different template previews based on the template name
  switch (template) {
    case "modern":
      return (
        <div className={`aspect-[3/4] overflow-hidden rounded border bg-white ${className}`}>
          <div className="p-4 h-full flex flex-col">
            <div className="border-b-4 border-blue-500 pb-2 mb-4">
              <div className="h-6 bg-gray-800 w-40 mb-1 rounded"></div>
              <div className="flex gap-2">
                <div className="h-3 bg-gray-400 w-20 rounded"></div>
                <div className="h-3 bg-gray-400 w-20 rounded"></div>
              </div>
            </div>
            <div className="mb-3">
              <div className="h-4 bg-blue-500 w-32 mb-2 rounded"></div>
              <div className="h-3 bg-gray-300 w-full mb-1 rounded"></div>
              <div className="h-3 bg-gray-300 w-full mb-1 rounded"></div>
            </div>
            <div className="mb-3">
              <div className="h-4 bg-blue-500 w-32 mb-2 rounded"></div>
              <div className="h-3 bg-gray-300 w-full mb-1 rounded"></div>
              <div className="h-3 bg-gray-300 w-3/4 mb-1 rounded"></div>
              <div className="h-3 bg-gray-300 w-full mb-1 rounded"></div>
            </div>
            <div className="mb-3">
              <div className="h-4 bg-blue-500 w-32 mb-2 rounded"></div>
              <div className="h-3 bg-gray-300 w-full mb-1 rounded"></div>
              <div className="h-3 bg-gray-300 w-5/6 mb-1 rounded"></div>
            </div>
          </div>
        </div>
      )
    case "classic":
      return (
        <div className={`aspect-[3/4] overflow-hidden rounded border bg-white ${className}`}>
          <div className="p-4 h-full flex flex-col">
            <div className="text-center mb-4">
              <div className="h-6 bg-gray-800 w-40 mx-auto mb-1 rounded"></div>
              <div className="h-3 bg-gray-400 w-60 mx-auto rounded"></div>
            </div>
            <div className="mb-3">
              <div className="h-4 bg-gray-800 w-32 mb-2 rounded"></div>
              <div className="h-3 bg-gray-300 w-full mb-1 rounded"></div>
              <div className="h-3 bg-gray-300 w-full mb-1 rounded"></div>
            </div>
            <div className="mb-3">
              <div className="h-4 bg-gray-800 w-32 mb-2 rounded"></div>
              <div className="h-3 bg-gray-300 w-full mb-1 rounded"></div>
              <div className="h-3 bg-gray-300 w-3/4 mb-1 rounded"></div>
              <div className="h-3 bg-gray-300 w-full mb-1 rounded"></div>
            </div>
            <div className="mb-3">
              <div className="h-4 bg-gray-800 w-32 mb-2 rounded"></div>
              <div className="h-3 bg-gray-300 w-full mb-1 rounded"></div>
              <div className="h-3 bg-gray-300 w-5/6 mb-1 rounded"></div>
            </div>
          </div>
        </div>
      )
    case "creative":
      return (
        <div className={`aspect-[3/4] overflow-hidden rounded border bg-white ${className}`}>
          <div className="p-4 h-full flex flex-col">
            <div className="bg-purple-100 p-3 rounded-lg mb-4">
              <div className="h-6 bg-purple-600 w-40 mb-1 rounded"></div>
              <div className="flex gap-2">
                <div className="h-3 bg-purple-400 w-20 rounded"></div>
                <div className="h-3 bg-purple-400 w-20 rounded"></div>
              </div>
            </div>
            <div className="mb-3">
              <div className="h-4 bg-purple-600 w-32 mb-2 rounded"></div>
              <div className="h-3 bg-gray-300 w-full mb-1 rounded"></div>
              <div className="h-3 bg-gray-300 w-full mb-1 rounded"></div>
            </div>
            <div className="mb-3">
              <div className="h-4 bg-purple-600 w-32 mb-2 rounded"></div>
              <div className="h-3 bg-gray-300 w-full mb-1 rounded"></div>
              <div className="h-3 bg-gray-300 w-3/4 mb-1 rounded"></div>
              <div className="h-3 bg-gray-300 w-full mb-1 rounded"></div>
            </div>
            <div className="mb-3">
              <div className="h-4 bg-purple-600 w-32 mb-2 rounded"></div>
              <div className="h-3 bg-gray-300 w-full mb-1 rounded"></div>
              <div className="h-3 bg-gray-300 w-5/6 mb-1 rounded"></div>
            </div>
          </div>
        </div>
      )
    case "minimal":
      return (
        <div className={`aspect-[3/4] overflow-hidden rounded border bg-white ${className}`}>
          <div className="p-4 h-full flex flex-col">
            <div className="mb-4">
              <div className="h-6 bg-gray-800 w-40 mb-1 rounded"></div>
              <div className="flex gap-2">
                <div className="h-3 bg-gray-400 w-20 rounded"></div>
                <div className="h-3 bg-gray-400 w-20 rounded"></div>
              </div>
            </div>
            <div className="mb-3">
              <div className="h-4 bg-gray-800 w-32 mb-2 rounded"></div>
              <div className="h-3 bg-gray-300 w-full mb-1 rounded"></div>
              <div className="h-3 bg-gray-300 w-full mb-1 rounded"></div>
            </div>
            <div className="mb-3">
              <div className="h-4 bg-gray-800 w-32 mb-2 rounded"></div>
              <div className="h-3 bg-gray-300 w-full mb-1 rounded"></div>
              <div className="h-3 bg-gray-300 w-3/4 mb-1 rounded"></div>
              <div className="h-3 bg-gray-300 w-full mb-1 rounded"></div>
            </div>
            <div className="mb-3">
              <div className="h-4 bg-gray-800 w-32 mb-2 rounded"></div>
              <div className="h-3 bg-gray-300 w-full mb-1 rounded"></div>
              <div className="h-3 bg-gray-300 w-5/6 mb-1 rounded"></div>
            </div>
          </div>
        </div>
      )
    default:
      return (
        <div className={`aspect-[3/4] overflow-hidden rounded border bg-gray-100 ${className}`}>
          <div className="flex items-center justify-center h-full">
            <div className="text-gray-400">Preview not available</div>
          </div>
        </div>
      )
  }
}
