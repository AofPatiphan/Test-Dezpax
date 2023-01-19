import { useContext } from "@nuxtjs/composition-api";

export default function useContentService(provider = useContext()) {
  const { $axios } = provider;

  const getAllProducts = async () => {
    return $axios.$get(`/product`);
  };

  const getProductDetail = async (sku: string) => {
    return $axios.$get(`/product/${sku}`);
  };

  const handlePromise = (fn: Promise<any>) => {
    return fn
      .then((response) => [response, null])
      .catch((error) => [null, error]);
  };

  return {
    handlePromise,
    getAllProducts,
    getProductDetail,
  };
}
