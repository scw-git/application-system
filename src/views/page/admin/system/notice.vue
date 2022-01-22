<template>
  <div class="notice p15">
    <el-button style="margin-bottom: 10px" type="primary" @click="add(1)"
      >发布通知</el-button
    >
    <div class="table" v-loading="loading">
      <el-table :data="dataList" border>
        <el-table-column
          label="序号"
          width="50"
          align="center"
          type="index"
        ></el-table-column>
        <el-table-column
          align="center"
          prop="noticeTitle"
          label="通知标题"
        ></el-table-column>

        <el-table-column
          align="center"
          prop="createTime"
          label="创建时间"
        ></el-table-column>

        <el-table-column
          width="50px"
          align="center"
          prop="noticeType"
          label="类型"
        >
          <template slot-scope="scope">
            {{ scope.row.noticeType == "1" ? "站内" : "站外" }}</template
          ></el-table-column
        >
        <el-table-column
          width="100px"
          align="center"
          prop="createBy"
          label="创建人"
        ></el-table-column>
        <el-table-column
          width="100px"
          align="center"
          prop="status"
          label="状态"
        >
          <template slot-scope="scope"
            ><el-switch
              v-model="scope.row.status"
              active-color="#13ce66"
              inactive-color="#ff4949"
              active-value="0"
              inactive-value="1"
              @change="changeStatus(scope.row)"
            >
            </el-switch></template
        ></el-table-column>
        <el-table-column width="300px" align="center" label="操作">
          <template slot-scope="scope">
            <el-button size="small" type="primary" @click="add(2, scope.row)">
              修改</el-button
            >
            <el-button
              size="small"
              @click="delNotice(scope.row.noticeId)"
              type="danger"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-dialog title="发布通知" :visible.sync="dialogVisible" width="50%">
      <el-form ref="ruleForm" label-width="100px" :model="form" :rules="rules">
        <el-form-item prop="noticeTitle" label="通知标题">
          <el-input v-model="form.noticeTitle"></el-input>
        </el-form-item>

        <el-form-item label="通知位置" prop="noticeType">
          <el-radio-group v-model="form.noticeType">
            <el-radio label="1">站内</el-radio>
            <el-radio label="0">站外</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="状态" prop="status">
          <el-radio-group v-model="form.status">
            <el-radio label="0">正常</el-radio>
            <el-radio label="1">关闭</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item
          v-if="form.noticeType == '1'"
          label="通知内容"
          prop="noticeContent"
        >
          <quill-editor
            v-if="dialogVisible"
            ref="myQuillEditor"
            v-model="form.noticeContent"
            :options="editorOption"
            @blur="onEditorBlur($event)"
            @focus="onEditorFocus($event)"
            @ready="onEditorReady($event)"
          />
        </el-form-item>
        <el-form-item required v-else label="链接" prop="noticeContent">
          <el-input
            placeholder="请输入链接"
            v-model="form.noticeContent"
          ></el-input>
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
import * as api from "@/api/system";
import { quillEditor } from "vue-quill-editor";
import toolbarOptions from "@/utils/toolbarOptions";

export default {
  components: {
    quillEditor,
  },
  data() {
    return {
      loading: false,
      dataList: [],
      dialogVisible: false,
      editorOption: {
        //  富文本编辑器配置
        modules: {
          //工具栏定义的
          toolbar: toolbarOptions,
        },
        //主题
        theme: "snow",
        placeholder: "请输入正文",
      },

      form: {
        status: "0", //默认正确启用
        noticeType: "1",
      },
      rules: {
        noticeTitle: [{ required: true, message: "请输入", trigger: "blur" }],
        noticeContent: [
          { required: true, message: "请输入", trigger: "change" },
        ],
      },
    };
  },
  created() {
    this.getNoticeList();
  },
  methods: {
    onEditorBlur() {},
    onEditorFocus() {},
    onEditorReady() {},
    changeStatus(row) {
      let text = row.status === "0" ? "启用" : "停用";
      this.$confirm("确认要" + text + "该通知吗？", "警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.form = { ...row };
          this.updateNotice();
        })
        .catch(() => {
          row.status = row.status === "0" ? "1" : "0";
        });
    },
    delNotice(id) {
      this.$confirm("确认要删除吗?", "警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        api.delNotice(id).then((res) => {
          if (res.code == 200) {
            this.$message.success("删除成功！");
            this.getNoticeList();
          }
        });
      });
    },
    // 更新通知
    updateNotice() {
      api.updateNotice(this.form).then((res) => {
        if (res.code == 200) {
          this.$message.success("修改成功！");
          this.getNoticeList();

          this.dialogVisible = false;
        }
      });
    },
    submitData() {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          if (this.title == "发布通知") {
            api.addNotice(this.form).then((res) => {
              if (res.code == 200) {
                this.$message.success("添加成功！");
                this.getNoticeList();
                this.dialogVisible = false;
              }
            });
          } else {
            this.updateNotice();
          }
        }
      });
    },
    getNoticeList() {
      this.loading = true;
      api.getNoticeList().then((res) => {
        this.dataList = res.rows;
        this.loading = false;
      });
    },
    add(n, data) {
      this.form = {
        status: "0", //默认正确启用
        noticeType: "1",
      };
      if (n == 1) {
        this.title = "发布通知";
      } else {
        this.title = "修改通知";
        this.form = { ...data };
      }
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