<template>
  <div class="queryStatus p15">
    <el-table :data="dataList" border>
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
      dataList: [],
    };
  },
  created() {
    this.queryStatus();
  },
  methods: {
    queryStatus() {
      queryStatus().then((res) => {
        this.dataList = res.data;
      });
    },
  },
};
</script>
<style lang="scss" scoped>
</style>