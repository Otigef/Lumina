import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });

export async function getMentorFeedback(code: string, lessonTitle: string, userQuestion?: string) {
  const model = "gemini-3-flash-preview";
  
  const prompt = userQuestion 
    ? `The user is learning web development. Lesson: "${lessonTitle}". 
       Current code:
       \`\`\`
       ${code}
       \`\`\`
       User Question: "${userQuestion}"
       Explain simply to a beginner.`
    : `The user is learning web development. Lesson: "${lessonTitle}". 
       Current code:
       \`\`\`
       ${code}
       \`\`\`
       Analyze this code. If there are errors, explain them simply. If it's correct, suggest one small improvement or a "did you know" fact about this topic. Keep it encouraging and beginner-friendly.`;

  try {
    const response = await ai.models.generateContent({
      model,
      contents: prompt,
      config: {
        systemInstruction: "You are SkillStack Mentor, a friendly and patient web development teacher for absolute beginners. You use simple analogies, avoid jargon unless you explain it, and always encourage the student. You focus on HTML, CSS, and JS basics.",
      }
    });
    return response.text;
  } catch (error) {
    console.error("Gemini Error:", error);
    return "I'm having a little trouble connecting to my brain right now. Try again in a moment!";
  }
}
