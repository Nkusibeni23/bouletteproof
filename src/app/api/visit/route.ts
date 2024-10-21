import { NextResponse } from "next/server";

export async function GET() {
  try {
    const response = await fetch(
      "https://api.mockaroo.com/api/28f5dc90?count=100&key=9b210390"
    );
    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error(error);

    // Safely handle the error by checking if it's an instance of Error
    const errorMessage =
      error instanceof Error ? error.message : "An unknown error occurred";

    return NextResponse.json(
      { message: `Failed to fetch data: ${errorMessage}` },
      { status: 500 }
    );
  }
}
