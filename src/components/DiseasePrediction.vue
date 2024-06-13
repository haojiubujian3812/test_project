<template>
  <div>
    <h1>疾病预测</h1>
    <form @submit.prevent="submitForm">
      <label for="consequents">输入诊断名称:</label>
      <input type="text" id="consequents" v-model="consequents" required>
      <button type="submit">提交</button>
    </form>
    <el-table :data="predictRules"  style="width: 100%" height="750">
      <el-table-column
          prop="antecedents"
          label="强关联的疾病"
          width="180"

      />
      <el-table-column
          prop="consequents"
          label="输入的病症"
          width="180"

      />
      <el-table-column prop="confidence" label="关联的置信度（可能性）" width="180" />
    </el-table>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import { GBGL_URL } from '@/api/api.js'; // 导入 API URL

const consequents = ref('疼痛');
const predictRules = ref([]);

const submitForm = async () => {
  try {
    // 发送 POST 请求到后端，包含输入的后件
    const response = await axios.post(GBGL_URL + '/' + encodeURIComponent(consequents.value), {
      // 这里可以添加其他要发送到后端的数据
    });
    console.log('后端返回的数据:', response.data);
    console.log(typeof response.data);

    // 将后端返回的JSON数据转换为适合在Element UI表格中显示的格式
    predictRules.value=response.data.filter(rule => rule.consequents == consequents.value).filter(rule => {
          // 使用正则表达式检查前件是否包含逗号
      console.log(rule.antecedents,"111",rule.antecedents.length)
          return rule.antecedents.length==1;
        }).map(rule => ({
      antecedents: rule.antecedents,
      consequents: rule.consequents,
      confidence: rule.confidence,
    }));

    // 检查predictRules是否被更新
    console.log('预测规则:', predictRules.value);

  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

onMounted(() => {
  // 组件挂载后，调用 submitForm 方法
  submitForm();
});
</script>
