import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import styles from "@/styles/FacetedSearch.module.css";
import Select from "react-select";

const priceOptions = [
  { value: "50000000", label: "50" },
  { value: "80000000", label: "80" },
  { value: "300000000", label: "300" },
  { value: "900000000", label: "900" },
  { value: "1500000000", label: "1500" },
];

export default function FacetedSearch() {
  const router = useRouter();
  const [state, setState] = useState<any>(null); //TODO
  const { price } = router?.query;

  useEffect(() => {
    const t = priceOptions.filter((item) =>
      price
        ?.toString()
        ?.split("-")
        ?.find((value) => item.value === value)
    );
    setState(t);
  }, [price]);

  const toggleOnChange = (option: any) => {
    if (option?.value) {
      return router.push({
        pathname: "/",
        query: { ...router.query, price: encodeURI(option.value) }, // TODO search about decode, check url in chrome
      });
    }
  };

  const multiOnChange = (option: readonly any[]) => {
    const allOption = option.map((item) => item.value).join("-");
    if (allOption) {
      return router.push({
        pathname: "/",
        query: { ...router.query, price: encodeURI(allOption) }, // TODO search about decode, check url in chrome
      });
    }
    delete router.query.price;
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
        <div>multi price:</div>
        <Select
          instanceId={"multi"}
          defaultValue={null}
          isMulti
          onChange={multiOnChange}
          options={priceOptions}
          value={state}
          placeholder={"Price"}
        />
      </div>

      <div>
        <div>toggle facet:</div>
        <Select
          instanceId={"toggle"}
          defaultValue={null}
          onChange={toggleOnChange}
          options={priceOptions}
          value={state}
        />
      </div>
    </div>
  );
}
