"use client"

import { useState, useEffect, useRef } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Download, Share2, ArrowLeft, Check, Loader2 } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { generatePDF, downloadPDF } from "@/utils/pdf-generator"

export default function PreviewPage() {
  const router = useRouter()
  const [resumeSections, setResumeSections] = useState<any[]>([])
  const [selectedTemplate, setSelectedTemplate] = useState<string>("modern")
  const [personalInfo, setPersonalInfo] = useState({
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "(123) 456-7890",
    location: "New York, NY",
  })
  const [downloadSuccess, setDownloadSuccess] = useState(false)
  const resumeRef = useRef<HTMLDivElement>(null)
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false)

  useEffect(() => {
    // Check if we have the necessary data in session storage
    const sectionsJson = sessionStorage.getItem("resumeSections")
    const template = sessionStorage.getItem("selectedTemplate")
    const personalInfoJson = sessionStorage.getItem("personalInfo")

    if (!sectionsJson) {
      router.push("/editor")
      return
    }

    setResumeSections(JSON.parse(sectionsJson))

    if (template) {
      setSelectedTemplate(template)
    }

    // If we have personal info, use it
    if (personalInfoJson) {
      try {
        const parsedInfo = JSON.parse(personalInfoJson)

        // Extract contact details from the contact string
        const contactDetails = parsedInfo.contact || ""
        const emailMatch = contactDetails.match(/([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+)/)
        const phoneMatch = contactDetails.match(/(\+\d{1,2}\s)?$$?\d{3}$$?[\s.-]?\d{3}[\s.-]?\d{4}/)
        const locationMatch = contactDetails.match(/([A-Za-z]+,\s*[A-Za-z]{2})/)

        setPersonalInfo({
          name: parsedInfo.name || "John Doe",
          email: emailMatch ? emailMatch[0] : "john.doe@example.com",
          phone: phoneMatch ? phoneMatch[0] : "(123) 456-7890",
          location: locationMatch ? locationMatch[0] : "New York, NY",
        })
      } catch (err) {
        console.error("Error parsing personal info:", err)
        // Keep default values if there's an error
      }
    }
  }, [router])

  const handleDownload = async () => {
    if (!resumeRef.current) return

    try {
      setIsGeneratingPDF(true)

      // Generate the PDF
      const pdfBlob = await generatePDF(resumeRef.current, selectedTemplate)

      // Download the PDF
      downloadPDF(pdfBlob, `${personalInfo.name.replace(/\s+/g, "_")}_Resume.pdf`)

      // Show success message
      setDownloadSuccess(true)
      setTimeout(() => setDownloadSuccess(false), 3000)
    } catch (err) {
      console.error("Error generating PDF:", err)
      // You could add error handling here
    } finally {
      setIsGeneratingPDF(false)
    }
  }

  const getTemplateClass = () => {
    switch (selectedTemplate) {
      case "modern":
        return "bg-white font-sans"
      case "classic":
        return "bg-white font-serif"
      case "creative":
        return "bg-white font-sans"
      case "minimal":
        return "bg-white font-sans"
      default:
        return "bg-white font-sans"
    }
  }

  return (
    <div className="container py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <div>
          <h1 className="text-2xl font-bold">Resume Preview</h1>
          <p className="text-muted-foreground">Review your tailored resume and download it as a PDF</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="gap-2" onClick={() => router.push("/templates")}>
            <ArrowLeft className="h-4 w-4" />
            Back to Templates
          </Button>
          <Button size="sm" className="gap-2" onClick={handleDownload} disabled={isGeneratingPDF}>
            {isGeneratingPDF ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Generating...
              </>
            ) : downloadSuccess ? (
              <>
                <Check className="h-4 w-4" />
                Downloaded
              </>
            ) : (
              <>
                <Download className="h-4 w-4" />
                Download PDF
              </>
            )}
          </Button>
        </div>
      </div>

      <Tabs defaultValue="preview">
        <TabsList className="mb-6">
          <TabsTrigger value="preview">Preview</TabsTrigger>
          <TabsTrigger value="personal-info">Personal Info</TabsTrigger>
        </TabsList>

        <TabsContent value="preview">
          <Card className="border shadow-lg">
            <CardContent className="p-0">
              <div className="bg-white rounded-lg overflow-hidden">
                <div ref={resumeRef} className={`p-8 max-w-[850px] mx-auto ${getTemplateClass()}`}>
                  {/* Header with personal info */}
                  <div
                    className={`${
                      selectedTemplate === "modern"
                        ? "border-b-4 border-primary pb-4 mb-6"
                        : selectedTemplate === "creative"
                          ? "bg-primary/10 p-4 rounded-lg mb-6"
                          : "border-b pb-4 mb-6"
                    }`}
                  >
                    <h1 className={`text-2xl font-bold ${selectedTemplate === "creative" ? "text-primary" : ""}`}>
                      {personalInfo.name}
                    </h1>
                    <div className="flex flex-wrap gap-x-4 gap-y-1 mt-1 text-sm">
                      <span>{personalInfo.email}</span>
                      <span>{personalInfo.phone}</span>
                      <span>{personalInfo.location}</span>
                    </div>
                  </div>

                  {/* Resume sections */}
                  <div className="space-y-6">
                    {resumeSections.map((section) => (
                      <div key={`final-${section.id}`} className="space-y-2">
                        <h2
                          className={`font-bold ${
                            selectedTemplate === "modern"
                              ? "text-primary uppercase text-lg tracking-wider"
                              : selectedTemplate === "creative"
                                ? "text-primary text-lg border-b border-primary inline-block"
                                : "uppercase text-lg tracking-wider border-b pb-1"
                          }`}
                        >
                          {section.title}
                        </h2>
                        <div className="whitespace-pre-line">{section.content}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="personal-info">
          <Card>
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    value={personalInfo.name}
                    onChange={(e) => setPersonalInfo({ ...personalInfo, name: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={personalInfo.email}
                    onChange={(e) => setPersonalInfo({ ...personalInfo, email: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone</Label>
                  <Input
                    id="phone"
                    value={personalInfo.phone}
                    onChange={(e) => setPersonalInfo({ ...personalInfo, phone: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="location">Location</Label>
                  <Input
                    id="location"
                    value={personalInfo.location}
                    onChange={(e) => setPersonalInfo({ ...personalInfo, location: e.target.value })}
                  />
                </div>
              </div>

              <Button className="w-full mt-4" onClick={() => document.querySelector('[data-value="preview"]')?.click()}>
                Update Preview
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="mt-8 p-6 border rounded-lg bg-muted/50">
        <h3 className="text-lg font-medium mb-2">Share Your Success</h3>
        <p className="text-muted-foreground mb-4">Help others improve their job search by sharing this tool</p>
        <div className="flex gap-2">
          <Button variant="outline" className="gap-2">
            <Share2 className="h-4 w-4" />
            Share
          </Button>
        </div>
      </div>
    </div>
  )
}
