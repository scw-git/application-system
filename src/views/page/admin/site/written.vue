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
          prop="name"
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
          prop="time"
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
          prop="number"
          label="考场编号"
        ></el-table-column>
        <el-table-column
          align="center"
          prop="total"
          label="考场人数"
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
      <el-form label-width="100px" :model="form" :rules="rules">
        <el-form-item label="考场人数">
          <el-select v-model="form.total" placeholder="考场人数">
            <el-option label="20人/组" value="1"> </el-option>
            <el-option label="30人/组" value="2"> </el-option>
            <el-option label="40人/组" value="3"> </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="混合考试">
          <el-select v-model="form.mixture">
            <el-option label="是" value="1"> </el-option>
            <el-option label="否/组" value="2"> </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="选择岗位考试">
          <el-button size="small" type="primary">请选择考试岗位</el-button>
        </el-form-item>
        <el-form-item label="考试时间">
          <el-input v-model="form.time"></el-input>
        </el-form-item>
        <el-form-item label="考点地址">
          <el-input v-model="form.address"></el-input>
        </el-form-item>
        <el-form-item label="考点编号">
          <el-input v-model="form.number"></el-input>
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
      title: "新建考场",
      value: "",
      dialogVisible: false,
      dataList: [],
      form: {},
      rules: {},
    };
  },
  methods: {
    add() {},
    submitData() {},
  },
};
</script>
<style lang="scss" scoped>
</style>