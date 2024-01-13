import { deleteData, getDataById, updateData } from "@/lib/firebase/services";
import { tokenVerify } from "@/lib/server";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    tokenVerify();
    const { id } = params;
    const res = await getDataById("users", id);
    const data = {
      ...res,
      password: undefined,
    };
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

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    tokenVerify();
    const { id } = params;
    const { data } = await req.json();

    if (data.image) {
      const { image } = data;
      console.log({ image });
    }

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

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    tokenVerify();
    const { id } = params;
    await deleteData("users", id);
    return NextResponse.json(
      { status: 1, message: "User deleted" },
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
