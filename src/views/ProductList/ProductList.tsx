import useGetData from "@/pages/api/useGetData";
import styles from "@/styles/FacetedSearch.module.css";
import { useRouter } from "next/router";

export function ProductList() {
  const { query } = useRouter();
  const { search, select } = query;
  const filter = select?.toString().split("-");
  const { data, isLoading, isError } = useGetData(search?.toString(), filter); //TODO think about better option search?.toString()
  if (isLoading) {
    return <div>is loading ...</div>;
  }
  if (isError) {
    return <div>Error!</div>;
  }

  return (
    <>
      {data?.map((item: any) => (
        <div className={styles.item} key={item.id}>
          {item?.id}- {item?.title}
        </div>
      ))}
    </>
  );
}
