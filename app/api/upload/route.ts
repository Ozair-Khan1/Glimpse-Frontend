import { handleUpload, type HandleUploadBody } from '@vercel/blob/client';
import { NextResponse } from 'next/server';

export async function POST(request: Request): Promise<NextResponse> {
  const body = (await request.json()) as HandleUploadBody;

  try {
    const jsonResponse = await handleUpload({
      body,
      request,
      onBeforeGenerateToken: async (pathname, clientPayload) => {
        // Here you could authenticate the request using cookies or tokens
        // For now, we allow the upload as long as it's an image or video
        return {
          allowedContentTypes: ['image/jpeg', 'image/png', 'image/gif', 'image/webp', 'video/mp4', 'video/webm', 'video/ogg', 'video/quicktime'],
          maximumSizeInBytes: 100 * 1024 * 1024, // 100MB
          validUntil: Date.now() + 5 * 60 * 1000, // Token valid for 5 minutes
        };
      },
      onUploadCompleted: async ({ blob, tokenPayload }) => {
        // You could register the upload completion here if needed
        console.log('Blob upload completed', blob.url);
      },
    });

    return NextResponse.json(jsonResponse);
  } catch (error) {
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 400 },
    );
  }
}
