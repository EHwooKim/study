<template>
  <div>
    <mine-form/>
    <div>{{timer}}</div>
    <table-component/>
    <div>{{result}}</div>
  </div>
</template>

<script>
  import {mapState} from 'vuex'
  import {INCREMENT_TIMER} from './store'
  
  import store from './store'
  import tableComponent from './tableComponent'
  import mineForm from './mineForm'

  let interval
  export default {
    store,
    components: {
      tableComponent,
      mineForm
    },
    computed: {
      ...mapState(['halted', 'timer', 'result'])
    },
    methods: {

    },
    watch: {
      halted(value, oldValue) {
        if (value === false) {
          interval = setInterval(() => {
            this.$store.commit(INCREMENT_TIMER)
          }, 1000) // 자바스크립트에서 속도가 정확하지 않아서.. new Date를 활용해야 정확한 시간계산이 된다.
        } else { // 게임 중단
          clearInterval(interval)
        }
      },
    }
  }
</script>

<style>  
  table {
    border-collapse: collapse;
  }
  td {
    border: 1px solid black;
    width: 40px;
    height: 40px;
    text-align: center;
  }
</style>