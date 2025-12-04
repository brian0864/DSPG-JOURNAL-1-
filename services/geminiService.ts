
import { GoogleGenAI, Type } from "@google/genai";
import { PlagiarismResult } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
const modelId = "gemini-2.5-flash";

export const checkPlagiarismWithGemini = async (text: string): Promise<PlagiarismResult> => {
  const prompt = `
    Act as an academic plagiarism and originality detection system. 
    Analyze the following academic text excerpt for:
    1. Potential AI generation.
    2. Lack of originality or generic phrasing.
    3. Coherence and academic tone.
    
    Since you cannot access the real-time internet database of all papers, focus on "Intrisic Analysis" - detecting patterns typical of unoriginal or synthetic writing.

    Text to Analyze:
    "${text.substring(0, 15000)}" 

    Return a JSON response strictly following this schema:
    {
      "score": number (0-100, where 100 is high quality/original),
      "similarityPercentage": number (0-100, estimated overlap with generic/AI content),
      "analysis": string (summary of findings),
      "flaggedSections": array of objects { "text": string, "reason": string }
    }
  `;

  try {
    const response = await ai.models.generateContent({
      model: modelId,
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            score: { type: Type.NUMBER, description: "Originality Score out of 100" },
            similarityPercentage: { type: Type.NUMBER, description: "Estimated similarity percentage" },
            analysis: { type: Type.STRING, description: "Detailed analysis of the text" },
            flaggedSections: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  text: { type: Type.STRING },
                  reason: { type: Type.STRING }
                }
              }
            }
          }
        }
      }
    });

    if (response.text) {
      return JSON.parse(response.text) as PlagiarismResult;
    }
    throw new Error("Empty response from AI");
  } catch (error) {
    console.error("Plagiarism check failed:", error);
    return {
      score: 0,
      similarityPercentage: 0,
      analysis: "Error performing analysis. Please try again.",
      flaggedSections: []
    };
  }
};

export const generateArticleSummary = async (text: string): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
      model: modelId,
      contents: `Provide a concise, academic summary (max 150 words) of the following text, highlighting the methodology and key findings: ${text.substring(0, 10000)}`,
    });
    return response.text || "Could not generate summary.";
  } catch (e) {
    return "AI Summary unavailable.";
  }
};

export const extractKeywords = async (text: string): Promise<string[]> => {
  try {
    const response = await ai.models.generateContent({
      model: modelId,
      contents: `Extract the top 5 academic keywords from this text as a JSON array of strings: ${text.substring(0, 5000)}`,
      config: { responseMimeType: "application/json" }
    });
    return JSON.parse(response.text || "[]");
  } catch (e) {
    return [];
  }
};
