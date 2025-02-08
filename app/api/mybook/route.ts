import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET() {
  const books = await prisma.user.findUnique({
    where: {
      id: "679f6100ef4354f33c49d640",
    },
    include: {
      userBooks: {
        include: {
          book: true,
        },
      },
    },
  });

  return NextResponse.json(
    books?.userBooks.map((book) => book.book),
    {
      status: 200,
    }
  );
}

export async function DELETE(request: Request) {
  const { id } = await request.json();

  const books = await prisma.userBook.delete({
    where: {
      userId_bookId: {
        userId: "679f6100ef4354f33c49d640",
        bookId: id,
      },
    },
  });
  return NextResponse.json(books, { status: 200 });
}
