import { NextPage } from "next";
import React, { useState } from "react";
import { IKContext, IKImage, IKUpload } from "imagekitio-react";
import {
  authenticationEndpoint,
  ProductImage,
  publicKey,
  urlEndpoint,
} from "../../shared/types";

export const ShowImages: NextPage<{
  images: ProductImage[];
  productId: number;
}> = ({ images: data, productId }) => {
  const [images, setImages] = useState<ProductImage[]>([]);
  const [selectedImage, setSelectedImage] = useState<ProductImage>(
    {} as ProductImage
  );

  //console.log(authenticationEndpoint);

  React.useEffect(() => {
    let isLoaded = true;
    if (isLoaded) {
      setImages(data);
    }
    return () => {
      isLoaded = true;
    };
  }, [data]);

  const uploadImage = async (id: number, file: string) => {
    //console.log('------', id, file)
    const img = { ...selectedImage, url: file };
    const url = `/api/products/images/${id}`;

    const fetchOptions = {
      method: id === 0 ? "POST" : "PUT",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
      body: JSON.stringify({
        image: img,
      }),
    };

    //console.log({ ...selectedImage, url: file });

    const res = await fetch(url, fetchOptions);
    const json = await res.json();

    if (res.status === 200) {
      if (id === 0) {
        setImages((o) => [...o, { ...img, id: json }]);
      } else {
        const temp = [...images];
        for (let c = 0; c < temp.length; c++) {
          if (temp[c].id === id) {
            temp.splice(c, 1, json);
            setImages(temp);
            break;
          }
        }
      }
      //setOpen(false);
      // mutateEmployee(employees, true);
    } else {
      console.log("Photo tidak bisa diupload!");
    }
  };

  return (
    <div className="flex flex-auto flex-wrap gap-2">
      {[
        ...images,
        { id: 0, productId: productId, url: "", isPrimary: false },
      ].map((x) => (
        <ImageSpace
          key={`img-${x.productId}-${x.id}`}
          x={x}
          uploadImage={uploadImage}
          setSelectedImage={setSelectedImage}
        />
      ))}
    </div>
  );
};
type ImageSpace = {
  x: ProductImage;
  uploadImage: (id: number, file: string) => Promise<void>;
  setSelectedImage: React.Dispatch<React.SetStateAction<ProductImage>>;
};

function ImageSpace({
  x,
  uploadImage,
  setSelectedImage,
}: ImageSpace): JSX.Element {
  const fileInputRef = React.createRef<HTMLDivElement>();

  const onSelectImageError = (err: any) => {
    console.log("Error", err);
  };

  const onSelectImageSuccess = (res: any) => {
    console.log("SUCCESS:", res.filePath);
    //setImagePreview(res.filePath);
    uploadImage(x.id, res.filePath);
  };

  const selectImage = (image: ProductImage) => {
    setSelectedImage(image);
    const f = fileInputRef && fileInputRef.current;
    //console.log(f);
    if (f) {
      const t = f?.querySelector(
        `#file-upload-${image.id}`
      ) as HTMLInputElement;
      t && t.click();
    }
  };

  return (
    <div
      ref={fileInputRef}
      key={`file-${x.productId}-${x.id}`}
      className="w-1/3"
    >
      <IKContext
        publicKey={publicKey}
        urlEndpoint={urlEndpoint}
        transformationPosition="path"
        authenticationEndpoint={authenticationEndpoint}
      >
        <IKImage
          style={{
            cursor: "pointer",
            border: "1px solid teal",
            borderRadius: "0.3rem",
            padding: "0.1rem",
            margin: "-0.1rem",
            height: "4rem",
          }}
          onClick={() => selectImage(x)}
          path={x.url}
          urlEndpoint={urlEndpoint}
          folder={"/product"}
          transformation={[
            {
              width: "140",
              height: "191",
            },
          ]}
        />
        <IKUpload
          id={`file-upload-${x.id}`}
          style={{ display: "none" }}
          isPrivateFile={false}
          folder={"/product"}
          fileName="product.jpg"
          onError={onSelectImageError}
          onSuccess={onSelectImageSuccess}
        />
      </IKContext>
    </div>
  );
}
