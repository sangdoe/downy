import TVImage from "../../../public/TV.jpg";

type TodaysDealT = {
    name: string;
    mrp: number;
    off: string;
    price: number;
    offer_ends: Date;
    //image: StaticImageData;
    image: string;
};

const price = 250000;
export const todaysDeal: TodaysDealT = {
    name: "Pohon Buah Tin (Merah Jingga)",
    mrp: price,
    off: "25% off",
    price: price - (price * (25 / 100)),
    offer_ends: new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate() + 1),
    image: "/buah-tin_Yl79MMmn5.jfif?updatedAt=1633427390656",
};
