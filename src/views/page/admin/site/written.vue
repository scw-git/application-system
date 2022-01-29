<template>
  <div class="written p15">
    <div class="operation mb10">
      <el-select
        clearable
        style="width: 180px"
        v-model="queryData.type"
        placeholder="考卷类型"
      >
        <el-option
          v-for="(item, i) in examineeTypeList"
          :key="i"
          :label="item.type"
          :value="item.type"
        >
        </el-option>
        <el-option label="女" value="0"> </el-option>
      </el-select>
      <el-select
        clearable
        style="width: 120px; padding: 0 10px"
        v-model="queryData.arrangeState"
        placeholder="安排状态"
      >
        <el-option label="已安排" value="1"> </el-option>
        <el-option label="未安排" value="0"> </el-option>
      </el-select>
      <el-select
        clearable
        style="width: 120px"
        v-model="queryData.mixtureExam"
        placeholder="混合考试"
      >
        <el-option label="是" value="1"> </el-option>
        <el-option label="否" value="0"> </el-option>
      </el-select>
      <el-date-picker
        style="width: 140px; margin: 0 10px"
        value-format="yyyy"
        v-model="queryData.startExamDate"
        type="year"
        placeholder="选择日期"
      >
      </el-date-picker>
      <el-input
        clearable
        @keydown.enter.native="() => getWritten()"
        v-model="pagination.placeName"
        style="width: 200px"
        placeholder="请输入考场名称"
      ></el-input>
      <el-button
        style="margin-left: 10px"
        class="ml10"
        type="primary"
        @click="add(1)"
      >
        新建</el-button
      >
      <el-button
        style="margin-left: 10px"
        class="ml10"
        type="primary"
        @click="add(3)"
      >
        批量新建</el-button
      >
      <el-button
        style="margin-left: 10px"
        class="ml10"
        type="primary"
        @click="openArrangeTest(2)"
      >
        批量安排考场</el-button
      >
      <el-button
        style="margin-left: 10px"
        class="ml10"
        type="primary"
        @click="delAll"
      >
        批量删除</el-button
      >
      <el-button
        style="margin-left: 10px"
        class="ml10"
        type="primary"
        @click="clearAllSite"
      >
        批量清空考场</el-button
      >
    </div>
    <div class="table" v-loading="loading">
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
        <el-table-column align="center" prop="paperType" label="试卷类型">
          <template slot-scope="scope">
            {{ scope.row.paperType == null ? "暂无类型" : scope.row.paperType }}
          </template></el-table-column
        >
        <el-table-column
          width="160"
          align="center"
          prop="startExamDate"
          label="考试时间"
        >
          <template slot-scope="scope">
            {{
              scope.row.startExamDate == null
                ? "暂无时间"
                : scope.row.startExamDate
            }}
          </template>
        </el-table-column>

        <el-table-column
          align="center"
          prop="scheduledNumber"
          label="考试安排状态"
        >
          <template slot-scope="scope">
            已安排 {{ scope.row.scheduledNumber }}人</template
          ></el-table-column
        >
        <el-table-column
          width="80"
          align="center"
          prop="placeNumber"
          label="考场编号"
        ></el-table-column>
        <el-table-column
          width="80"
          align="center"
          prop="placeCount"
          label="考场人数"
        ></el-table-column>

        <el-table-column width="330px" align="center" label="操作">
          <template slot-scope="scope">
            <el-button
              size="small"
              @click="
                openArrangeTest(
                  1,
                  scope.row.placeCount,
                  scope.row.id,
                  scope.row.mixtureExam
                )
              "
              type="primary"
            >
              安排考场</el-button
            >
            <el-button
              size="small"
              type="warning"
              @click="clearFn(scope.row.id)"
            >
              清空考场</el-button
            >
            <el-button size="small" type="warning" @click="add(2, scope.row)">
              编辑</el-button
            >
            <el-button size="small" @click="del(scope.row.id)" type="danger"
              >删除</el-button
            >
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
        <el-form-item required label="混合考试">
          <el-select v-model="form.mixtureExam">
            <el-option label="是" value="1"> </el-option>
            <el-option label="否" value="0"> </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="考点地址" prop="placeAddress">
          <el-input placeholder="请输入" v-model="form.placeAddress"></el-input>
        </el-form-item>
        <el-form-item label="考点位置">
          <el-input
            placeholder="请输入"
            v-model="form.placeLocation"
          ></el-input>
        </el-form-item>
        <el-form-item
          v-if="title == '新建考场'"
          label="考点编号"
          prop="placeNumber"
        >
          <el-input
            type="number"
            placeholder="请输入数字，不能以0开头"
            v-model="form.placeNumber"
            @input="handleInput"
          ></el-input>
        </el-form-item>

        <el-form-item v-if="title == '批量新建'" label="考点编号" required>
          <el-input
            type="number"
            style="width: 120px"
            placeholder="不能以0开头"
            v-model="form.placeStartNumber"
            @input="handleInput"
          ></el-input
          >~
          <el-input
            type="number"
            style="width: 120px"
            placeholder="不能以0开头"
            v-model="form.placeEndNumber"
            @input="handleInput"
          ></el-input>
        </el-form-item>
        <!-- <el-form-item label="考场数量">
          <el-input placeholder="请输入" v-model="form.placeNumber"></el-input>
        </el-form-item> -->
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="submitData" type="primary">提交</el-button>
        <el-button @click="dialogVisible = false">取消</el-button>
      </span>
    </el-dialog>
    <!-- 考场安排弹框 -->
    <el-dialog :title="title1" :visible.sync="arrangePlaceDialog" width="50%">
      <el-form
        ref="arrangePlace"
        label-width="100px"
        :model="arrangeForm"
        :rules="rules"
      >
        <el-form-item v-if="title1 != '批量安排考场'" label="混合考试">
          <el-select disabled v-model="arrangeForm.mixtureExam">
            <el-option label="是" value="1"> </el-option>
            <el-option label="否" value="0"> </el-option>
          </el-select>
        </el-form-item>

        <p>
          选择岗位考试<span v-if="title1 == '安排考场'" style="color: red"
            >(非混合考试只能选择一场考试)</span
          >
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
            label="试卷类别"
            align="center"
            prop="type"
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
import * as api from "@/api/site";
import { getJobList } from "@/api/examinee";

import { validateFourNumber } from "@/utils/validator";

export default {
  data() {
    return {
      examineeTypeList: [], //考卷类型列表
      queryData: {},
      delIds: [], //批量删除或者清空考场的的id
      total: 0,
      pagination: {
        pageNum: 1,
        pageSize: 10,
      },
      title1: "安排考场",
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
      arrangeForm: { mixtureExam: "1", examIds: [], placeId: "" }, //用于存放“安排考场”的数据
      form: { mixtureExam: "0" },
      rules: {
        placeName: [{ required: true, message: "请输入", trigger: "blur" }],
        // placeNumber: [
        //   { required: true, validator: validateFourNumber, trigger: "blur" },
        // ],

        placeNumber: [
          { required: true, message: "请输入编号", trigger: "change" },
        ],
        startExamDate: [{ required: true, message: "请选择", trigger: "blur" }],
        placeCount: [{ required: true, message: "请输入", trigger: "blur" }],
        placeAddress: [{ required: true, message: "请输入", trigger: "blur" }],
      },
    };
  },
  created() {
    this.getWritten();
    this.getExamineeType();
  },
  watch: {
    queryData: {
      handler() {
        this.getWritten();
      },
      deep: true,
    },
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
    handleInput(value) {
      this.form.placeNumber = value.replace(/^0{1,}/g, " ");
      this.form.placeStartNumber = value.replace(/^0{1,}/g, " ");
      this.form.placeEndNumber = value.replace(/^0{1,}/g, " ");
    },
    getExamineeType() {
      api.getExamineeType().then((res) => {
        this.examineeTypeList = res.rows;
      });
    },
    // 清空考场方法
    clearFn(id) {
      this.$confirm("是否清除考场?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        let ids = [];
        if (id != "") {
          ids.push(id);
        } else {
          ids = this.delIds;
        }
        console.log(123, ids);
        api.clearSite(ids).then((res) => {
          if (res.code == 200) {
            this.$message.warning("清空考场成功！");
            this.getWritten();
          }
        });
      });
    },
    // clearSingleSite(){},
    clearAllSite() {
      if (this.delIds.length > 0) {
        this.clearFn("");
      } else {
        this.$message.warning("请选择要清空的考场！");
      }
    },
    // 批量删除
    delAll() {
      if (this.delIds.length > 0) {
        this.del("");
      } else {
        this.$message.warning("请选择要删除的考场！");
      }
    },
    // 获取批量删除的id
    getdelIds(data) {
      this.delIds = data.map((item) => {
        return Number(item.id);
      });
    },
    // 获取岗位列表
    // getJobList() {
    //   getJobList().then((res) => {
    //     this.jobList = res.data;
    //   });
    // },
    handleSizeChange(val) {
      this.pagination.pageSize = val;
      this.getWritten();
    },
    handleChangePageNum(val) {
      this.pagination.pageNum = val;
      this.getWritten();
    },
    del(id) {
      this.$confirm("是否执行删除操作?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        let ids = [];
        if (id != "") {
          ids.push(id);
        } else {
          ids = this.delIds;
        }
        api.delWrittenSite(ids).then((res) => {
          if (res.code == 200) {
            this.$message.warning("删除成功！");
            this.getWritten();
          }
        });
      });
    },
    // 点击“安排考场”打开对话框
    openArrangeTest(n, placeCount, id, mixtureExam) {
      this.arrangePlaceDialog = true;
      api.getArrangeSite().then((res) => {
        this.arrangePlaceData = res.data;
      });
      if (n == 1) {
        this.title1 = "安排考场";
        this.arrangeForm.mixtureExam = mixtureExam;
        this.placeCount = placeCount;
        this.arrangeForm.placeId = id;
      } else if (n == 2) {
        this.title1 = "批量安排考场";
      }
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
      if (this.title1 == "安排考场") {
        if (this.selectArr.length > 0) {
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
          this.$message.error("请选择考试！");
        }
      } else if (this.title1 == "批量安排考场") {
        if (this.arrangeForm.examIds.length > 0) {
          this.setAllWrittenSite();
        } else {
          this.$confirm("将安排所有考试,请慎重选择!", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning",
          }).then(() => {
            this.setAllWrittenSite();
          });
        }
      }
    },
    //   addArrangePlace() {
    //   this.getExamIds();
    //   if (this.title1 == "安排考场") {
    //     if (this.selectArr) {
    //       if (
    //         (this.arrangeForm.mixtureExam == "0" &&
    //           this.selectArr.length == 1) ||
    //         (this.arrangeForm.mixtureExam == "1" && this.selectArr.length >= 1)
    //       ) {
    //         this.judgeTime();
    //         if (this.judgeTimeStatus) {
    //           api.confirArrangeSite(this.arrangeForm).then((res) => {
    //             if (res.code == 200) {
    //               this.$message.success("安排成功！");
    //               this.arrangePlaceDialog = false;
    //               this.getWritten();
    //             }
    //           });
    //         } else {
    //           this.$message.error("请选择开考时间相同的考试！");
    //         }
    //       } else {
    //         this.$message.error("请选择正确的匹配方式！");
    //       }
    //     } else {
    //       this.$message.error("请选择正确的匹配方式！");
    //     }
    //   } else if (this.title1 == "批量安排考场") {
    //     if (this.arrangeForm.examIds.length > 0) {
    //       this.setAllWrittenSite();
    //     } else {
    //       this.$confirm("将安排所有考试,请慎重选择!", "提示", {
    //         confirmButtonText: "确定",
    //         cancelButtonText: "取消",
    //         type: "warning",
    //       }).then(() => {
    //         this.setAllWrittenSite();
    //       });
    //     }
    //   }
    // },
    // 批量安排考场
    setAllWrittenSite() {
      api.setAllWrittenSite(this.arrangeForm).then((res) => {
        if (res.code == 200) {
          this.$message.success(res.msg);
          this.arrangePlaceDialog = false;
          this.getWritten();
        }
      });
    },
    add(n, data) {
      this.form = { mixtureExam: "0" };
      this.dialogVisible = true;
      if (n == 1) {
        this.title = "新建考场";
      } else if (n == 2) {
        this.title = "编辑考场";
        this.form = { ...data };
      } else if (n == 3) {
        this.title = "批量新建";
      }
    },
    getWritten() {
      this.loading = true;
      api.getWritten({ ...this.pagination, ...this.queryData }).then((res) => {
        res.rows.forEach((item) => {
          if (item.startExamDate) {
            item.startExamDate = item.startExamDate.replace("T", " ");
          }
        });
        this.dataList = res.rows;
        this.total = res.total;
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
          } else if (this.title == "编辑考场") {
            api.updateWrittenSite({ ...this.form }).then((res) => {
              if (res.code == 200) {
                this.$message.success("修改成功");
                this.dialogVisible = false;
                this.getWritten();
              }
            });
          } else if (this.title == "批量新建") {
            if (this.form.placeStartNumber && this.form.placeEndNumber) {
              api.setAllSite(this.form).then((res) => {
                if (res.code == 200) {
                  this.$message.success("新增成功");
                  this.dialogVisible = false;
                  this.getWritten();
                }
              });
            } else {
              this.$message.warning("请输入编号！");
            }
          }
        }
      });
    },
  },
};
</script>
<style lang="scss" scoped>
</style>