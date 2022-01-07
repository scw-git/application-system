<template>
  <div class="queryStatus p15" v-loading="loading">
    <el-table :data="dataList" border>
      <el-table-column
        width="60px"
        align="center"
        type="index"
        label="序号"
      ></el-table-column>
      <el-table-column
        align="center"
        prop="exam_unit"
        label="招聘单位"
      ></el-table-column>
      <el-table-column
        align="center"
        prop="recruitment_job"
        label="招聘岗位"
      ></el-table-column>
      <el-table-column align="center" prop=" check_result" label="未通过原因"
        ><template slot-scope="scope">
          {{ scope.row.check_result ? scope.row.check_result : "暂无原因" }}
        </template></el-table-column
      >

      <el-table-column
        align="center"
        prop="exam_name"
        label="考试名称"
      ></el-table-column>
      <el-table-column align="center" prop="status" label="审核状态">
        <template slot-scope="scope"
          ><el-tag
            :type="
              scope.row.status == 0
                ? 'warning'
                : scope.row.status == 1
                ? 'success'
                : 'primary'
            "
            >{{
              scope.row.status == 0
                ? "未通过"
                : scope.row.status == 1
                ? "已通过"
                : "审核中"
            }}</el-tag
          >
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
import { queryStatus } from "@/api/operation";
export default {
  data() {
    return {
      loading: false,
      dataList: [],
    };
  },
  created() {
    this.queryStatus();
  },
  methods: {
    queryStatus() {
      this.loading = true;
      queryStatus().then((res) => {
        this.dataList = res.data;
        this.loading = false;
      });
    },
  },
};
</script>
<style lang="scss" scoped>
</style>