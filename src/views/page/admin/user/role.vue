<template>
  <div class="role p15">
    <div class="operation mb10">
      <el-button
        style="margin-left: 10px"
        type="primary"
        @click="openDialog(1)"
      >
        添加角色</el-button
      >
    </div>
    <div class="table" v-loading="loading">
      <el-table :data="dataList" border>
        <el-table-column
          label="序号"
          width="100"
          align="center"
          type="index"
        ></el-table-column>
        <el-table-column
          align="center"
          prop="roleName"
          label="角色名称"
        ></el-table-column>

        <el-table-column
          align="center"
          prop="roleKey"
          label="角色标识"
        ></el-table-column>
        <el-table-column align="center" prop="status" label="角色状态">
          <template v-if="scope.row.roleKey != 'admin'" slot-scope="scope"
            ><el-switch
              v-model="scope.row.status"
              active-color="#13ce66"
              inactive-color="#ff4949"
              active-value="0"
              inactive-value="1"
              @change="changeStatus(scope.row)"
            >
            </el-switch
          ></template>
        </el-table-column>

        <el-table-column width="300px" align="center" label="操作">
          <template v-if="scope.row.roleKey != 'admin'" slot-scope="scope">
            <el-button
              @click="openDialog(2, scope.row)"
              size="small"
              type="warning"
            >
              编辑</el-button
            >

            <el-button
              size="small"
              @click="delRole(scope.row.roleId)"
              type="danger"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-dialog :title="title" :visible.sync="dialogVisible" width="40%">
      <el-form ref="ruleForm" label-width="100px" :model="form" :rules="rules">
        <el-form-item label="角色名称" prop="roleName">
          <el-input v-model="form.roleName" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="权限标识" prop="roleKey">
          <el-input v-model="form.roleKey" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="报考岗位">
          <el-radio-group v-model="form.status">
            <el-radio label="0">正常</el-radio>
            <el-radio label="1">停用</el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item label="菜单权限">
          <el-tree
            class="tree-border"
            :data="menuList"
            show-checkbox
            ref="menu"
            node-key="id"
            :default-checked-keys="defKeys"
            empty-text="加载中，请稍后"
            :props="defaultProps"
          ></el-tree>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="submitData" type="primary">提交</el-button>
        <el-button @click="dialogVisible = false">取消</el-button>
      </span>
    </el-dialog>
    <el-pagination
      v-if="total > 0"
      style="margin-top: 20px"
      layout="total,prev, pager, next"
      :total="total"
      :current-page="pagination.pageNum"
      @current-change="handleChangePageNum"
    >
    </el-pagination>
  </div>
</template>
<script>
import * as api from "@/api/user";

export default {
  data() {
    return {
      total: 0,
      pagination: {
        pageNum: 1,
        pageSize: 10,
      },
      loading: false,
      dialogVisible: false,
      rules: {
        roleName: [{ required: true, message: "请输入", trigger: "blur" }],
        roleKey: [{ required: true, message: "请输入", trigger: "blur" }],
      },
      form: {
        roleName: "",
        status: "0",
        roleSort: 1,
        roleKey: "",
      },
      title: "添加角色",
      dataList: [],
      menuList: [],
      defaultProps: {
        children: "children",
        label: "label",
      },
      defKeys: [],
    };
  },
  created() {
    this.getRoleList();
    this.getUnSelected();
  },
  methods: {
    handleChangePageNum(val) {
      this.pagination.pageNum = val;
      this.getRoleList();
    },
    delRole(id) {
      this.$confirm("确认要删除该角色吗?", "警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        api.delRole(id).then((res) => {
          this.$message.success("删除成功！");
          this.getRoleList();
        });
      });
    },

    changeStatus(row) {
      let text = row.status === "0" ? "启用" : "停用";
      this.$confirm(
        '确认要"' + text + '""' + row.roleName + '"角色吗?',
        "警告",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }
      )
        .then(() => {
          api
            .updateRoleStatus({ roleId: row.roleId, status: row.status })
            .then(() => {
              this.$message({
                type: "success",
                message: text + "成功!",
              });
            });
        })
        .catch(() => {
          row.status = row.status === "0" ? "1" : "0";
        });
    },

    submitData() {
      this.$refs.ruleForm.validate((valide) => {
        if (valide) {
          let node = this.$refs.menu.getCheckedNodes();
          this.form.menuIds = node.map((item) => {
            return item.id;
          });
          if (node.length > 0) {
            if (this.title == "添加角色") {
              api.addRole(this.form).then((res) => {
                this.$message.success("添加成功！");
                this.dialogVisible = false;
                this.getRoleList();
              });
            } else {
              api.editRole(this.form).then((res) => {
                this.$message.success("修改成功！");
                this.dialogVisible = false;
                this.getRoleList();
              });
            }
          } else {
            this.$message.warning("请选择权限");
          }
        }
      });
    },
    handleCheckNodes(val) {},
    // 获取菜单权限
    getUnSelected() {
      api.getUnSelected().then((res) => {
        this.menuList = res.data.slice(0, 5);
      });
    },
    editRole(row) {
      this.title = "修改角色";
      this.form.roleName = row.roleName;
      this.form.roleKey = row.roleKey;
      this.form.status = row.status;
      this.form.roleId = row.roleId;
      api.getSelected(row.roleId).then((res) => {
        this.defKeys = res.checkedKeys;
        this.menuList = res.menus.slice(0, 5);
      });
    },
    openDialog(n, row) {
      if (n == 1) {
        this.title = "添加角色";
        this.form = { status: "0", roleSort: 1 };
        this.defKeys = [];
        if (this.$refs.menu) {
          this.$refs.menu.setCheckedNodes(this.defKeys);
        }
      } else {
        this.editRole(row);
      }
      this.dialogVisible = true;
    },
    // 获取角色列表
    getRoleList() {
      this.loading = true;
      let params = {
        pageNum: 1,
        pageSize: 100,
      };
      api.getRoleList(params).then((res) => {
        this.dataList = res.rows;
        this.total = res.total;
        this.loading = false;
      });
    },
  },
};
</script>
<style lang="scss" scoped>
</style>