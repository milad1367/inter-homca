import { useRouter } from "next/router";
import styles from "@/styles/Home.module.css";

const Product = () => {
  const router = useRouter();
  const { pid } = router.query;
  return <div className={styles.product}>Product: {pid}</div>;
};

export default Product;
