import { redis } from '@/lib/redis';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // Test write
    await redis.set('test-key', 'test-value');
    
    // Test read
    const value = await redis.get('test-key');
    
    return NextResponse.json({ 
      success: true, 
      message: 'Redis connection successful',
      value 
    });
  } catch (error) {
    console.error('Redis test failed:', error);
    return NextResponse.json({ 
      success: false, 
      error: error instanceof Error ? error.message : 'Unknown error' 
    }, { status: 500 });
  }
} 