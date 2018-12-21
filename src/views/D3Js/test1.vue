<template>
  <section class="test">
    <div class="test1">
      <p>Apple</p>
      <p id="myid">Pear</p>
      <p>Banana</p>
    </div>
    <div class="test2"></div>
  </section>
</template>
<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import { NavBar, Field, CellGroup, Button, Toast, Loading, Icon } from "vant";
import * as d3 from "d3";
// let d3 = require("d3");
@Component({
  components: {
    [NavBar.name]: NavBar,
    [Field.name]: Field,
    [CellGroup.name]: CellGroup,
    [Button.name]: Button,
    [Loading.name]: Loading,
    [Icon.name]: Icon
  }
})
export default class test1 extends Vue {
  mounted() {
    // this.$nextTick(() => {
    //      this.addData();
    // });
    // 选择<body>中所有的<p>，其文本内容为 www.ourd3js.com，选择集保存在变量 p 中
    let p = d3
      .select("div")
      .selectAll("p")
      .text("www.ourd3js.com");

    this.addData();
    // this.$nextTick(() => {
    //   this.addSvg();
    // });
    this.addSvg();
  }

  // 数据绑定
  private addData() {
    const str = "China";

    const div = d3.select(".test1");
    const p = div.selectAll("p");

    p.datum(str);

    p.text((d, i) => {
      return "第 " + i + " 个元素绑定的数据是 " + d;
    });
    // data 形式绑定
    const dataset = ["I like dogs", "I like cats", "I like snakes"];
    p.data(dataset).text((d, i) => {
      return d;
    });
    //插入元素 改变第一个
    var p1 = div.select("p");
    p1.style("color", "red");
    //修改段落的颜色和字体大小 修改所以p标签
    p.style("color", "red").style("font-size", "72px");

    // 根据id修改
    var p2 = div.select("#myid");
    p2.style("color", "red");

    // append()：在选择集末尾插入元素
    div.append("p").text("append p element");
    // insert()：在选择集前面插入元素
    div.insert("p", "#myid").text("asdfasdfasfd");
    // 删除元素使用 remove，例如：
    div.select("#myid").remove();
  }

  // 使用svg
  private addSvg() {
    // 使用 D3 在 div 元素中添加 svg 的代码如下。
    const width = "100vw"; //画布的宽度
    const height = "100vh"; //画布的高度

    const test2 = d3.select(".test2"); //选择文档中的body元素
    test2
      .append("svg") //添加一个svg元素
      .attr("width", width) //设定宽度
      .attr("height", height); //设定高度
    // enter需要先创建svg然后在选择
    const svg = test2.select("svg");
    //添加图形属性
    let dataset = [250, 210, 170, 130, 90, 60]; //数据（表示矩形的宽度）
    const rectHeight = 25; //每个矩形所占的像素高度(包括空白)
    // svg
    //   .selectAll("rect") //选择svg内所有的矩形
    //   .data(dataset) //绑定数组
    //   .enter() //指定选择集的enter部分
    //   .append("rect") //添加足够数量的矩形元素
    //   .attr("x", 20)
    //   .attr("y", (d, i) => {
    //     return i * rectHeight;
    //   })
    //   .attr("width", d => {
    //     return d;
    //   })
    //   .attr("height", rectHeight - 2)
    //   .attr("fill", "steelblue");

    const dataset1 = [0,1.2, 2.3, 0.9, 1.5, 3.3];
    //比例尺scale
    const min: number = d3.min(dataset1) || 0;
    const max: number = d3.max(dataset1) || 0;

    var linear = d3
      .scaleLinear()
      .domain([0, max])
      .range([0, 300]);

    console.log(linear(0.9)); //返回 0
    // console.log(linear(2.3)); //返回 175
    linear(3.3); //返回 300

    //定义颜色比例尺
    let index: string[] = ["0", "1", "2", "3", "4"];
    var color = ["red", "blue", "green", "yellow", "black"];
    var ordinal = d3
      .scaleOrdinal()
      .domain(index)
      .range(color);

    // console.log(ordinal("0")); //返回 red
    ordinal("2"); //返回 green
    ordinal("4"); //返回 black
    // 给柱形图添加比例尺
    // dataset = [2.5, 2.1, 1.7, 1.3, 0.9];

    // var linear = d3
    //   .scaleLinear()
    //   .domain([0, d3.max(dataset) || 0])
    //   .range([0, 250]);

    svg
      .selectAll("rect")
      .data(dataset1)
      .enter()
      .append("rect")
      .attr("x", 20)
      .attr("y", (d, i) => {
        return i * rectHeight;
      })
      .attr("width", d => {
        return linear(d); //在这里用比例尺
      })
      .attr("height", rectHeight - 2)
      .attr("fill", (d, i) => {
        const t: string = i + "";
        return ordinal(t) + "";
      });

    //   定义坐标轴
    var axis = d3
      .axisBottom(linear)
      //  .scale(linear)      //指定比例尺
      //  .orient("bottom")   //指定刻度的方向
      .tickValues(dataset1); //指定刻度的数量
    // svg.append("g").call(axis);

    svg
      .append("g")
      .attr("class", "axis")
      .attr("transform", "translate(20,160)")
      .call(axis);
  }
}
</script>

<style lang="scss">
.test {
  height: calc(100vh);
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
  overflow: scroll;
  div {
    border-color: red;
  }
}

.axis path,
.axis line {
  fill: none;
  stroke: red;
  shape-rendering: crispEdges;
}

.axis text {
  font-family: sans-serif;
  font-size: .81rem;
  color: red;
}
</style>
