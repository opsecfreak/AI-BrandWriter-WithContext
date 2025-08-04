import { NextRequest, NextResponse } from "next/server";

export const GET = async () => {
  return NextResponse.json({
    message: "API route is working!",
    timestamp: new Date().toISOString(),
    status: 200
  }, { status: 200 });
};

export const POST = async (request: NextRequest) => {
  try {
    const body = await request.json();
    return NextResponse.json({
      message: "POST endpoint is working!",
      receivedData: body,
      timestamp: new Date().toISOString(),
      status: 200
    }, { status: 200 });
  } catch (error) {
    return NextResponse.json({
      message: "Error parsing request body",
      error: error instanceof Error ? error.message : "Unknown error",
      status: 400
    }, { status: 400 });
  }
};
