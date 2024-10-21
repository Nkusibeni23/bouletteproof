import { NextResponse } from "next/server";

export async function GET() {
  try {
    const response = await fetch(
      `https://api.mockaroo.com/api/28f5dc90?count=100&key=${process.env.NEXT_PUBLIC_MOCKAROO_API_KEY}`
    );
    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error(error);

    // Check if the error is an instance of Error and handle accordingly
    const errorMessage =
      error instanceof Error ? error.message : "An unknown error occurred";

    return NextResponse.json(
      { message: `Failed to fetch data: ${errorMessage}` },
      { status: 500 }
    );
  }
}
