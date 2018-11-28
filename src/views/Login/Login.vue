<template>
    <div class="login">
        <!-- 导航 -->
        <section>
            <van-nav-bar @click-left="onClickLeft">
                <van-icon name="back" slot="left" />
                <h3 v-if="title" slot="title">{{title}}</h3>
            </van-nav-bar>
        </section>
        <!-- 登录 -->
        <main>
            <section>
                <van-cell-group>
                    <van-field v-model="username" label="用户名" icon="close" placeholder="邮箱/手机号" 
                    required @click-icon="username = ''"  :error-message="errorMessage" />
                    <van-field v-model="password" type="password" label="密码" placeholder="请输入密码" required />
                </van-cell-group>
            </section>
            <van-button @click="handleLogin" size="small" type="primary">登录</van-button> 
            <!-- <van-button @click="handleLogin" size="small" type="primary">注册</van-button> -->
            <van-loading  v-if="user.isLogin===0" type="spinner" color="black" />
        </main>
        <section class="partyLogin">
          <div class="zhifubao" v-on:click="showLogin(1)">
            <van-icon name="zhifubao1" />
            <p>支付宝登录</p>
          </div>
          <div  class="weixin"  v-on:click="showLogin(2)">
            <van-icon name="weixindenglu2"/>
            <p>微信登录</p>
          </div>
        </section>
    </div>
</template>
<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';
import { NavBar, Field, CellGroup, Button, Toast, Loading, Icon } from 'vant';
import { Mutation, State, Action } from 'vuex-class';
import { UserState } from '@/store/state';
import { aliThreeLogin } from '@/api/user';

@Component({
  components: {
    [NavBar.name]: NavBar,
    [Field.name]: Field,
    [CellGroup.name]: CellGroup,
    [Button.name]: Button,
    [Loading.name]: Loading,
    [Icon.name]: Icon,
  },
})
export default class Login extends Vue {
  // @Action public login!: (data: { username: string; password: string }) => void;
  @Action public getToken!: (data: { username: string; password: string }) => void;
  // @Action public threeLogin!: (data: {type: number }) => string;
  @Mutation private loginLoading!: () => void;
  @State private user!: UserState;
  private message?: string;
  private title!: string;
  private username!: string;
  private password!: string;
  // private type!: number;
  private errorMessage!: string;
  public data() {
    return {
      username: '',
      title: this.$route.name,
      password: '',
      errorMessage: '',
      // type: 1,
    };
  }

  @Watch('user', { immediate: true, deep: true })
  private onUserChanged(val: UserState, oldVal: UserState) {
    if (val.isLogin === 1) {
      this.$router.go(-1);
    }
  }

  private handleLogin() {
    const { username, password } = this;
    if (!username || !password) {
      Toast('请输入完整的用户名和密码');
    } else {
      if (this.checkMobile(username) || this.checkEmail(username)) {
          // 先获取token 然后根据返回的token 获取用户信息和权限
          this.getToken({username, password});
          this.loginLoading();
      }
    }
  }
  private onClickLeft() {
    this.$router.go(-1);
  }

// 验证手机号
private checkMobile(str: string) {
    const re = /^1\d{10}$/;
    if (re.test(str)) {
      this.errorMessage = '';
      return true;
    } else {
      this.errorMessage = '手机号码格式不正确！';
      return false;
    }
  }

// 验证email
private checkEmail(str: string) {
    const re = /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/;
    if (re.test(str)) {
      this.errorMessage = '';
      return true;
    } else {
      this.errorMessage = '手机号码格式不正确！';
      return false;
    }
  }

// 获取支付宝授权链接
 private async showLogin(type: number) {
    Toast('asdfafasdf' + type);
    const data = await aliThreeLogin()
    .then((res) => res.data)
    .catch((e: string) => Toast('登录失败，系统错误！' + e));
    try {
       window.location.href = data.data;
    } catch (error) {
      Toast('请检查移动端是否已下载支付宝。');
    }
  }
}
</script>

<style lang="scss" scoped>
.van-nav-bar {
  height: 3.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  svg {
    @include iconSize(1.4rem);
  }
}

main {
  section {
    margin-bottom: 3rem;
  }
  height: calc(50vh - 6rem);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.partyLogin {
  height: calc(50vh - 6rem);
  display: flex;
  // flex-direction: row-reverse;
  justify-content:space-around;
  align-items: center;
  .van-icon {
    // height: 5rem !important;
    // width: 5rem;
    font-size: 3rem;
  }
  .zhifubao {
    color: rgb(60, 171, 235);
  }
  .weixin {
    color: rgb(72, 199, 61);
  }
}
p {
  font-size: .87rem;
}
</style>
