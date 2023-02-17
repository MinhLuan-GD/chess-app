<template>
  <div
    :class="
      [
        'tile',
        !black ? 'while-tile' : 'black-tile',
        highlight && 'tile-highlight',
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
.tile-highlight::before {
  position: absolute;
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
</style>

#ff0
