import { NextResponse } from 'next/server';
import { auth } from '@/auth';
import { prisma } from '@/lib/prisma';
import { analyzeIdea } from '@/lib/ai/analyzeIdea';

export async function POST(request) {
  try {
    // Check authentication
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Get idea from request body
    const { idea } = await request.json();

    if (!idea || idea.trim().length < 10) {
      return NextResponse.json(
        { error: 'Please provide a valid business idea (at least 10 characters)' },
        { status: 400 }
      );
    }

    // Get user from database
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    // Check if user has free report available
    const canUseFreeReport = !user.freeReportUsed;

    // Create report record in database
    const report = await prisma.report.create({
      data: {
        userId: user.id,
        ideaInput: idea.trim(),
        status: 'processing',
        isFreeReport: canUseFreeReport,
      },
    });

    // Mark free report as used if applicable
    if (canUseFreeReport) {
      await prisma.user.update({
        where: { id: user.id },
        data: { freeReportUsed: true },
      });
    }

    // Start analysis in background (we'll use a simple approach for now)
    // In production, you'd use a queue system like Bull or Inngest
    analyzeIdeaBackground(report.id, idea);

    return NextResponse.json({
      reportId: report.id,
      status: 'processing',
      message: 'Analysis started',
    });
  } catch (error) {
    console.error('Generate report error:', error);
    return NextResponse.json(
      { error: 'Failed to start analysis' },
      { status: 500 }
    );
  }
}

// Background processing function
async function analyzeIdeaBackground(reportId, idea) {
  try {
    // Run the analysis
    const reportData = await analyzeIdea(idea, reportId);

    // Update database with completed report
    await prisma.report.update({
      where: { id: reportId },
      data: {
        status: 'completed',
        reportData: reportData,
        webSearchResults: reportData.metadata,
      },
    });

    console.log(`Report ${reportId} completed successfully`);
  } catch (error) {
    console.error(`Report ${reportId} failed:`, error);
    
    // Mark as failed in database
    await prisma.report.update({
      where: { id: reportId },
      data: {
        status: 'failed',
      },
    });
  }
}