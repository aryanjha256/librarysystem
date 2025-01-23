import { NextRequest, NextResponse } from "next/server";
// import jwt from "jsonwebtoken";
import { JWT_SECRET } from "@/const";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("library-system-token");

  if (!token || !JWT_SECRET) {
    return NextResponse.redirect(new URL("/auth", req.url));
  }

  // try {
  //   jwt.verify(token.value, JWT_SECRET);
  // } catch (err) {
  //   console.log(err);
  //   return NextResponse.redirect(new URL("/auth", req.url));
  // }

  return NextResponse.next();
}

export const config = {
  matcher: ["/my-books", "/my-books"],
};
