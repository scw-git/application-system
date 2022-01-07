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
        <el-form-item label="通知内容" prop="noticeContent">
          <vue-ueditor-wrap
            v-if="dialogVisible"
            :config="myConfig"
            v-model="form.noticeContent"
          ></vue-ueditor-wrap>
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
import VueUeditorWrap from "vue-ueditor-wrap";
import * as api from "@/api/system";
export default {
  components: {
    VueUeditorWrap,
  },
  data() {
    return {
      loading: false,
      dataList: [],
      dialogVisible: false,

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
      myConfig: {
        // 编辑器不自动被内容撑高
        autoHeightEnabled: false,
        // 初始容器高度
        initialFrameHeight: 200,
        // 初始容器宽度
        initialFrameWidth: "100%",
        UEDITOR_HOME_URL: "/UEditor/", //UEditor资源文件存放路径
        toolbars: [
          [
            "undo", //撤销
            "bold", //加粗
            "indent", //首行缩进
            "italic", //斜体
            "underline", //下划线
            "strikethrough", //删除线
            "forecolor",
            "subscript", //下标
            // "fontborder", //字符边框
            "superscript", //上标
            "formatmatch", //格式刷
            "fontfamily", //字体
            "fontsize", //字号
            "justifyleft", //居左对齐
            "justifycenter", //居中对齐
            "justifyright", //居右对齐
            "justifyjustify", //两端对齐
            "insertorderedlist", //有序列表
            "insertunorderedlist", //无序列表
            "lineheight", //行间距
          ],
        ],
        zIndex: 9999999999, //解决在弹框中下拉框不能使用问题
      },
    };
  },
  created() {
    this.getNoticeList();
  },
  methods: {
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
            api.updateNotice(this.form).then((res) => {
              if (res.code == 200) {
                this.$message.success("修改成功！");
                this.getNoticeList();

                this.dialogVisible = false;
              }
            });
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