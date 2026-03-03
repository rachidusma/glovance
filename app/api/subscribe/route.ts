import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email } = body;

    if (!email || !emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email address' },
        { status: 400 }
      );
    }

    // Check if the email is already subscribed
    const existingSubscriber = await prisma.subscriber.findUnique({
      where: { email },
    });

    if (existingSubscriber) {
      if (!existingSubscriber.isActive) {
        // Reactivate subscription if it was disabled
        await prisma.subscriber.update({
          where: { email },
          data: { isActive: true },
        });
        return NextResponse.json(
          { message: 'Subscription reactivated successfully' },
          { status: 200 }
        );
      }
      
      return NextResponse.json(
        { error: 'This email is already subscribed' },
        { status: 400 }
      );
    }

    // Create a new subscriber
    await prisma.subscriber.create({
      data: {
        email,
        isActive: true,
      },
    });

    return NextResponse.json(
      { message: 'Subscribed successfully' },
      { status: 201 }
    );
  } catch (error) {
    console.error('Subscription error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
