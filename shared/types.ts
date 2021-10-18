export type Image = {
    image: string;
};
export type CategoryType = {
    name: string;
    slug: string;
    uuid: string;
    category_images: Image[];
    created: string;
};

export type ProductColorType = {
    name: string;
    slug: string;
};

export type MobileVariantType = {
    name: string;
};
export type LaptopVariantType = {
    name: string;
};
export type TVVariantType = {
    display_size: string;
};
export type ACCapacityVariantType = {
    capacity: string;
};

export type ACStarVariantType = {
    star: string;
};

export type BookVariantType = {
    name: string;
};

export type FashionSizeVariantType = {
    name: string;
    code: string;
};
export type SubcategoryBaseType = {
    name: string;
    slug: string;
};
export type ProductBaseType = {
    uuid: string;
    subcategory: SubcategoryBaseType;
    name: string;
    slug: string;
    overall_rating: string;
};

export type ProductImage = {
    id: number;
    productId: number;
    url: string;
    isPrimary: boolean;
};

export type FeaturedProductType = {
    uuid: string;
    pid: string;
    product: ProductBaseType;
    retail_price: string;
    discount: number;
    price: string;
    color: ProductColorType;
    available_stock: number;
    mobile_variant: MobileVariantType | null;
    laptop_variant: LaptopVariantType | null;
    tv_variant: TVVariantType | null;
    ac_capacity_variant: ACCapacityVariantType | null;
    refrigerator_capacity: string;
    ac_star_variant: ACStarVariantType | null;
    book_variation: BookVariantType | null;
    juices_quantity: string;
    size: FashionSizeVariantType | null;
    images: ProductImage[];
};

type SubcategoryImage = {
    image: string;
};
type CouponsBaseType = {
    code: string;
    discount: number;
};
export type SubcategoryOfferType = {
    name: string;
    slug: string;
    uuid: string;
    subcategory_images: SubcategoryImage[];
    coupons: CouponsBaseType[];
};

export type ProductCategory = {
    id: number;
    name: string;
}

export type SubCategory = {
    id: number;
    name: string;
    categoryId: number;
}

export type Product = {
    id: number;
    code: string;
    name: string;
    unit: string;
    spec?: string;
    descriptions?: string;
    buyPrice: number;
    price: number;
    retailPrice: number;
    discount: number;
    stock: number;
    size: string;
    subCategoryId: number;
    userId: number;
    subCategory?: SubCategory;
    user?: User;
    images?: ProductImage[];
}

export enum Roles { ADMIN = "Admin", OWNER = "Owner", USER = "User", CUSTOMER = "Customer" }

export type UserAddress = {
    id: number;
    userId: number;
    street: string;
    city: string;
    region: string;
    state: string;
    phone: string;
    fbLink?: string;
    twLink?: string;
    accountNumber?: string;
}

export type User = {
    id: number;
    name: string;
    email: string;
    password: string;
    role: Roles;
    wall?: string;
    photo?: string;
    address?: UserAddress
}

export type UserLogin = {
    id: number;
    login: string;
    email: string;
    role: Roles;
    isLoggedIn?: boolean;
}

export const urlEndpoint = "https://ik.imagekit.io/aug9rawt76d";
export const publicKey = "public_h7AKSIK9E/AJTuuzm3QSmHJUBtY=";
export const authenticationEndpoint =
    process.env.NODE_ENV === "production"
        ? "https://downy.vercel.app/api/auth"
        : "http://localhost:3000/api/auth";

export interface FooterProps {
    title: string;
    currentUrl: string;
    keywords: string;
    description: string;
    imageUrl?: string;
    url?: string;
}
