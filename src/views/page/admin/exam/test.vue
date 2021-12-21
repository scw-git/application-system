<template>
  <div class="test p15">
    <div class="operation">
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
          prop="unit"
          label="报考单位"
        ></el-table-column>
        <el-table-column
          align="center"
          prop="name"
          label="考试名称"
        ></el-table-column>
        <el-table-column
          align="center"
          prop="job"
          label="招考岗位"
        ></el-table-column>
        <el-table-column
          align="center"
          prop="type"
          label="考卷类型"
        ></el-table-column>
        <el-table-column
          align="center"
          prop="total"
          label="报考人数"
        ></el-table-column>
        <el-table-column
          align="center"
          prop="no"
          label="未安排考场人数"
        ></el-table-column>
        <el-table-column
          align="center"
          prop="free"
          label="是否免费"
        ></el-table-column>
        <el-table-column
          align="center"
          prop="releaseTime"
          label="发布时间"
        ></el-table-column>
        <el-table-column
          align="center"
          prop="status"
          label="发布状态"
        ></el-table-column>
        <el-table-column width="300px" align="center" label="操作">
          <template slot-scope="scope">
            <el-button size="small" type="primary" @click="add(2)">
              查看</el-button
            >
            <el-button size="small" type="warning" @click="add(3)">
              编辑</el-button
            >
            <el-button size="small" type="success"> 发布</el-button>
            <el-button size="small" type="danger">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-dialog :title="title" :visible.sync="dialogVisible" width="40%">
      <el-form inline label-width="90px" :model="form" :rules="rules">
        <el-form-item label="报考单位">
          <el-input v-model="form.unit"></el-input>
        </el-form-item>
        <el-form-item label="考试名称">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="考卷类型">
          <el-select v-model="form.type" placeholder="选择岗位">
            <el-option label="岗位一" value="1"> </el-option>
            <el-option label="岗位二" value="2"> </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="招考岗位">
          <el-input v-model="form.job"></el-input>
        </el-form-item>
        <el-form-item label="招考人数">
          <el-input v-model="form.total"></el-input>
        </el-form-item>
        <el-form-item label="报名时间段">
          <el-date-picker
            v-model="form.time"
            type="datetimerange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="是否免费">
          <el-select v-model="form.free">
            <el-option label="是" value="1"> </el-option>
            <el-option label="否" value="2"> </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="考试费用">
          <el-input v-model="form.monney"></el-input>
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
export default {
  data() {
    return {
      value: "",
      title: "新建",
      dialogVisible: false,
      rules: [],
      form: {},
      dataList: [
        {
          unit: "单位一",
          name: "计算机基础",
          job: "会计",
          type: "A卷",
          total: "30",
          no: "12",
          free: "是",
          releaseTime: "2021-12-09",
          status: "已发布",
        },
      ],
    };
  },
  methods: {
    submitData() {
      this.dialogVisible = false;
    },
    add(type) {
      this.dialogVisible = true;
      switch (type) {
        case 1:
          this.title = "新建考试";
          break;
        case 2:
          this.title = "查看考试";

          break;
        case 3:
          this.title = "编辑考试";

          break;
      }
    },
  },
};
</script>
<style lang="scss" scoped>
</style>