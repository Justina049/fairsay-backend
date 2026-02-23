const OpenAI = require("openai");
require("dotenv").config();

// Hugging Face / OpenAI client
const client = new OpenAI({
  baseURL: "https://router.huggingface.co/v1",
  apiKey: process.env.HUGGINGFACE_API_KEY,
});

// FAIR SAY USER GUIDE knowledge base
const fairsayUserGuide = `
FAIR SAY USER GUIDE
How to Use the FairSay Platform

Welcome to FairSay.
Where we help employees in small and medium-sized enterprise (SMEs) and startups safely escalate unresolved workplace issues.

Below is a simple step-by-step guide to help you use our platform.

1. Create Your Account
New User:
  1. Click Sign Up
  2. Enter your email address
  3. Create a secure password
  4. Verify your email
  5. Complete your profile
Returning User:
  • Click Sign In
  • Enter your email and password

2. How to Complete Your Profile & Employee Verification
To protect the integrity of the platform, you will be asked to:
  • Provide your job role and department
  • Enter your company name
  • Input your phone number (optional)
  • Confirm your work Location (optional)
Ensure all information is accurate before proceeding.

3. Employee Verification
After completing your profile, proceed to verification:
  • Submit a self-declaration confirming current employment
  • Upload proof of employment (offer letter, staff ID, official email, or payslip)
Why this matters:
  Verification ensures complaints are genuine and prevents misuse

4. Learn About Your Workplace Rights (Education Hub)
Before submitting a complaint, FairSay encourages you to understand your rights:
  • Wage & Hours Rights
  • Discrimination Laws and Protections
  • Workplace Harassment Awareness
  • Retaliation Protection
  • Proper Complaint Filing procedures
You may be required to complete a short educational module before submitting a complaint.

5. Decide: Internal Reporting First
FairSay encourages internal reporting where safe and appropriate.
You will be asked: "Have you reported this issue internally?"
If Yes:
  • Upload proof (email, screenshot, etc.)
If No:
  • System guides you on internal reporting first
Exception:
  • Where leadership is involved or you fear retaliation, you may escalate directly

6. Submit a Complaint
When ready:
  1. Select complaint type (or describe your issue)
  2. Provide a detailed description
  3. Upload supporting evidence
  4. Choose:
    • Identified submission
    • Anonymous submission (Drop-and-Go)

7. For Whistleblowing: Anonymous Drop-and-Go Option
If you choose anonymity:
  • Your identity will not be visible
  • You will receive a tracking ID
  • Follow-up communication may be limited
This protects users who fear retaliation.
`;

const chatWithAI = async (req, res) => {
  try {
    const { message } = req.body;
    if (!message) return res.status(400).json({ error: "Message is required" });

    const response = await client.chat.completions.create({
      model: "mistralai/Mistral-7B-Instruct-v0.2",
      messages: [
        {
          role: "system",
          content: `
You are FairSay AI, a workplace assistant.

STRICT RULES:
- Only answer based on the FairSay User Guide provided below.
- Keep answers concise, clear, and supportive.
- Use bullet points if needed.
- Never provide advice outside this guide.
- Focus on helping users navigate FairSay safely.

FAIR SAY USER GUIDE:
${fairsayUserGuide}
`,
        },
        { role: "user", content: message },
      ],
      max_tokens: 400,
    });

    const reply = response.choices[0].message.content;
    res.json({ reply });
  } catch (error) {
    console.error("AI Error:", error.message);
    res.status(500).json({ error: "AI request failed" });
  }
};

module.exports = { chatWithAI };