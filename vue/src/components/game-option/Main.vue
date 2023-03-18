<template>
  <div :class="$style.main">
    <div :class="$style.board">
      <!-- square light black-castle -->
      <div
        :class="`${$style.square} ${$style.light} ${$style['black-castle']}`"
      ></div>
      <div
        :class="`${$style.square} ${$style.dark} ${$style['black-knight']}`"
      ></div>
      <div
        :class="`${$style.square} ${$style.light} ${$style['black-bishop']}`"
      ></div>

      <div
        :class="`${$style.square} ${$style.dark} ${$style['black-queen']}`"
      ></div>
      <div
        :class="`${$style.square} ${$style.light} ${$style['black-king']}`"
      ></div>
      <div
        :class="`${$style.square} ${$style.dark} ${$style['black-bishop']}`"
      ></div>
      <div
        :class="`${$style.square} ${$style.light} ${$style['black-knight']}`"
      ></div>
      <div
        :class="`${$style.square} ${$style.dark} ${$style['black-castle']}`"
      ></div>
      <div
        :class="`${$style.square} ${$style.dark} ${$style['black-pawn']}`"
      ></div>
      <div
        :class="`${$style.square} ${$style.light} ${$style['black-pawn']}`"
      ></div>
      <div
        :class="`${$style.square} ${$style.dark} ${$style['black-pawn']}`"
      ></div>
      <div
        :class="`${$style.square} ${$style.light} ${$style['black-pawn']}`"
      ></div>
      <div
        :class="`${$style.square} ${$style.dark} ${$style['black-pawn']}`"
      ></div>
      <div
        :class="`${$style.square} ${$style.light} ${$style['black-pawn']}`"
      ></div>
      <div
        :class="`${$style.square} ${$style.dark} ${$style['black-pawn']}`"
      ></div>
      <div
        :class="`${$style.square} ${$style.light} ${$style['black-pawn']}`"
      ></div>
      <div :class="`${$style.square} ${$style.light}`"></div>
      <div :class="`${$style.square} ${$style.dark}`"></div>
      <div :class="`${$style.square} ${$style.light}`"></div>
      <div :class="`${$style.square} ${$style.dark}`"></div>
      <div :class="`${$style.square} ${$style.light}`"></div>
      <div :class="`${$style.square} ${$style.dark}`"></div>
      <div :class="`${$style.square} ${$style.light}`"></div>
      <div :class="`${$style.square} ${$style.dark}`"></div>
      <div :class="`${$style.square} ${$style.dark}`"></div>
      <div :class="`${$style.square} ${$style.light}`"></div>
      <div :class="`${$style.square} ${$style.dark}`"></div>
      <div :class="`${$style.square} ${$style.light}`"></div>
      <div :class="`${$style.square} ${$style.dark}`"></div>
      <div :class="`${$style.square} ${$style.light}`"></div>
      <div :class="`${$style.square} ${$style.dark}`"></div>
      <div :class="`${$style.square} ${$style.light}`"></div>
      <div :class="`${$style.square} ${$style.light}`"></div>
      <div :class="`${$style.square} ${$style.dark}`"></div>
      <div :class="`${$style.square} ${$style.light}`"></div>
      <div :class="`${$style.square} ${$style.dark}`"></div>
      <div :class="`${$style.square} ${$style.light}`"></div>
      <div :class="`${$style.square} ${$style.dark}`"></div>
      <div :class="`${$style.square} ${$style.light}`"></div>
      <div :class="`${$style.square} ${$style.dark}`"></div>
      <div :class="`${$style.square} ${$style.dark}`"></div>
      <div :class="`${$style.square} ${$style.light}`"></div>
      <div :class="`${$style.square} ${$style.dark}`"></div>
      <div :class="`${$style.square} ${$style.light}`"></div>
      <div :class="`${$style.square} ${$style.dark}`"></div>
      <div :class="`${$style.square} ${$style.light}`"></div>
      <div :class="`${$style.square} ${$style.dark}`"></div>
      <div :class="`${$style.square} ${$style.light}`"></div>
      <div
        :class="`${$style.square} ${$style.light} ${$style['white-pawn']}`"
      ></div>
      <div
        :class="`${$style.square} ${$style.dark} ${$style['white-pawn']}`"
      ></div>
      <div
        :class="`${$style.square} ${$style.light} ${$style['white-pawn']}`"
      ></div>
      <div
        :class="`${$style.square} ${$style.dark} ${$style['white-pawn']}`"
      ></div>
      <div
        :class="`${$style.square} ${$style.light} ${$style['white-pawn']}`"
      ></div>
      <div
        :class="`${$style.square} ${$style.dark} ${$style['white-pawn']}`"
      ></div>
      <div
        :class="`${$style.square} ${$style.light} ${$style['white-pawn']}`"
      ></div>
      <div
        :class="`${$style.square} ${$style.dark} ${$style['white-pawn']}`"
      ></div>
      <div
        :class="`${$style.square} ${$style.dark} ${$style['white-castle']}`"
      ></div>
      <div
        :class="`${$style.square} ${$style.light} ${$style['white-knight']}`"
      ></div>
      <div
        :class="`${$style.square} ${$style.dark} ${$style['white-bishop']}`"
      ></div>
      <div
        :class="`${$style.square} ${$style.light} ${$style['white-queen']}`"
      ></div>
      <div
        :class="`${$style.square} ${$style.dark} ${$style['white-king']}`"
      ></div>
      <div
        :class="`${$style.square} ${$style.light} ${$style['white-bishop']}`"
      ></div>
      <div
        :class="`${$style.square} ${$style.dark} ${$style['white-knight']}`"
      ></div>
      <div
        :class="`${$style.square} ${$style.light} ${$style['white-castle']}`"
      ></div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue } from "vue-class-component";

export default class Main extends Vue {}
</script>

<style lang="scss" module>
.main {
  width: 60%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  & .board {
    width: 40vw;
    height: 40vw;
    margin: 20px;
    border: 5px solid black;
    & .square {
      width: 12.5%;
      height: 12.5%;
      float: left;
      display: flex;
      justify-content: center;
      align-items: center;
      background-size: 70%;
      background-repeat: no-repeat;
      background-position: center center;
    }
    & .light {
      background-color: #f0d9b5;
    }
    & .dark {
      background-color: #b58863;
    }
    & .black-castle {
      background-image: url("/public/img/pieces/rdt.png");
    }
    & .black-knight {
      background-image: url("/public/img/pieces/ndt.png");
    }
    & .black-bishop {
      background-image: url("/public/img/pieces/bdt.png");
    }
    & .black-king {
      background-image: url("/public/img/pieces/kdt.png");
    }
    & .black-queen {
      background-image: url("/public/img/pieces/qdt.png");
    }
    & .black-pawn {
      background-image: url("/public/img/pieces/pdt.png");
    }
    & .white-castle {
      background-image: url("/public/img/pieces/rlt.png");
    }
    & .white-knight {
      background-image: url("/public/img/pieces/nlt.png");
    }
    & .white-bishop {
      background-image: url("/public/img/pieces/blt.png");
    }
    & .white-king {
      background-image: url("/public/img/pieces/klt.png");
    }
    & .white-queen {
      background-image: url("/public/img/pieces/qlt.png");
    }
    & .white-pawn {
      background-image: url("/public/img/pieces/plt.png");
    }
  }
}
</style>
