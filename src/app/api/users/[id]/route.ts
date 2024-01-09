import { deleteData } from "@/lib/firebase/services";
import { NextRequest, NextResponse } from "next/server";
export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
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
