<template>
  <div class="other p15" v-loading="loading">
    <div class="frame_title">笔试准考证考试须知：</div>
    <quill-editor
      ref="myQuillEditor"
      v-model="msg1"
      :options="editorOption"
      @blur="onEditorBlur($event)"
      @focus="onEditorFocus($event)"
      @ready="onEditorReady($event)"
    />

    <div class="frame_title">面试准考证须知：</div>
    <quill-editor
      ref="myQuillEditor"
      v-model="msg2"
      :options="editorOption"
      @blur="onEditorBlur($event)"
      @focus="onEditorFocus($event)"
      @ready="onEditorReady($event)"
    />
    <!-- <div class="btn">
      <el-button type="primary" @click="save">保存编辑</el-button>
    </div> -->
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
      msg1: "",
      msg2: "",
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
    };
  },
  created() {
    this.getOther();
  },
  methods: {
    onEditorBlur() {
      this.save();
    },
    onEditorFocus() {},
    onEditorReady() {},
    getOther() {
      this.loading = true;
      api.getOther().then((res) => {
        this.msg1 = res.data[0].writtenNote;
        this.msg2 = res.data[0].faceNote;
        this.loading = false;
      });
    },
    save() {
      api
        .saveOther({ id: 1, writtenNote: this.msg1, faceNote: this.msg2 })
        .then((res) => {
          this.$message.success("保存成功！");
        });
    },
  },
};
</script>
<style lang="scss" scoped>
.other {
  .btn {
    margin-top: 10px;
    text-align: center;
  }
}
</style>

<style lang='scss'>
.editor {
  line-height: normal !important;
  height: 500px;
}

.ql-snow .ql-tooltip[data-mode="link"]::before {
  content: "请输入链接地址:";
}

.ql-snow .ql-tooltip.ql-editing a.ql-action::after {
  border-right: 0px;
  content: "保存";
  padding-right: 0px;
}

.ql-snow .ql-tooltip[data-mode="video"]::before {
  content: "请输入视频地址:";
}

.ql-snow .ql-picker.ql-size .ql-picker-label::before,
.ql-snow .ql-picker.ql-size .ql-picker-item::before {
  content: "14px";
}

.ql-snow .ql-picker.ql-size .ql-picker-label[data-value="small"]::before,
.ql-snow .ql-picker.ql-size .ql-picker-item[data-value="small"]::before {
  content: "10px";
}

.ql-snow .ql-picker.ql-size .ql-picker-label[data-value="large"]::before,
.ql-snow .ql-picker.ql-size .ql-picker-item[data-value="large"]::before {
  content: "18px";
}

.ql-snow .ql-picker.ql-size .ql-picker-label[data-value="huge"]::before,
.ql-snow .ql-picker.ql-size .ql-picker-item[data-value="huge"]::before {
  content: "32px";
}

.ql-snow .ql-picker.ql-header .ql-picker-label::before,
.ql-snow .ql-picker.ql-header .ql-picker-item::before {
  content: "文本";
}

.ql-snow .ql-picker.ql-header .ql-picker-label[data-value="1"]::before,
.ql-snow .ql-picker.ql-header .ql-picker-item[data-value="1"]::before {
  content: "标题1";
}

.ql-snow .ql-picker.ql-header .ql-picker-label[data-value="2"]::before,
.ql-snow .ql-picker.ql-header .ql-picker-item[data-value="2"]::before {
  content: "标题2";
}

.ql-snow .ql-picker.ql-header .ql-picker-label[data-value="3"]::before,
.ql-snow .ql-picker.ql-header .ql-picker-item[data-value="3"]::before {
  content: "标题3";
}

.ql-snow .ql-picker.ql-header .ql-picker-label[data-value="4"]::before,
.ql-snow .ql-picker.ql-header .ql-picker-item[data-value="4"]::before {
  content: "标题4";
}

.ql-snow .ql-picker.ql-header .ql-picker-label[data-value="5"]::before,
.ql-snow .ql-picker.ql-header .ql-picker-item[data-value="5"]::before {
  content: "标题5";
}

.ql-snow .ql-picker.ql-header .ql-picker-label[data-value="6"]::before,
.ql-snow .ql-picker.ql-header .ql-picker-item[data-value="6"]::before {
  content: "标题6";
}

.ql-snow .ql-picker.ql-font .ql-picker-label::before,
.ql-snow .ql-picker.ql-font .ql-picker-item::before {
  content: "标准字体";
}

.ql-snow .ql-picker.ql-font .ql-picker-label[data-value="serif"]::before,
.ql-snow .ql-picker.ql-font .ql-picker-item[data-value="serif"]::before {
  content: "衬线字体";
}

.ql-snow .ql-picker.ql-font .ql-picker-label[data-value="monospace"]::before,
.ql-snow .ql-picker.ql-font .ql-picker-item[data-value="monospace"]::before {
  content: "等宽字体";
}
</style>