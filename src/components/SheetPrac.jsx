import React from "react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Menu } from "lucide-react";
const SheetPrac = () => {
  return (
    <div>
      <div className="flex justify-around w-full ">
        <Sheet>
          <SheetTrigger asChild>
            <Menu />
          </SheetTrigger>
          <SheetContent className="bg-green-300">
            <h1 className="mt-10">we are there</h1>
          </SheetContent>
          <div className="flex gap-2">
            <h2>here we are</h2>
            <h2>here we are</h2>
            <h2>here we are</h2>
            <h2>here we are</h2>
          </div>
        </Sheet>
      </div>
    </div>
  );
};

export default SheetPrac;
