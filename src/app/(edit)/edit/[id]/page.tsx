"use client";

import React from "react";

import { type T_SinglePost_Type } from "@/entity/post/post";
import { get_single_post } from "@/shared/api/post.action";
import { ClientEdit } from "@/views/post/ui/ClientEdit";

export default async function AlumniLink_Modify_Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const id = (await params).id;
  const data: T_SinglePost_Type | 404 | undefined = await get_single_post({
    id: parseInt(id),
  });

  if (data === 404 || data === undefined) {
    return <div>failed</div>;
  }
  return (
    <div className="w-full flex justify-center items-start gap-8">
      <ClientEdit
        isModify={true}
        id={id}
        modifyContent={data.body}
        moidfyTag={data.tag}
        moidfyTitle={data.title}
      />
    </div>
  );
}
