/* eslint-disable @next/next/no-img-element */
"use client";
import "@smastrom/react-rating/style.css";
import { AppConfig, formatRupiah } from "@/constants/app.config";

import {
  Button,
  CircularProgress,
  Input,
  Skeleton,
  Textarea,
} from "@nextui-org/react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { SyntheticEvent, useEffect, useState } from "react";
import toast from "react-hot-toast";
import StickyBox from "react-sticky-box";
import { usePostCartMutation } from "@/redux/feature/cartSlice";
import { useGetProductByIdQuery } from "@/redux/feature/productsSlice";

export default function ProductPage({ params }: { params: { id: string } }) {
  const { data: session, status } = useSession();
  const [note, setNote] = useState("");
  const [price, setPrice] = useState(0);
  const [count, setCounter] = useState(1);
  const { data, isLoading } = useGetProductByIdQuery(params.id);
  const [postOrder] = usePostCartMutation();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setPrice(data?.data.price - (data?.data.price * data?.data.discount) / 100);
  }, [data?.data.price, data?.data.discount]);

  if (isLoading && status === "loading")
    return (
      <div className="flex items-start justify-center h-screen">
        <CircularProgress />
      </div>
    );

  const handleCart = async (e: SyntheticEvent) => {
    setLoading(true);
    e.preventDefault();

    if (!session) {
      toast.error("Silahkan login terlebih dahulu");
      setLoading(false);
      return;
    }
    await postOrder({
      note: note,
      userId: session.user.id!,
      quantity: count,
      total: price,
      productId: data?.data.id,
    });
    setLoading(false);
    toast.success("Berhasil, produk ditambahkan ke keranjang");
  };
  return (
    <div className="flex flex-col items-center justify-center h-screen -mt-12 rounded-b-full ">
      <div className="flex w-full px-20 rounded-3xl">
        <div className="flex flex-row gap-5 ">
          <div className="grid w-full grid-cols-2 gap-5">
            <div className="flex items-center justify-center w-full h-full bg-primary-900 rounded-xl overflow-clip">
              <img
                className="object-fill"
                src={`https://plus.unsplash.com/premium_photo-1675106697431-24865f576e2d?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D`}
                alt="#"
              />
            </div>
            <div className="flex items-center">
              <div className="">
                <h1 className="text-3xl font-extrabold tracking-tight">
                  {data?.data.title}
                </h1>
                <h1 className="">{`Tersisa ${data?.data.stock}`}</h1>
                <div className="mt-3">
                  <div className="text-3xl font-bold">
                    {formatRupiah(
                      Number(data?.data.price) -
                        (Number(data?.data.price) *
                          Number(data?.data.discount)) /
                          100
                    )}
                  </div>
                </div>
                <div className="mt-3">
                  <div>
                    <h1>{data?.data.desc}</h1>
                  </div>
                </div>
                <div className="mt-6"></div>
              </div>
            </div>
          </div>

          <StickyBox
            offsetTop={120}
            offsetBottom={20}
            className="flex gap-5 bg-white h-fit w-[300px] shadow-xl p-5 items-center flex-col   border rounded-xl"
          >
            <h1>Atur jumlah pembelian</h1>
            <Input
              fullWidth
              variant="bordered"
              color="primary"
              startContent={
                <Button
                  onPress={() => {
                    count <= 1 ? null : setCounter(count - 1);
                    count <= 1
                      ? 0
                      : setPrice(
                          Number(price) -
                            Number(
                              data?.data.price -
                                (data?.data.price * data?.data.discount) / 100
                            )
                        );
                  }}
                  color="primary"
                  variant="light"
                  size="sm"
                >
                  -
                </Button>
              }
              endContent={
                <Button
                  onPress={async () => {
                    if (count >= data?.data.stock) {
                      return toast.error("Stok hanya sisa " + data?.data.stock);
                    }
                    setCounter(count + 1);
                    setPrice(
                      Number(price) +
                        Number(
                          data?.data.price -
                            (data?.data.price * data?.data.discount) / 100
                        )
                    );
                  }}
                  color="primary"
                  size="sm"
                  variant="light"
                >
                  +
                </Button>
              }
              style={{ textAlign: "center" }}
              value={String(count)}
            />
            <div className="flex justify-between w-full">
              <h1>Subtotal:</h1>
              {isLoading ? (
                <Skeleton className="w-20 h-5 rounded-xl" />
              ) : (
                <h1>{formatRupiah(Number(price.toFixed(0)))}</h1>
              )}
            </div>
            <form onSubmit={handleCart} className="flex flex-col gap-3">
              <Textarea
                name="note"
                type="text"
                title="exp: warna, ukuran, dll yang diinginkan"
                size="sm"
                label="Catatan"
                placeholder="exp: warna, ukuran, dll. yang diinginkan"
                fullWidth
                color="primary"
                isRequired
                onChange={(e) => {
                  setNote(e.target.value);
                }}
              />
              <Button
                type="submit"
                size="sm"
                isLoading={loading}
                fullWidth
                color="primary"
              >
                Tambah ke keranjang
              </Button>
              {!session ? (
                <Button
                  startContent={<>💬</>}
                  size="sm"
                  onPress={() => {
                    toast.error("Silahkan login terlebih dahulu");
                  }}
                  fullWidth
                  color="primary"
                >
                  Hubungi Toko
                </Button>
              ) : (
                <Button
                  startContent={<>💬</>}
                  size="sm"
                  as={Link}
                  target="_blank"
                  href={`https://web.whatsapp.com/send?phone=${AppConfig}&text=Halo%20Saya%20tertarik%20dengan%20Produk%20*${data?.data.title}*,%20apakah%20barang%20ini%20ready?&app_absent=0`}
                  fullWidth
                  color="primary"
                >
                  Hubungi Toko
                </Button>
              )}
            </form>
          </StickyBox>
        </div>
      </div>
    </div>
  );
}
