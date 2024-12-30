"use client";

import Link from "next/link";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { cn } from "@/shared/utils/clsx";
import { get_my_info } from "@/shared/utils/get_my_info";

// * Static image
import Alumni from "/public/svg/alumni.svg";
import Question from "/public/svg/question.svg";
import Logout from "/public/svg/signout.svg";
import My from "/public/svg/my.svg";

import HeaderContent from "@/shared/components/consts/HeaderContent.json";

function Header() {
  const router = useRouter();

  const isLoggedIn = get_my_info();

  const [isScrolled, setIsScrolled] = useState<boolean>(false);

  const [isProfileClicked, setIsProfileClicked] = useState<boolean>(false);

  const [isHover, setIsHover] = useState<boolean[]>([false, false, false]);

  const onClickProfile = () => {
    if (isProfileClicked) {
      setIsProfileClicked(false);
    } else {
      setIsProfileClicked(true);
    }
  };

  const onClickRouter = (url: string) => {
    router.push(`${url}`);
  };

  useEffect(() => {
    console.log(isProfileClicked);
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <header
      className={cn(
        "sticky shrink-0 top-0 left-0 px-36 w-full flex justify-between items-center gap-8 z-50 bg-inherit duration-300 transition-all",
        {
          "bg-[#E9E4F0] shadow-lg": isScrolled,
          "bg-transparent": !isScrolled,
          "h-24": isScrolled,
          "h-28": !isScrolled,
        }
      )}
    >
      <div className="w-1/3 h-full flex justify-start items-center">
        <Link href={"/"}>
          <span className="font-studioSans font-extrabold text-4xl text-black cursor-pointer">
            AL
          </span>
        </Link>
      </div>
      <ul className="w-1/3 flex justify-evenly items-center">
        <li
          className="py-5 w-1/3 flex justify-center items-center duration-300 gap-2 overflow-hidden hover:shadow-xl rounded-lg"
          onMouseEnter={() => setIsHover([true, false, false])}
          onMouseLeave={() => setIsHover([false, false, false])}
          onClick={() => onClickRouter("/post")}
        >
          {isHover[0] && (
            <Image src={Alumni} alt="Alumni" width={24} height={24} />
          )}
          Alumni
        </li>
        <li
          className="py-5 w-1/3 flex justify-center items-center duration-300 gap-2 overflow-hidden hover:shadow-xl rounded-lg"
          onMouseEnter={() => setIsHover([false, true, false])}
          onMouseLeave={() => setIsHover([false, false, false])}
        >
          {isHover[1] && (
            <Image
              src={Question}
              alt="Alumni"
              width={32}
              height={32}
              className="text-black"
            />
          )}
          <span className="font-studioSans font-normal text-base text-black">
            QnA
          </span>
        </li>
        <li className="py-5 w-1/3 flex justify-center items-center duration-300 gap-2 overflow-hidden hover:shadow-xl rounded-lg">
          <span className="font-studioSans font-normal text-base text-black">
            Information
          </span>
        </li>
      </ul>
      <div className="w-1/3 flex justify-center items-center">
        {isLoggedIn ? (
          <div
            className="min-w-14 min-h-14 rounded-full bg-gradient-to-tr from-[#2193b0] to-[#6dd5ed] shadow-lg duration-300 hover:scale-105 cursor-pointer"
            onClick={onClickProfile}
          />
        ) : (
          <button
            className="w-24 h-12 flex justify-center items-center rounded-lg shadow-lg hover:scale-110 hover:bg-slate-50 duration-300"
            onClick={() => onClickRouter("/sign")}
          >
            Login
          </button>
        )}
      </div>
      <div
        className={`absolute top-0 right-0 px-5 py-20 ${
          isProfileClicked
            ? "max-w-40  min-w-40 opacity-100"
            : "max-w-0  min-w-0 opacity-0"
        } h-screen flex flex-col justify-start items-center rounded-l-3xl shadow-lg ease-in-out duration-300 bg-gradient-to-l from-[#D3CCE3] to-[#E9E4F0]`}
      >
        {HeaderContent.map((item, key) => {
          return (
            <div
              className="px-2 py-1 w-full h-12 flex justify-start items-center rounded-xl hover:bg-sky-100 duration-300"
              key={key}
            >
              <Image src={Logout} alt="Logout" width={32} height={32} />
            </div>
          );
        })}
      </div>
    </header>
  );
}

export { Header };