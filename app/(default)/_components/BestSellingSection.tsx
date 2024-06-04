import { Button } from "@nextui-org/react";
import Image from "next/image";
import { ArrowRight } from "react-huge-icons/bulk";

export default function BestSellingSection() {
  return (
    <div className="flex w-full justify-between h-[436px]">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold">Best Selling</h1>
        <Button variant="shadow" endContent={<ArrowRight />} color="primary">
          See more
        </Button>
      </div>
      <div className="relative bg-primary w-[340px] rounded-xl">
        <Image
          src="https://images.unsplash.com/photo-1599481238640-4c1288750d7a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2664&q=80"
          alt=""
          fill
          className="object-cover w-full h-full rounded-xl"
        />
        <div className="text-3xl p-4 font-bold absolute bottom-0 backdrop-blur-lg bg-transparent">
          <h1>Samsung A7 2018</h1>
          <h1>asdkasldas asddas</h1>
        </div>
      </div>
      <div className="bg-primary w-[340px] rounded-xl"></div>
      <div className="bg-primary w-[340px] rounded-xl"></div>
    </div>
  );
}
