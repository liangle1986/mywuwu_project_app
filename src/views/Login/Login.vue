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
            <p>支付宝登录{{message}}</p>
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
import { UserState, ToKenInfo, MessageInfo, State as sta } from '@/store/state';
import { aliThreeLogin } from '@/api/user';
import {getToken as newToken } from '@/utils';

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
  @Action public login!: (data: { username: string; password: string }) => void;
  @Action public getToken!: (data: { username: string; password: string }) => void;
  @Action public threeLogin!: (data: {logToken: string }) => void;
  @Mutation private loginLoading!: () => void;
  @Mutation private setMess!: (data: MessageInfo) => void;
  @State private user!: UserState;
  @State private token!: ToKenInfo;
  @State private mess!: MessageInfo;
  private logToken!: string;
  private message?: string;
  private title!: string;
  private username!: string;
  private password!: string;
  private type!: number;
  private errorMessage!: string;
  private websocket!: any;
  public data() {
    return {
      username: '',
      title: this.$route.name,
      password: '',
      errorMessage: '',
      type: 0,
      message: '',
    };
  }

    // 初始化执行
  private created() {
    this.lasToken();
    this.setGroup();
  }

 private setGroup() {
  this.mess.code = 'G0007';
  this.mess.message = '有新人进入G0007房间了哦！';
  this.setMess(this.mess);
 }
  private lasToken() {
   setTimeout((res: any) => {
      const showToken = newToken();
      if (showToken !== undefined && this.token.token !== showToken) {
        this.token.token = showToken;
        alert(5555);
        this.lasToken();
      }
    }, 1000);
  }


  @Watch('user', { immediate: true, deep: true })
  private onUserChanged(val: UserState, oldVal: UserState) {
    if (val.isLogin === 1) {
      this.$router.go(-1);
    }
  }


  // 获取用户信息
  @Watch('token', { immediate: true, deep: true })
  private onTokenChanged(val: ToKenInfo, oldVal: ToKenInfo) {
    if (val !== undefined && oldVal !== undefined) {
      alert(val + '============' + oldVal);
      if (this.type === 1) {
            // 根据支付宝的token获取对应支付宝用户信息
            this.logToken = val.token ? val.token : '';
            const {logToken} = this;
            this.threeLogin({logToken});
          } else if (this.type === 2) {
            // 微信
          } else {
              // 本地tonken获取信息
              const { username, password } = this;
              this.login({username, password});
          }
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
      this.type = type;
      const data = await aliThreeLogin({type})
      .then((res) => res.data)
      .catch((e: string) => Toast('登录失败，系统错误！' + e));
      if (data) {
        window.location.href = data.data;
        alert(data.data + 'AAAAAAAAAAAAAAA');
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
