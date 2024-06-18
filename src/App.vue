<template>
  <div class="layout">
    <div class="header">
      <h1>疾病预测可视化大屏</h1>
    </div>
    <div class="content">
      <div class="left-boxes">
        <div class="box box-left-1" style="background-color: #f0f0f0;">

          <checkResult></checkResult>
        </div>
        <div class="box box-left-2" style="background-color: #e0e0e0;">
          <disease-name> </disease-name>
        </div>
      </div>
      <div class="middle-box" style="background-color: #d0d0d0;">
        <!-- 这里可以添加中间非常大的盒子内容 -->
        <diseasePrediction></diseasePrediction>
      </div>
      <div class="right-boxes">
        <div class="box box-right-1" style="background-color: #c0c0c0;">
          
          <p>共病关联分析：</p>
          疾病共现分析：分析患者数据库，识别常见的疾病组合。
          风险因素关联：确定哪些生活方式或遗传因素与共病有关。
        </div>
        <div class="box box-right-2" style="background-color: #b0b0b0;">
          <p>疾病预测模型：</p>
          风险评估：基于患者的个人信息和病史，评估未来患某种疾病的风险。
          预测模型：使用机器学习算法来预测疾病的发展趋势。
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import checkResult from "@/components/CheckResult.vue";
import diseaseName from "@/components/DiseaseName.vue";
import helloWorld from "@/components/HelloWorld.vue";
import diseasePrediction from "@/components/DiseasePrediction.vue";
import diseaseCorrelationChart from "@/components/DiseaseCorrelationChart.vue";
// 组件导入省略，因为在这里它们仅作为占位符
</script>

<style scoped>
.layout {
  display: flex;
  flex-direction: column;
  height: 50vh; /* 使布局占据整个视口高度 */
}

.header {
  background-color: #eaeaea;
  padding: 20px;
  text-align: center;
  border-bottom: 1px solid #ccc;
  flex: 0 0 10%; /* 标题盒子占据10%的高度 */
}

.content {
  display: flex;
  justify-content: center;
  flex: 0 0 90%; /* 剩余90%的高度 */
  padding: 20px;
  box-sizing: border-box; /* 确保padding不影响内容区域的大小 */
}

.left-boxes, .right-boxes {
  display: flex;
  flex-direction: column;
  justify-content: space-between; /* 垂直方向等距分布 */
  flex: 0 0 20%; /* 左右两边各占20%的宽度 */
  padding: 10px;
}

.middle-box {
  flex: 0 0 60%; /* 中间盒子占据60%的宽度 */
  padding: 20px;
  box-sizing: border-box;
}

.box {
  width: 100%; /* 盒子宽度占满其容器 */
  height: 45%; /* 每个小盒子高度为所在区域的50%（因为是两个盒子，所以各占一半） */
  border: 1px solid #ccc;
  box-sizing: border-box;
}

/* 如果需要，可以进一步添加边距或其他样式细节 */
</style>