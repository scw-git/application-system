<template>
  <div class="written p15">
    <div class="operation mb10">
      <el-select v-model="value" placeholder="选择岗位">
        <el-option label="岗位一" value="1"> </el-option>
        <el-option label="岗位二" value="2"> </el-option>
      </el-select>
      <el-button type="primary" @click="add(1)"> 新建</el-button>
    </div>
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
          prop="placeName"
          label="考点名称"
        ></el-table-column>
        <el-table-column
          align="center"
          prop="job"
          label="岗位考试"
        ></el-table-column>
        <el-table-column
          align="center"
          prop="type"
          label="试卷类型"
        ></el-table-column>
        <el-table-column
          align="center"
          prop="startExamDate"
          label="考试时间"
        ></el-table-column>
        <el-table-column
          align="center"
          prop="status"
          label="考试状态"
        ></el-table-column>
        <el-table-column
          align="center"
          prop="arrangeStatus"
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
              @click="arrangePlaceDialog = true"
              type="primary"
            >
              安排考场</el-button
            >
            <el-button size="small" type="warning" @click="add(2)">
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
          <el-input v-model="form.placeName"></el-input>
        </el-form-item>
        <el-form-item label="考场人数" prop="placeCount">
          <el-select v-model="form.placeCount" placeholder="考场人数">
            <el-option label="20人/组" value="1"> </el-option>
            <el-option label="30人/组" value="2"> </el-option>
            <el-option label="40人/组" value="3"> </el-option>
          </el-select>
        </el-form-item>
        <!-- <el-form-item label="混合考试">
          <el-select v-model="form.mixture">
            <el-option label="是" value="1"> </el-option>
            <el-option label="否/组" value="2"> </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="选择岗位考试">
          <el-button size="small" type="primary">请选择考试岗位</el-button>
        </el-form-item> -->
        <el-form-item label="考试时间" prop="startExamDate">
          <el-date-picker
            v-model="form.startExamDate"
            value-format="yyyy-MM-dd HH:mm:ss"
            type="datetime"
            placeholder="选择日期时间"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="考点地址" prop="placeAddress">
          <el-input v-model="form.placeAddress"></el-input>
        </el-form-item>
        <el-form-item label="考点位置">
          <el-input v-model="form.placeLocation"></el-input>
        </el-form-item>
        <el-form-item label="考点编号" prop="placeNumber">
          <el-input v-model="form.placeNumber"></el-input>
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
          <el-select v-model="arrangeForm.mixture">
            <el-option label="是" value="1"> </el-option>
            <el-option label="否" value="0"> </el-option>
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
            prop="name"
          ></el-table-column>
          <el-table-column
            label="岗位"
            align="center"
            prop="job"
          ></el-table-column>
          <el-table-column
            label="考试总人数"
            align="center"
            prop="total"
          ></el-table-column>
          <el-table-column
            label="剩余未安排人数"
            align="center"
            prop="sy"
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

export default {
  data() {
    return {
      arrangePlaceData: [
        { name: "xxxx", job: "qqq", total: 34, sy: 34 },
        { name: "xxxx", job: "qqq", total: 34, sy: 34 },
      ],
      arrangePlaceDialog: false,
      title: "新建考场",
      value: "",
      dialogVisible: false,
      dataList: [],
      arrangeForm: { mixture: "0" }, //用于存放“安排考场”的数据
      form: { placeType: "1" },
      rules: {
        placeName: [{ required: true, message: "请输入", trigger: "change" }],
        placeNumber: [{ required: true, message: "请输入", trigger: "change" }],
        startExamDate: [
          { required: true, message: "请选择", trigger: "change" },
        ],
        placeCount: [{ required: true, message: "请输入", trigger: "change" }],
        placeAddress: [
          { required: true, message: "请输入", trigger: "change" },
        ],
        selectArr: [], //选择岗位考试的个数
      },
    };
  },
  created() {
    this.getWritten();
    console.log(11);
  },
  methods: {
    handleSelectionChange(val) {
      this.selectArr = val;
      console.log(val);
    },
    // 添加安排考场
    addArrangePlace() {
      if (this.selectArr) {
        if (
          (this.arrangeForm.mixture == "0" && this.selectArr.length == 1) ||
          (this.arrangeForm.mixture == "1" && this.selectArr.length >= 1)
        ) {
        } else {
          this.$message.error("请选择正确的匹配方式！");
        }
      } else {
        this.$message.error("请选择正确的匹配方式！");
      }
    },
    add(n) {
      this.dialogVisible = true;
      if (n == 1) {
        this.title = "新建考场";
      } else if (n == 2) {
        this.title = "编辑考场";
      }
    },
    getWritten() {
      api.getWritten().then((res) => {
        this.dataList = res.rows;
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
          }
        }
      });
    },
  },
};
</script>
<style lang="scss" scoped>
</style>