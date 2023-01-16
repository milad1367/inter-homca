type Products = {
  list: any[];
  isLoading: boolean;
  isError: any;
};
import styles from "@/styles/FacetedSearch.module.css";
import { isError } from "@tanstack/react-query";
export function ProductList({ list, isError, isLoading }: Products) {
  if (isLoading) {
    return <div>is loading ...</div>;
  }
  if (isError) {
    return <div>Error!</div>;
  }

  return (
    <>
      {list?.map((item: any) => (
        <div className={styles.item} key={item.id}>
          {item?.title}
        </div>
      ))}
    </>
  );
}
