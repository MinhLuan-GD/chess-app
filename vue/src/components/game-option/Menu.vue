<template>
  <div :class="$style.menu">
    <h1 :class="$style['menu-title']">Play Chess</h1>
    <div :class="$style['menu-item']">
      <img
        src="@/assets/icon/play_online.svg"
        alt=""
        :class="$style['menu-img']"
      />
      <div :class="$style['item-text']">
        <h2 :class="$style['item-title']">Chơi trực tuyến</h2>
        <label>Chơi với người khác cùng kỹ năng</label>
      </div>
    </div>
    <div :class="$style['menu-item']">
      <img
        src="@/assets/icon/play_with_computer.svg"
        alt=""
        :class="$style['menu-img']"
      />
      <div :class="$style['item-text']">
        <h2 :class="$style['item-title']">Máy tính</h2>
        <label>Thách đấu với máy tính</label>
      </div>
    </div>
    <div :class="$style['menu-item']">
      <img
        src="@/assets/icon/play_with_friend.svg"
        alt=""
        :class="$style['menu-img']"
      />
      <div :class="$style['item-text']">
        <h2 :class="$style['item-title']">Chơi với một người bạn</h2>
        <label>Mời bạn đấu một ván cờ</label>
      </div>
    </div>
    <div :class="$style['menu-item']">
      <img
        src="@/assets/icon/tournaments.svg"
        alt=""
        :class="$style['menu-img']"
      />
      <div :class="$style['item-text']">
        <h2 :class="$style['item-title']">Các giải đấu</h2>
        <label>Tham gia đấu trường</label>
      </div>
    </div>
    <div :class="$style['menu-item']">
      <img
        src="@/assets/icon/variations.svg"
        alt=""
        :class="$style['menu-img']"
      />
      <div :class="$style['item-text']">
        <h2 :class="$style['item-title']">Cờ biến thể</h2>
        <label>Tìm cách chơi cờ thú vị hơn</label>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue } from "vue-class-component";

export default class Menu extends Vue {}
</script>

<style lang="scss" module>
.menu {
  background-color: #272522;
  height: 80%;
  width: 30%;
  border-radius: 15px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  color: white;
  & .menu-title {
    color: white;
  }
  & .menu-item {
    margin: 5px 0px;
    width: 100%;
    padding: 10px;
    background: #22201f;
    border-radius: 10px;
    display: flex;
    cursor: pointer;
    align-items: center;
    &:hover {
      background-color: #171614;
    }
    & .menu-img {
      width: 48px;
      height: 48px;
    }
    & .item-text {
      margin-left: 10px;
      & .item-title {
        margin: 0px;
      }
    }
  }
}
</style>
