<template>
  <div class="interview p15">
    <div class="search">
      <el-select v-model="value" placeholder="选择岗位">
        <el-option label="岗位一" value="1"> </el-option>
        <el-option label="岗位二" value="2"> </el-option>
      </el-select>
      <el-button size="medium" type="primary"> 批量导入成绩</el-button>
    </div>
    <div class="table">
      <el-table border :data="dataList">
        <el-table-column align="center" type="selection" width="55">
        </el-table-column>
        <el-table-column align="center" prop="name" label="姓名">
        </el-table-column>
        <el-table-column align="center" prop="id" label="身份证号">
        </el-table-column>
        <!-- <el-table-column align="center" prop="job" label="报考单位"> -->
        <!-- </el-table-column> -->
        <el-table-column align="center" prop="zkzh" label="准考证号">
        </el-table-column>
        <el-table-column align="center" prop="kskm" label="考试科目">
        </el-table-column>
        <el-table-column align="center" prop="writtenScore" label="笔试成绩">
        </el-table-column>
        <el-table-column align="center" prop="adress" label="面试地点">
        </el-table-column>
        <el-table-column align="center" prop="time" label="面试时间">
        </el-table-column>
        <el-table-column align="center" prop="status" label="面试状态">
        </el-table-column>
        <el-table-column
          width="110"
          align="center"
          label="面试成绩"
          prop="score"
        >
          <template slot-scope="scope">
            <span v-if="scope.row.interviewScore">{{
              scope.row.interviewScore
            }}</span>
            <el-button type="warning" size="mini" v-else>导入成绩</el-button>
          </template>
        </el-table-column>

        <el-table-column align="center" label="操作">
          <template slot-scope="scope">
            <el-button size="mini" @click="toDetail(scope)" type="primary"
              >查看</el-button
            >
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
          //   job: "会计",
          zkzh: "45634773",
          kskm: "事业单位",
          writtenScore: "88",
          interviewScore: "90",
          adress: "广西民族大学",
          time: "2021-01-12",
          status: "已结束",
        },
        {
          name: "张三",
          course: "事业单位考试",
          id: "23546433254",
          unit: "广西财政厅",
          //   job: "会计",
          zkzh: "45634773",
          kskm: "事业单位",
          writtenScore: "88",
          interviewScore: "",
          adress: "广西民族大学",
          time: "2021-01-12",
          status: "未开始",
        },
      ],
    };
  },
  methods: {
    toDetail() {},
  },
};
</script>
<style lang="scss" scoped>
.interview {
  .search {
    margin-bottom: 10px;
  }
  .table {
  }
}
</style>