<template>
  <div class="scoreQuery p15">
    <!-- <el-empty>
      <div slot="description">
        <span style="font-size:20px;color:#02a7f0">成绩查询时间未开放，请于2021-5-12至2021-7-12</span>
      </div>
    </el-empty>-->
    <el-table :data="dataList">
      <el-table-column
        label="序号"
        align="center"
        type="index"
      ></el-table-column>
      <el-table-column
        label="考试名称"
        align="center"
        prop=""
      ></el-table-column>
      <el-table-column
        label="报考岗位"
        align="center"
        prop=""
      ></el-table-column>
      <el-table-column
        label="准考证号"
        align="center"
        prop=""
      ></el-table-column>
      <el-table-column
        label="身份证号"
        align="center"
        prop=""
      ></el-table-column>
      <el-table-column label="姓名" align="center" prop=""></el-table-column>
      <el-table-column label="成绩" align="center" prop=""></el-table-column>
      <el-table-column
        label="是否进入面试"
        align="center"
        prop=""
      ></el-table-column>
    </el-table>
    <div class="result">
      <h1 style="font-weight: 700; text-align: center">
        2021年下半年全国事业单位考试
      </h1>
      <div class="content">
        <span>任务名称：2021年下半年全国事业单位考试</span>
        <span>报考岗位：xxxx</span>
        <span>准考证号：34626423</span>
        <span>身份证号：20215463463</span>
        <span>姓 名：scw</span>
        <span
          >成 绩：<span style="display: inline-block; color: red"
            >88</span
          ></span
        >
        <span
          >是否进入面试：是
          <el-button
            @click="toInterview"
            style="margin-left: 30px"
            size="mini"
            type="primary"
            >打印面试准考证</el-button
          ></span
        >
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      dataList: [],
    };
  },
  methods: {
    toInterview() {
      this.$router.push("student_operation_interview");
    },
  },
};
</script>
<style lang="scss" scoped>
.scoreQuery {
  color: black;
  .result {
    width: 65%;
    margin: 20px auto;
    .content {
      line-height: 35px;
      font-size: 18px;
      margin: 20px 0;
      span {
        display: block;
      }
    }
  }
}
</style>