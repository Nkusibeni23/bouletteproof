import { NextResponse } from "next/server";

export async function GET() {
  try {
    const response = await fetch(
      "https://api.mockaroo.com/api/0e258130?count=100&key=9b210390"
    );
    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to fetch data" },
      { status: 500 }
    );
  }
}
