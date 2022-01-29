<template>
  <div class="interview p15">
    <div class="search">
      <el-select
        clearable
        v-model="queryData.recruitmentJob"
        placeholder="请选择岗位"
      >
        <el-option
          v-for="(item, i) in jobList"
          :key="i"
          :label="item"
          :value="item"
        >
        </el-option>
      </el-select>

      <el-date-picker
        style="width: 140px; margin: 0 10px"
        value-format="yyyy-MM-dd"
        v-model="queryData.createTime"
        type="date"
        placeholder="选择日期"
      >
      </el-date-picker>
      <el-select
        clearable
        style="width: 120px"
        v-model="queryData.sex"
        placeholder="选择性别"
      >
        <el-option label="男" value="1"> </el-option>
        <el-option label="女" value="0"> </el-option>
      </el-select>
      <el-input
        clearable
        @keydown.enter.native="getInterviewList()"
        v-model="idOrName"
        style="width: 200px; margin: 0 10px"
        placeholder="请输入身份证或者名字"
      ></el-input>
      <el-button size="medium" type="primary" @click="getInterviewList()"
        >确定</el-button
      >
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
        action="/app/api/place-info/interview-batch-import"
        :limit="1"
        :headers="headers"
        accept=".xlsx, .xls"
        :on-success="handleFileSuccess"
        :on-error="() => (isLoading = false)"
        :before-upload="() => (isLoading = true)"
        :show-file-list="false"
      >
        <el-button :loading="isLoading" size="medium" type="primary">
          批量导入成绩</el-button
        >
      </el-upload>
    </div>
    <div class="table" v-loading="loading">
      <el-table @filter-change="filterChange" border :data="dataList">
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
          column-key="writtenScore"
          :filter-multiple="false"
          :filters="scoreFilters"
          width="100"
          align="center"
          prop="writtenScore"
          label="笔试成绩"
        >
        </el-table-column>
        <el-table-column
          column-key="interview"
          :filter-multiple="false"
          :filters="scoreFilters"
          width="100"
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

        <el-table-column align="center" width="130px" label="操作">
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="openDialog(scope.row.id)"
              type="warning"
              >填写成绩</el-button
            >
            <!-- <el-button size="mini" type="danger">删 除</el-button> -->
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
    <el-pagination
      v-if="total > 0"
      style="margin-top: 20px"
      layout="total,prev, pager, next"
      :total="total"
      :current-page="pagination.pageNum"
      @current-change="handleChangePageNum"
    >
    </el-pagination>
  </div>
</template>
<script>
import * as api from "@/api/examinee";
import { downloadFile } from "@/utils/downloadFile";

export default {
  data() {
    return {
      jobList: [],
      //搜索参数
      idOrName: "",
      queryData: {
        recruitmentJob: "",
        createTime: "",
        sex: "",
      },
      isLoading: false,
      total: 0,
      pagination: {
        pageNum: 1,
        pageSize: 10,
      },
      loading: false,
      value: "",
      dialog: false,
      form: {},
      dataList: [],
      headers: {
        Authorization: JSON.parse(sessionStorage.getItem("loginInfo")).token,
      },
      scoreFilters: [
        { text: "升序", value: "asc" },
        { text: "降序", value: "desc" },
      ],
    };
  },
  created() {
    this.getInterviewList();
    this.getJobList();
  },
  watch: {
    queryData: {
      handler: function () {
        this.getInterviewList();
      },
      deep: true,
    },
  },
  methods: {
    filterChange(filters) {
      if (filters.interview) {
        this.pagination.isAsc = filters.interview[0];
        this.pagination.orderByColumn = "interview";
      } else if (filters.writtenScore) {
        this.pagination.isAsc = filters.writtenScore[0];
        this.pagination.orderByColumn = "writtenScore";
      }
      this.getInterviewList();
    },
    // 获取岗位列表
    getJobList() {
      api.getJobList().then((res) => {
        this.jobList = res.data.recruitmentJob;
      });
    },
    handleChangePageNum(val) {
      this.pagination.pageNum = val;
      this.getInterviewList();
    },
    // 文件上传成功处理
    handleFileSuccess(res, file, fileList) {
      if (res.code == 200) {
        this.isLoading = false;
        this.$message.success("导入成功！");
        this.getInterviewList();
      } else {
        this.$message.error("导入失败！");
        this.isLoading = false;
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
      api
        .getInterviewList({
          ...this.pagination,
          ...this.queryData,
          idOrName: this.idOrName,
        })
        .then((res) => {
          this.dataList = res.rows;
          this.total = res.total;
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