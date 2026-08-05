import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const IMAGE_MAP: Record<string, string> = {
  'before-veneers': 'dental_before_veneers_1785940928778.png',
  'after-veneers': 'dental_after_veneers_1785940946998.png',
  'before-whitening': 'dental_before_whitening_1785940966110.png',
  'after-whitening': 'dental_after_whitening_1785940986039.png'
};

const BRAIN_DIR = 'C:\\Users\\admin\\.gemini\\antigravity-ide\\brain\\f6e6046d-00a8-4eb4-bc06-77101a555065';
const PUBLIC_DIR = path.join(process.cwd(), 'public', 'images', 'transformations');

export async function GET(
  request: NextRequest,
  { params }: { params: { name: string } }
) {
  const name = params.name;
  const fileName = IMAGE_MAP[name];

  if (!fileName) {
    return NextResponse.json({ error: 'Image not found' }, { status: 404 });
  }

  const sourcePath = path.join(BRAIN_DIR, fileName);

  try {
    if (fs.existsSync(sourcePath)) {
      // Auto-copy to public folder for caching
      if (!fs.existsSync(PUBLIC_DIR)) {
        fs.mkdirSync(PUBLIC_DIR, { recursive: true });
      }
      const publicPath = path.join(PUBLIC_DIR, `${name}.png`);
      if (!fs.existsSync(publicPath)) {
        fs.copyFileSync(sourcePath, publicPath);
      }

      const buffer = fs.readFileSync(sourcePath);
      return new NextResponse(buffer, {
        headers: {
          'Content-Type': 'image/png',
          'Cache-Control': 'public, max-age=31536000, immutable'
        }
      });
    }
  } catch (err) {
    console.error('Error serving transformation image:', err);
  }

  // Fallback if file doesn't exist
  return NextResponse.redirect('https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&q=80&w=1200');
}
