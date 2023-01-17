import useGetData from "@/pages/api/useGetData";
import { useRouter } from "next/router";
import { useVirtualizer } from "@tanstack/react-virtual";
import React from "react";
import Link from "next/link";

export function ProductList() {
  const { query } = useRouter();
  const { search, select } = query;
  const filter = select?.toString().split("-");
  const parentRef = React.useRef(null);
  const { data, isLoading, isError } = useGetData(search?.toString(), filter); //TODO think about better option search?.toString()
  // The virtualizer
  const rowVirtualizer = useVirtualizer({
    count: data?.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 35,
    initialOffset: 300,
  });

  if (isLoading) {
    return <div>is loading ...</div>;
  }
  if (isError) {
    return <div>Error!</div>;
  }

  return (
    <>
      <div
        style={{
          height: `400px`,
          overflow: "auto", // Make it scroll!
        }}
        ref={parentRef}
      >
        <div
          style={{
            height: `${rowVirtualizer.getTotalSize()}px`,
            width: "100%",
            position: "relative",
          }}
        >
          {rowVirtualizer.getVirtualItems().map((virtualRow) => (
            <div
              key={virtualRow.index}
              className={virtualRow.index % 2 ? "ListItemOdd" : "ListItemEven"}
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: `${data[virtualRow.index]}px`,
                transform: `translateY(${virtualRow.start}px)`,
              }}
            >
              <Link href={`/product/${data[virtualRow.index].id}`}>
                {data[virtualRow.index].id}- {data[virtualRow.index].title}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
