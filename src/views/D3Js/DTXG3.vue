<template>
  <section class="test">
    <div class="test3"></div>
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
    this.$nextTick(() => {
      this.addSvg();
    });
  }

  // 数据绑定添加 SVG 画布
  private addSvg() {
    const width = 500;
    const height = 500;
    const test3 = d3.select(".test3");
    test3
      .append("svg")
      .attr("width", "50vw")
      .attr("height", "50vh");
    const svg = test3.select("svg");
    // let circle1 = svg
    //   .append("circle")
    //   .attr("cx", 100)
    //   .attr("cy", 100)
    //   .attr("r", 45)
    //   .style("fill", "yellow");
    // // 在1秒（1000毫秒）内将圆心坐标由100变为300
    // circle1
    //   .transition()
    //   .duration(1000)
    //   .attr("cx", 300);
    // //  第二个圆，要求既移动 x 坐标，又改变颜色。
    // let circle2 = svg
    //   .append("circle")
    //   .attr("cx", 100)
    //   .attr("cy", 100)
    //   .attr("r", 45)
    //   .style("fill", "blue");
    // circle2
    //   .transition()
    //   .duration(1500)
    //   .attr("cx", 300)
    //   .style("fill", "red");

    // let circle3 = svg
    //   .append("circle")
    //   .attr("cx", 100)
    //   .attr("cy", 100)
    //   .style("fill", "red")
    //   .attr("r", 45);
    // circle3
    //   .transition()
    //   .duration(2000)
    //   .ease(d3.easeBounce)
    //   .attr("fill", "red")
    //   .attr("r", 25);

    // 画圆
    var dataset = [30, 10, 43, 55, 13];
    let pie = d3.pie();
    const piedata = pie(dataset);
    const outerRadius = 150; //外半径
    const innerRadius = 0; //内半径，为0则中间没有空白
    const arc = d3
      .arc() // 弧形生成器
      .innerRadius(innerRadius)
      .outerRadius(outerRadius);

    const arcs = svg
      .selectAll("g")
      .data(piedata)
      .enter()
      .append("g")
      .attr("transform", "translate" + width / 2 + "," + width / 2 + ")");
    arcs
      .append("path")
      .attr("fill", (d, i) => {
        return color(i + "");
      })
      .attr("d", d => {
        return arc(d);
      });

    var color = d3.scaleOrdinal(d3.schemeCategory10); //有十种颜色的颜色比例尺

    arcs
      .append("text")
      .attr("transform", (d) => {
        return `translate(${arc.centroid(d)})`;
      })
      .attr("text-anchor", "middle")
      .text(d => {
        return d.data + "";
      });
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
  font-size: 0.81rem;
  color: red;
}
.MyText {
  background-color: blue;
}
</style>
