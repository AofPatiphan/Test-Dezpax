<template>
  <div class="container">
    <div class="text-center title">{{ product.name }}</div>
    <div class="row">
      <div class="col-6 w-100 p-3">
        <img :src="product.image" alt="" class="w-100" />
      </div>
      <div class="col-6 pl-5 description-container">
        <div
          v-for="(item, index) in Object.keys(omit(product, ['image']))"
          :key="`item_${index}`"
        >
          <span class="product-key">Product {{ item }} :</span>
          <br v-if="item === 'description'" />
          <span>{{ get(product, item, "") }}</span>
        </div>
      </div>
    </div>
    <div class="d-flex justify-content-center mt-5">
      <div class="cursor-pointer" @click="() => router.replace('/')">
        Back To Home
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  onMounted,
  Ref,
  ref,
  useRoute,
  useRouter,
} from "@nuxtjs/composition-api";
import useContentService from "~/services/contentService";
import { Product } from "~/types/product";
import { omit, get } from "lodash";

const initContent = {
  sku: "",
  name: "",
  image: "",
  price: 0,
  description: "",
  dimension: "",
  weight: "",
};

export default defineComponent({
  name: "ProductsSlug",
  setup() {
    const route = useRoute();
    const router = useRouter();
    const slug = route.value.params.slug;

    const product: Ref<Product> = ref(initContent);
    const { getProductDetail, handlePromise } = useContentService();

    onMounted(async () => {
      try {
        const [productResponse, getProductError] = await handlePromise(
          getProductDetail(slug)
        );

        if (getProductError) {
          router.push("/");
          return;
        }

        product.value = productResponse.data;
      } catch (e) {
        console.log(e);
      }
    });

    return { slug, product, router, omit, get };
  },
});
</script>

<style scoped>
.title {
  font-size: 48px;
}
.description-container {
  font-size: 28px;
  display: flex;
  flex-direction: column;
  gap: 1em;
  justify-content: center;
}
.cursor-pointer {
  cursor: pointer;
}

.content-key {
  font-weight: 700;
}
</style>
