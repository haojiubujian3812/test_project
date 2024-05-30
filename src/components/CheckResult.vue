<template>
  <div>
    <el-input v-model="patientId" placeholder="请输入患者ID"></el-input>
    <el-button type="primary" @click="loadPatientData">加载患者数据</el-button>
    <el-card v-if="patientData" class="patient-data-card">
      <h2>患者ID: {{ patientId }}</h2>
      <div v-for="(record, index) in patientData" :key="index" class="record-item">
        <h3>检查名称 {{ index + 1 }}:</h3>
        <p>{{ record.checkName }}</p>
        <p>结果: {{ record.result }}</p>
        <p>参考值: {{ record.reference }}</p>
        <p>时间: {{ record.time }}</p>
      </div>
    </el-card>
    <el-card v-if="comorbidityWarnings" class="comorbidity-warnings-card">
      <h2>共病预警</h2>
      <ul>
<!--        <li v-for="warning in comorbidityWarnings" :key="warning.id">-->
          <h3>{{ warning.disease1 }} 和 {{ warning.disease2 }} 之间的关联性较高</h3>
          <p>基于当前患者的检查结果，这两个疾病之间可能存在共病风险。</p>
<!--        </li>-->
      </ul>
    </el-card>
  </div>
</template>

<script>
import { ref } from 'vue';
import axios from 'axios';
import { JCJL_URL } from '@/api/api.js'; // 导入 URL

export default {
  setup() {
    const patientId = ref('');
    const patientData = ref(null);
    const comorbidityWarnings = ref(null);

    async function loadPatientData() {
      patientData.value = await fetchPatientData(patientId.value);
      if (!patientData.value) {
        alert('未找到对应的患者数据。');
      }
    }

    async function fetchPatientData(patientId) {
      try {
        const response = await axios.get(JCJL_URL, { params: { patientId: patientId } });
        return response.data;
      } catch (error) {
        console.error('Error fetching data:', error);
        return null;
      }
    }


    // 假设关联规则数据如下：
    const rules = [
      { antecedents: ['病种A'], consequents: ['病种B'], confidence: 0.8 },
      { antecedents: ['病种B'], consequents: ['病种C'], confidence: 0.6 },
      { antecedents: ['病种C'], consequents: ['病种A'], confidence: 0.6 },
      { antecedents: ['病种D'], consequents: ['病种A'], confidence: 0.6 },
      { antecedents: ['病种D'], consequents: ['病种C'], confidence: 0.6 },
      { antecedents: ['病种A'], consequents: ['病种C'], confidence: 0.6 },
    ];
    function identifyComorbiditiesFromRules(rules) {
      // 过滤出共病规则，这里假设confidence阈值以上为共病规则
      const comorbidityThreshold = 0.5;
      const comorbidities = rules.filter(rule => {
        // 检查规则的置信度是否超过阈值
        return rule.confidence >= comorbidityThreshold;
      });

      // 进一步处理，例如只提取病种名称
      const simplifiedComorbidities = comorbidities.map(rule => {
        return {
          antecedent: rule.antecedents.join(' 和 '), // 假设antecedents是数组
          consequent: rule.consequents.join(' 和 '), // 假设consequents是数组
          confidence: rule.confidence
        };
      });

      return simplifiedComorbidities;
    }
    console.log(identifyComorbiditiesFromRules(rules))
//     async function identifyComorbidities() {
//       // 这里应该是实现共病识别的逻辑，例如使用Apriori算法
//       // 假设我们已经有了一个共病识别函数
//       const comorbidities = identifyComorbiditiesFromPatientData(patientData.value);
//       comorbidityWarnings.value = comorbidities;
//
// // 调用函数并赋值给comorbidityWarnings
//       const comorbidityWarnings = identifyComorbiditiesFromRules(rules);
// // 输出共病警告信息
//       console.log(comorbidityWarnings);
//     }

    return {
      patientId,
      patientData,
      comorbidityWarnings,
      loadPatientData,
      // identifyComorbidities,
    };
  }
};
</script>

<style/>
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

<style/>