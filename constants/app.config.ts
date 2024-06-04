export const AppConfig = {
  title: "Toko Agung Profil",
  desc: "Membangun Impian, Satu Material Berkualitas pada Waktu yang Tepat!",
  apiUrl: "http://localhost:3000/api",
};

export const formatRupiah = (price: number) =>
  new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
  })
    .format(price)
    .replace(/(\.|,)00$/g, "");
