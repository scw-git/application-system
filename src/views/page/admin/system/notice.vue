<template>
  <div class="notice p15">
    <el-button style="margin-bottom: 10px" type="primary" @click="add"
      >发布通知</el-button
    >
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
          prop="title"
          label="通知标题"
        ></el-table-column>

        <el-table-column
          align="center"
          prop="time"
          label="创建时间"
        ></el-table-column>

        <el-table-column width="300px" align="center" label="操作">
          <template slot-scope="scope">
            <el-button size="small" type="primary" @click="add(2)">
              查看</el-button
            >
            <el-button size="small" type="danger">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-dialog title="发布通知" :visible.sync="dialogVisible" width="40%">
      <el-form label-width="100px" :model="form" :rules="rules">
        <el-form-item label="通知标题">
          <el-input v-model="form.title"></el-input>
        </el-form-item>
        <el-form-item label="发布人">
          <el-input v-model="form.createBy"></el-input>
        </el-form-item>
        <el-form-item label="通知位置">
          <el-radio-group v-model="form.position">
            <el-radio :label="1">站内</el-radio>
            <el-radio :label="0">站外</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="通知内容">
          <el-input
            type="textarea"
            :rows="5"
            placeholder="请输入内容"
            v-model="textarea"
          >
          </el-input>
        </el-form-item>
      </el-form>
      <div class="center">
        <span slot="footer" class="dialog-footer">
          <el-button @click="submitData" type="primary">提交</el-button>
          <el-button @click="dialogVisible = false">取消</el-button>
        </span>
      </div>
    </el-dialog>
  </div>
</template>
<script>
export default {
  data() {
    return {
      dataList: [],
      dialogVisible: false,
      form: {
        position: 1,
      },
      rules: {},
    };
  },
  methods: {
    add() {
      this.dialogVisible = true;
    },
  },
};
</script>
<style lang="scss" scoped>
.center {
  text-align: center;
}
</style>