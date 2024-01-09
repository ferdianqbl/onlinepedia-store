import { getData, updateData } from "@/lib/firebase/services";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const res = await getData("users");
    const data = res.map((user: any) => {
      delete user.password;
      return user;
    });
    return NextResponse.json({ status: 1, data }, { status: 200 });
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

export async function PUT(req: NextRequest) {
  try {
    const { id, data } = await req.json();
    const res = await updateData({ collectionName: "users", id, data });
    return NextResponse.json({ status: 1, data: res }, { status: 200 });
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
