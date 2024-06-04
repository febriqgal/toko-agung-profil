"use client";
import AppInput from "@/components/AppInput";
import { Poppins } from "next/font/google";
import Image from "next/image";
import { Search } from "react-huge-icons/outline";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});
export default function LandingPageSection() {
  return (
    <div
      className={`${poppins.className} bg-primary relative h-[512px] overflow-clip w-full justify-between flex flex-col  rounded-xl p-12`}
    >
      <div className="flex flex-col justify-between h-full">
        <h1 className="font-black text-7xl">
          Semuanya ada di sini,
          <br />
          Kecuali jodoh mu!
        </h1>
        <div className="flex gap-8">
          <div className="flex flex-col items-center justify-center">
            <h1 className="text-4xl font-bold">99+</h1>
            <h1 className="text-sm">Produk</h1>
          </div>
          <div className="flex flex-col items-center justify-center">
            <h1 className="text-4xl font-bold">999+</h1>
            <h1 className="text-sm">Pelanggan</h1>
          </div>
        </div>
        <AppInput
          size="lg"
          className="w-1/2"
          placeholder="Pencarian..."
          startContent={<Search />}
        />
      </div>

      <Image
        src={"./element1.svg"}
        alt="#"
        width={90}
        height={100}
        className="absolute right-8 top-8"
      />
      <Image
        src={"./element2.svg"}
        alt="#"
        width={200}
        height={100}
        className="absolute left-[600px] bottom-[100px]"
      />
      <div className="absolute h-[400px] w-[400px] overflow-clip  right-12 -bottom-12 rounded-t-full rounded-bl-full">
        <Image
          alt="#"
          className="object-cover w-full h-full"
          fill
          src={
            "https://images.unsplash.com/photo-1625722662233-297060231b85?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          }
        />
      </div>
    </div>
  );
}
