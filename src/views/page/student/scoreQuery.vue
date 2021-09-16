<template>
  <div class="scoreQuery">
    <!-- <el-empty>
      <div slot="description">
        <span style="font-size:20px;color:#02a7f0">成绩查询时间未开放，请于2021-5-12至2021-7-12</span>
      </div>
    </el-empty>-->
    <div class="result">
      <h1 style="font-weight:700;text-align:center;">2021年下半年全国事业单位考试</h1>
      <div class="content">
        <span>任务名称：2021年下半年全国事业单位考试</span>
        <span>报考岗位：xxxx</span>
        <span>准考证号：34626423</span>
        <span>身份证号：20215463463</span>
        <span>姓 名：scw</span>
        <span>成绩：89</span>
      </div>

      <!-- <el-table :data="list" border width="600">
        <el-table-column prop="name" align="center" label="科目"></el-table-column>
        <el-table-column prop="score" label="成绩" align="center"></el-table-column>
      </el-table>-->
      <!-- <el-table :data="list" border width="600">
        <el-table-column prop="name" align="center" label="任务名称"></el-table-column>
        <el-table-column prop="job" label="报考岗位" align="center"></el-table-column>
        <el-table-column prop="zkzh" label="准考证号" align="center"></el-table-column>
        <el-table-column prop="id" label="身份证号" align="center"></el-table-column>
        <el-table-column prop="score" label="成绩" align="center"></el-table-column>
      </el-table>-->
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      // list: [
      //   { name: "基础知识", score: 88 },
      //   { name: "应用技术", score: 98 }
      // ]
      list: [
        {
          name: "2021年下半年全国事业单位考试",
          job: "xxxx",
          zkzh: "35463452",
          id: "452525242454",
          score: 89
        }
      ]
    };
  },
  methods: {}
};
</script>
<style lang="scss" scoped>
.scoreQuery {
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