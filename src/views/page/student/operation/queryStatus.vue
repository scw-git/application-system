<template>
  <div class="queryStatus p15" v-loading="loading">
    <p style="color: red; font-size: 20px; padding: 5px 0">
      提示：如审核未通过，可在报名时间节点内按审核要求补齐资料后，重新报名！
    </p>
    <el-table v-if="isShow" :data="dataList" border>
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
      <el-table-column align="center" label="操作">
        <template slot-scope="scope">
          <el-button type="primary" @click="showDetail(scope.row.id)"
            >查看报名表</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <el-button v-if="!isShow" type="primary" @click="isShow = true"
      >返回</el-button
    >

    <application-form v-if="!isShow" :data="bmbData"></application-form>
    <div v-if="!isShow" style="margin-top: 5px" class="fj">
      <p>附件：</p>
      <a
        style="display: block"
        :href="item.url"
        v-for="item in fileList"
        :key="item.id"
      >
        {{ item.fileName }}
      </a>
    </div>
  </div>
</template>
<script>
import { queryStatus, getDshDetail, getFj } from "@/api/operation";
import applicationForm from "@/views/page/components/applicationForm";

export default {
  components: {
    applicationForm,
  },
  data() {
    return {
      isShow: true,
      loading: false,
      dataList: [],
      bmbData: [], //报名表信息
      fileList: [],
    };
  },
  created() {
    this.queryStatus();
  },
  methods: {
    // 获取附件
    getFj() {
      getFj().then((res) => {
        if (res.data) {
          res.data.forEach((item, i) => {
            res.data[i].name = item.fileName;
          });
          this.fileList = res.data;
        }
      });
    },
    showDetail(id) {
      this.getFj();
      this.isShow = false;
      getDshDetail(id).then((res) => {
        this.bmbData = res.data;
      });
    },
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