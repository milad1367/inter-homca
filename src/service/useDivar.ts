import useRequest from "@/hooks/useRequest";
import { useQuery } from "@tanstack/react-query";

const baseUrl = "http://localhost:3000/api/divar";

const makeUrl = (search?: string, filter?: string[]) => {
  const filterToParam = filter?.join(",");
  if (search && filter) {
    return `${baseUrl}?q=${search}&price=${filterToParam}`;
  }
  if (search || filter) {
    return `${
      search ? `${baseUrl}?q=${search}` : `${baseUrl}?price=${filterToParam}`
    }`;
  }
  return baseUrl;
};

export default function useGetData(search?: string, filter?: string[]) {
  const { get } = useRequest(baseUrl);
  return useQuery<any>(
    ["get-divar", search, filter?.toString()],
    async () => {
      const response = await get(makeUrl(search, filter));
      return response?.data?.data?.web_widgets?.post_list?.map(
        (item: any) => item?.data
      );
    },
    {
      refetchOnWindowFocus: false,
    }
  );
}
