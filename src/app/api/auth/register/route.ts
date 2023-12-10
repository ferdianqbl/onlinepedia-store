import { signUp } from "@/lib/firebase/auth";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    const res = await signUp(data);

    if (!res.status) throw new Error(res.message);

    return NextResponse.json(
      { status: 1, message: res.message },
      { status: 200 }
    );
  } catch (error: any) {
    if (error instanceof Error)
      return NextResponse.json(
        { status: 0, message: error.message },
        { status: 500 }
      );
    else
      return NextResponse.json(
        { status: 0, message: error.message },
        { status: 400 }
      );
  }
}
