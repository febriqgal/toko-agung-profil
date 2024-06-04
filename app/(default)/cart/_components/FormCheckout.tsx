import { formatRupiah } from "@/constants/app.config";
import { Button, Select, SelectItem, Skeleton } from "@nextui-org/react";
import { User } from "@prisma/client";
import Link from "next/link";
import { FormEventHandler } from "react";
import { Location } from "react-huge-icons/outline";
import StickyBox from "react-sticky-box";
import { motion } from "framer-motion";
export default function FormCheckout({
  handleNewOrders,
  ongkir,
  setOngkir,
  dataOngkir,
  dataUser,
  total,
  isLoading,
}: {
  handleNewOrders: FormEventHandler<HTMLFormElement>;
  ongkir: any;
  setOngkir: any;
  dataOngkir: {
    tipe: string;
    value: number;
  }[];
  dataUser: {
    data: User;
  };
  total: number[];
  isLoading: boolean;
}) {
  return (
    <form onSubmit={handleNewOrders}>
      <StickyBox
        offsetTop={104}
        offsetBottom={20}
        className="flex gap-5 p-10  h-fit  left-0 w-[500px] shadow-xl justify-center items-center flex-col  border rounded-xl"
      >
        <div className="flex flex-col items-center justify-center w-full gap-4 h-fit">
          <Select
            color="primary"
            isLoading={isLoading}
            value={ongkir}
            onSelectionChange={setOngkir}
            label="Pengiriman"
            placeholder="Pilih Pengiriman"
            isRequired
          >
            {dataOngkir.map((e: any) => {
              return (
                <SelectItem
                  color="primary"
                  key={e.value}
                  value={e.value}
                  className="w-full"
                >
                  {e.tipe}
                </SelectItem>
              );
            })}
          </Select>
          <div className="flex w-full items-center gap-4 justify-between">
            {isLoading ? (
              <Skeleton className="w-full h-5 rounded-xl" />
            ) : (
              <div className="flex items-center gap-2 w-full">
                <Location className="w-5 h-5" />
                <div title={dataUser?.data?.address} className="w-full">
                  <h1 className="line-clamp-1">{dataUser?.data?.address}</h1>
                </div>
              </div>
            )}
            <Button
              size="sm"
              className="px-4"
              isLoading={isLoading}
              as={Link}
              href="/user/kelola-akun"
            >
              Edit Alamat
            </Button>
          </div>
          <div className="w-full">
            <h1 className="mb-4 font-bold text-center">Subtotal</h1>
            <div className="flex justify-between w-full">
              <h1>Ongkir</h1>
              <h1>{formatRupiah(ongkir.anchorKey ?? 0)}</h1>
            </div>
            <div className="flex justify-between w-full">
              <h1>Produk</h1>
              <h1>{formatRupiah(total.reduce((a: any, b: any) => a + b))}</h1>
            </div>
            <div className="flex justify-between w-full">
              <h1>Total</h1>
              <h1 className="">
                {formatRupiah(
                  Number(total.reduce((a: any, b: any) => a + b)) +
                    Number(ongkir.anchorKey ?? 0)
                )}
              </h1>
            </div>
          </div>
        </div>
        <Button isLoading={isLoading} fullWidth type="submit" color="primary">
          Checkout
        </Button>
      </StickyBox>
    </form>
  );
}
