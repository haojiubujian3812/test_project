<template>
  <div ref="chartContainer" style="width: 100px; height: 600px;">1234</div>
</template>

<script>
import { Chart } from '@antv/g2';

export default {
  name: 'DiseaseACorrelationOverTime',
  mounted() {
    this.initChart();
  },
  methods: {
    initChart() {
      const data = [
        // 假设的数据
        { date: '2022-01-01', diseaseA: 10, diseaseB: 5 },
        { date: '2022-02-01', diseaseA: 15, diseaseB: 8 },
        // ... 更多数据
      ];

      const chartContainer = this.$refs.chartContainer;
      this.chart = new Chart({
        container: chartContainer,
        width: 900,
        height: 600,
        autoFit: true,
      });

      // 配置时间序列图
      this.chart.line().position('date*diseaseA').color('diseaseA');

      // 配置热力图
      this.chart.heatmap().position('date*diseaseB').color('diseaseB', '#BAE7FF-#1890FF-#0050B3');

      this.chart.render();
    },
  },
  data() {
    return {
      chart: null, // 图表实例
    };
  },
};
</script>

<style scoped>
/* 样式可以在这里定义 */
</style>
