// A utility for generating PDFs from the resume content

export function generatePDF(resumeContent: HTMLElement, templateName: string): Promise<Blob> {
  return new Promise((resolve, reject) => {
    try {
      // For this demo, we'll simulate PDF generation
      // In a real app, you would use a library like jsPDF or html2pdf.js

      console.log("Generating PDF with template:", templateName)
      console.log("Resume content:", resumeContent.innerHTML)

      // Simulate PDF generation with a delay
      setTimeout(() => {
        // In a real implementation, we would convert the HTML to a PDF here
        // For demo purposes, we'll create a simple text blob
        const content = `
Resume Content
=============
${resumeContent.textContent}
        `

        // Create a PDF-like blob (this is just for demo purposes)
        const pdfBlob = new Blob([content], { type: "application/pdf" })
        resolve(pdfBlob)
      }, 1500)
    } catch (error) {
      reject(error)
    }
  })
}

export function downloadPDF(blob: Blob, fileName: string): void {
  // Create a URL for the blob
  const url = URL.createObjectURL(blob)

  // Create a link element
  const link = document.createElement("a")
  link.href = url
  link.download = fileName

  // Append the link to the body
  document.body.appendChild(link)

  // Click the link to trigger the download
  link.click()

  // Clean up
  document.body.removeChild(link)
  URL.revokeObjectURL(url)
}
