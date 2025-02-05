"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  DialogHeader,
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useUserStore } from "@/hooks/store/use-store";

const AddNewBook = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [description, setDescription] = useState("");
  const [genre, setGenre] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [data, setData] = useState<File | null>(null);

  const { toast } = useToast();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const user = useUserStore((state: any) => state.user);

  const addNewBook = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!image || !data) {
      toast({
        title: "Please upload image and data",
        description: "Please try again",
        variant: "destructive",
      });
      return;
    }
    const formData = new FormData();
    formData.append("title", title);
    formData.append("author", author);
    formData.append("description", description);
    formData.append("genre", genre);
    formData.append("image", image);
    formData.append("data", data);
    const res = await fetch("/api/book", {
      method: "POST",
      body: formData,
    });

    if (res.ok) {
      toast({
        title: "Book Added Successfully",
      });
    } else {
      toast({
        title: "Error adding book",
        description: "Please try again",
        variant: "destructive",
      });
    }
  };
  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          {user?.role === "ADMIN" && <Button>Add New Book</Button>}
        </DialogTrigger>
        <DialogContent
          className="sm:max-w-[425px]"
          aria-description="Add New Book"
        >
          <DialogHeader>
            <DialogTitle>Add New Book</DialogTitle>
            <DialogDescription className="hidden">
              Let&apos;s Add a New Book
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={addNewBook}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  type="text"
                  placeholder="Book Title"
                  required
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="author">Author</Label>
                <Input
                  id="author"
                  type="text"
                  placeholder="Author Name"
                  required
                  onChange={(e) => setAuthor(e.target.value)}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="description">Description</Label>
                <Input
                  id="description"
                  type="text"
                  placeholder="Book Description"
                  required
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="genre">Genre</Label>
                <Input
                  id="genre"
                  type="text"
                  placeholder="Book Genre"
                  required
                  onChange={(e) => setGenre(e.target.value)}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="image">Image</Label>
                <Input
                  id="image"
                  type="file"
                  accept="image/*"
                  placeholder="Book Image"
                  required
                  onChange={(e) => setImage(e.target.files?.[0] || null)}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="data">Data</Label>
                <Input
                  id="data"
                  type="file"
                  accept="application/pdf"
                  placeholder="Book Data"
                  required
                  onChange={(e) => setData(e.target.files?.[0] || null)}
                />
              </div>
              <Button type="submit" className="w-full">
                Add New Book
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AddNewBook;
