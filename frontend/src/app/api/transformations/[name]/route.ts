import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

// Images are served from /public/images/transformations/
const PUBLIC_DIR = path.join(process.cwd(), 'public', 'images', 'transformations');

const IMAGE_MAP: Record<string, string> = {
  'before-veneers':   'before-veneers.png',
  'after-veneers':    'after-veneers.png',
  'before-whitening': 'before-whitening.png',
  'after-whitening':  'after-whitening.png',
};

export async function GET(
  request: NextRequest,
  { params }: { params: { name: string } }
) {
  const name = params.name;
  const fileName = IMAGE_MAP[name];

  if (!fileName) {
    return NextResponse.json({ error: 'Image not found' }, { status: 404 });
  }

  const filePath = path.join(PUBLIC_DIR, fileName);

  try {
    if (fs.existsSync(filePath)) {
      const buffer = fs.readFileSync(filePath);
      return new NextResponse(buffer, {
        headers: {
          'Content-Type': 'image/png',
          'Cache-Control': 'no-cache, no-store, must-revalidate',
        }
      });
    }
  } catch (err) {
    console.error('Error serving transformation image:', err);
  }

  // Fallback
  return NextResponse.redirect('https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&q=80&w=1200');
}
