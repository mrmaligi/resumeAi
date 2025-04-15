// A utility to extract text from uploaded files

export async function extractTextFromFile(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()

    reader.onload = async (event) => {
      try {
        if (!event.target?.result) {
          throw new Error("Failed to read file")
        }

        // For PDF files
        if (file.type === "application/pdf") {
          // In a real app, you would use pdf.js to extract text
          // For this demo, we'll use a simpler approach
          const text = await simulatePdfParsing(event.target.result as ArrayBuffer)
          resolve(text)
        }
        // For Word documents
        else if (file.type.includes("word")) {
          // In a real app, you would use a library like mammoth.js
          // For this demo, we'll use a simpler approach
          const text = await simulateWordParsing(event.target.result as ArrayBuffer)
          resolve(text)
        }
        // For plain text files
        else if (file.type === "text/plain") {
          resolve(event.target.result as string)
        } else {
          reject(new Error("Unsupported file format"))
        }
      } catch (error) {
        reject(error)
      }
    }

    reader.onerror = () => {
      reject(new Error("Error reading file"))
    }

    // Read the file based on type
    if (file.type === "text/plain") {
      reader.readAsText(file)
    } else {
      reader.readAsArrayBuffer(file)
    }
  })
}

// Simulate PDF parsing (in a real app, use pdf.js)
async function simulatePdfParsing(buffer: ArrayBuffer): Promise<string> {
  // This is where you would use pdf.js to extract text
  // For demo purposes, we'll read the first few bytes to verify it's a PDF
  const bytes = new Uint8Array(buffer.slice(0, 5))
  const header = String.fromCharCode(...bytes)

  if (header !== "%PDF-") {
    throw new Error("Invalid PDF file")
  }

  // Return sample text for demonstration
  return `John Doe
Software Developer
john.doe@example.com | (123) 456-7890 | New York, NY

PROFESSIONAL SUMMARY
Experienced software developer with 5+ years of experience in web development, specializing in React, Node.js, and TypeScript. Passionate about creating user-friendly applications and solving complex problems.

WORK EXPERIENCE
Senior Developer at TechCorp (2020-Present)
- Led a team of 5 developers to build a customer portal that increased user engagement by 35%
- Implemented CI/CD pipelines that reduced deployment time by 50%
- Mentored junior developers and conducted code reviews

Web Developer at StartupXYZ (2018-2020)
- Developed responsive web applications using React and Node.js
- Collaborated with UX designers to implement user-friendly interfaces
- Optimized database queries resulting in 40% faster page load times

EDUCATION
Bachelor of Science in Computer Science
University of Technology (2014-2018)
- GPA: 3.8/4.0
- Relevant coursework: Data Structures, Algorithms, Web Development, Database Systems

SKILLS
Technical: JavaScript, TypeScript, React, Node.js, Express, MongoDB, SQL, Git, AWS
Soft Skills: Team Leadership, Problem Solving, Communication, Agile Methodologies`
}

// Simulate Word document parsing (in a real app, use mammoth.js)
async function simulateWordParsing(buffer: ArrayBuffer): Promise<string> {
  // This is where you would use mammoth.js to extract text
  // For demo purposes, we'll check a few bytes to verify it's a Word document
  const bytes = new Uint8Array(buffer.slice(0, 4))
  const validDocxHeader = bytes[0] === 0x50 && bytes[1] === 0x4b && bytes[2] === 0x03 && bytes[3] === 0x04

  if (!validDocxHeader) {
    // Not a strict check, but good enough for demo
    console.warn("File may not be a valid Word document, but continuing anyway")
  }

  // Return sample text for demonstration
  return `John Doe
Software Developer
john.doe@example.com | (123) 456-7890 | New York, NY

PROFESSIONAL SUMMARY
Experienced software developer with 5+ years of experience in web development, specializing in React, Node.js, and TypeScript. Passionate about creating user-friendly applications and solving complex problems.

WORK EXPERIENCE
Senior Developer at TechCorp (2020-Present)
- Led a team of 5 developers to build a customer portal that increased user engagement by 35%
- Implemented CI/CD pipelines that reduced deployment time by 50%
- Mentored junior developers and conducted code reviews

Web Developer at StartupXYZ (2018-2020)
- Developed responsive web applications using React and Node.js
- Collaborated with UX designers to implement user-friendly interfaces
- Optimized database queries resulting in 40% faster page load times

EDUCATION
Bachelor of Science in Computer Science
University of Technology (2014-2018)
- GPA: 3.8/4.0
- Relevant coursework: Data Structures, Algorithms, Web Development, Database Systems

SKILLS
Technical: JavaScript, TypeScript, React, Node.js, Express, MongoDB, SQL, Git, AWS
Soft Skills: Team Leadership, Problem Solving, Communication, Agile Methodologies`
}

// Simple function to parse resume text into sections
export function parseResumeText(text: string): any[] {
  // This is a simplified parser for demonstration
  // In a real app, you would use more sophisticated parsing logic

  const sections = []

  // Extract personal information (name, contact details)
  const lines = text.split("\n")
  const personalInfo = {
    name: lines[0]?.trim() || "John Doe",
    title: lines[1]?.trim() || "",
    contact: lines[2]?.trim() || "",
  }

  // Store personal info in session storage for later use
  sessionStorage.setItem("personalInfo", JSON.stringify(personalInfo))

  // Extract summary section
  const summaryMatch = text.match(
    /PROFESSIONAL SUMMARY|SUMMARY|PROFILE|OBJECTIVE\s*([\s\S]*?)(?=WORK EXPERIENCE|EXPERIENCE|EMPLOYMENT|EDUCATION|SKILLS|$)/i,
  )
  if (summaryMatch && summaryMatch[1]) {
    sections.push({
      id: "summary",
      title: "Professional Summary",
      content: summaryMatch[1].trim(),
    })
  }

  // Extract experience section
  const experienceMatch = text.match(
    /WORK EXPERIENCE|EXPERIENCE|EMPLOYMENT\s*([\s\S]*?)(?=EDUCATION|SKILLS|CERTIFICATIONS|$)/i,
  )
  if (experienceMatch && experienceMatch[1]) {
    sections.push({
      id: "experience",
      title: "Work Experience",
      content: experienceMatch[1].trim(),
    })
  }

  // Extract education section
  const educationMatch = text.match(
    /EDUCATION|ACADEMIC|QUALIFICATIONS\s*([\s\S]*?)(?=SKILLS|CERTIFICATIONS|LANGUAGES|INTERESTS|$)/i,
  )
  if (educationMatch && educationMatch[1]) {
    sections.push({
      id: "education",
      title: "Education",
      content: educationMatch[1].trim(),
    })
  }

  // Extract skills section
  const skillsMatch = text.match(
    /SKILLS|TECHNICAL SKILLS|COMPETENCIES\s*([\s\S]*?)(?=CERTIFICATIONS|LANGUAGES|INTERESTS|REFERENCES|$)/i,
  )
  if (skillsMatch && skillsMatch[1]) {
    sections.push({
      id: "skills",
      title: "Skills",
      content: skillsMatch[1].trim(),
    })
  }

  // Extract certifications section if present
  const certificationsMatch = text.match(
    /CERTIFICATIONS|CERTIFICATES|ACCREDITATIONS\s*([\s\S]*?)(?=LANGUAGES|INTERESTS|REFERENCES|$)/i,
  )
  if (certificationsMatch && certificationsMatch[1]) {
    sections.push({
      id: "certifications",
      title: "Certifications",
      content: certificationsMatch[1].trim(),
    })
  }

  // If no sections were found, create default sections
  if (sections.length === 0) {
    return [
      {
        id: "summary",
        title: "Professional Summary",
        content: "Experienced professional with a track record of success in the industry.",
      },
      {
        id: "experience",
        title: "Work Experience",
        content: "Recent work history and accomplishments.",
      },
      {
        id: "education",
        title: "Education",
        content: "Educational background and qualifications.",
      },
      {
        id: "skills",
        title: "Skills",
        content: "Technical and soft skills relevant to the position.",
      },
    ]
  }

  return sections
}
