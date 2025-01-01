"use client";

import React, { type ChangeEvent, useState } from "react";
import { useRouter } from "next/navigation";

import { PostEdit } from "@/views/post/ui/PostEdit";
import { EditHamburger } from "@/widgets/hamburger";
import { type T_Posting } from "@/entity/post/tag";
import {
  modify_my_posting,
  post_my_posting,
} from "@/views/post/api/client.post.action";

type T_ClientEdit = {
  isModify: boolean;
  id?: string;
  moidfyTitle?: string;
  modifyContent?: string;
  moidfyTag?: T_Posting;
};

function ClientEdit({
  isModify,
  id,
  moidfyTitle,
  modifyContent,
  moidfyTag,
}: T_ClientEdit) {
  const router = useRouter();

  const [title, setTitle] = useState<string>(moidfyTitle ?? "");

  const [content, setContent] = useState<string>(modifyContent ?? "");

  const [tag, setTag] = useState<T_Posting>(moidfyTag ?? "QUESTION");

  const onChangeTitle = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setTitle(value);
  };

  const onSubmitPost = async () => {
    const requestBody = {
      body: content,
      title: title,
      tag: tag,
    };
    const res = isModify
      ? await modify_my_posting({ id: id ?? "0", request: requestBody })
      : await post_my_posting({
          request: requestBody,
        });
    if (res.statusCode === 200) {
      router.push("/post");
    } else if (res.statusCode === 404) {
      alert("Client Error");
    } else if (res.statusCode === 500) {
      alert("Parameter Error");
    } else {
      alert("Server Error");
    }
  };

  return (
    <div className="w-full flex justify-center items-start gap-8">
      <PostEdit
        content={content}
        titleValue={title}
        onChangeStringValue={setContent}
        onChangeTitle={onChangeTitle}
      />
      <div className="hidden xl:block">
        <EditHamburger onSubmitPost={onSubmitPost} />
      </div>
    </div>
  );
}

export { ClientEdit };
