<template>
  <div class="habit" >
    HABIT.VUE
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
// import { Field, Cell, CellGroup, Popup, Button } from 'vant';
// import { State, Mutation } from 'vuex-class';

// import Circles from '@/components/common/Circle/Circle.vue';
// import DateBlock from '@/components/common/DateBlock/DateBlock.vue';
// import config from '@/config';
// import _ from '@/utils';
// import { HabitList as HabitListState } from '@/store/state';

@Component({
  components: {
    // [Field.name]: Field,
    // [Cell.name]: Cell,
    // [CellGroup.name]: CellGroup,
    // [Popup.name]: Popup,
    // [Button.name]: Button,
    // DateBlock,
    // Circles,
  },
})
export default class Habit extends Vue {
  // // @State private habitList!: HabitListState[];
  // @Mutation
  // private selectDate!: (payload: { habitId: number; id: number }) => void;
  // @Mutation
  // private changeName!: (payload: { id: number; value: string }) => void;
  // @Mutation
  // private changInspire!: (payload: { id: number; value: string }) => void;
  // @Mutation
  // private changeMode!: (payload: { id: number; value: string }) => void;
  // private show!: boolean;
  // private value?: string;
  // private name?: string;
  // private habitLibrary!: object[];
  // private id!: number;
  // private index!: number;
  // private mode!: string;
}
</script>

<style src="./style.scss" lang="scss" scoped>
</style>
