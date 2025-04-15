export default function AboutPage() {
  return (
    <div className="container py-12 max-w-3xl">
      <h1 className="text-3xl font-bold mb-6">About ResumeAI</h1>

      <div className="space-y-6">
        <section>
          <h2 className="text-xl font-semibold mb-3">Our Mission</h2>
          <p className="text-muted-foreground">
            ResumeAI was created to help job seekers optimize their resumes for specific job applications. We believe
            that a tailored resume significantly increases your chances of landing an interview, and our AI-powered tool
            makes this process quick and effective.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">How It Works</h2>
          <p className="text-muted-foreground mb-4">
            Our platform uses advanced AI to analyze your existing resume alongside the job description you're applying
            for. It then provides tailored suggestions to help you highlight the most relevant skills and experiences
            for that specific role.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="border rounded-lg p-4 text-center">
              <div className="bg-primary/10 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3">
                <span className="font-bold text-primary">1</span>
              </div>
              <h3 className="font-medium mb-2">Upload Resume</h3>
              <p className="text-sm text-muted-foreground">
                Start by uploading your existing resume in PDF or Word format.
              </p>
            </div>
            <div className="border rounded-lg p-4 text-center">
              <div className="bg-primary/10 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3">
                <span className="font-bold text-primary">2</span>
              </div>
              <h3 className="font-medium mb-2">Add Job Description</h3>
              <p className="text-sm text-muted-foreground">
                Paste the job description you're applying for to get tailored suggestions.
              </p>
            </div>
            <div className="border rounded-lg p-4 text-center">
              <div className="bg-primary/10 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3">
                <span className="font-bold text-primary">3</span>
              </div>
              <h3 className="font-medium mb-2">Customize & Download</h3>
              <p className="text-sm text-muted-foreground">
                Edit your resume with AI assistance, choose a template, and download the final PDF.
              </p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">Privacy & Data Security</h2>
          <p className="text-muted-foreground">
            We take your privacy seriously. Your resume data and job descriptions are processed securely and are not
            stored permanently on our servers. We use industry-standard encryption to protect your information during
            transmission.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">Contact Us</h2>
          <p className="text-muted-foreground">
            If you have any questions, feedback, or need assistance, please reach out to us at
            <a href="mailto:support@resumeai.example.com" className="text-primary ml-1">
              support@resumeai.example.com
            </a>
          </p>
        </section>
      </div>
    </div>
  )
}
