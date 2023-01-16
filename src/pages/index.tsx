import Head from "next/head";
import styles from "@/styles/Home.module.css";
import { useEffect, useState } from "react";
import useGetData from "./api/useGetData";
import FacetedSearch from "@/views/FacetedSearch/FacetedSearch";
import { useRouter } from "next/router";
import { useKeyPress } from "@/hooks/useKeyPress";
import { ProductList } from "@/views/ProductList/ProductList";

export default function Home() {
  const { query, push } = useRouter();
  const { search } = query;
  const pressEnter = useKeyPress(13);
  const [searchInput, setSearchInput] = useState("");

  useEffect(() => {
    setSearchInput(search ? search.toString() : "");
  }, [search]);
  useEffect(() => {
    // TODO remove param when input is empty and user push enter
    if (pressEnter) {
      push({
        pathname: "/",
        query: { ...query, search: encodeURI(searchInput) },
      });
    }
  }, [pressEnter]);

  const searchBoxOnChange = (e: any) => {
    e.preventDefault();
    setSearchInput(e.target.value);
  };

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <div className={styles.container}>
          <div>
            <label>Search</label>
            <input value={searchInput} onChange={searchBoxOnChange} />
          </div>
          <div>
            <FacetedSearch />
          </div>
          <div>
            <ProductList />
          </div>
        </div>
      </main>
    </>
  );
}