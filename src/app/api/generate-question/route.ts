import { NextResponse } from 'next/server';
import OpenAI from 'openai';

console.log('API Route Loaded: /api/generate-question');
console.log('OPENAI_API_KEY:', process.env.OPENAI_API_KEY ? 'Present' : 'Missing');

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const runtime = 'edge';

const VALID_SUBJECTS = ['math', 'science', 'history', 'literature', 'geography', 'coding'];

export async function POST(req: Request) {
  console.log('Received POST request to /api/generate-question');

  if (req.method !== 'POST') {
    console.log('Invalid method:', req.method);
    return NextResponse.json(
      { success: false, error: 'Method not allowed' },
      { status: 405 }
    );
  }

  try {
    const { topic, difficulty, userWeakAreas = [] } = await req.json();

  
    if (!topic || !difficulty) {
      console.error('Missing topic or difficulty:', { topic, difficulty });
      return NextResponse.json(
        { success: false, error: 'Missing topic or difficulty' },
        { status: 400 }
      );
    }

   
    const normalizedTopic = topic.toLowerCase();
    if (!VALID_SUBJECTS.includes(normalizedTopic)) {
      console.error('Invalid topic:', topic);
      return NextResponse.json(
        { success: false, error: `Invalid topic: ${topic}. Must be one of: ${VALID_SUBJECTS.join(', ')}` },
        { status: 400 }
      );
    }

   
    if (!process.env.OPENAI_API_KEY) {
      console.error('OPENAI_API_KEY is not set');
      return NextResponse.json(
        { success: false, error: 'Server configuration error: Missing OPENAI_API_KEY' },
        { status: 500 }
      );
    }

   
    const sanitizedWeakAreas = Array.isArray(userWeakAreas)
      ? userWeakAreas.filter((area) => typeof area === 'string' && area.trim()).slice(0, 3)
      : [];

    const prompt = `
Generate exactly 3 ${difficulty}-level multiple choice questions about ${normalizedTopic} for a quiz app. ${
      sanitizedWeakAreas.length > 0 ? `Focus on these areas: ${sanitizedWeakAreas.join(', ')}.` : ''
    }

Return the questions as a JSON array of 3 objects, each with the following structure:
[
  {
    "question": "Question text",
    "options": ["Option A", "Option B", "Option C", "Option D"],
    "correctAnswer": "A" | "B" | "C" | "D",
    "explanation": "Explanation of the correct answer",
    "areaTested": "Specific knowledge area"
  },
  {...},
  {...}
]

Example:
[
  {
    "question": "What is a core concept in ${normalizedTopic}?",
    "options": ["Option A", "Option B", "Option C", "Option D"],
    "correctAnswer": "B",
    "explanation": "Option B is correct because it represents a key concept in ${normalizedTopic}.",
    "areaTested": "${normalizedTopic}"
  },
  {
    "question": "What is another aspect of ${normalizedTopic}?",
    "options": ["Option E", "Option F", "Option G", "Option H"],
    "correctAnswer": "F",
    "explanation": "Option F is correct because it relates to ${normalizedTopic}.",
    "areaTested": "${normalizedTopic}"
  },
  {
    "question": "What is a third concept in ${normalizedTopic}?",
    "options": ["Option I", "Option J", "Option K", "Option L"],
    "correctAnswer": "J",
    "explanation": "Option J is correct because it pertains to ${normalizedTopic}.",
    "areaTested": "${normalizedTopic}"
  }
]

Instructions:
- Return ONLY the JSON array with 3 objects.
- Do NOT include code fences (e.g., \`\`\`json or \`\`\`), extra text, comments, or wrapping objects (e.g., { "questions": [...] }).
- Ensure the response is valid JSON that can be parsed directly.
- If the topic or weak areas are unclear, generate 3 general questions about ${normalizedTopic} in the specified format.
- Strictly adhere to the example structure.
    `;

    console.log('Sending request to OpenAI:', {
      model: 'gpt-4o',
      topic: normalizedTopic,
      difficulty,
      weakAreas: sanitizedWeakAreas,
      promptLength: prompt.length,
    });

    const response = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.2,
      max_tokens: 3000, 
    });

    const content = response.choices[0]?.message?.content;
    if (!content) {
      console.error('No content in OpenAI response for topic:', normalizedTopic, 'response:', response);
      throw new Error('No response from OpenAI');
    }

    console.log('Raw OpenAI response for topic:', normalizedTopic, '\n', content);

    let parsed;
    let cleanedContent = content.trim();
    try {
   
      if (cleanedContent.startsWith('```json') && cleanedContent.endsWith('```')) {
        cleanedContent = cleanedContent.slice(7, -3).trim();
      } else if (cleanedContent.startsWith('```') && cleanedContent.endsWith('```')) {
        cleanedContent = cleanedContent.slice(3, -3).trim();
      }
      parsed = JSON.parse(cleanedContent);
    } catch (parseError) {
      console.error('JSON Parse Error for topic:', normalizedTopic, {
        content,
        cleanedContent,
        error: parseError,
      });
   
      const jsonMatch = content.match(/\[[\s\S]*\]/);
      if (jsonMatch) {
        try {
          cleanedContent = jsonMatch[0];
          parsed = JSON.parse(cleanedContent);
        } catch (fallbackError) {
          console.error('Fallback JSON Parse Error for topic:', normalizedTopic, {
            cleanedContent,
            error: fallbackError,
          });
        }
      }
      if (!parsed) {
        console.warn('Using fallback questions for topic:', normalizedTopic);
        
        parsed = [
          {
            question: `What is a core concept in ${normalizedTopic}?`,
            options: ['Option A', 'Option B', 'Option C', 'Option D'],
            correctAnswer: 'B',
            explanation: `Option B is correct for ${normalizedTopic}.`,
            areaTested: normalizedTopic,
          },
          {
            question: `What is another concept in ${normalizedTopic}?`,
            options: ['Option E', 'Option F', 'Option G', 'Option H'],
            correctAnswer: 'F',
            explanation: `Option F is correct for ${normalizedTopic}.`,
            areaTested: normalizedTopic,
          },
          {
            question: `What is a third concept in ${normalizedTopic}?`,
            options: ['Option I', 'Option J', 'Option K', 'Option L'],
            correctAnswer: 'J',
            explanation: `Option J is correct for ${normalizedTopic}.`,
            areaTested: normalizedTopic,
          },
        ];
      }
    }

   
    let questionsArray = parsed;
    if (!Array.isArray(parsed)) {
      console.warn('OpenAI response is not an array for topic:', normalizedTopic, 'parsed:', parsed);
      if (parsed.questions && Array.isArray(parsed.questions)) {
        questionsArray = parsed.questions;
      } else if (typeof parsed === 'object' && parsed.question) {
        questionsArray = [parsed];
      } else {
        console.error('Invalid response structure for topic:', normalizedTopic, 'parsed:', parsed);
        throw new Error(`OpenAI response is not an array for topic ${normalizedTopic}`);
      }
    }

    if (questionsArray.length === 0) {
      console.error('OpenAI returned empty array for topic:', normalizedTopic);
      throw new Error(`OpenAI returned no questions for topic ${normalizedTopic}`);
    }

    
    const questions = questionsArray.map((q, index) => {
      if (!q.question || !Array.isArray(q.options) || !q.correctAnswer || !q.explanation || !q.areaTested) {
        console.error('Invalid question format at index:', index, 'for topic:', normalizedTopic, 'question:', q);
        throw new Error(`Invalid question format at index ${index} for topic ${normalizedTopic}`);
      }

      const correctAnswer = q.correctAnswer?.toUpperCase();
      if (!['A', 'B', 'C', 'D'].includes(correctAnswer)) {
        console.error('Invalid correct answer at index:', index, 'for topic:', normalizedTopic, 'correctAnswer:', correctAnswer);
        throw new Error(`Invalid correct answer format at index ${index} for topic ${normalizedTopic}`);
      }

      return {
        id: `ai-${Date.now()}-${index}`,
        text: q.question,
        options: q.options,
        correctAnswer: q.options[correctAnswer.charCodeAt(0) - 65],
        explanation: q.explanation,
        difficulty,
        subject: normalizedTopic,
        areaTested: q.areaTested,
      };
    });

    console.log('Generated questions for topic:', normalizedTopic, 'count:', questions.length);

    return NextResponse.json({
      success: true,
      questions,
    });
  } catch (error) {
    console.error('AI Generation Error for topic:', normalizedTopic, 'error:', error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Generation failed',
        details: error instanceof Error ? error.stack : null,
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  console.log('Received GET request to /api/generate-question');
  return NextResponse.json({
    success: true,
    message: 'API route is accessible. Use POST to generate questions.',
  });
}