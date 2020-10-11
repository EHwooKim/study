<template>
  <canvas ref="myChart" width="200" height="200">
  </canvas>
</template>

<script>
  import Chart from 'chart.js'

  export default {
    name: 'LineChart',
    data() {
      return {}
    },
    props: {
      chartData: Object
    },
    methods: {
      makeChart: function() {
        let ctx = this.$refs.myChart
        new Chart(ctx, {
          type: 'line',
          data: {
              labels: this.chartData.Date,
              datasets: [
                {
                  label: '저가',
                  lineTension: 0,
                  data: this.chartData.Low,
                  backgroundColor: [
                    'transparent'
                  ],
                  borderColor: [
                    'red'
                  ],
                  borderWidth: 1
                },
                {
                  label: '고가',
                  lineTension: 0,
                  data: this.chartData.High,
                  backgroundColor: [
                    'transparent'
                  ],
                  borderColor: [
                    'blue',
                  ],
                  borderWidth: 1
                },
                {
                  label: '종가',
                  lineTension: 0,
                  data: this.chartData.Close,
                  backgroundColor: [
                    'transparent'
                  ],
                  borderColor: [
                    'green',
                  ],
                  borderWidth: 1
                },
              ]
          }
      });
    }
    },
    mounted: function() {
      console.log('mounted chart')
        let ctx = this.$refs.myChart
        new Chart(ctx, {
          type: 'line',
          data: {
              labels: [],
              datasets: []
          }
      });
    },
    watch: {
      chartData: function() {
        console.log('watch')
        this.makeChart()
      }
    }
}

</script>

<style>

</style>