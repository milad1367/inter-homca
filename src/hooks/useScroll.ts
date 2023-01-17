import React, { useEffect, useMemo, useState } from "react";

type Type = {
  x: number;
  y: number;
};
export const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? React.useLayoutEffect : React.useEffect;
export function useScroll(ref: any) {
  const [scroll, setScroll] = useState<Type>({ x: 0, y: 0 });
  useEffect(() => {
    const div = ref?.current;

    const onScroll = (e: any) => {
      const { scrollHeight, scrollTop, clientHeight } = e.target;
      setScroll({ x: 0, y: scrollTop });
    };
    if (div) {
      div.addEventListener("scroll", onScroll);
    }

    return () => div?.removeEventListener("scroll", onScroll);
  }, [ref?.current]); //TODO Important!!

  return scroll;
}
