<template>
  <div>
    <div class="p-2 p-sm-3">
      <div class="w-100 text-center">
        <h2>404</h2>
        <h2>Page Not Found</h2>
        <p>Oops! The requested URL was not found on this server.</p>

        <button @click="handleClickToHome">Back to home</button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, useRouter } from "@nuxtjs/composition-api";

export default defineComponent({
  name: "Error404",
  setup() {
    const router = useRouter();

    function handleClickToHome() {
      router.push("/");
    }

    return {
      handleClickToHome,
    };
  },
});
</script>

<style scoped></style>
