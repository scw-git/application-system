<template>
  <div class="hone frame">
    <div
      class="frame_title"
      style="display: flex; justify-content: space-between"
    >
      家庭情况：
      <el-button size="mini" @click="addData" type="warning">添加</el-button>
    </div>
    <el-table border :data="form.workData">
      <el-table-column
        width="150"
        align="center"
        prop="relation"
        label="与本人关系"
      ></el-table-column>
      <el-table-column
        width="150"
        align="center"
        prop="relationName"
        label="姓名"
      ></el-table-column>
      <el-table-column
        prop="relationWork"
        align="center"
        label="工作单位及职位"
      ></el-table-column>
      <el-table-column
        prop="relationAddress"
        align="center"
        label="户口所在地"
      ></el-table-column>

      <el-table-column align="center" width="200" label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)"
            >编辑</el-button
          >
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <div class="dialog">
      <el-dialog title="添加家庭成员" :visible.sync="dialogFormVisible">
        <el-form
          inline
          label-width="120px"
          ref="home"
          :rules="rules"
          :model="form"
        >
          <el-form-item label="与本人关系" prop="relation">
            <el-input v-model="form.relation" placeholder="请填写"> </el-input>
          </el-form-item>
          <el-form-item label="姓名" prop="relationName">
            <el-input v-model="form.relationName" placeholder="请填写">
            </el-input>
          </el-form-item>
          <el-form-item label="工作单位与职位">
            <el-input v-model="form.relationWork" placeholder="请填写">
            </el-input>
          </el-form-item>
          <el-form-item label="户口所在地">
            <el-input v-model="form.relationAddress" placeholder="请填写">
            </el-input>
          </el-form-item>
        </el-form>
        <div style="text-align: center" slot="footer" class="dialog-footer">
          <el-button size="medium" type="primary" @click="addStudyData"
            >添 加</el-button
          >
          <el-button size="medium" @click="dialogFormVisible = false"
            >取 消</el-button
          >
        </div>
      </el-dialog>
    </div>
    <div class="next">
      <el-button size="small" type="primary" @click="next"
        >保存并上一步</el-button
      >
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      dialogFormVisible: false,
      form: {},
      rules: {
        relation: [
          { required: true, message: "请填写关系", trigger: "change" },
        ],
        relationName: [
          { required: true, message: "请填写姓名", trigger: "change" },
        ],
      },
    };
  },
  methods: {
    addData() {
      this.dialogFormVisible = true;
    },
    next() {
      this.$router.push("student_info_work");
    },
  },
};
</script>
<style lang="scss" scoped>
</style>