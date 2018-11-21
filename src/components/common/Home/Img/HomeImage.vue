<template>
    <!-- 首页展示图片 -->
    <van-swipe :autoplay="3000" class="home-img" @change="onChange">
        <van-swipe-item class="van-img" v-for="(image, index) in imageList" :key="index">
            <img  v-on:click="onClick(index)" v-lazy="image.url" :alt="image.name" />
        </van-swipe-item>
         <!-- <div class="custom-indicator" slot="indicator">
          {{ current + 1 }}/{{countSize}}
        </div> -->
    </van-swipe>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import { Swipe, SwipeItem, Lazyload, ImagePreview } from 'vant';
import { Mutation, State } from 'vuex-class';
import state, { ImgInfo } from '@/store/state';
Vue.use(Lazyload, {
  loading: 'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=4216091012,4283409120&fm=27&gp=0.jpg',
  error: 'assets/404.jpg',
});
@Component({
  components: {
    [Swipe.name]: Swipe,
    [SwipeItem.name]: SwipeItem,
  },
})
export default class HomeImage extends Vue {
 @Prop() private imageList!: ImgInfo[];
 private current!: number;
 private countSize!: number;
 private data() {
      return {
        current: 0,
        countSize: this.imageList.length,
      };
    }
  private onChange(index: number) {
    this.current = index;
    }

    private onClick(index: number) {
      const ImgList: any = [];
      // 循环获取URL链接
      this.imageList.forEach((element: ImgInfo) => {
        ImgList.push(element.url);
      });
      ImagePreview({
        images: ImgList,
        startPosition: index,
        onClose() {
          // do something
        },
      });
    }
}
</script>


<style src="./style.scss" lang="scss" scoped>
</style>
