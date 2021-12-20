<template>
  <div class="test p15">
    <div class="operation">
      <el-select v-model="value" placeholder="选择岗位">
        <el-option label="岗位一" value="1"> </el-option>
        <el-option label="岗位二" value="2"> </el-option>
      </el-select>
      <el-button type="primary"> 新建</el-button>
      <el-button type="primary"> 编辑</el-button>
      <el-button type="primary"> 发布</el-button>
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
        <el-table-column align="center" label="操作">
          <template slot-scope="scope">
            <el-button
              @click="add('edit', scope.row)"
              type="primary"
              size="small"
              >编辑</el-button
            >
            <el-button type="danger" size="small">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-dialog :title="title" :visible.sync="dialogVisible" width="35%">
      <el-form label-width="80px" :model="form" :rules="rules">
        <el-form-item label="考卷类型">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false"
          >确 定</el-button
        >
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
      dialogVisible: true,
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
  methods: {},
};
</script>
<style lang="scss" scoped>
</style>