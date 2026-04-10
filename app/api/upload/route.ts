import { handleUpload, type HandleUploadBody } from '@vercel/blob/client';
import { NextResponse } from 'next/server';

export async function POST(request: Request): Promise<NextResponse> {
  const body = (await request.json()) as HandleUploadBody;

  try {
    const jsonResponse = await handleUpload({
      body,
      request,
      onBeforeGenerateToken: async () => {
        return {
          tokenPayload: JSON.stringify({}),
        };
      },
      onUploadCompleted: async () => {
        // no-op — we handle DB writes separately via the Express backend
      },
    });

    return NextResponse.json(jsonResponse);
  } catch (error) {
    console.error('Blob upload route error:', error);
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 400 },
    );
  }
}
