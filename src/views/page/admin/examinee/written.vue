<template>
  <div class="written p15">
    <div class="search">
      <el-select v-model="value" placeholder="选择岗位">
        <el-option label="岗位一" value="1"> </el-option>
        <el-option label="岗位二" value="2"> </el-option>
      </el-select>
      <el-button style="margin-left: 20px" size="medium" type="primary">
        批量导出</el-button
      >
      <el-button size="medium" type="primary"> 批量导入成绩</el-button>
      <el-button size="medium" type="primary"> 批量发送面试通知</el-button>
    </div>
    <div class="table">
      <el-table border :data="dataList">
        <el-table-column align="center" type="selection" width="55">
        </el-table-column>
        <el-table-column
          align="center"
          label="姓名"
          prop="name"
        ></el-table-column>
        <el-table-column
          align="center"
          label="考试科目"
          prop="course"
        ></el-table-column>
        <el-table-column
          align="center"
          label="准考证号"
          prop="id"
        ></el-table-column>

        <el-table-column
          align="center"
          label="报考单位"
          prop="unit"
        ></el-table-column>
        <el-table-column
          align="center"
          label="报考岗位"
          prop="job"
        ></el-table-column>
        <el-table-column
          width="80"
          align="center"
          label="考场号"
          prop="kch"
        ></el-table-column>
        <el-table-column
          width="80"
          align="center"
          label="座位号"
          prop="zwh"
        ></el-table-column>
        <el-table-column
          width="110"
          align="center"
          label="笔试成绩"
          prop="score"
        >
          <template slot-scope="scope">
            <span v-if="scope.row.score">{{ scope.row.score }}</span>
            <el-button type="warning" size="mini" v-else>导入成绩</el-button>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          label="已发面试"
          prop="interview"
        ></el-table-column>
        <el-table-column label="操作" align="center" width="250px">
          <template slot-scope="scope">
            <!-- <el-button @click="check(scope.row)" type="text" size="mini"
              >导入成绩</el-button
            > -->
            <el-button size="mini" type="primary">详情</el-button>
            <el-button size="mini" type="success"> 通知面试</el-button>
            <el-button size="mini" type="danger">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      value: "",
      dataList: [
        {
          name: "张三",
          course: "事业单位考试",
          id: "23546433254",
          unit: "广西财政厅",
          job: "会计",
          kch: "08",
          zwh: "08",
          score: "88",
          interview: "是",
        },
        {
          name: "张三",
          course: "事业单位考试",
          id: "23546433254",
          unit: "广西财政厅",
          job: "会计",
          kch: "08",
          zwh: "08",
          score: "",
          interview: "否",
        },
      ],
    };
  },
  methods: {},
};
</script>
<style lang="scss" scoped>
.written {
  .search {
    margin-bottom: 20px;
  }
}
</style>