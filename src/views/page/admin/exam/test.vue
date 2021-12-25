<template>
  <div class="test p15">
    <div class="operation">
      <el-select v-model="value" placeholder="选择岗位">
        <el-option label="岗位一" value="1"> </el-option>
        <el-option label="岗位二" value="2"> </el-option>
      </el-select>
      <el-button
        style="margin-left: 10px"
        type="primary"
        @click="openDialog(1)"
      >
        新建</el-button
      >
    </div>
    <div class="table" style="margin-top: 10px">
      <el-table :data="dataList" border>
        <el-table-column
          label="序号"
          width="50"
          align="center"
          type="index"
        ></el-table-column>
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
          label="招考岗位"
        ></el-table-column>
        <el-table-column
          align="center"
          prop="type"
          label="考卷类型"
        ></el-table-column>
        <el-table-column
          width="60"
          align="center"
          prop="recruitmentNumber"
          label="报考人数"
        ></el-table-column>
        <el-table-column
          align="center"
          prop="unscheduledNumber"
          label="未安排考场人数"
        ></el-table-column>
        <el-table-column
          width="80"
          align="center"
          prop="free"
          label="是否免费"
        ></el-table-column>
        <el-table-column
          align="center"
          prop="publishDate"
          label="发布时间"
        ></el-table-column>
        <el-table-column align="center" prop="status" label="发布状态">
          <template slot-scope="scope">
            {{ scope.row.state == "0" ? "未发布" : "已发布" }}
          </template></el-table-column
        >
        <el-table-column width="240px" align="center" label="操作">
          <template slot-scope="scope">
            <!-- <el-button size="small" type="primary" @click="openDialog(2)">
              查看</el-button
            > -->
            <el-button
              size="small"
              type="primary"
              @click="openDialog(3, scope.row)"
            >
              编辑</el-button
            >
            <el-button
              size="small"
              @click="release(scope.row.id)"
              type="warning"
            >
              {{ scope.row.state == "0" ? "发布" : "取消发布" }}</el-button
            >

            <el-button size="small" @click="del(scope.row.id)" type="danger"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-dialog :title="title" :visible.sync="dialogVisible" width="45%">
      <el-form
        ref="rulesForm"
        inline
        label-width="110px"
        :model="form"
        :rules="rules"
      >
        <el-form-item label="报考单位" prop="examUnit">
          <el-input v-model="form.examUnit"></el-input>
        </el-form-item>
        <el-form-item label="考试名称" prop="examName">
          <el-input v-model="form.examName"></el-input>
        </el-form-item>
        <el-form-item label="考卷类型">
          <el-select v-model="form.paperId" placeholder="选择岗位">
            <el-option
              v-for="item in testType"
              :key="item.id"
              :label="item.type"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="招考岗位" prop="recruitmentJob">
          <el-input v-model="form.recruitmentJob"></el-input>
        </el-form-item>
        <el-form-item label="招考人数" prop="recruitmentNumber">
          <el-input v-model="form.recruitmentNumber"></el-input>
        </el-form-item>
        <el-form-item label="开考人数" prop="examNumber">
          <el-input v-model="form.examNumber"></el-input>
        </el-form-item>
        <el-form-item label="报名开始时间" prop="applyStartDate">
          <el-date-picker
            value-format="yyyy-MM-dd HH:mm:ss"
            v-model="form.applyStartDate"
            type="datetime"
            placeholder="选择日期时间"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="报名截止时间" prop="applyEndDate">
          <el-date-picker
            value-format="yyyy-MM-dd HH:mm:ss"
            v-model="form.applyEndDate"
            type="datetime"
            placeholder="选择日期时间"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="是否免费" prop="ifPay">
          <el-select v-model="form.ifPay">
            <el-option label="是" value="0"> </el-option>
            <el-option label="否" value="1"> </el-option>
          </el-select>
        </el-form-item>
        <el-form-item v-if="form.ifPay == '1'" label="考试费用">
          <el-input v-model="form.free"></el-input>
        </el-form-item>
        <el-form-item label="发布时间">
          <el-date-picker
            value-format="yyyy-MM-dd HH:mm:ss"
            v-model="form.publishDate"
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
      value: "",
      title: "新建",
      dialogVisible: false,
      testType: [], //考卷类型
      rules: {
        examUnit: [{ required: true, message: "请输入", trigger: "change" }],
        examName: [{ required: true, message: "请输入", trigger: "change" }],
        recruitmentJob: [
          { required: true, message: "请输入", trigger: "change" },
        ],
        recruitmentNumber: [
          { required: true, message: "请输入", trigger: "change" },
        ],
        examNumber: [{ required: true, message: "请输入", trigger: "change" }],
        applyStartDate: [
          { required: true, message: "请选择", trigger: "change" },
        ],
        applyEndDate: [
          { required: true, message: "请选择", trigger: "change" },
        ],
        ifPay: [{ required: true, message: "请选择", trigger: "change" }],
      },
      form: {
        ifPay: "1",
      },
      dataList: [],
    };
  },
  created() {
    this.getExam();
  },
  methods: {
    release(id) {
      this.$confirm("是否修改该条考试状态?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        api.releaseExam(id).then((res) => {
          if (res.code == 200) {
            this.getExam();
            this.$message.success("修改成功");
          }
        });
      });
    },
    del(id) {
      this.$confirm("是否确定删除该条数据?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        api.delExam(id).then((res) => {
          if (res.code == 200) {
            this.getExam();
            this.$message.success("删除成功");
          }
        });
      });
    },

    // 获取考卷类型
    getTestType() {
      api.getTest().then((res) => {
        this.testType = res.rows;
      });
    },
    getExam() {
      api.getExam().then((res) => {
        this.dataList = res.rows;
      });
    },
    submitData() {
      this.$refs.rulesForm.validate((valide) => {
        if (valide) {
          if (this.title == "新建考试") {
            api.addExam({ ...this.form }).then((res) => {
              if (res.code == 200) {
                this.$message.success("新增成功");
                this.dialogVisible = false;
                this.getExam();
              }
            });
          } else if (this.title == "编辑考试") {
            api.updateExam({ ...this.form }).then((res) => {
              if (res.code == 200) {
                this.$message.success("新增成功");
                this.dialogVisible = false;
                this.getExam();
              }
            });
          }
        }
      });
    },
    openDialog(type, data) {
      this.getTestType(); //获取考卷类型
      this.dialogVisible = true;
      switch (type) {
        case 1:
          this.title = "新建考试";
          this;
          break;
        case 2:
          this.title = "查看考试";

          break;
        case 3:
          this.title = "编辑考试";
          console.log(22, data);
          this.form = { ...data };
          break;
      }
    },
  },
};
</script>
<style lang="scss" scoped>
</style>