import { NextPage } from "next";
import router from "next/router";
import { MouseEventHandler } from "react";
import {
  EmailShareButton,
  FacebookShareButton,
  LinkedinShareButton,
  TelegramShareButton,
  TwitterShareButton,
  WhatsappShareButton,
} from "react-share";
import { FooterProps } from "../../../shared/types";

const Social: NextPage<FooterProps> = ({
  title,
  currentUrl,
  keywords,
  description,
}) => {
  // const socialData = [
  //   {
  //     icon: "fab fa-linkedin",
  //     href: "#",
  //   },
  //   {
  //     icon: "fab fa-instagram",
  //     href: "#",
  //   },
  //   {
  //     icon: "fab fa-github",
  //     href: "https://github.com/gmrzone",
  //   },
  //   {
  //     icon: "fab fa-twitter",
  //     href: "#",
  //   },
  //   {
  //     icon: "fab fa-youtube",
  //     href: "#",
  //   },
  // ];

  const onMouseOver: MouseEventHandler<HTMLLIElement> = (e) => {
    const target = e.target as HTMLLIElement;
    target.classList.remove("scale-100");
    target.classList.add("scale-125");
  };

  const onMouseOut: MouseEventHandler<HTMLLIElement> = (e) => {
    const target = e.target as HTMLLIElement;
    target.classList.remove("scale-125");
    target.classList.add("scale-100");
  };

  // const renderIcon = socialData.map((x) => {
  //   return (
  //     <li key={x.icon}>
  //       <a
  //         href={x.href}
  //         className="text-2xl md:text-3xl text-white"
  //         title="Link to social media"
  //       >
  //         <i
  //           className={x.icon + " transition-all scale-100 duration-150"}
  //           onMouseOver={onMouseOver}
  //           onMouseOut={onMouseOut}
  //         />
  //       </a>
  //     </li>
  //   );
  // });

  return (
    <ul className="flex space-x-4 md:space-x-8 justify-center my-3 md:my-4">
      <li>
        <EmailShareButton
          url={currentUrl}
          subject={"Penawaran Produk"}
          body={"Dear Customer,"}
        >
          <i
            className={
              "text-2xl md:text-3xl text-white fa fa-envelope transition-all scale-100 duration-150"
            }
            onMouseOver={onMouseOver}
            onMouseOut={onMouseOut}
          />
        </EmailShareButton>
      </li>
      <li>
        <FacebookShareButton
          quote={title + ", " + description}
          hashtag={keywords}
          openShareDialogOnClick
          url={currentUrl}
        >
          <i
            className={
              "text-2xl md:text-3xl text-white fab fa-facebook transition-all scale-100 duration-150"
            }
            onMouseOver={onMouseOver}
            onMouseOut={onMouseOut}
          />
        </FacebookShareButton>
      </li>
      <li>
        <TwitterShareButton
          title={title + "/r/n" + description}
          via={"@mastur-fyc"}
          hashtags={keywords.split(", ")}
          openShareDialogOnClick
          url={currentUrl}
        >
          <i
            className={
              "text-2xl md:text-3xl text-white fab fa-twitter transition-all scale-100 duration-150"
            }
            onMouseOver={onMouseOver}
            onMouseOut={onMouseOut}
          />
        </TwitterShareButton>
      </li>
      <li>
        <WhatsappShareButton
          title={title + "\r\n" + description}
          openShareDialogOnClick
          url={currentUrl}
        >
          <i
            className={
              "text-2xl md:text-3xl text-white fab fa-whatsapp transition-all scale-100 duration-150"
            }
            onMouseOver={onMouseOver}
            onMouseOut={onMouseOut}
          />
        </WhatsappShareButton>
      </li>
      <li>
        <TelegramShareButton
          title={title}
          openShareDialogOnClick
          url={currentUrl}
        >
          <i
            className={
              "text-2xl md:text-3xl text-white fab fa-telegram transition-all scale-100 duration-150"
            }
            onMouseOver={onMouseOver}
            onMouseOut={onMouseOut}
          />
        </TelegramShareButton>
      </li>
      <li>
        <LinkedinShareButton
          title={title}
          source={description}
          openShareDialogOnClick
          url={currentUrl}
        >
          <i
            className={
              "text-2xl md:text-3xl text-white fab fa-linkedin transition-all scale-100 duration-150"
            }
            onMouseOver={onMouseOver}
            onMouseOut={onMouseOut}
          />
        </LinkedinShareButton>
      </li>

      {/* {renderIcon} */}
    </ul>
  );
};

export default Social;
