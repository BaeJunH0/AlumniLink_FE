"use client";

import { SignInView } from "@/views/sign";
import React from "react";

export default function Alumnilink_Sign_Page() {
  return (
    <div className="container px-36 py-20 w-full min-h-screen flex justify-center items-center duration-300">
      <div className="p-5 max-w-3xl flex shadow-lg rounded-2xl bg-gray-100">
        <div className="w-1/2 flex justify-center items-center">
          <SignInView />
        </div>
      </div>
    </div>
  );
}
