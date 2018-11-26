<template>
    <figure>
        <van-card
            :desc="image.desc" :title="image.name + ' 创建时间:' + date" :thumb="image.url" >
        <div slot="footer">
            <van-button size="mini">关注</van-button>
            <van-button  @click="showFollow" size="mini">评论</van-button>
            <van-button size="mini">下载</van-button>
        </div>
        </van-card>
    </figure>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import { Card, Button} from 'vant';
import state, {ImgInfo, State } from '@/store/state';
import { Mutation } from 'vuex-class';
import moment from 'moment';
// moment.locale('zh-cn');
@Component({
    components: {
        [Card.name]: Card,
        [Button.name]: Button,
    },
})
export default class HomeCard extends Vue {
  @Prop() private image!: ImgInfo;
  @Mutation private getImageInfo!: (image: ImgInfo) => void;
  private data() {
    return {
      date: moment().format('YYYY-MM-DD 24h:mm:ss'),
    };
  }
  // 跳转到关注页面
 private showFollow() {
    const {image} = this;
    this.getImageInfo(image);
    this.$router.push({ path: '/follow' });
 }
}
</script>

<style lang="scss" scoped>
.van-card {
    margin-left: -1.85rem; 
    width: calc(100vw - 1.4rem);
}
</style>
