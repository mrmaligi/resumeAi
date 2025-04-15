"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { AlertCircle, Wand2, Send, Download, Loader2 } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { generateText } from "ai"
import { openai } from "@ai-sdk/openai"

// Define resume sections
type ResumeSection = {
  id: string
  title: string
  content: string
  suggestions?: string
}

export default function EditorPage() {
  const router = useRouter()
  const [resumeFileName, setResumeFileName] = useState<string | null>(null)
  const [jobDescription, setJobDescription] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [aiPrompt, setAiPrompt] = useState("")
  const [activeTab, setActiveTab] = useState("edit")

  // Mock resume data - in a real app, this would come from parsing the uploaded file
  const [resumeSections, setResumeSections] = useState<ResumeSection[]>([
    {
      id: "summary",
      title: "Professional Summary",
      content:
        "Experienced software developer with 5+ years of experience in web development, specializing in React, Node.js, and TypeScript. Passionate about creating user-friendly applications and solving complex problems.",
    },
    {
      id: "experience",
      title: "Work Experience",
      content: `Senior Developer at TechCorp (2020-Present)
- Led a team of 5 developers to build a customer portal that increased user engagement by 35%
- Implemented CI/CD pipelines that reduced deployment time by 50%
- Mentored junior developers and conducted code reviews

Web Developer at StartupXYZ (2018-2020)
- Developed responsive web applications using React and Node.js
- Collaborated with UX designers to implement user-friendly interfaces
- Optimized database queries resulting in 40% faster page load times`,
    },
    {
      id: "education",
      title: "Education",
      content: `Bachelor of Science in Computer Science
University of Technology (2014-2018)
- GPA: 3.8/4.0
- Relevant coursework: Data Structures, Algorithms, Web Development, Database Systems`,
    },
    {
      id: "skills",
      title: "Skills",
      content: `Technical: JavaScript, TypeScript, React, Node.js, Express, MongoDB, SQL, Git, AWS
Soft Skills: Team Leadership, Problem Solving, Communication, Agile Methodologies`,
    },
  ])

  // Update the useEffect hook to load resume sections from session storage
  useEffect(() => {
    // Check if we have the necessary data in session storage
    const fileName = sessionStorage.getItem("resumeFileName")
    const jobDesc = sessionStorage.getItem("jobDescription")
    const sectionsJson = sessionStorage.getItem("resumeSections")

    if (!fileName || !jobDesc) {
      router.push("/upload")
      return
    }

    setResumeFileName(fileName)
    setJobDescription(jobDesc)

    // If we have parsed resume sections, use them
    if (sectionsJson) {
      try {
        const parsedSections = JSON.parse(sectionsJson)
        setResumeSections(parsedSections)

        // Generate initial AI suggestions
        // We'll delay this slightly to ensure the UI is responsive
        setTimeout(() => {
          generateSuggestions()
        }, 500)
      } catch (err) {
        console.error("Error parsing resume sections:", err)
        // If there's an error, we'll use the default sections
        generateSuggestions()
      }
    } else {
      // Generate initial AI suggestions
      generateSuggestions()
    }
  }, [router])

  const generateSuggestions = async (specificSection?: string) => {
    if (!jobDescription) return

    setIsLoading(true)
    setError(null)

    try {
      // If we're generating suggestions for all sections
      if (!specificSection) {
        const updatedSections = [...resumeSections]

        // Process each section with AI
        for (let i = 0; i < updatedSections.length; i++) {
          const section = updatedSections[i]

          try {
            const { text } = await generateText({
              model: openai("gpt-4o"),
              prompt: `I have a resume section titled "${section.title}" with the following content:
            
${section.content}

I'm applying for a job with this description:
${jobDescription}

Please suggest improvements to make this section more tailored to the job description. Focus on highlighting relevant skills and experiences, using keywords from the job description, and quantifying achievements where possible. Provide the suggestions in a clear, concise format.`,
              system:
                "You are an expert resume writer who helps job seekers tailor their resumes to specific job descriptions. Provide specific, actionable suggestions to improve resume sections.",
            })

            updatedSections[i] = {
              ...section,
              suggestions: text,
            }
          } catch (err) {
            console.error(`Error generating suggestions for ${section.title}:`, err)
            updatedSections[i] = {
              ...section,
              suggestions: "Failed to generate suggestions for this section. Please try again.",
            }
          }
        }

        setResumeSections(updatedSections)
      }
      // If we're generating suggestions for a specific section
      else {
        const sectionIndex = resumeSections.findIndex((s) => s.id === specificSection)
        if (sectionIndex === -1) return

        const section = resumeSections[sectionIndex]

        let promptText = aiPrompt
        if (!promptText.trim()) {
          promptText = `Improve this "${section.title}" section to better match the job description`
        }

        const { text } = await generateText({
          model: openai("gpt-4o"),
          prompt: `I have a resume section titled "${section.title}" with the following content:
        
${section.content}

I'm applying for a job with this description:
${jobDescription}

User instruction: ${promptText}

Please rewrite this section to be more tailored to the job description. Focus on highlighting relevant skills and experiences, using keywords from the job description, and quantifying achievements where possible. Provide the complete rewritten section, not just suggestions.`,
          system:
            "You are an expert resume writer who helps job seekers tailor their resumes to specific job descriptions. Provide complete, well-formatted content that can be used directly in a resume.",
        })

        const updatedSections = [...resumeSections]
        updatedSections[sectionIndex] = {
          ...section,
          content: text,
        }

        setResumeSections(updatedSections)
        setAiPrompt("")
      }
    } catch (err) {
      console.error("Error generating suggestions:", err)
      setError("Failed to generate AI suggestions. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleSectionChange = (id: string, content: string) => {
    const updatedSections = resumeSections.map((section) => (section.id === id ? { ...section, content } : section))
    setResumeSections(updatedSections)
  }

  const handleContinue = () => {
    // Store the updated resume sections in session storage
    sessionStorage.setItem("resumeSections", JSON.stringify(resumeSections))
    router.push("/templates")
  }

  return (
    <div className="container py-8">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
          <div>
            <h1 className="text-2xl font-bold">Resume Editor</h1>
            <p className="text-muted-foreground">Edit your resume with AI assistance to match the job description</p>
          </div>
          <TabsList>
            <TabsTrigger value="edit">Edit Resume</TabsTrigger>
            <TabsTrigger value="preview">Preview</TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="edit" className="space-y-6">
          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              {resumeSections.map((section) => (
                <Card key={section.id} className="overflow-hidden">
                  <CardHeader className="bg-muted/50 pb-3">
                    <CardTitle className="text-lg">{section.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="pt-4">
                    <Textarea
                      value={section.content}
                      onChange={(e) => handleSectionChange(section.id, e.target.value)}
                      className="min-h-[150px] font-mono text-sm"
                    />
                    <div className="flex items-center justify-end gap-2 mt-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="gap-1"
                        onClick={() => generateSuggestions(section.id)}
                        disabled={isLoading}
                      >
                        <Wand2 className="h-3.5 w-3.5" />
                        Improve with AI
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">AI Assistant</CardTitle>
                  <CardDescription>Get AI-powered suggestions to improve your resume</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="ai-prompt">Ask the AI for help</Label>
                    <Textarea
                      id="ai-prompt"
                      placeholder="E.g., 'Make my summary more focused on leadership skills'"
                      value={aiPrompt}
                      onChange={(e) => setAiPrompt(e.target.value)}
                      className="min-h-[100px]"
                    />
                  </div>
                  <Button
                    className="w-full gap-2"
                    onClick={() => {
                      if (aiPrompt.trim()) {
                        const activeSection = resumeSections[0].id // Default to first section
                        generateSuggestions(activeSection)
                      }
                    }}
                    disabled={isLoading || !aiPrompt.trim()}
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        Processing...
                      </>
                    ) : (
                      <>
                        <Send className="h-4 w-4" />
                        Send
                      </>
                    )}
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Job Description</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="max-h-[300px] overflow-y-auto text-sm p-3 bg-muted rounded-md">
                    {jobDescription &&
                      jobDescription.split("\n").map((line, i) => (
                        <p key={i} className="mb-2">
                          {line}
                        </p>
                      ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">AI Suggestions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {isLoading ? (
                    <div className="flex items-center justify-center p-6">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {resumeSections.map((section) =>
                        section.suggestions ? (
                          <div key={`suggestion-${section.id}`} className="space-y-2">
                            <h4 className="font-medium text-sm">{section.title}</h4>
                            <div className="text-sm p-3 bg-muted rounded-md">
                              {section.suggestions.split("\n").map((line, i) => (
                                <p key={i} className="mb-2">
                                  {line}
                                </p>
                              ))}
                            </div>
                          </div>
                        ) : null,
                      )}

                      {!resumeSections.some((s) => s.suggestions) && !isLoading && (
                        <div className="text-center p-4 text-muted-foreground">
                          <p>No suggestions generated yet</p>
                        </div>
                      )}

                      <Button
                        variant="outline"
                        className="w-full gap-2"
                        onClick={() => generateSuggestions()}
                        disabled={isLoading}
                      >
                        <Wand2 className="h-4 w-4" />
                        Generate New Suggestions
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="preview">
          <Card>
            <CardHeader className="border-b">
              <div className="flex justify-between items-center">
                <CardTitle className="text-2xl">Resume Preview</CardTitle>
                <Button variant="outline" size="sm" className="gap-2">
                  <Download className="h-4 w-4" />
                  Download PDF
                </Button>
              </div>
            </CardHeader>
            <CardContent className="p-8 max-w-3xl mx-auto">
              <div className="space-y-6 preview-resume">
                <div className="text-center mb-8">
                  <h1 className="text-2xl font-bold">John Doe</h1>
                  <p className="text-muted-foreground">Software Developer | john.doe@example.com | (123) 456-7890</p>
                </div>

                {resumeSections.map((section) => (
                  <div key={`preview-${section.id}`} className="space-y-2">
                    <h2 className="text-lg font-bold uppercase tracking-wider border-b pb-1">{section.title}</h2>
                    <div className="whitespace-pre-line">{section.content}</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="flex justify-between mt-8">
        <Button variant="outline" onClick={() => router.push("/job-description")}>
          Back
        </Button>
        <Button onClick={handleContinue}>Continue to Templates</Button>
      </div>
    </div>
  )
}
