"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { AlertCircle } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"

export default function JobDescriptionPage() {
  const router = useRouter()
  const [jobDescription, setJobDescription] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [resumeFileName, setResumeFileName] = useState<string | null>(null)

  useEffect(() => {
    // Check if we have resume sections in session storage
    const sectionsJson = sessionStorage.getItem("resumeSections")
    const fileName = sessionStorage.getItem("resumeFileName")

    if (!sectionsJson || !fileName) {
      router.push("/upload")
    } else {
      setResumeFileName(fileName)
    }
  }, [router])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (jobDescription.trim().length < 50) {
      setError("Please enter a more detailed job description (at least 50 characters).")
      return
    }

    // Store the job description in session storage
    sessionStorage.setItem("jobDescription", jobDescription)
    router.push("/editor")
  }

  return (
    <div className="container max-w-3xl py-12">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Add Job Description</CardTitle>
          <CardDescription>Paste the job description you're applying for to get tailored suggestions.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            {error && (
              <Alert variant="destructive" className="mb-6">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            {resumeFileName && (
              <div className="mb-6 p-3 bg-muted rounded-md text-sm">
                <span className="font-medium">Resume:</span> {resumeFileName}
              </div>
            )}

            <div className="space-y-2">
              <Textarea
                placeholder="Paste the job description here..."
                className="min-h-[300px]"
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
              />
              <p className="text-sm text-muted-foreground">
                The more detailed the job description, the better our AI can tailor your resume.
              </p>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" onClick={() => router.push("/upload")}>
            Back
          </Button>
          <Button onClick={handleSubmit} disabled={jobDescription.trim().length < 50}>
            Continue
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
