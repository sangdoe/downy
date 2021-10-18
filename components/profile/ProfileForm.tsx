import { NextPage } from "next";
import React, {
  ChangeEvent,
  createRef,
  FormEvent,
  useEffect,
  useState,
} from "react";
import { IKContext, IKImage, IKUpload } from "imagekitio-react";

import Input from "../common/inputs/Input";
import TextArea from "../common/inputs/TextArea";
import MainButton from "../common/buttons/MainButton";
import SecondaryButton from "../common/buttons/SecondaryButton";
import {
  authenticationEndpoint,
  publicKey,
  urlEndpoint,
  UserAddress,
  UserLogin,
  User,
} from "../../shared/types";
import useUserProfile from "../../lib/useUserProfile";
import WaitMe from "../WaitMe";

const ProfileMain: NextPage<{ user: UserLogin | undefined }> = ({ user }) => {
  const [address, setAddress] = useState<UserAddress>({
    id: 0,
    userId: user?.id || 0,
    street: "",
    city: "",
    region: "",
    state: "",
    phone: "",
    fbLink: "",
    twLink: "",
    accountNumber: "",
  });
  const [data, setData] = useState<User>({} as User);
  const {
    data: userData,
    isLoading,
    mutateUser,
  } = useUserProfile(user ? user.id : 0);

  useEffect(() => {
    let isLoaded = true;

    if (isLoaded) {
      if (userData) {
        setData(userData);
        userData?.address && setAddress(userData.address);
      }
    }

    return () => {
      isLoaded = false;
    };
  }, [userData]);

  if (isLoading) {
    return <WaitMe />;
  }

  const hanldeChange = (field: string, value: string | number) => {
    setData((o) => ({ ...o, [field]: value }));
  };

  const hanldeAddress = (field: string, value: string | number) => {
    setAddress((o) => ({ ...o, [field]: value }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
  };

  const ShowForm = () => {
    return (
      <form
        className="w-full max-w-2xl mx-auto p-4 md:p-14 bg-white space-y-8 rounded-lg shadow-drop-down"
        onSubmit={handleSubmit}
      >
        <Input
          type="text"
          label="NAME"
          value={data.name}
          onChange={(e) => hanldeChange("name", e.target.value)}
        />
        <Input
          type="email"
          label="EMAIL"
          value={data.email}
          onChange={(e) => hanldeChange("email", e.target.value)}
        />
        <div className="flex flex-col md:flex-row gap-4">
          <ShowImage
            imageType="photo"
            userId={data.id}
            file={data?.photo}
            size={{ width: 120, height: 200 }}
          />
          <ShowImage
            imageType="wall"
            userId={data.id}
            file={data?.wall}
            size={{ width: 640, height: 480 }}
          />
        </div>
        <TextArea
          label="ALAMAT"
          value={address.street || ""}
          onChange={(e) => hanldeAddress("street", e.target.value)}
        />
        <div className="flex flex-row gap-4">
          <div className="flex-1">
            <Input
              type="text"
              label="KOTA"
              value={address.city}
              onChange={(e) => hanldeAddress("city", e.target.value)}
            />
          </div>
          <div className="flex-1">
            <Input
              type="text"
              label="REGION"
              value={address.region}
              onChange={(e) => hanldeAddress("region", e.target.value)}
            />
          </div>
        </div>
        <div className="flex flex-row gap-4">
          <div className="flex-1">
            <Input
              type="text"
              label="STATE"
              value={address.state}
              onChange={(e) => hanldeAddress("state", e.target.value)}
            />
          </div>
          <div className="flex-1">
            <Input
              type="text"
              label="PHONE"
              value={address.phone}
              onChange={(e) => hanldeAddress("phone", e.target.value)}
            />
          </div>
        </div>
        <Input
          type="text"
          label="FACEBOOK"
          value={address.fbLink}
          onChange={(e) => hanldeAddress("fbLink", e.target.value)}
        />
        <Input
          type="text"
          label="TWITTER"
          value={address.twLink}
          onChange={(e) => hanldeAddress("twLink", e.target.value)}
        />

        <div className="flex space-x-12 px-12">
          <MainButton text="Send" fullWidth={true} />
          <SecondaryButton text="Cancel" fullWidth={true} />
        </div>
      </form>
    );
  };

  return <ShowForm />;
};

export type showImageParam = {
  imageType: string;
  userId: number;
  file: string | undefined;
  size: {
    width: number;
    height: number;
  };
};

function ShowImage({ imageType, userId, file, size }: showImageParam) {
  const fileInputRef = createRef<HTMLDivElement>();
  const [path, setPath] = useState<string>("");

  useEffect(() => {
    let isLoaded = true;

    if (isLoaded) {
      setPath(imageType);
    }

    return () => {
      isLoaded = false;
    };
  }, [imageType]);

  const uploadImage = async (file: string) => {
    const url = `/api/users/images/${userId}`;

    const fetchOptions = {
      method: "PUT",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
      body: JSON.stringify({
        path: path,
        data: file,
      }),
    };

    const res = await fetch(url, fetchOptions);
    const json = await res.json();

    if (res.status === 200) {
      return;
    } else {
      console.log("Photo tidak bisa diupload!");
    }
  };

  const onSelectImageError = (err: any) => {
    console.log("Error", err);
  };

  const onSelectImageSuccess = (res: any) => {
    console.log("SUCCESS:", res.filePath);
    //setImagePreview(res.filePath);
    uploadImage(res.filePath);
  };

  const selectImage = () => {
    const f = fileInputRef && fileInputRef.current;
    if (f) {
      const t = f.querySelector(`#file-upload-${path}`) as HTMLInputElement;
      t && t.click();
    }
  };

  return (
    <div ref={fileInputRef} className="w-1/3" key={`file-${path}`}>
      <IKContext
        publicKey={publicKey}
        urlEndpoint={urlEndpoint}
        transformationPosition="path"
        authenticationEndpoint={authenticationEndpoint}
      >
        <div className="mb-2">Image {path}:</div>
        <IKImage
          style={{
            cursor: "pointer",
            border: "1px solid teal",
            borderRadius: "0.3rem",
            padding: "0.1rem",
            margin: "-0.1rem",
            minHeight: "4rem",
          }}
          onClick={() => selectImage()}
          path={file}
          urlEndpoint={urlEndpoint}
          folder={"/user"}
          transformation={[
            {
              width: size.width,
              height: size.height,
            },
          ]}
        />
        <IKUpload
          id={`file-upload-${path}`}
          style={{ display: "none" }}
          isPrivateFile={false}
          folder={"/user"}
          fileName="user.jpg"
          onError={onSelectImageError}
          onSuccess={onSelectImageSuccess}
        />
      </IKContext>
    </div>
  );
}

export default ProfileMain;
