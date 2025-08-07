import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

/*
  Placeholder Twitter OAuth endpoints.
  NOTE: Real Twitter/X OAuth 2.0 flow requires:
    1. Redirect user to https://twitter.com/i/oauth2/authorize with client_id, redirect_uri, scope (tweet.read tweet.write users.read offline.access), state, code_challenge, code_challenge_method
    2. Handle callback exchanging code -> access_token via POST https://api.twitter.com/2/oauth2/token
    3. Store access_token (+ refresh_token if provided)

  For now we stub persistence to allow UI wiring.
*/

export const POST = async (req: NextRequest) => {
  try {
    const body = await req.json();
    const { brandContextId, mockHandle } = body;
    if (!brandContextId) {
      return NextResponse.json({ message: 'brandContextId required' }, { status: 400 });
    }

    // Simulate created/connected account
    const account = await prisma.socialAccount.create({
      data: {
        provider: 'twitter',
        providerAccountId: 'mock-user-id',
        handle: mockHandle || '@mock_handle',
        displayName: mockHandle || 'Mock Twitter User',
        accessToken: 'mock-access-token',
        brandContextId,
        scopes: 'tweet.read tweet.write users.read offline.access'
      }
    });

    return NextResponse.json({ data: account, status: 200 });
  } catch (e:any) {
    return NextResponse.json({ message: 'Failed to connect twitter', error: e.message }, { status: 500 });
  }
};
