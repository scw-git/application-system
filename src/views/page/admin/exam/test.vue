<template>
  <div class="test p15">
    <div class="operation">
      <el-select
        clearable
        v-model="queryData.recruitmentJob"
        placeholder="请选择岗位"
      >
        <el-option
          v-for="item in jobList"
          :key="item.id"
          :label="item"
          :value="item"
        >
        </el-option>
      </el-select>
      <el-select
        style="width: 120px; margin: 0 10px"
        clearable
        v-model="queryData.state"
        placeholder="发布状态"
      >
        <el-option label="已发布" value="1"></el-option>
        <el-option label="未发布" value="0"></el-option>
      </el-select>
      <el-date-picker
        style="width: 140px"
        value-format="yyyy"
        v-model="queryData.publishDate"
        type="year"
        placeholder="选择日期"
      >
      </el-date-picker>

      <el-input
        clearable
        @keydown.enter.native="getExam()"
        v-model="keyWord"
        style="width: 200px; margin: 0 10px"
        placeholder="请输入关键字"
      ></el-input>
      <el-button size="medium" type="primary" @click="getExam()"
        >确定</el-button
      >
      <el-button
        style="margin-left: 10px"
        type="primary"
        @click="openDialog(1)"
      >
        新建</el-button
      >
      <el-button
        style="margin-left: 10px"
        class="ml10"
        type="primary"
        @click="delAll"
      >
        批量删除</el-button
      >
    </div>
    <div class="table" v-loading="loading" style="margin-top: 10px">
      <el-table @selection-change="getdelIds" :data="dataList" border>
        <el-table-column
          width="50"
          align="center"
          type="selection"
        ></el-table-column>
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
          width="100"
          align="center"
          prop="numberOfApplicants"
          label="已报名人数"
        ></el-table-column>
        <el-table-column
          width="80"
          align="center"
          prop="recruitmentNumber"
          label="招考人数"
        ></el-table-column>
        <el-table-column
          width="80"
          align="center"
          prop="examNumber"
          label="开考人数"
        ></el-table-column>
        <el-table-column
          align="center"
          prop="unscheduledNumber"
          label="未安排考场人数"
        ></el-table-column>
        <el-table-column width="80" align="center" prop="free" label="费用(元)">
          <template slot-scope="scope">
            {{ scope.row.free ? scope.row.free : "免费" }}
          </template>
        </el-table-column>
        <el-table-column
          width="165"
          align="center"
          prop="publishDate"
          label="发布时间"
        ></el-table-column>
        <el-table-column
          width="90"
          align="center"
          prop="status"
          label="发布状态"
        >
          <template slot-scope="scope">
            {{ scope.row.state == "0" ? "未发布" : "已发布" }}
          </template></el-table-column
        >
        <el-table-column width="240px" align="center" label="操作">
          <template slot-scope="scope">
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
    <el-dialog :title="title" :visible.sync="dialogVisible" width="48%">
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
          <el-input
            @keyup.native="prevent($event)"
            type="number"
            v-model="form.recruitmentNumber"
          ></el-input>
        </el-form-item>
        <el-form-item label="开考人数" prop="examNumber">
          <el-input
            @keyup.native="prevent($event)"
            type="number"
            v-model="form.examNumber"
          ></el-input>
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
          <el-input placeholder="单位元" v-model="form.free"></el-input>
        </el-form-item>
        <el-form-item label="发布时间" required>
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
      delIds: [],
      keyWord: "",
      jobList: [], //岗位列表
      total: 0,
      queryData: {
        recruitmentJob: "",
        // createTime: "",
        // sex: "",
        // examName: "",
      },
      pagination: {
        pageNum: 1,
        pageSize: 10,
      },
      loading: false,
      value: "",
      title: "新建",
      dialogVisible: false,
      testType: [], //考卷类型
      rules: {
        examUnit: [{ required: true, message: "请输入", trigger: "blur" }],
        examName: [{ required: true, message: "请输入", trigger: "blur" }],
        recruitmentJob: [
          { required: true, message: "请输入", trigger: "blur" },
        ],
        recruitmentNumber: [
          { required: true, message: "请输入", trigger: "blur" },
        ],
        examNumber: [{ required: true, message: "请输入", trigger: "blur" }],
        applyStartDate: [
          { required: true, message: "请选择", trigger: "blur" },
        ],
        applyEndDate: [{ required: true, message: "请选择", trigger: "blur" }],
        ifPay: [{ required: true, message: "请选择", trigger: "blur" }],
      },
      form: {
        ifPay: "1",
      },
      dataList: [],
    };
  },
  watch: {
    queryData: {
      handler: function () {
        this.getExam();
      },
      deep: true,
    },
  },
  created() {
    this.getExam();
    this.getJobList();
  },
  methods: {
    prevent(e) {
      var keynum = window.event ? e.keyCode : e.which; //获取键盘码
      if (keynum == 189 || keynum == 190 || keynum == 109 || keynum == 110) {
        this.$message.warning("禁止输入小数以及负数");
        e.target.value = "";
      }
    },
    // 获取批量删除的id
    getdelIds(data) {
      this.delIds = data.map((item) => {
        return Number(item.id);
      });
    },
    // 批量删除
    delAll() {
      if (this.delIds.length > 0) {
        this.$confirm("是否执行删除操作?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }).then(() => {
          api.delAllKs(this.delIds).then((res) => {
            if (res.code == 200) {
              this.$message.success("批量删除成功！");
              this.getExam();
            }
          });
        });
      } else {
        this.$message.warning("请选择要删除的考场！");
      }
    },
    // 获取岗位列表
    getJobList() {
      getJobList().then((res) => {
        this.jobList = res.data.recruitmentJob;
      });
    },
    handleSizeChange(val) {
      this.pagination.pageSize = val;
      this.getExam();
    },
    handleChangePageNum(val) {
      this.pagination.pageNum = val;
      this.getExam();
    },
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
      api.getTest({ pageNum: 1, pageSize: 100 }).then((res) => {
        this.testType = res.rows;
      });
    },
    getExam() {
      this.loading = true;
      api
        .getExam({
          ...this.pagination,
          ...this.queryData,
          keyWord: this.keyWord,
        })
        .then((res) => {
          this.dataList = res.rows;
          this.total = res.total;
          this.loading = false;
        });
    },
    submitData() {
      this.$refs.rulesForm.validate((valide) => {
        if (valide) {
          if (this.title == "新建考试") {
            if (this.form.ifPay != "1") {
              this.form.free = "";
            }
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
          this.form = { ifPay: "1" };
          break;
        case 2:
          this.title = "查看考试";
          break;
        case 3:
          this.title = "编辑考试";

          this.form = { ...data };
          break;
      }
    },
  },
};
</script>
<style lang="scss" >
</style>