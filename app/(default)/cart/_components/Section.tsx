/* eslint-disable @next/next/no-img-element */
"use client";

import { useSession } from "next-auth/react";
import { SyntheticEvent, useState } from "react";
import toast from "react-hot-toast";
import { formatRupiah } from "@/constants/app.config";
import {
  Button,
  Checkbox,
  CheckboxGroup,
  CircularProgress,
  cn,
  Skeleton,
} from "@nextui-org/react";
import { dataOngkir } from "../data/ongkir";
import FormCheckout from "./FormCheckout";
import {
  useGetCartByUserIdQuery,
  useUpdateCartMutation,
} from "@/redux/feature/cartSlice";
import { useGetUserByIdQuery } from "@/redux/feature/usersSlice";
import { CartWithProduct } from "@/types/cart.type";

export default function SectionCart() {
  const [ongkir, setOngkir]: any = useState(0);
  const [groupSelected, setGroupSelected]: any = useState([]);
  const { data: session } = useSession();
  const [total, setTotal] = useState([0]);
  const [updateCart] = useUpdateCartMutation();
  const { data: dataUser, isLoading: isLoadingUser } = useGetUserByIdQuery(
    session?.user.id
  );
  const { data: dataCart, isLoading: isLoadingCart } = useGetCartByUserIdQuery(
    session?.user.id
  );
  const handleNewOrders = async (e: SyntheticEvent) => {
    e.preventDefault();
    await groupSelected.map(async (e: string) => {
      await updateCart({ id: e, isHidden: true });
    });
    if (
      groupSelected === undefined ||
      groupSelected.length === 0 ||
      groupSelected === null
    ) {
      return toast.error("Pilih produk terlebih dahulu");
    } else {
      toast.success("Berhasil checkout, silahkan lakukan pembayaran");
      setGroupSelected([]);
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold">Keranjang 🛒</h1>
      <div className="flex justify-between w-full">
        <div className="space-y-4">
          <h1>Silahkan Pilih produk yang mau di checkout</h1>
          {isLoadingCart && isLoadingUser ? (
            <div className="space-y-2">
              {...Array(3)
                .fill(0)
                .map((_, i) => (
                  <Skeleton
                    key={i}
                    className="w-[571px] h-[114px] rounded-xl"
                  />
                ))}
            </div>
          ) : (
            <CheckboxGroup
              value={groupSelected}
              onChange={setGroupSelected}
              classNames={{
                base: "w-full",
              }}
              className="w-full"
            >
              {dataCart.data.map((e: CartWithProduct) => {
                return (
                  <Checkbox
                    key={e.id}
                    value={e.id}
                    onValueChange={(event) => {
                      if (event) {
                        setTotal([...total, e.total]);
                      } else {
                        total.splice(total.indexOf(e.total), 1);
                        setTotal([...total]);
                      }
                    }}
                    color="primary"
                    className="w-full"
                    classNames={{
                      base: cn(
                        "inline-flex  w-full bg-content1 m-0",
                        "hover:bg-content2 items-center justify-start",
                        "cursor-pointer rounded-lg gap-2 p-4 border-2 border-transparent",
                        "data-[selected=true]:border-primary"
                      ),
                    }}
                  >
                    <div className="flex justify-between overflow-clip w-[500px] gap-4 items-center">
                      <div className="flex items-center justify-center gap-4 overflow-clip">
                        <img
                          src={`https://images.unsplash.com/photo-1715638427009-8b0fe7096838?q=80&w=1471&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D`}
                          alt="#"
                          className="object-scale-down h-20 aspect-video rounded-xl"
                        />
                        <div className="flex flex-col gap-4">
                          <div>
                            <h1 className="text-sm font-bold line-clamp-1">
                              {e.products.title}
                            </h1>
                            <h1 className="text-xs line-clamp-1">
                              catatan: {e.note}
                            </h1>
                          </div>
                          <div>
                            <h1 className="text-sm line-clamp-1">
                              Dibeli: {e.quantity}
                            </h1>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center justify-center gap-2">
                        <h1 className="text-sm">{formatRupiah(e.total)}</h1>
                        <Button
                          onPress={() =>
                            updateCart({ id: e.id, isHidden: true })
                          }
                          size="sm"
                          color="primary"
                        >
                          Hapus
                        </Button>
                      </div>
                    </div>
                  </Checkbox>
                );
              })}
            </CheckboxGroup>
          )}
        </div>
        <FormCheckout
          isLoading={isLoadingCart && isLoadingUser}
          dataOngkir={dataOngkir}
          ongkir={ongkir}
          setOngkir={setOngkir}
          total={total}
          dataUser={dataUser}
          handleNewOrders={handleNewOrders}
        />
      </div>
    </div>
  );
}
