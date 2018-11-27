<template>
    <figure>
        <img src="https://picsum.photos/200/300/?random" />
        <figcaption>{{saying}}</figcaption>
          {{time}}
    </figure>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
@Component({})
export default class Card extends Vue {
 private saying!: string;
 private time!: number;
  private data() {
    return {
      date: '授权成功！',
      time: 5,
    };
  }
  
  // 初始化执行
  private created (){
    this.setTime();
  }
  
  // 点击站点名
  private setTime () {
      let that = this
      if (this.time <= 0) {
        //逻辑代码
       const obj = this.$route.query;

    
        this.$router.push({path:'/login', query: obj});
      } else {
          setTimeout(function () {
            that.time --;
            that.setTime();
          }, 1000)
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
    height: 12rem;
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
