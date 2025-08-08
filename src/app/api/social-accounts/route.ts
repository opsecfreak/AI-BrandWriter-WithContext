import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export const GET = async () => {
  try {
    const accounts = await prisma.socialAccount.findMany({ orderBy: { createdAt: 'desc' } });
    return NextResponse.json({ data: accounts, status: 200 });
  } catch (e:any) {
    return NextResponse.json({ message: 'Failed to list accounts', error: e.message }, { status: 500 });
  }
};

export const DELETE = async (req: NextRequest) => {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    if (!id) return NextResponse.json({ message: 'id required' }, { status: 400 });
    await prisma.socialAccount.delete({ where: { id } });
    return NextResponse.json({ status: 200, message: 'Deleted' });
  } catch (e:any) {
    return NextResponse.json({ message: 'Failed to delete account', error: e.message }, { status: 500 });
  }
};
