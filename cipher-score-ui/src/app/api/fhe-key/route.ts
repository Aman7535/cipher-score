import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    publicKey: "0x" + "11".repeat(64) // valid mock key
  });
}
