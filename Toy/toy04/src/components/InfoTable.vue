<template>
  <div class="info-table-container">
    <h3>고가 / 저가 기준</h3>
    <table>
      <thead>
        <tr>
          <th></th>
          <th>날짜</th>
          <th>가격 (USD)</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <th>구매일</th>
          <td>{{ tableData.MinMax.buydate }}</td>
          <td>{{ tableData.MinMax.buy }}</td>
        </tr>
        <tr>
          <th>판매일</th>
          <td>{{ tableData.MinMax.selldate }}</td>
          <td>{{ tableData.MinMax.sell }}</td>
        </tr>
      </tbody>
    </table>
    <p>최대 수익: <span>{{ tableData.MinMax.profit }} (USD)</span></p>

    <h3>종가 기준</h3>
    <table>
      <thead>
        <tr>
          <th></th>
          <th>날짜</th>
          <th>가격 (USD)</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <th>구매일</th>
          <td>{{ tableData.close.buydate }}</td>
          <td>{{ tableData.close.buy }}</td>
        </tr>
        <tr>
          <th>판매일</th>
          <td>{{ tableData.close.selldate }}</td>
          <td>{{ tableData.close.sell }}</td>
        </tr>
      </tbody>
    </table>
    <p>최대 수익: <span>{{ tableData.close.profit }} (USD)</span></p>
  </div>
</template>

<script>
  export default {
    data() {
      return {

      }
    },
    props: {
      tableData: Object
    }
  }
</script>

<style scoped>
  .info-table-container {
    width: 80%;
    margin: 0 auto;
    box-shadow: rgba(0, 0, 0, 0.09) 0px 4px 20px;
    border-radius: 13px;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
  .info-table-container h3 {
    text-align: center;
    margin-top: 12px;
  }
  .info-table-container p{
    margin-top: 12px;
    margin-right: 24px;
    text-align: right;
    font-weight: bold;
  }
  .info-table-container span {
    font-weight: normal;
  }
  table {
    width: 90%;
    margin: 12px auto 0;   
    border: 1px sold black;
    text-align: center;
  }
  th {
    background-color: rgb(0,198,142);
    color: white;
  }
  th, tr {
    padding: 12px 0;
  }
  tbody th {
    width: 20%;
  }
</style>