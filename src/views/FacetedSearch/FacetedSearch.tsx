import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import styles from "@/styles/FacetedSearch.module.css";
import Select from "react-select";

const options = [
  { value: "title", label: "Title" },
  { value: "price", label: "Price" },
  { value: "rating", label: "Rating" },
  { value: "brand", label: "Brand" },
];

export default function FacetedSearch() {
  const router = useRouter();
  const [state, setState] = useState<any>(null); //TODO
  const { select } = router?.query;

  useEffect(() => {
    const t = options.filter((item) =>
      select
        ?.toString()
        ?.split("-")
        ?.find((value) => item.value === value)
    );
    setState(t);
  }, [select]);

  const toggleOnChange = (option: any) => {
    if (option?.value) {
      return router.push({
        pathname: "/",
        query: { ...router.query, select: encodeURI(option.value) }, // TODO search about decode, check url in chrome
      });
    }
    delete router.query.select;
    router.push(
      {
        pathname: "/",
        query: { ...router.query },
      },
      undefined,
      {}
    );
  };

  const multiOnChange = (option: readonly any[]) => {
    const allOption = option.map((item) => item.value).join("-");
    if (allOption) {
      return router.push({
        pathname: "/",
        query: { ...router.query, select: encodeURI(allOption) }, // TODO search about decode, check url in chrome
      });
    }
    delete router.query.select;
    router.push(
      {
        pathname: "/",
        query: { ...router.query },
      },
      undefined,
      {}
    );
  };

  return (
    <div className={styles.facetContainer}>
      <div>
        <div>multi facet:</div>
        <Select
          instanceId={"multi"}
          defaultValue={null}
          isMulti
          onChange={multiOnChange}
          options={options}
          value={state}
        />
      </div>

      <div>
        <div>toggle facet:</div>
        <Select
          instanceId={"toggle"}
          defaultValue={null}
          onChange={toggleOnChange}
          options={options}
          value={state}
        />
      </div>
    </div>
  );
}
