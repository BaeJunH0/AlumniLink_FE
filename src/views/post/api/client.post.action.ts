import { type T_Posting_Type } from "@/entity/post/post";
import AlumniLinkAPI from "@/shared/config/AxiosConfig";

export const post_my_posting = async ({
  request,
}: {
  request: T_Posting_Type;
}) => {
  try {
    const res = await AlumniLinkAPI.post("/posts", request);
    return { data: res.data, statusCode: 200 }; // Success
  } catch (err: any) {
    console.log(err);
    return { data: err.message, statusCode: err.status };
  }
};

export const modify_my_posting = async ({
  id,
  request,
}: {
  id: string;
  request: T_Posting_Type;
}) => {
  try {
    const res = await AlumniLinkAPI.patch(`/posts/${id}`, request);
    return { data: res.data, statusCode: 200 }; // Success
  } catch (err: any) {
    console.log(err);
    return { data: err.message, statusCode: err.status };
  }
};
