<template>
  <div
    :class="
      black
        ? `${$style.tile} ${$style['black-tile']}`
        : `${$style.tile} ${$style['while-tile']}`
    "
  >
    <img
      v-if="pieceImage"
      :src="require(`@/assets/pieces/${pieceImage}`)"
      alt="Chess Piece"
    />
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";

@Options({
  props: {
    black: Boolean,
    pieceImage: String,
  },
})
export default class Tile extends Vue {
  black!: boolean;
  pieceImage?: string;
}
</script>

<style lang="scss" module>
.tile {
  height: 70px;
  width: 70px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.black-tile {
  background-color: rgb(207, 95, 60);
}
.while-tile {
  background-color: #fff;
}
</style>
