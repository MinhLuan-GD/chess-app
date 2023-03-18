<template>
  <div :class="$style['navigation-footer']">
    <a href="#" :class="$style['item']" rel="noopener"> Trợ giúp </a>
    <a href="#" :class="$style['item']"> Thuật ngữ cờ vua </a>
    <a href="#" :class="$style['item']"> Việc làm </a>
    <a href="#" :class="$style['item']"> Nhà phát triển </a>
    <a href="#" :class="$style['item']"> Thỏa thuận người dùng </a>
    <a href="#" :class="$style['item']"> Bảo mật </a>
    <a href="#" :class="$style['item']"> Chơi công bằng </a>
    <a href="#" :class="$style['item']"> Cộng đồng </a>
    <a href="#" :class="$style['item']"> Compliance </a>
    <a href="#" :class="$style['item']"> Luan © 2023 </a>
  </div>
</template>

<script lang="ts">
import { Vue } from "vue-class-component";

export default class Footer extends Vue {}
</script>

<style lang="scss" module>
.navigation-footer {
  text-align: center;
  grid-area: footer;
  & .item {
    color: rgb(185, 185, 185);
    font-weight: bold;
    margin: 0px 3px;
    text-decoration: none;
    &:hover {
      color: ghostwhite;
      border-right: 2px solid ghostwhite;
    }
    &:not(:last-child) {
      border-right: 2px solid rgb(185, 185, 185);
    }
  }
}
</style>
