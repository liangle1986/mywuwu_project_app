<template>
  <section class="test">
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
    this.$nextTick(() => {
      this.addSvg();
    });
  }

  // 数据绑定添加 SVG 画布
  private addSvg() {
    //画布大小
    var width = 400;
    var height = 400;

    //在 body 里添加一个 SVG 画布
    const test2 = d3.select(".test2"); //选择文档中的body元素
    test2
      .append("svg") //添加一个svg元素
      .attr("width", width) //设定宽度
      .attr("height", height); //设定高度
    // enter需要先创建svg然后在选择
    const svg = test2.select("svg").style("border", "1px solid #CCC");

    //画布周边的空白
    var padding = { left: 30, right: 30, top: 20, bottom: 20 };
    //定义一个数组
    var dataset: number[] = [10, 20, 30, 40, 33, 24, 12, 5];
    // d3.range(dataset.length)
    const range = d3.range(dataset.length).map(item => {
      return item.toString();
    });
    //x轴的比例尺
    var xScale = d3
      .scaleBand()
      .domain(range)
      .rangeRound([0, width - padding.left - padding.right]);

    //y轴的比例尺
    var yScale = d3
      .scaleLinear()
      .domain([0, d3.max(dataset) || 0])
      .range([height - padding.top - padding.bottom, 0]);

    //定义x轴
    var xAxis = d3.axisBottom(xScale);

    //定义y轴
    var yAxis = d3.axisLeft(yScale);
    // .scale(yScale)
    // .orient("left");

    //矩形之间的空白
    var rectPadding = 4;

    //添加矩形元素
    var rects = svg
      .selectAll(".MyRect")
      .data(dataset)
      .enter()
      .append("rect")

      .attr("class", "MyRect")
      .attr("transform", "translate(" + padding.left + "," + padding.top + ")")
      .attr("x", (d, i) => {
        return xScale(i + "") || 0 + rectPadding / 2;
      })

      // 动态柱状图设置开始
      .attr("y", d => {
        const min: number = yScale.domain()[0];
        return yScale(min);
      })
      .on("mouseover", function(d, i) {
        d3.select(this).attr("fill", "red");
      })
      .on("mouseout", function() {
        d3.select(this)
          .transition()
          .duration(1500)
          .attr("fill", "yellow");
      })
      .transition()
      .delay((d, i) => {
        return i * 200;
      })
      .duration(2000)
      .ease(d3.easeBounceIn)
      .attr("y", d => {
        return yScale(d);
      })
      // 结束
      .attr("width", xScale.bandwidth() - rectPadding)
      .attr("height", d => {
        return height - padding.top - padding.bottom - yScale(d);
      })
      .attr("fill", "yellow");

    //添加文字元素
    var texts = svg
      .selectAll(".MyText")
      .data(dataset)
      .enter()
      .append("text")
      .attr("class", "MyText")
      .attr("transform", "translate(" + padding.left + "," + padding.top + ")")
      .attr("x", (d, i) => {
        return xScale(i + "") || 0 + rectPadding / 2;
      })
      .attr("y", d => {
        return yScale(d);
      })
      .attr("dx", () => {
        return (xScale.bandwidth() - rectPadding) / 2;
      })
      .attr("dy", d => {
        return 20;
      })
      .text(d => {
        return d;
      })
      .attr("fill", "blue")
      .attr("text-anchor", "middle");
    // 添加x轴
    svg
      .append("g")
      .attr("class", "axis")
      .attr(
        "transform",
        "translate(" + padding.left + "," + (height - padding.bottom) + ")"
      )
      .call(xAxis);
    // 添加y轴
    svg
      .append("g")
      .attr("transform", "translate(" + padding.left + "," + padding.top + ")")
      .call(yAxis);
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
