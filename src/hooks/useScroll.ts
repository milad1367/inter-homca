import { useEffect } from "react";

export function useScroll(ref: any, onScroll: any) {
  useEffect(() => {
    const div = ref?.current;
    if (div) {
      div.addEventListener("scroll", onScroll);
    }

    return () => div?.removeEventListener("scroll", onScroll);
  }, [ref, onScroll]);
}
