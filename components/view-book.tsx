import React from "react";
import { Button } from "@/components/ui/button";
import {
  DialogHeader,
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Eye } from "lucide-react";
import { Book } from "@/app/(authenticated)/all-books/page";

const ViewBook = ({ book }: { book: Book }) => {
  const convertToPdfUrl = (array: { [key: number]: number }) => {
    const uint8Array = new Uint8Array(Object.values(array)); // Convert object to Uint8Array
    const blob = new Blob([uint8Array], { type: "application/pdf" });
    return URL.createObjectURL(blob); // Generate the Object URL
  };

  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline" onClick={() => {}}>
            <Eye className="h-6 w-6 cursor-pointer" />
          </Button>
        </DialogTrigger>
        <DialogContent
          className="mx-auto max-w-[800px]"
          aria-description="Create New User"
        >
          <DialogHeader>
            <DialogTitle>
              {book.title} [{book.genre}]
            </DialogTitle>
            <DialogDescription>{book.author}</DialogDescription>
          </DialogHeader>
          <iframe
            src={convertToPdfUrl(book.data)}
            width="100%"
            height="100%"
            className="flex-grow h-[70vh] w-full overflow-hidden p-0 m-0 border-none"
            title={book.title}
            allow="fullscreen"
          />
          <DialogFooter>{book.description}</DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ViewBook;
