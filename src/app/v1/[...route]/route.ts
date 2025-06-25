import { NextResponse } from 'next/server';
import { catchServerRoute } from '@/libs/utils/catch.utils';
import { externalAPI } from '@/libs/interceptors/api-ext.interceptor';
import { withProtection } from '@/libs/utils/protection.utils';

export const dynamic = 'force-dynamic';

export const GET = withProtection(async (request, { params }) => {
  const { route } = await params;

  const pathname = '/' + route.join('/');
  const searchParams = request.nextUrl.searchParams.toString();
  const target = searchParams ? `${pathname}?${searchParams}` : pathname;

  try {
    const response = await externalAPI.get(target);
    return NextResponse.json(response.data);
  } catch (error) {
    const response = await catchServerRoute(error);
    return NextResponse.json(response, { status: response.status });
  }
});
