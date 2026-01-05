import { cookies } from 'next/headers';

export const dynamic = 'force-dynamic';

export async function GET() {
  const cookieStore = await cookies();
  const allCookies = Array.from(cookieStore.getAll()).map(c => ({
    name: c.name,
    value: c.value,
  }));

  return Response.json({
    count: allCookies.length,
    cookies: allCookies,
  });
}
