<template>
  <Referee />
</template>

<script lang="ts">
import Referee from "@/components/Referee.vue";
import { Options, Vue } from "vue-class-component";

@Options({ components: { Referee } })
export default class HomeView extends Vue {}
</script>
