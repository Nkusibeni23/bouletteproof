import { NextResponse } from "next/server";

// Handle POST request for user authentication
export async function POST(req: Request) {
  try {
    // Parse the JSON body of the request
    const { email, password } = await req.json();

    // Mock authentication
    if (email === "test@gmail.com" && password === "test1234") {
      return NextResponse.json({ message: "Login successful!" });
    } else {
      return NextResponse.json(
        { message: "Invalid email or password." },
        { status: 401 }
      );
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "An error occurred. Please try again." },
      { status: 500 }
    );
  }
}
