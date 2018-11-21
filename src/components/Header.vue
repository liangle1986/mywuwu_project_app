<template>
    <header>
        <aside class="left" v-if="!!headerInfo.left" @click="leftHandle" >
          <vIcon :name="headerInfo.left"></vIcon>
        </aside>
        <div class="left" v-else></div>
        <h3 class="center">{{headerInfo.title}}</h3>
        <aside class="right" v-if="!!headerInfo.right" @click="rightHandle">
        <vIcon :name="headerInfo.right"></vIcon>
        </aside>
        <div class="right" v-else></div>
        <Popup :show="show" @hide="hide" :title="habitLibrary" ></Popup>
    </header>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { State } from 'vuex-class';

import { HeaderInfo, PageInfo } from '@/store/state';
import config from '@/config';
import vIcon from './common/Icon/HeaderIcon';
import Popup from './common/Popup/Popup.vue';
// import { NavBar, Icon } from 'vant';

@Component({
  components: {
    vIcon,
    Popup,
    // [Icon.name]: Icon,
  },
})
export default class Header extends Vue {
  @State private headerInfo!: HeaderInfo;

  private show!: boolean;
  private habitLibrary?: string = '';
  private navTitle: any;

  private data() {
    return {
      show: false,
      navTitle: (config as any).navTitle,
      habitLibrary: (config as any).navTitle.habit.habitLibrary,
    };
  }

  // 针对不同的左侧按钮触发不同操作
  private leftHandle() {
    const { left } = this.headerInfo;

    switch (left) {
      case 'file':
        this.$router.push({ path: '/edit/recycle' });
        break;
      case 'letter':
        this.$router.push({ path: '/card/receive' });
      default:
        break;
    }
  }
  // 针对不同的右侧按钮触发不同操作
  private rightHandle() {
    const right = this.headerInfo.right;

    switch (right) {
      case 'new':
        this.newHabit();
        break;
      // case 'file':
      // this.newHabit();
      // break;

      default:
        break;
    }
  }

  private newHabit() {
    this.$router.push({ path: '/new/library' });
    // this.show = true;
    // this.habitLibrary = this.navTitle.habit.habitLibrary;
  }

  private hide() {
    this.show = false;
    this.habitLibrary = this.navTitle.habit.habitLibrary;
  }
}
</script>

<style lang="scss" scoped>
header {
  display: flex;
  align-items: center;
  width: 100%;
  justify-content: space-around;
  background-color: #fff;
  .left {
    width: 3.5rem;
    align-items: center;
  }
  .center {
      flex: 1;
  }
  .right {
    width: 3.5rem;
    align-items: center;
  }
}


.van-popup {
  width: 100%;
  height: 100%;
}
</style>
