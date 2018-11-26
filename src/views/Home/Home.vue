<template>
  <div class="today">
      <!-- 首页展示图片 -->
      <section>
         <HomeImage :imageList="images"/>
      </section>
     <section>
       <van-list
          v-model="loading"
          :finished="finished"
          @load="onLoad"
          :loading-text="text"
        >
         <span v-for="(image, index) in list" :key="index">
            <HomeCard  :image="image"/>
         </span>
        </van-list>
     </section>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';
import { Swipe, SwipeItem, Icon, Toast, List } from 'vant';
import { Mutation, State } from 'vuex-class';
import state, { TimeSlotList, ImgInfo } from '@/store/state';
// import _ from '@/utils';HomeImage.vue
import HomeImage from '@/components/common/Home/Img/HomeImage.vue';
import HomeCard from '@/components/common/Card/HomeCard.vue';


@Component({
  components: {
    [Swipe.name]: Swipe,
    [SwipeItem.name]: SwipeItem,
    [Icon.name]: Icon,
    [List.name]: List,
    // Circles,
    HomeImage,
    HomeCard,
  },
})
export default class Today extends Vue {
  // 获取缓存首页展示图片
  @Mutation private gethomeImg!: (homeImg: ImgInfo[]) => void;

  // 得到缓存中首页图片
  private images: any = [];

  private loading: boolean = true;

   private finished: boolean = true;

   private list: any = [];

  private data() {
    return {
      images: (state as any).imgageList,
      loading: false,
      finished: false,
      text: '主人别着急，马上就好!',
      // list:  (state as any).imgageList,
    };
  }
  private onLoad() {
      if (this.list === null ||  this.list.length <= 0) {
          const showList = JSON.stringify(this.images);
          this.list = JSON.parse(showList);
      }
      // 异步更新数据
      setTimeout(() => {
        for (let i = 0; i < 10; i++) {
          this.list.push(this.list[0]);
        }
        // 加载状态结束
        this.loading = false;
        // 数据全部加载完成
        if (this.list.length >= 40) {
          this.finished = true;
        }
      }, 500);
    }
}
</script>

<style lang="scss" scoped>
.today {
  height: calc(100vh - 7rem);
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
  overflow: scroll;
}
</style>
