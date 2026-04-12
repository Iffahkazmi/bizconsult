import { NextResponse } from 'next/server';
import { auth } from '@/auth';
import { prisma } from '@/lib/prisma';

export async function GET(request) {
  try {
    const session = await auth();
    
    if (!session?.user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    // Get recent reports
    const reports = await prisma.report.findMany({
      where: { userId: user.id },
      orderBy: { createdAt: 'desc' },
      take: 10,
      select: {
        id: true,
        ideaInput: true,
        status: true,
        reportData: true,
        createdAt: true,
      },
    });

    // Get stats
    const totalReports = await prisma.report.count({
      where: { userId: user.id },
    });

    const completedReports = await prisma.report.count({
      where: { 
        userId: user.id,
        status: 'completed',
      },
    });

    const chatSessions = await prisma.chatSession.count({
      where: { userId: user.id },
    });

    return NextResponse.json({
      reports,
      stats: {
        totalReports,
        completedReports,
        chatSessions,
      },
    });
  } catch (error) {
    console.error('Dashboard API error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch dashboard data' },
      { status: 500 }
    );
  }
}