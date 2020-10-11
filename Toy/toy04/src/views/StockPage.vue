<template>
  <div class="stock-page-container">
    <div class="grid-box">
      <div class="chart-grid">
        <h2>회사 데이터 ---</h2>
        <LineChart :chartData="chartData"/>
      </div>
      <div class="info-grid">
        <Input v-on:searchData="searchData"/>
        <InfoTable :tableData="tableData"/>
      </div>
    </div>
  </div>

</template>

<script>
import axios from 'axios'
import LineChart from '../components/LineChart.vue'
import Input from '../components/Input.vue'
import InfoTable from '../components/InfoTable.vue'

export default {
  components: {
    LineChart,
    Input,
    InfoTable,
  },
  data() {
    return {
      tableData: {
        MinMax: {
          buydate: '-',
          buy: '-',
          selldate: '-',
          sell: '-',
          profit: '-'
        },
        close: {
          buydate: '-',
          buy: '-',
          selldate: '-',
          sell: '-',
          profit: '-'          
        }
      },
      chartData: {},
    }
  },
  methods: {
    searchData: function(company) {
      this.$emit('toggleLoading')
      axios.get(`http://127.0.0.1:8000/api/get/${company}`)
        .then(res => {
          console.log(res)
          this.tableData = res.data.price // 테이블 값
          this.chartData = res.data.chart // 테이블 값
          this.$emit('toggleLoading')
        })
        .catch(err => {
          this.$emit('toggleLoading')
          console.error(err)
        })
    }
  }
}
</script>

<style scoped>
  .stock-page-container {
    padding-top: 36px;
    width: 80vw;
    margin: 0 auto;
  }
  .grid-box {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
  }
  .chart-grid h2 {
    text-align: center;
  }
  .info-grid {
    display: grid;
    grid-template-rows: 10% 90%;
  }
</style>