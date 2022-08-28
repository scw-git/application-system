<template>
  <div class="scoreQuery p15" v-loading="loading">
    <el-table v-if="!isShow" :data="dataList">
      <el-table-column
        label="序号"
        align="center"
        type="index"
      ></el-table-column>
      <el-table-column
        label="考试名称"
        align="center"
        prop="examName"
      ></el-table-column>
      <el-table-column
        label="报考岗位"
        align="center"
        prop="recruitmentJob"
      ></el-table-column>
      <el-table-column
        label="准考证号"
        align="center"
        prop="admissionTicketNumber"
      >
        <template slot-scope="scope">
          {{
            scope.row.admissionTicketNumber
              ? scope.row.admissionTicketNumber
              : "暂无准考证号"
          }}
        </template>
      </el-table-column>

      <el-table-column
        label="姓名"
        align="center"
        prop="name"
      ></el-table-column>
      <el-table-column label="笔试成绩" align="center" prop="writtenScore">
        <template slot-scope="scope">
          {{
            scope.row.writtenScore ? scope.row.writtenScore : "暂无成绩"
          }}</template
        ></el-table-column
      >
      <!-- <el-table-column label="是否进入面试" align="center" prop="">
        <template slot-scope="scope">
          {{
            scope.row.ifInterview == "1"
              ? "是"
              : scope.row.ifInterview == "0"
              ? "否"
              : "待定中"
          }}
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button
            :disabled="scope.row.ifInterview == '1' ? false : true"
            size="small"
            type="primary"
            @click="showInterview(scope.row.id)"
            >打印面试准考证</el-button
          >
        </template>
      </el-table-column> -->
    </el-table>
    <el-button
      v-if="isShow"
      @click="isShow = false"
      type="primary"
      size="small"
    >
      返回</el-button
    >
    <interview :id="id" v-if="isShow"></interview>
  </div>
</template>
<script>
import { getScoreList } from "@/api/operation";
import interview from "@/views/page/components/interview.vue";

export default {
  components: {
    interview,
  },
  data() {
    return {
      loading: false,
      isShow: false,
      dataList: [],
      id: "",
    };
  },
  created() {
    this.getScoreList();
  },
  methods: {
    showInterview(id) {
      console.log(id);
      this.id = id;
      this.isShow = true;
    },
    getScoreList() {
      this.loading = true;
      getScoreList().then((res) => {
        this.dataList = res.rows;
        this.loading = false;
      });
    },
    // toInterview() {
    //   this.$router.push("student_operation_interview");
    // },
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