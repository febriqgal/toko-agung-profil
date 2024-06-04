"use client";

import {
  CircularProgress,
  Input,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  Tooltip,
} from "@nextui-org/react";
import { Product } from "@prisma/client";
import Link from "next/link";
import { useState } from "react";
import { Edit, Eye, Search, Trash } from "react-huge-icons/outline";
import AddProductModal from "./_components/AddProductModal";
import { formatRupiah } from "@/constants/app.config";
import {
  useDeleteProductMutation,
  useGetProductsQuery,
} from "@/redux/feature/productsSlice";

export default function KelolaProductPage() {
  const { data: dataProduct, isLoading } = useGetProductsQuery({});
  const [deleteProduct] = useDeleteProductMutation();
  const [search, setSearch] = useState("");

  if (isLoading) return <CircularProgress className="h-screen m-auto" />;

  const dataFilter = dataProduct.data.filter((item: Product) => {
    if (search.length >= 3)
      return item.title.toLowerCase().includes(search.toLowerCase());
    return dataProduct;
  });

  return (
    <div className="p-4 space-y-4">
      <div className="flex justify-between">
        <AddProductModal />
        <Input
          isClearable
          startContent={<Search />}
          onClear={() => setSearch("")}
          placeholder="Cari..."
          className="w-1/3"
          onChange={(e) => {
            setSearch(e.target.value);
          }}
          variant="flat"
          color="primary"
        />
      </div>
      <Table
        isStriped={true}
        aria-label="Example static collection table"
        shadow="lg"
        color="primary"
        layout="auto"
        fullWidth
      >
        <TableHeader>
          <TableColumn width={1}>No.</TableColumn>
          <TableColumn>Nama Produk</TableColumn>
          <TableColumn>Deskripsi</TableColumn>
          <TableColumn width={1}>Harga</TableColumn>
          <TableColumn width={1} className="text-center">
            Stok
          </TableColumn>
          <TableColumn width={1} className="text-center">
            Diskon
          </TableColumn>
          <TableColumn width={1}>Terjual</TableColumn>
          <TableColumn width={1}>
            <h1></h1>
          </TableColumn>
        </TableHeader>
        <TableBody
          isLoading={isLoading}
          loadingContent={<CircularProgress />}
          emptyContent={<p>Data Tidak Ditemukan</p>}
        >
          {dataFilter.map((item: Product, index: number) => (
            <TableRow key={item.id}>
              <TableCell>{index + 1}.</TableCell>
              <TableCell>{item.title}</TableCell>
              <TableCell>{item.desc}</TableCell>
              <TableCell className="text-start">
                {item.discount > 0 && (
                  <h1 className="text-xs line-through">
                    {formatRupiah(item.price)}
                  </h1>
                )}
                <h1 className="font-bold">
                  {formatRupiah(
                    item.price - (item.price * item.discount) / 100
                  )}
                </h1>
              </TableCell>
              <TableCell className="text-center">{item.stock}</TableCell>
              <TableCell className="text-center">{item.discount}%</TableCell>
              <TableCell className="text-center">{item.sold}</TableCell>
              <TableCell>
                <div className="flex items-center justify-center h-full gap-3">
                  <Tooltip content="Lihat">
                    <Link
                      href={"/product/" + item.id}
                      className="text-lg cursor-pointer"
                    >
                      <Eye />
                    </Link>
                  </Tooltip>
                  <Tooltip content="Edit">
                    <span className="text-lg cursor-pointer">
                      <Edit />
                    </span>
                  </Tooltip>
                  <Tooltip color="danger" content="Hapus">
                    <span
                      onClick={() => deleteProduct(item.id)}
                      className="text-lg cursor-pointer text-danger"
                    >
                      <Trash />
                    </span>
                  </Tooltip>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
