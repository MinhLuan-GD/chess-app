<template>
  <div :class="$style.container">
    <Header />
    <div>
      <Main />
      <Blog />
    </div>
    <Footer />
  </div>
  <Waiting />
</template>

<script lang="ts">
import Header from "@/components/Header.vue";
import Main from "@/components/home/Main.vue";
import Waiting from "@/components/home/Waiting.vue";
import Footer from "@/components/Footer.vue";
import { Options, Vue } from "vue-class-component";
import Blog from "@/components/home/Blog.vue";

@Options({
  components: {
    Header,
    Main,
    Waiting,
    Footer,
    Blog,
  },
})
export default class HomeView extends Vue {}
</script>
<style lang="scss" module>
.container {
  display: grid;
  grid-template-areas: "header main" "header main" "header footer";
  grid-template-columns: 180px auto;
  width: 100%;
  height: 100%;
  background-color: #312e2b;
  .main {
    grid-area: main;
  }
}
</style>
