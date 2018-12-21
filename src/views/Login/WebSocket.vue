<template>
    <div class="socket">
        <!-- 大厅 -->
        <main>
            <section>
                <van-cell-group>
                    <van-field v-model="username" label="编号" icon="close" placeholder="编号" 
                    required @click-icon="username = ''" />
                    <van-field v-model="message" type="textarea" label="消息" placeholder="发送的消息" required />
                </van-cell-group>
            </section>
            <van-button @click="hellosocket" size="small" type="primary">发送给组</van-button> 
             <van-button @click="hellosocket" size="small" type="primary">发送给个人消息</van-button> 
        </main>
    </div>
</template>
<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';
import { NavBar, Field, CellGroup, Button, Toast, Loading, Icon } from 'vant';
import { Mutation, State, Action } from 'vuex-class';
import {MessageInfo} from '@/store/state';
import {websocket, readSend} from '@/api/websocket';

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
export default class socket extends Vue {
  @State private mess!: MessageInfo;
  private message?: string;
  private username!: string;
  private websocket!: any;
  public data() {
    return {
      username: '',
      password: '',
      message: '',
    };
  }


    // 初始化执行
  private created() {
      alert(this.mess.code);
    // this.lasToken();
    this.showSocket(JSON.stringify({userId: 'A0001', groupId: this.mess.code}));
    // this.message = this.mess.message;
  }
  private showSocket (message: string) {
      let ws = new WebSocket('ws://localhost:8081/mywuwu/websocket/'+message);
      ws.onopen = () => {
          // Web Socket 已连接上，使用 send() 方法发送数据
          console.log('数据发送中...');
        //   ws.send('Holle');
          console.log('数据发送完成');
      }
      ws.onmessage = evt => {
            console.log('数据已接收...');
            this.mess.code = '0001';
            this.mess.message = JSON.stringify(evt.data);
            this.message = JSON.stringify(evt.data);
      }
      ws.onclose = function () {
          // 关闭 websocket
          console.log('连接已关闭...');
      }
      // 路由跳转时结束websocket链接
      this.$router.afterEach(() => {
          ws.close();
      });
  }



  private async hellosocket() {
      const { username } = this;
    await readSend({'groupId': username});
  }
  private onClickLeft() {
    this.$router.go(-1);
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
