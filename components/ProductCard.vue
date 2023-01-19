<template>
  <div class="col-lg-3 p-2">
    <div class="card">
      <img :src="product.image" class="card-img-top" alt="" />
      <div class="card-body text-center">
        <h5 class="card-title">{{ product.name }}</h5>
        <p class="card-text">
          {{ numeral(product.price).format("0,00") + " บาท" }}
        </p>
        <div
          class="btn btn-primary"
          @click="() => handleClickSeeDetail(product.sku)"
        >
          See Detail
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, useRouter } from "@nuxtjs/composition-api";
import numeral from "numeral";

export default defineComponent({
  name: "ProductCard",
  props: {
    data: {
      type: Object,
      default: () => ({}),
    },
  },
  setup(props) {
    const router = useRouter();
    const product = reactive(props.data);

    const handleClickSeeDetail = (sku: string) => {
      router.push(`/${sku}`);
    };

    return { product, numeral, handleClickSeeDetail };
  },
});
</script>

<style scoped></style>
>
