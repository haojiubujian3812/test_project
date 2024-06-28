<template>
  <div>
    <el-input v-model="personId" placeholder="请输入就诊编码"></el-input>
    <el-button type="primary" @click="loadBasyData">加载患者数据</el-button>
    <el-card v-if="basyData" class="patient-data-card">
      <div v-for="(record, index) in basyData" :key="index" class="record-item">
        {{record}}
        <h3>就诊编码： <p>{{ record['就诊编码']}}</p></h3>
        <h3>住院次数： <p>{{ record['住院次数']}}</p></h3>
<!--        <h3>出院病区： <p>{{ record['出院病区']}}</p></h3>-->
      </div>
<!--      <div>就诊编码：{{ basyData['就诊编码'] }}</div>-->
<!--      <div>住院次数：{{ basyData['住院次数'] }}</div>-->
<!--      <div>入院日期：{{ basyData['入院日期'] }}</div>-->
<!--      <div>出院日期：{{ basyData['出院日期'] }}</div>-->
<!--      <div>出院病区：{{ basyData['出院病区'] }}</div>-->
<!--      <div>主诊断名称：{{ basyData['主诊断名称'] }}</div>-->
<!--      &lt;!&ndash; 其他诊断名称 &ndash;&gt;-->
<!--      <div v-if="basyData['其它诊断名称1']">其它诊断名称1：{{ basyData['其它诊断名称1'] }}</div>-->
<!--      <div v-if="basyData['其它诊断名称2']">其它诊断名称2：{{ basyData['其它诊断名称2'] }}</div>-->
<!--      <div v-if="basyData['其它诊断名称3']">其它诊断名称3：{{ basyData['其它诊断名称3'] }}</div>-->
<!--      <div v-if="basyData['其它诊断名称4']">其它诊断名称4：{{ basyData['其它诊断名称4'] }}</div>-->
<!--      &lt;!&ndash; 其他信息 &ndash;&gt;-->
    </el-card>
  </div>
</template>

<script>
import { ref } from 'vue';
import axios from 'axios';
import { BASY_URL } from '@/api/api.js'; // 导入 URL

export default {
  setup() {
    const personId = ref('1001Z810000001X5X3NE');
    const basyData = ref(null);

    async function loadBasyData() {
      try {
        const response = await axios.post(BASY_URL+'/'+encodeURIComponent(personId.value),{

        });
        console.log("3后端返回数据",response.data)
        basyData.value = response.data;
      } catch (error) {
        console.error('Error fetching data:', error);
        alert('未找到对应的患者数据。');
      }
    }

    return {
      personId,
      basyData,
      loadBasyData
    };
  }
};
</script>

<style>
.patient-data-card {
  margin-top: 20px;
}
</style>
