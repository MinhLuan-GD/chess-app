<template>
  <div :class="$style.container">
    <div :class="$style.waiting">
      Waiting
      <img src="@/assets/icon/Snake.gif" alt="" />
      <div>Cancel</div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue } from "vue-class-component";

export default class Waiting extends Vue {}
</script>

<style lang="scss" module>
.container {
  position: absolute;
  z-index: 999;
  background-color: rgba(0, 0, 0, 0.5);
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  display: none;
  & .waiting {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    background-color: white;
    border-radius: 10px;
    width: 300px;
    height: 280px;
    font-weight: 600;
    & img {
      margin: 20px;
    }
    & div {
      padding: 10px;
      border-radius: 5px;
      color: aliceblue;
      cursor: pointer;
      background-color: #f00;
    }
  }
}
</style>
