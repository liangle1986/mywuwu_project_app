<template>
  <section class="follow">
      <!-- 导航 -->
      <section>
          <van-nav-bar @click-left="onClickLeft">
              <van-icon name="back" slot="left" />
              <h3 v-if="title" slot="title">{{title}}</h3>
          </van-nav-bar>
      </section>
      <section class="followCenter">
        <section class="imageTitle">
          <img v-lazy="imgInfo.url" :alt="imgInfo.name" />
        </section>
        <section class="followText">
           <van-list v-model="loading" :finished="finished" @load="onLoad"  :loading-text="text">
              <section  v-for="index in list" :key="index" class="followDiv">
                <section class="title">
                  <aside class="left">评论信息</aside>
                  <aside class="right">时间</aside>
                  <aside class="left"><van-icon v-for="index in 5" v-bind:key="index" name="xingxing_xuanzhong" /> </aside>
                  <aside class="right">评论人</aside>
                </section>
                <section class="center">
                  <!-- <div> -->asd
                      asdffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffsdaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa222
                      ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
                      fffffffffffffffffffffffffffffffffffffffffffffffff

                  <!-- </div> -->
                      <!-- <van-field v-model="message" type="textarea" rows="5" placeholder="写出你想说的话..." /> -->
                      <!-- <van-button @click="save(message)" class="button" size="small">保存</van-button> -->
                </section>
              </section>
           </van-list>
          </section>
      </section>
  </section>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';
import { Lazyload, Icon, NavBar, List, CellGroup, Field } from 'vant';
import { Mutation, Action, State } from 'vuex-class';
import {ImgInfo} from '@/store/state';

Vue.use(Lazyload, {
  loading: 'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=4216091012,4283409120&fm=27&gp=0.jpg',
  error: '@/assets/404.jpg',
});

@Component({
  components: {
    [Icon.name] : Icon,
    [NavBar.name]: NavBar,
    [List.name]: List,
     [Field.name]: Field,
    [CellGroup.name]: CellGroup,
  },
})
export default class Follow extends Vue {
    // 需要查询图片信息
    @Action private getImageInfo!: (id: number) => void;
    @State private imgInfo!: ImgInfo;
    private title!: string;
    private message!: string;
    private loading: boolean = false;
    private finished: boolean = false;
    private list: number[] = [];
  private data() {
    return {
       title: this.$route.name,
       message: '想操你妹啊',
      //  imgInfos: this.imgInfo,
      text: '主人别着急，马上就好!',
    };
  }

  // 返回上一个页面
  private onClickLeft() {
    this.$router.go(-1);
  }


  // 加载信息
  private onLoad() {
    // 异步更新数据
    setTimeout(() => {
      for (let i = 0; i < 10; i++) {
        this.list.push(this.list.length + i);
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
 .follow {
  @include wh(calc(100vw), calc(100vh));
  // margin: .1rem;
  overflow: auto;
  align-items: center;
  // 先看看div占位
   .followCenter {
    display: flex;
    justify-content:flex-start;
    flex-direction: column;
    // background-color: red;
    margin-top: 3.6rem;
    height: calc(100vh - 3.6rem);
    width: calc(100vw);
    .imageTitle {
      @include wh(calc(100vw - .1rem), calc(100vh - 80vh));
      img {
         @include wh(calc(100vw - .1rem), calc(100vh - 80vh));
      }
    }
    // 评论区样式
    .followText {
      @include wh(calc(100vw - .1rem), calc(100vh - 20vh));
      .followDiv {
        width: calc(100vw - .4rem);
        border: solid .032rem rgba(173, 146, 146, 0.924);
        border-radius: 1.5rem;
        align-items: center;
        margin: .2rem;
         background-color: rgba(209, 199, 199, 0.924);
        .title {
            display: flex;
            align-items: center;
            // width: calc(100vw - 1.4rem);
            justify-content: space-around;
            // background-color: #fff;
            flex-flow: wrap;
            @include font(.35rem, 1.2rem);
            margin: .5rem;
             .left {
                padding-left: .1rem; 
                text-align: left;
                width: calc(100vw - 45vw);
              }
              .right {
                // margin-right: .2rem; 
                padding-right: .5rem; 
                text-align: right;
                width: calc(100vw - 65vw);
              }
            .van-icon {
               color: $follow;
            }
        }
        .center {
          border-radius: 1.5rem;
          width: calc(100vw - .5rem);
          height: 8rem;
          word-wrap:break-word;
          overflow: auto;
        }
      }
    }
   }
   // 头部
   .van-nav-bar {
    height: 3.5rem;
    width: calc(100vw);
    display: flex;
    justify-content: space-around;
    flex-direction: column;
    align-items: center;
    position:fixed;
    top:0px; 
    left:0px;
    svg {
      @include iconSize(1.2rem);
    }
   }
  }
 
</style>
