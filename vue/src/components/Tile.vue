<template>
  <div
    :class="
      [
        'tile',
        !black ? 'while-tile' : 'black-tile',
        highlight && 'tile-highlight',
        pieceImage && 'chess-piece-tile',
      ]
        .filter(Boolean)
        .join(' ')
    "
  >
    <div v-if="pieceImage" class="chess-piece" :style="url(pieceImage)"></div>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";

@Options({
  props: {
    black: Boolean,
    pieceImage: String,
    highlight: Boolean,
  },
})
export default class Tile extends Vue {
  black!: boolean;
  pieceImage?: string;
  highlight!: boolean;

  url(name: string) {
    return `background-image: url(/img/pieces/${name});`;
  }
}
</script>

<style lang="scss">
.tile {
  height: 70px;
  width: 70px;
  place-content: center;
  display: flex;
  justify-content: center;
  align-items: center;
  & .chess-piece {
    background-position: center;
    background-size: 60px;
    background-repeat: no-repeat;
    width: 70px;
    height: 70px;
    cursor: grab;
    &:active {
      cursor: grabbing;
    }
  }
}

.black-tile {
  background-color: #aa5656;
}
.while-tile {
  background-color: #f1dbbf;
}
.tile-highlight:not(.chess-piece-tile):before {
  position: absolute;
  pointer-events: none;
  z-index: 2;
  content: "";
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: rgb(59, 217, 218);
  background: radial-gradient(
    circle,
    rgba(59, 217, 218, 1) 5%,
    rgba(52, 73, 94, 1) 100%
  );
}
.tile-highlight.chess-piece-tile:before {
  position: absolute;
  pointer-events: none;
  z-index: 2;
  content: "";
  width: 14px;
  height: 14px;
  border-radius: 50%;
  background: rgb(241, 148, 138);
  background: radial-gradient(
    circle,
    rgba(241, 148, 138, 1) 5%,
    rgba(106, 63, 58, 1) 100%
  );
}
</style>
