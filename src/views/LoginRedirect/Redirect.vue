<template>
    <figure>
        <img src="https://picsum.photos/200/300/?random" />
        <figcaption>{{saying}}</figcaption>
    </figure>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import { Action } from 'vuex-class';
import {CloseWebPage,  IsPC} from '@/utils';
@Component({})
export default class Card extends Vue {
  @Action public threeLoginToken!: (data: {authCode: string}) => void;
  private saying!: string;
  private time!: number;
  private authCode!: string;
  private data() {
    return {
      saying: '授权成功！',
      time: 5,
    };
  }
  // 初始化执行
  private created() {
    this.setTime();
  }
  // 点击站点名
  private setTime() {
      const that = this;
      if (this.time <= 0) {
        // 逻辑代码
        const obj = this.$route.query;
         // 设置token信息
        if (obj !== null && obj !== undefined) {
          this.authCode = obj.auth_code;
          alert(this.authCode);
          // 获取登录信息
          const {authCode} = this;
          this.threeLoginToken({authCode});

          if (IsPC()) {
            this.$router.push({path: '/'});
          } else {
            this.saying = '授权成功了，请关闭页面并返回.';
            // CloseWebPage();
          }
        }
        // this.$router.push({path: '/login', query: obj});
      } else {
          setTimeout((res: any) => {
            that.time --;
            that.setTime();
          }, 1000);
      }
    }

}
</script>

<style lang="scss" scoped>
figure {
  display: flex;
  justify-content: space-around;
  flex-direction: column;
  box-shadow: 2px 2px 5px #b4b0b0d8;
  @include font(0.8rem);
  img {
    width: 100%;
    height: calc(100vw - 3rem);
  }
  figcaption {
    height: 8rem;
    margin: 1rem 0;
    padding: 0.5rem;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .footer {
    @include font(0.5rem);
    color: #b4b0b0d8;
    padding: 0 1rem;
    height: 2rem;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }
}
</style>
