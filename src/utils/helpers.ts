import { NextResponse } from "next/server";

export const jsonResponse = (data:string) => {
  return NextResponse.json(
    {
      data,
      status: 200,
    },
    {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
};
export const jsonResponseError = (status: number) => {
  return NextResponse.json(
    {
      message: "Failed to create task",
      status: status,
    },
    {
      status: status,
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
};