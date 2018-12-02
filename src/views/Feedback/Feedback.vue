<template>
   <div class="feedback"> 
         <section class="title">
           <van-rate v-model="rateValue"  />
          </section>
        <!-- 输入框 -->
        <section>
            <p>留言板</p>
            <van-field v-model="message" type="textarea" placeholder="请输入评论" rows="4" autosize />
        </section>
        <!-- 确认发送 -->
        <section>
            <van-button :loading="loading" @click="send" size="small" >评论</van-button>
            <van-button @click="send" size="small" >取消</van-button>
        </section>
        <van-cell title="给作者反馈" is-link />
   </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import { Field, Button, Toast } from 'vant';
import { State, Mutation } from 'vuex-class';
import { SettingState, UserState } from '@/store/state';
import { feedback } from '@/api/feedback';

@Component({
  components: {
    // [Cell.name]: Cell,
    [Field.name]: Field,
    [Button.name]: Button,
    // [NavBar.name]: NavBar,
  },
})
export default class Feedback extends Vue {
  @State private user!: UserState;
  private message?: string;
  private rateValue?: number;
//   private title!: string;
  private loading!: boolean;
  @Prop() private imgId!: string;
  public data() {
    return {
      message: '',
      title: this.$route.name,
      loading: false,
      rateValue: 2,
    };
  }
//   private onClickLeft() {
//     this.$router.go(-1);
//   }
  private async send() {
    if (this.message) {
      const createTime = new Date().valueOf();
      const res = await feedback({
        content: this.message,
        createTime,
        username: this.user.username,
      })
        // tslint:disable-next-line:no-shadowed-variable
        .then((res) => res.data)
        .catch((e: string) => Toast(e));

      if (res.message) {
        Toast(res.message);
        this.$router.go(-1);
      }
    } else {
      Toast('请补充完反馈信息');
    }
  }
}
</script>

<style lang="scss" scoped>
// @import '../../style/mixin';
.van-nav-bar {
  height: 3.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  svg {
    @include iconSize(1.4rem);
  }
}
</style>
