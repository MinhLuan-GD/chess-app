<template>
  <div :class="black ? 'tile black-tile' : 'tile while-tile'">
    <div
      v-if="pieceImage"
      class="chess-piece"
      :style="`background-image: url(${url(pieceImage)});`"
    ></div>
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

  url(name: string) {
    return `/img/pieces/${name}`;
  }
}
</script>

<style lang="scss">
.tile {
  height: 70px;
  width: 70px;
  place-content: center;
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
</style>
