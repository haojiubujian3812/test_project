<template>
  <div>
    <el-input v-model="personId" placeholder="请输入ID"></el-input>
    <el-button type="primary" @click="loadHealthProfile">加载健康画像</el-button>
    <!-- 功能点：个人健康画像展示 -->
    <el-card v-if="healthProfile" class="health-profile-card">
      <h2>ID: {{ personId }}</h2>
      <div v-for="(record, index) in healthProfile" :key="index" class="record-item">
        <h3>就诊名称 {{ index + 1 }}:</h3>
        {{record['sub_content']}}
      </div>
      <!-- 图表容器，根据需要添加图表 -->
      <div id="healthProfileChart" style="width: 200px;height:400px;"></div>
    </el-card>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import {GBGL_URL, JZMC_URL} from '@/api/api.js'; // 导入 API URL

const personId = ref('1001Z810000001X5X3NE');
const healthProfile = ref(null);

const loadHealthProfile = async () => {
  healthProfile.value = await fetchHealthData(personId.value);
  console.log(healthProfile.value)
  if (!healthProfile.value) {
    alert('未找到对应的健康记录。');
  }
};

const fetchHealthData = async (personId) => {
  try {
    const response = await axios.post(JZMC_URL+ '/' + encodeURIComponent(personId), );
    console.log('2后端返回的数据:', response.data);
    console.log(typeof response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    return null;
  }
};
const showDetail = (detail) => {
  // 在这里，您可以添加逻辑来处理点击事件，例如在另一个 Vue 组件中显示详细信息
  console.log('点击了:', detail);
};
onMounted(() => {

});
</script>

<style>
.health-profile-card {
  margin-top: 20px;
}

.record-item {
  margin-bottom: 10px;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  background-color: #f9f9f9;
}

.record-item h3 {
  margin: 0;
  font-size: 1em;
}

.record-item p {
  margin: 0;
  font-size: 0.9em;
  color: #333;
}
</style>
