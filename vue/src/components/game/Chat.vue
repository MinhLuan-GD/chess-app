<template>
  <div :class="$style.container"></div>
</template>

<script lang="ts">
import { Vue } from "vue-class-component";

export default class Chat extends Vue {}
</script>

<style lang="scss" module>
.container {
  width: 33vw;
  height: 40vw;
  border-radius: 5px;
  border: 3px solid #f0d9b5;
  display: block;
  background-color: #312e2b;
}
</style>
