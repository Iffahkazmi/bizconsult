export const dynamic = 'force-dynamic';

import { NextResponse } from 'next/server';
import { auth } from '@/auth';
import { prisma } from '@/lib/prisma';
import openai from '@/lib/ai/openai';

export async function POST(request, context) {
  try {
    const params = await context.params;
    const session = await auth();
    
    if (!session?.user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { message } = await request.json();

    if (!message || message.trim().length === 0) {
      return NextResponse.json(
        { error: 'Message is required' },
        { status: 400 }
      );
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    // Get chat session with report
    const chatSession = await prisma.chatSession.findUnique({
      where: { id: params.sessionId },
      include: {
        report: true,
      },
    });

    if (!chatSession) {
      return NextResponse.json(
        { error: 'Chat session not found' },
        { status: 404 }
      );
    }

    if (chatSession.userId !== user.id) {
      return NextResponse.json(
        { error: 'Forbidden' },
        { status: 403 }
      );
    }

    // Get previous messages for context
    const previousMessages = await prisma.message.findMany({
      where: { sessionId: params.sessionId },
      orderBy: { createdAt: 'asc' },
      take: 10, // Last 10 messages for context
    });

    // Save user message
    await prisma.message.create({
      data: {
        sessionId: params.sessionId,
        role: 'user',
        content: message.trim(),
      },
    });

    // Prepare context for AI
    const reportData = chatSession.report.reportData;
    const conversationHistory = previousMessages.map(msg => ({
      role: msg.role,
      content: msg.content,
    }));

    // Generate AI response
    const systemPrompt = `You are a helpful business consultant AI. You're having a conversation about a business idea analysis report.

Here's the report data:
${JSON.stringify(reportData, null, 2)}

Answer the user's questions based on this report. Be helpful, concise, and actionable. If they ask about something not in the report, provide general business advice.`;

    const messages = [
      { role: 'system', content: systemPrompt },
      ...conversationHistory,
      { role: 'user', content: message.trim() },
    ];

    const response = await openai.chat.completions.create({
      model: process.env.NVIDIA_API_KEY ? 'meta/llama-3.1-70b-instruct' : 'gpt-4o',
      messages: messages,
      temperature: 0.7,
      max_tokens: 1000,
    });

    const aiReply = response.choices[0].message.content.trim();

    // Save AI response
    await prisma.message.create({
      data: {
        sessionId: params.sessionId,
        role: 'assistant',
        content: aiReply,
      },
    });

    return NextResponse.json({ reply: aiReply });
  } catch (error) {
    console.error('Send message error:', error);
    return NextResponse.json(
      { error: 'Failed to send message' },
      { status: 500 }
    );
  }
}