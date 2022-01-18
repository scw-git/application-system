<template>
  <div class="queryAndApply" v-loading="loading">
    <div class="timeline">
      <span>报考进度：</span>
      <span :class="{ black: progressTag == 1 }">开始</span>
      <i class="el-icon-arrow-right"></i>
      <span :class="{ black: progressTag == 2 }"> 确认个人报考资料 </span>
      <i class="el-icon-arrow-right"></i
      ><span :class="{ black: progressTag == 3 }"> 完成报考 </span>
      <!-- <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/' }">开始 </el-breadcrumb-item>
        <el-breadcrumb-item > 确认个人报考资料 </el-breadcrumb-item>
        <el-breadcrumb-item> 完成报考 </el-breadcrumb-item>
      </el-breadcrumb> -->
    </div>
    <div class="frame" v-show="progressTag == 1">
      <div class="frame_title">
        考试查询与报名 <span style="color: red">(注意只能报考一个岗位)</span> ：
      </div>
      <div class="table">
        <el-table border :data="dataList">
          <el-table-column
            align="center"
            prop="examUnit"
            label="报考单位"
          ></el-table-column>
          <el-table-column
            align="center"
            prop="examName"
            label="考试名称"
          ></el-table-column>
          <el-table-column
            align="center"
            prop="recruitmentJob"
            label="考试岗位"
          ></el-table-column>
          <el-table-column align="center" prop="time" label="报名时间">
            <template slot-scope="scope"
              >{{ scope.row.applyStartDate }} <br />
              {{ scope.row.applyEndDate }}
            </template></el-table-column
          >

          <el-table-column align="center" width="200" label="操作">
            <template slot-scope="scope">
              <!-- :disabled="scope.row.ifPost == '1' ? true : false" -->
              <el-button
                size="mini"
                :type="scope.row.ifPost == '1' ? 'danger' : 'primary'"
                @click="toApplicationForm(scope.row.id)"
                >{{ scope.row.ifPost == "1" ? "已报名" : "报名" }}</el-button
              >
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
    <div class="personData" v-show="progressTag == 2">
      <div style="display: flex; justify-content: flex-end; margin-right: 10%">
        <el-button
          style="margin-left: 45px"
          size="small"
          type="primary"
          @click="progressTag = 1"
          >返回</el-button
        >
        <el-button size="small" type="danger" @click="signUp">报名</el-button>
      </div>
      <el-upload
        style="margin-left: 45px; margin-top: 10px"
        class="upload-demo"
        action="/api/examinee/upload-annex"
        :data="{ id: this.id }"
        :headers="headers"
        :on-remove="handleRemove"
        multiple
        :limit="3"
        :file-list="fileList"
      >
        <el-button size="small" type="primary">附件上传</el-button>
        <div slot="tip" class="el-upload__tip">最多上传三个文件</div>
      </el-upload>

      <application-form :data="dataList"></application-form>
    </div>
    <div class="finish" v-show="progressTag == 3">
      <p style="text-align: center; font-size: 22px; color: red">
        您已经完成报考，请耐心等待审核
        <el-button
          type="primary"
          @click="() => this.$router.push('student_operation_queryStatus')"
          >点击查看报名状态</el-button
        >
      </p>
    </div>
  </div>
</template>
<script>
import * as api from "@/api/operation";
import applicationForm from "@/views/page/components/applicationForm";
export default {
  components: {
    applicationForm,
  },
  data() {
    return {
      loading: false,
      progressTag: 1,
      dataList: [],
      fileList: [],
      id: "", //要报考的岗位id
      headers: {
        Authorization: JSON.parse(sessionStorage.getItem("loginInfo")).token,
      },
    };
  },
  created() {
    this.getExamList();
  },
  methods: {
    // 删除附件
    handleRemove(file, fileList) {
      api.delFj(file.id).then((res) => {
        this.$message.success("删除成功");
      });
    },
    // 获取附件
    getFj(id) {
      api.getFj(id).then((res) => {
        if (res.data) {
          res.data.forEach((item, i) => {
            res.data[i].name = item.fileName;
          });
          this.fileList = res.data;
        }
      });
    },
    //获取考试列表
    getExamList() {
      this.loading = true;
      api.getExamList().then((res) => {
        this.dataList = res.rows;
        this.loading = false;
      });
    },
    signUp() {
      this.$confirm(
        "请确认报名信息都填写完整了，每个账号只有一次机会！",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }
      ).then(() => {
        api.signUp(this.id).then((res) => {
          if (res.code == 200) {
            this.$message({ type: "success", message: "报名成功！" });
            this.progressTag = 3;
          }
        });
      });
    },
    toApplicationForm(id) {
      this.id = id;
      api.getConfirmForm(id).then((res) => {
        if (res.code != 500) {
          this.progressTag = 2;
          this.dataList = res.data;
          this.getFj(id);
        }
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.timeline {
  margin: 30px;
  margin-left: 45px;
  display: flex;
  // justify-content: center;
  align-items: center;
  span:nth-of-type(n + 2) {
    font-weight: 700;
    padding: 0 10px;
  }
  .black {
    color: white;
    background-color: #f56c6c;
    border-radius: 3px;
  }
}
</style>