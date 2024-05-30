import { createApp } from 'vue'
import axios from 'axios'
// import vuex from 'vuex'
//引入element-plus
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css'
import App from './App.vue'
//引入vue-router配置文件
// import router from '@/route/index'
// //引入vuex配置文件
// import store from '@/store/index'
//引入highchart图表库
// import Highchart from "highcharts/highcharts";
// import HighchartsVue from 'highcharts-vue';
// // 引入hightcharts中的venn模块（否则韦恩图出不来）
// import venn from 'highcharts/modules/venn'
// import highchartsMore from 'highcharts/highcharts-more'
// highchartsMore(Highchart)
// venn(Highchart);


createApp(App).use(ElementPlus)
const app = createApp(App)
app.config.globalProperties.$http = axios;
// app.use(router)
// app.use(store)
app.use(ElementPlus)
// app.use(HighchartsVue);
app.mount('#app')
