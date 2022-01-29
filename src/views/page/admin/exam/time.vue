<template>
  <div class="time p15">
    <el-select clearable v-model="recruitmentJob" placeholder="请选择岗位">
      <el-option
        v-for="item in jobList"
        :key="item"
        :label="item"
        :value="item"
      >
      </el-option>
    </el-select>
    <el-input
      clearable
      @keydown.enter.native="getList()"
      v-model="examName"
      style="width: 200px; margin: 0 10px"
      placeholder="请输入考试名称"
    ></el-input>
    <el-button size="medium" type="primary" @click="getList()">确定</el-button>
    <div class="table" v-loading="loading">
      <el-table :data="dataList" border>
        <el-table-column
          label="序号"
          width="100"
          align="center"
          type="index"
        ></el-table-column>
        <el-table-column
          align="center"
          prop="examName"
          label="考试名称"
        ></el-table-column>
        <el-table-column
          align="center"
          prop="recruitmentJob"
          label="报考岗位"
        ></el-table-column>
        <el-table-column align="center" prop="resultsTime" label="成绩查询时间">
          <template slot-scope="scope">
            {{
              scope.row.resultsTime == null
                ? "暂未安排时间"
                : scope.row.resultsTime
            }}
          </template>
        </el-table-column>
        <el-table-column align="center" prop="printTime" label="打印笔试时间">
          <template slot-scope="scope">
            {{
              scope.row.printTime == null ? "暂未安排时间" : scope.row.printTime
            }}
          </template></el-table-column
        >
        <el-table-column
          align="center"
          prop="reviewTime"
          label="管理员审核开放时间"
        >
          <template slot-scope="scope">
            {{
              scope.row.reviewTime == null
                ? "暂未安排时间"
                : scope.row.reviewTime
            }}
          </template></el-table-column
        >

        <el-table-column width="300px" align="center" label="操作">
          <template slot-scope="scope">
            <el-button size="small" type="primary" @click="setTime(scope.row)">
              设置时间</el-button
            >
            <!-- <el-button size="small" type="danger">删除</el-button> -->
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-dialog title="发布时间" :visible.sync="dialogVisible" width="35%">
      <el-form ref="ruleForm" label-width="150px" :model="form" :rules="rules">
        <el-form-item label="考试名称" prop="examName">
          <el-input disabled v-model="form.examName"></el-input>
        </el-form-item>

        <el-form-item label="成绩查询时间" prop="resultsTime">
          <el-date-picker
            value-format="yyyy-MM-dd HH:mm:ss"
            v-model="form.resultsTime"
            type="datetime"
            placeholder="选择日期时间"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="打印笔试准考证时间" prop="printTime">
          <el-date-picker
            value-format="yyyy-MM-dd HH:mm:ss"
            v-model="form.printTime"
            type="datetime"
            placeholder="选择日期时间"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="管理员审核开放时间" prop="reviewTime">
          <el-date-picker
            value-format="yyyy-MM-dd HH:mm:ss"
            v-model="form.reviewTime"
            type="datetime"
            placeholder="选择日期时间"
          >
          </el-date-picker>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="submitData" type="primary">提交</el-button>
        <el-button @click="dialogVisible = false">取消</el-button>
      </span>
    </el-dialog>
    <el-pagination
      v-if="total > 0"
      style="margin-top: 20px"
      :page-sizes="[10, 20, 30, 40]"
      layout="total,sizes,prev, pager, next"
      :total="total"
      @size-change="handleSizeChange"
      :current-page="pagination.pageNum"
      @current-change="handleChangePageNum"
    >
    </el-pagination>
  </div>
</template>
<script>
import * as api from "@/api/exam";
import { getJobList } from "@/api/examinee";

export default {
  data() {
    return {
      recruitmentJob: "",
      examName: "",
      jobList: [],
      total: 0,
      pagination: {
        pageNum: 1,
        pageSize: 10,
      },
      loading: true,
      dataList: [],
      dialogVisible: false,

      form: { printTime: "", resultsTime: "", reviewTime: "", id: null },
      rules: {
        examName: [{ required: true, message: "请选择", trigger: "blur" }],
        resultsTime: [{ required: true, message: "请选择", trigger: "blur" }],
        printTime: [{ required: true, message: "请选择", trigger: "blur" }],
      },
    };
  },
  watch: {
    recruitmentJob() {
      this.getList();
    },
  },
  created() {
    this.getList();
    this.getJobList();
  },
  methods: {
    // 获取岗位列表
    getJobList() {
      getJobList().then((res) => {
        this.jobList = res.data.recruitmentJob;
      });
    },
    handleSizeChange(val) {
      this.pagination.pageSize = val;
      this.getList();
    },
    handleChangePageNum(val) {
      this.pagination.pageNum = val;
      this.getList();
    },
    // 设置时间
    setTime(data) {
      this.form.examName = data.examName;
      this.form.printTime = data.printTime;
      this.form.resultsTime = data.resultsTime;
      this.form.reviewTime = data.reviewTime;
      this.form.id = data.id;
      this.dialogVisible = true;
    },

    // 获取列表
    getList() {
      this.loading = true;
      api
        .getExamTimeList({
          ...this.pagination,
          examName: this.examName,
          recruitmentJob: this.recruitmentJob,
        })
        .then((res) => {
          this.dataList = res.rows;
          this.total = res.total;
          this.loading = false;
        });
    },
    // 设置成绩查询、打印准考证时间
    submitData() {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          api.saveExamTime(this.form).then((res) => {
            if (res.code == 200) {
              this.$message.success("添加成功！");
              this.getList();
              this.dialogVisible = false;
            }
          });
        }
      });
    },
  },
};
</script>
<style lang="scss" scoped>
</style>