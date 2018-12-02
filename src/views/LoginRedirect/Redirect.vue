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
import { Toast } from 'vant';
@Component({
})
export default class Redirect extends Vue {
  @Action public threeLoginToken!: (data: {authCode: string}) => void;
  private saying!: string;
  private time!: number;
  private authCode!: string;
  private data() {
    return {
      saying: '授权中，请稍等！',
      time: 5,
    };
  }
  // 初始化执行
  private created() {
    this.getToken();
  }

// 获取调用的token
  private async getToken() {
    Toast.loading({
      duration: 0,       // 持续展示 toast
      forbidClick: true, // 禁用背景点击
      loadingType: 'spinner',
      message: this.saying,
    });
    // 逻辑代码
    const obj = this.$route.query;
      // 设置token信息
    if (obj !== null && obj !== undefined) {
      this.authCode = obj.auth_code;
      alert(this.authCode);
      // 获取登录信息
      const {authCode} = this;
      await this.threeLoginToken({authCode});
      this.saying = '授权成功了，请关闭页面并返回.';
      if (IsPC()) {
        this.$router.push({path: '/'});
      } else {
        // CloseWebPage();
        Toast.clear();
      }
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
