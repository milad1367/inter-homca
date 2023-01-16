// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import useRequest from "@/hooks/useRequest";
import { useQuery } from "@tanstack/react-query";
// import type { NextApiRequest, NextApiResponse } from "next"; //TODO

// type Data = { //TODO
//   name: string;
// };
const baseUrl = "https://dummyjson.com/products";

const makeUrl = (search?: string, filter?: string[]) => {
  const filterToParam = filter?.join(",");
  if (search && filter) {
    return `${baseUrl}/search?q=${search}&select=${filterToParam}`;
  }
  if (search || filter) {
    return `${
      search
        ? `${baseUrl}/search?q=${search}`
        : `${baseUrl}?select=${filterToParam}`
    }`;
  }
  return baseUrl;
};

export default function useGetData(search?: string, filter?: string[]) {
  const { get } = useRequest(baseUrl);
  return useQuery<any>(
    ["get-basalam", search, filter?.toString()],
    async () => {
      const response = await get(makeUrl(search, filter));
      return response?.data?.products;
    },
    {
      refetchOnWindowFocus: false,
    }
  );
}
