<template>
  <div class="stock-page-container">
    <Modal v-if="showModal" v-on:closeModal="closeModal"/>
    <Loading  v-if="showLoading"/>

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
import Modal from '../components/Modal.vue'
import Loading from '../components/Loading.vue'

export default {
  components: {
    LineChart,
    Input,
    InfoTable,
    Modal,
    Loading
  },
  data() {
    return {
      showModal: false,
      showLoading: false,

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
      this.showLoading = true
      axios.get(`http://127.0.0.1:8000/api/get/${company}`)
        .then(res => {
          console.log(res)
          this.tableData = res.data.price // 테이블 값
          this.chartData = res.data.chart // 테이블 값
          this.showLoading = false
        })
        .catch(err => {
          this.showLoading = false
          this.showModal = true
          console.error(err)
      })
    },
    closeModal: function() {
      this.showModal = !this.showModal
    },
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