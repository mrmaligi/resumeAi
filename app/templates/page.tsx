"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Check } from "lucide-react"
import { TemplatePreview } from "@/components/template-preview"

type Template = {
  id: string
  name: string
  description: string
  preview: string
}

export default function TemplatesPage() {
  const router = useRouter()
  const [selectedTemplate, setSelectedTemplate] = useState<string>("modern")
  const [resumeSections, setResumeSections] = useState<any[]>([])

  useEffect(() => {
    // Check if we have resume sections in session storage
    const sectionsJson = sessionStorage.getItem("resumeSections")
    if (!sectionsJson) {
      router.push("/editor")
    } else {
      setResumeSections(JSON.parse(sectionsJson))
    }
  }, [router])

  const templates: Template[] = [
    {
      id: "modern",
      name: "Modern",
      description: "Clean and professional design with a touch of color",
      preview: "/placeholder.svg?height=200&width=150",
    },
    {
      id: "classic",
      name: "Classic",
      description: "Traditional resume format, perfect for conservative industries",
      preview: "/placeholder.svg?height=200&width=150",
    },
    {
      id: "creative",
      name: "Creative",
      description: "Stand out with a unique design for creative roles",
      preview: "/placeholder.svg?height=200&width=150",
    },
    {
      id: "minimal",
      name: "Minimal",
      description: "Simple and elegant design focusing on content",
      preview: "/placeholder.svg?height=200&width=150",
    },
  ]

  const handleContinue = () => {
    // Store the selected template in session storage
    sessionStorage.setItem("selectedTemplate", selectedTemplate)
    router.push("/preview")
  }

  return (
    <div className="container py-12">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold">Choose a Template</h1>
          <p className="text-muted-foreground mt-2">Select a professional template for your tailored resume</p>
        </div>

        <RadioGroup
          value={selectedTemplate}
          onValueChange={setSelectedTemplate}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8"
        >
          {templates.map((template) => (
            <Label
              key={template.id}
              htmlFor={template.id}
              className={`cursor-pointer rounded-lg border-2 p-1 ${
                selectedTemplate === template.id ? "border-primary" : "border-transparent hover:border-muted"
              }`}
            >
              <Card className="h-full">
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle>{template.name}</CardTitle>
                      <CardDescription>{template.description}</CardDescription>
                    </div>
                    <div
                      className={`rounded-full p-1 ${
                        selectedTemplate === template.id ? "bg-primary text-primary-foreground" : "bg-muted"
                      }`}
                    >
                      {selectedTemplate === template.id && <Check className="h-4 w-4" />}
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="aspect-[3/4] overflow-hidden rounded border bg-muted">
                    <TemplatePreview template={template.id} />
                  </div>
                </CardContent>
                <RadioGroupItem value={template.id} id={template.id} className="sr-only" />
              </Card>
            </Label>
          ))}
        </RadioGroup>

        <div className="flex justify-between">
          <Button variant="outline" onClick={() => router.push("/editor")}>
            Back
          </Button>
          <Button onClick={handleContinue}>Continue to Preview</Button>
        </div>
      </div>
    </div>
  )
}
