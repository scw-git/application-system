<template>
  <div class="time p15">
    <div class="table">
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
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="submitData" type="primary">提交</el-button>
        <el-button @click="dialogVisible = false">取消</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import * as api from "@/api/exam";

export default {
  data() {
    return {
      dataList: [],
      dialogVisible: false,
      examList: [],
      form: { printTime: "", resultsTime: "", id: null },
      rules: {
        examName: [{ required: true, message: "请选择", trigger: "blur" }],
        resultsTime: [{ required: true, message: "请选择", trigger: "blur" }],
        printTime: [{ required: true, message: "请选择", trigger: "blur" }],
      },
    };
  },
  created() {
    this.getExam();
    this.getList();
  },
  methods: {
    // 设置时间
    setTime(data) {
      this.form.examName = data.examName;
      this.form.printTime = data.printTime;
      this.form.resultsTime = data.resultsTime;
      this.form.id = data.id;
      this.dialogVisible = true;
    },
    // 获取考试名称列表
    getExam() {
      api.getExam().then((res) => {
        this.examList = res.rows;
      });
    },
    // 获取列表
    getList() {
      api.getExamTimeList().then((res) => {
        this.dataList = res.data;
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