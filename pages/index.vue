<template>
  <div class="container">
    <div class="row w-100">
      <div class="w-100 flex justify-content-center text-center title">
        Products
      </div>
      <ProductCard
        v-for="(product, index) in products"
        :key="`product-${index}`"
        :data="product"
      />
    </div>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  ref,
  Ref,
  useRouter,
  onMounted,
} from "@nuxtjs/composition-api";
import numeral from "numeral";

import { Product } from "@/types/product";
import useContentService from "../services/contentService";

export default defineComponent({
  name: "Index",
  setup() {
    const router = useRouter();
    const { getAllProducts, handlePromise } = useContentService();
    const products: Ref<Product[]> = ref([]);

    onMounted(async () => {
      try {
        const [productsResponse, getProductsError] = await handlePromise(
          getAllProducts()
        );
        if (getProductsError) {
          router.push("/error404");
          return;
        }
        products.value = productsResponse.data;
      } catch (e) {
        console.log(e);
      }
    });

    const handleClickSeeDetail = (sku: string) => {
      router.push(`/${sku}`);
    };

    return { products, handleClickSeeDetail, numeral };
  },
});
</script>

<style scoped>
.title {
  font-size: 36px;
}
</style>
