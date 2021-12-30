<template>
  <div class="role p15">
    <div class="operation mb10">
      <el-select v-model="value" placeholder="选择岗位">
        <el-option label="岗位一" value="1"> </el-option>
        <el-option label="岗位二" value="2"> </el-option>
      </el-select>
      <el-button style="margin-left: 10px" type="primary"> 新建角色</el-button>
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
          prop="role"
          label="角色名称"
        ></el-table-column>

        <el-table-column
          align="center"
          prop="createBy"
          label="创建人"
        ></el-table-column>
        <el-table-column align="center" prop="status" label="角色状态">
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
            <el-button size="small" type="warning"> 编辑</el-button>

            <el-button size="small" type="danger">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-dialog :title="title" :visible.sync="dialogVisible" width="40%">
      <el-form label-width="100px" :model="form" :rules="rules">
        <el-form-item label="角色名称">
          <el-input placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="报考岗位">
          <el-radio-group v-model="form.status">
            <el-radio :label="1">正常</el-radio>
            <el-radio :label="0">停用</el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item label="菜单权限">
          <!-- <el-tree
            class="tree-border"
            :data="menuOptions"
            show-checkbox
            ref="menu"
            :default-checked-keys="defKeys"
            node-key="id"
            empty-text="加载中，请稍后"
            :props="defaultProps"
          ></el-tree> -->
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
      dialogVisible: true,
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