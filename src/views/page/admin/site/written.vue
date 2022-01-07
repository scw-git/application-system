<template>
  <div class="written p15">
    <div class="operation mb10">
      <el-select v-model="value" placeholder="选择岗位">
        <el-option label="岗位一" value="1"> </el-option>
        <el-option label="岗位二" value="2"> </el-option>
      </el-select>
      <el-button
        style="margin-left: 10px"
        class="ml10"
        type="primary"
        @click="add(1)"
      >
        新建</el-button
      >
    </div>
    <div class="table" v-loading="loading">
      <el-table :data="dataList" border>
        <el-table-column
          label="序号"
          width="50"
          align="center"
          type="index"
        ></el-table-column>
        <el-table-column
          align="center"
          prop="placeName"
          label="考场名称"
        ></el-table-column>
        <el-table-column align="center" prop="recruitmentJob" label="考试岗位">
          <template slot-scope="scope">
            {{
              scope.row.recruitmentJob == null
                ? "未安排"
                : scope.row.recruitmentJob
            }}
          </template></el-table-column
        >
        <el-table-column align="center" prop="type" label="试卷类型">
          <template slot-scope="scope">
            {{ scope.row.type == null ? "暂无类型" : scope.row.type }}
          </template></el-table-column
        >
        <el-table-column
          align="center"
          prop="startExamDate"
          label="考试时间"
        ></el-table-column>
        <!-- <el-table-column
          align="center"
          prop="status"
          label="考试状态"
        ></el-table-column> -->
        <el-table-column
          align="center"
          prop="scheduledNumber"
          label="考试安排状态"
        ></el-table-column>
        <el-table-column
          align="center"
          prop="placeNumber"
          label="考场编号"
        ></el-table-column>
        <el-table-column
          align="center"
          prop="placeCount"
          label="考场人数"
        ></el-table-column>

        <el-table-column width="300px" align="center" label="操作">
          <template slot-scope="scope">
            <!-- <el-button size="small" type="primary" @click="add(2)">
              查看</el-button
            > -->
            <el-button
              size="small"
              @click="openArrangeTest(scope.row.placeCount, scope.row.id)"
              type="primary"
            >
              安排考场</el-button
            >
            <el-button size="small" type="warning" @click="add(2, scope.row)">
              编辑</el-button
            >
            <el-button size="small" type="danger">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-dialog :title="title" :visible.sync="dialogVisible" width="35%">
      <el-form ref="rulesForm" label-width="100px" :model="form" :rules="rules">
        <el-form-item label="考场名称" prop="placeName">
          <el-input placeholder="请输入" v-model="form.placeName"></el-input>
        </el-form-item>
        <el-form-item label="考场人数" prop="placeCount">
          <el-select v-model="form.placeCount" placeholder="考场人数">
            <el-option label="20人/组" value="20"> </el-option>
            <el-option label="30人/组" value="30"> </el-option>
            <el-option label="40人/组" value="40"> </el-option>
          </el-select>
        </el-form-item>

        <!-- <el-form-item label="考试时间" prop="startExamDate">
          <el-date-picker
            v-model="form.startExamDate"
            value-format="yyyy-MM-dd HH:mm:ss"
            type="datetime"
            placeholder="选择日期时间"
          >
          </el-date-picker>
        </el-form-item> -->
        <el-form-item label="考点地址" prop="placeAddress">
          <el-input placeholder="请输入" v-model="form.placeAddress"></el-input>
        </el-form-item>
        <el-form-item label="考点位置">
          <el-input
            placeholder="请输入"
            v-model="form.placeLocation"
          ></el-input>
        </el-form-item>
        <el-form-item label="考点编号" prop="placeNumber">
          <el-input
            placeholder="只能输入4位数字"
            v-model="form.placeNumber"
          ></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="submitData" type="primary">提交</el-button>
        <el-button @click="dialogVisible = false">取消</el-button>
      </span>
    </el-dialog>
    <!-- 考场安排弹框 -->
    <el-dialog title="安排考场" :visible.sync="arrangePlaceDialog" width="50%">
      <el-form
        ref="arrangePlace"
        label-width="100px"
        :model="arrangeForm"
        :rules="rules"
      >
        <el-form-item label="混合考试">
          <el-select v-model="arrangeForm.mixtureExam">
            <el-option label="是" value="是"> </el-option>
            <el-option label="否" value="否"> </el-option>
          </el-select>
        </el-form-item>
        <p>
          选择岗位考试(<span style="color: red"
            >非混合考试只能选择一场考试</span
          >
          )
        </p>
        <el-table
          @selection-change="handleSelectionChange"
          :data="arrangePlaceData"
          border
        >
          <el-table-column
            label="序号"
            width="50"
            align="center"
            type="selection"
          ></el-table-column>
          <el-table-column
            label="考试名称"
            align="center"
            prop="examName"
          ></el-table-column>
          <el-table-column
            label="岗位"
            align="center"
            prop="recruitmentJob"
          ></el-table-column>
          <el-table-column
            label="开考时间"
            align="center"
            prop="startTime"
          ></el-table-column>
          <el-table-column
            label="考试总人数"
            align="center"
            prop="recruitmentNumber"
          ></el-table-column>
          <el-table-column
            label="剩余未安排人数"
            align="center"
            prop="unscheduledNumber"
          ></el-table-column>
        </el-table>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addArrangePlace" type="primary">提交</el-button>
        <el-button @click="arrangePlaceDialog = false">取消</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import * as api from "@/api/site";
import { validateFourNumber } from "@/utils/validator";

export default {
  data() {
    return {
      loading: true,
      judgeTimeStatus: true, //用于判断选择的考试开考时间是否相同
      selectArr: [], //选择岗位考试的个数
      placeCount: 0, //考场人数
      arrangePlaceData: [],
      arrangePlaceDialog: false,
      title: "新建考场",
      value: "",
      dialogVisible: false,
      dataList: [],
      arrangeForm: { mixtureExam: "是", examIds: [], placeId: "" }, //用于存放“安排考场”的数据
      form: { placeType: "1" },
      rules: {
        placeName: [{ required: true, message: "请输入", trigger: "blur" }],
        placeNumber: [
          { required: true, validator: validateFourNumber, trigger: "blur" },
        ],

        // placeNumber: [{ required: true, message: "请输入", trigger: "change" }],
        startExamDate: [{ required: true, message: "请选择", trigger: "blur" }],
        placeCount: [{ required: true, message: "请输入", trigger: "blur" }],
        placeAddress: [{ required: true, message: "请输入", trigger: "blur" }],
      },
    };
  },
  created() {
    this.getWritten();
  },
  watch: {
    selectArr() {
      // 如果选择的“剩余未安排人数”大于考场人数时
      if (this.getNoArrangeCount(this.selectArr) > this.placeCount) {
        this.$message({
          showClose: true,
          message:
            "安排的考生人数大于考场可安排人数，将安排部分考生考试。剩余考生请继续安排。",
          type: "warning",
          duration: 10000,
        });
      }
    },
  },
  methods: {
    // 点击“安排考场”打开对话框
    openArrangeTest(placeCount, id) {
      this.placeCount = placeCount;
      this.arrangeForm.placeId = id;
      this.arrangePlaceDialog = true;
      api.getArrangeSite().then((res) => {
        this.arrangePlaceData = res.data;
      });
    },
    handleSelectionChange(val) {
      this.selectArr = val;
      console.log(val);
    },
    // 计算剩余未安排人数
    getNoArrangeCount(arr) {
      let n = 0;
      arr.forEach((item) => {
        n = Number(item.unscheduledNumber) + n;
      });
      return n;
    },
    // 获取“安排考场”中的考场数组
    getExamIds() {
      this.selectArr.forEach((item) => {
        this.arrangeForm.examIds.push(item.id);
      });
    },
    // 判断开考时间是否相同，只有相同才能混合考试
    judgeTime() {
      this.judgeTimeStatus = true; //重置
      let first = this.selectArr[0].startTime;
      this.selectArr.forEach((item) => {
        if (first != item.startTime) {
          this.judgeTimeStatus = false; //发现选择的时间有不同
        }
      });
    },
    // 添加安排考场
    addArrangePlace() {
      this.getExamIds();
      if (this.selectArr) {
        if (
          (this.arrangeForm.mixtureExam == "否" &&
            this.selectArr.length == 1) ||
          (this.arrangeForm.mixtureExam == "是" && this.selectArr.length >= 1)
        ) {
          this.judgeTime();
          if (this.judgeTimeStatus) {
            api.confirArrangeSite(this.arrangeForm).then((res) => {
              if (res.code == 200) {
                this.$message.success("安排成功！");
                this.arrangePlaceDialog = false;
                this.getWritten();
              }
            });
          } else {
            this.$message.error("请选择开考时间相同的考试！");
          }
        } else {
          this.$message.error("请选择正确的匹配方式！");
        }
      } else {
        this.$message.error("请选择正确的匹配方式！");
      }
    },
    add(n, data) {
      this.form = {};
      this.dialogVisible = true;
      if (n == 1) {
        this.title = "新建考场";
      } else if (n == 2) {
        this.title = "编辑考场";

        this.form = { ...data };
      }
    },
    getWritten() {
      this.loading = true;
      api.getWritten().then((res) => {
        this.dataList = res.rows;
        this.loading = false;
      });
    },
    submitData() {
      this.$refs.rulesForm.validate((valid) => {
        if (valid) {
          if (this.title == "新建考场") {
            api.addWritten({ ...this.form }).then((res) => {
              if (res.code == 200) {
                this.$message.success("新增成功");
                this.dialogVisible = false;
                this.getWritten();
              }
            });
          } else {
            api.updateWrittenSite({ ...this.form }).then((res) => {
              if (res.code == 200) {
                this.$message.success("修改成功");
                this.dialogVisible = false;
                this.getWritten();
              }
            });
          }
        }
      });
    },
  },
};
</script>
<style lang="scss" scoped>
</style>