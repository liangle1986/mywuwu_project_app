<template>
  <div class="today">
      <!-- 首页展示图片 -->
        <HomeImage :imageList="images"/>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';
import { Swipe, SwipeItem, Icon, Toast } from 'vant';
import { Mutation, State } from 'vuex-class';
import state, { TimeSlotList, ImgInfo } from '@/store/state';
// import _ from '@/utils';HomeImage.vue
import HomeImage from '@/components/common/Home/Img/HomeImage.vue';
// import Circles from '@/components/common/Circle/Circle.vue';


@Component({
  components: {
    [Swipe.name]: Swipe,
    [SwipeItem.name]: SwipeItem,
    [Icon.name]: Icon,
    // Circles,
    HomeImage,
  },
})
export default class Today extends Vue {
  // 获取缓存首页展示图片
  @Mutation private gethomeImg!: (homeImg: ImgInfo[]) => void;

  // 得到缓存中首页图片
  private images: any = [];

  private data() {
    return {
      images: (state as any).imgageList,
    };
  }

}
</script>

<style lang="scss" scoped>
@import '../../style/mixin';
.today {
  height: calc(100vh - 7rem);
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
  overflow: auto;
}
</style>
