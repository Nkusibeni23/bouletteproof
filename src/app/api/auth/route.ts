import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    // For now, i've to mock authentication. In real scenarios, you'd validate credentials here.
    if (email === "test@gmail.com" && password === "test1234") {
      return NextResponse.json({ message: "Login successful!" });
    } else {
      return NextResponse.json(
        { message: "Invalid email or password." },
        { status: 401 }
      );
    }
  } catch (error) {
    return NextResponse.json(
      { message: "An error occurred. Please try again." },
      { status: 500 }
    );
  }
}
