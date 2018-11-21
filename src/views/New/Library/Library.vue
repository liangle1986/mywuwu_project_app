<template>
  <div class="habit">
      Library.vue
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { List, Cell } from 'vant';
import { Mutation } from 'vuex-class';
// import moment from 'moment';

import config from '@/config';
// import { HabitList as HabitListState } from '@/store/state';
@Component({
  components: {
    [List.name]: List,
    [Cell.name]: Cell,
  },
})
export default class Library extends Vue {

}
</script>

<style src="./style.scss" lang="scss" scoped>
</style>
