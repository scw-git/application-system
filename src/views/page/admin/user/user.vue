<template>
  <div class="user p15">
    <div class="operation mb10">
      <el-select v-model="value" placeholder="选择岗位">
        <el-option label="岗位一" value="1"> </el-option>
        <el-option label="岗位二" value="2"> </el-option>
      </el-select>
      <el-button type="primary" @click="add(1)"> 新建用户</el-button>
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
          prop="user"
          label="用户名"
        ></el-table-column>

        <el-table-column
          align="center"
          prop="role"
          label="角色"
        ></el-table-column>
        <el-table-column align="center" prop="status" label="账号状态">
          <template
            ><el-switch
              v-model="value"
              active-color="#13ce66"
              inactive-color="#ff4949"
            >
            </el-switch
          ></template>
        </el-table-column>

        <el-table-column width="300px" align="center" label="操作">
          <template slot-scope="scope">
            <el-button size="small" type="primary"> 查看</el-button>
            <el-button size="small" type="warning"> 编辑</el-button>

            <el-button size="small" type="danger">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-dialog :title="title" :visible.sync="dialogVisible" width="40%">
      <el-form label-width="100px" :model="form" :rules="rules">
        <el-form-item label="用户名">
          <el-input v-model="form.username" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="组别">
          <el-select v-model="form.groupType" placeholder="请选择">
            <el-option label="运维1" value="1"> </el-option>
            <el-option label="运维2" value="2"> </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="form.password" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="确认密码">
          <el-input
            v-model="form.confirPassword"
            placeholder="请输入"
          ></el-input>
        </el-form-item>

        <el-form-item label="账号状态">
          <el-switch
            v-model="form.status"
            active-color="#13ce66"
            inactive-color="#ff4949"
          >
          </el-switch>
        </el-form-item>
        <el-form-item label="角色选择">
          <el-select v-model="form.groupType" placeholder="请选择">
            <el-option label="运维1" value="1"> </el-option>
            <el-option label="运维2" value="2"> </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="submitData" type="primary">创建</el-button>
        <el-button @click="dialogVisible = false">取消</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
export default {
  data() {
    return {
      dialogVisible: false,
      rules: {},
      form: {
        status: 1,
      },
      title: "添加角色",
      dataList: [],
    };
  },
  methods: {},
};
</script>
<style lang="scss" scoped>
</style>