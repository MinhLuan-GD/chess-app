<template>
  <div :class="$style.container">
    <img src="@/assets/images/chesstoday.png" />
    <div :class="$style.btn">Cờ vua hôm nay</div>
  </div>
</template>

<script lang="ts">
import { Vue } from "vue-class-component";

export default class Blog extends Vue {}
</script>

<style lang="scss" module>
.container {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  padding: 30px;
  & img {
    width: 80%;
  }
  & .btn {
    height: 50px;
    border-radius: 5px;
    padding: 5px 10px;
    background-color: #cea159;
    border: 1px solid #cea159;
    margin-top: 20px;
    font-size: 20px;
    font-weight: 600;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #5c1810;
    cursor: pointer;
    &:hover {
      background-color: #d3ab6a;
    }
  }
}
</style>
