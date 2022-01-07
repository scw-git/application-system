<template>
  <div class="interview p15">
    <div class="search">
      <el-select v-model="value" placeholder="选择岗位">
        <el-option label="岗位一" value="1"> </el-option>
        <el-option label="岗位二" value="2"> </el-option>
      </el-select>
      <el-button
        style="margin-left: 10px"
        @click="exportData"
        size="medium"
        type="primary"
      >
        批量导出</el-button
      >
      <el-upload
        ref="upload"
        style="display: inline-block; padding: 0 10px"
        class="upload-demo"
        action="/api/place-info/interview-batch-import"
        :limit="1"
        :headers="headers"
        accept=".xlsx, .xls"
        :on-success="handleFileSuccess"
        :show-file-list="false"
      >
        <el-button size="medium" type="primary"> 批量导入成绩</el-button>
      </el-upload>
    </div>
    <div class="table" v-loading="loading">
      <el-table border :data="dataList">
        <el-table-column align="center" label="序号" type="index" width="50">
        </el-table-column>
        <el-table-column width="80px" align="center" prop="name" label="姓名">
        </el-table-column>

        <el-table-column
          align="center"
          prop="admissionTicketNumber"
          label="准考证号"
        >
        </el-table-column>
        <el-table-column align="center" prop="examName" label="考试名称">
        </el-table-column>
        <el-table-column align="center" prop="recruitmentJob" label="考试岗位">
        </el-table-column>

        <el-table-column align="center" prop="placeAddress" label="面试地点">
        </el-table-column>
        <el-table-column
          align="center"
          width="160px"
          prop="time"
          label="面试时间"
        >
          <template slot-scope="scope">
            {{ scope.row.startExamDate }} <br />
            {{ scope.row.endExamDate }}
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          width="80px"
          prop="writtenScore"
          label="笔试成绩"
        >
        </el-table-column>
        <el-table-column
          width="80"
          align="center"
          label="面试成绩"
          prop="score"
        >
          <template slot-scope="scope">
            <span>{{
              scope.row.interview ? scope.row.interview : "暂无成绩"
            }}</span>
          </template>
        </el-table-column>

        <el-table-column align="center" width="200px" label="操作">
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="openDialog(scope.row.id)"
              type="warning"
              >填写成绩</el-button
            >
            <el-button size="mini" type="danger">删 除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-dialog :visible.sync="dialog" width="35%">
        <el-form label-width="100px">
          <el-form-item label="面试成绩">
            <el-input v-model="form.interview"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="interviewScore" type="primary">确认</el-button>
          <el-button @click="dialog = false">取消</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>
<script>
import * as api from "@/api/examinee";
import { downloadFile } from "@/utils/downloadFile";

export default {
  data() {
    return {
      loading: false,
      value: "",
      dialog: false,
      form: {},
      dataList: [],
      headers: {
        Authorization: JSON.parse(sessionStorage.getItem("loginInfo")).token,
      },
    };
  },
  created() {
    this.getInterviewList();
  },
  methods: {
    // 文件上传成功处理
    handleFileSuccess(res, file, fileList) {
      if (res.code == 200) {
        this.$message.success("导入成功！");
        this.getInterviewList();
      }
    },
    exportData() {
      let name = new Date().getFullYear() + "年面试统计.xlsx";
      api.exportInterviewTemplate({ id: "" }).then((res) => {
        downloadFile(res, name);
      });
    },
    openDialog(id) {
      this.dialog = true;
      this.form.id = id;
    },
    // 填写成绩
    interviewScore() {
      if (this.form.interview) {
        api.interviewScore(this.form).then((res) => {
          if (res.code == 200) {
            this.$message.success("填写成功！");
            this.dialog = false;
            this.getInterviewList();
          }
        });
      } else {
        this.$message.warning("请写面试成绩！");
      }
    },
    toDetail() {},
    getInterviewList() {
      this.loading = true;
      api.getInterviewList().then((res) => {
        this.dataList = res.rows;
        this.loading = false;
      });
    },
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