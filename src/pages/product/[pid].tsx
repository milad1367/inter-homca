import { useRouter } from "next/router";

const Product = () => {
  const router = useRouter();
  const { pid } = router.query;
  return <div>Product: {pid}</div>;
};

export default Product;
