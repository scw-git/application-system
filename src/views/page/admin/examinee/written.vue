<template>
  <div class="written p15">
    <div class="search">
      <el-select v-model="value" placeholder="选择岗位">
        <el-option label="岗位一" value="1"> </el-option>
        <el-option label="岗位二" value="2"> </el-option>
      </el-select>
      <el-button
        @click="exportTemplate"
        style="margin-left: 20px"
        size="medium"
        type="primary"
      >
        批量导出</el-button
      >
      <el-button size="medium" type="primary"> 批量导入成绩</el-button>
      <el-button size="medium" type="primary"> 批量发送面试通知</el-button>
    </div>
    <div class="table">
      <el-table
        @selection-change="handleSelectionChange"
        border
        :data="dataList"
      >
        <el-table-column align="center" type="selection" width="55">
        </el-table-column>
        <el-table-column
          align="center"
          width="70"
          label="序号"
          type="index"
        ></el-table-column>
        <el-table-column
          align="center"
          label="姓名"
          prop="name"
        ></el-table-column>
        <el-table-column
          align="center"
          label="考试名称"
          prop="examName"
        ></el-table-column>
        <el-table-column
          align="center"
          label="准考证号"
          prop="admissionTicketNumber"
        ></el-table-column>

        <el-table-column
          align="center"
          label="报考单位"
          prop="examUnit"
        ></el-table-column>
        <el-table-column
          align="center"
          label="报考岗位"
          prop="recruitmentJob"
        ></el-table-column>
        <el-table-column
          width="80"
          align="center"
          label="考场号"
          prop="examination"
        ></el-table-column>
        <el-table-column
          width="80"
          align="center"
          label="座位号"
          prop="seatNumber"
        ></el-table-column>
        <el-table-column
          width="110"
          align="center"
          label="笔试成绩"
          prop="writtenScore"
        >
        </el-table-column>
        <el-table-column align="center" label="已发面试" prop="ifInterview">
          <template slot-scope="scope">
            {{
              scope.row.ifInterview == "0"
                ? "否"
                : scope.row.ifInterview == "1"
                ? "是"
                : "未确定"
            }}
          </template></el-table-column
        >
        <el-table-column label="操作" align="center" width="260px">
          <template slot-scope="scope">
            <el-button size="mini" type="success"> 通知面试</el-button>
            <el-button
              @click="openWrittenScoreDialog(scope.row.id)"
              type="warning"
              size="mini"
              >填写成绩</el-button
            >
            <el-button size="mini" type="danger">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-dialog :visible.sync="dialog" width="30%">
        <el-form label-width="50px">
          <el-form-item label="成绩">
            <el-input v-model="personalData.writtenScore"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="writtenScore" type="primary">确认</el-button>
          <el-button @click="dialog = false">取消</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>
<script>
import * as api from "@/api/examinee";
import { downloadFile } from "@/utils/downloadFile";
export default {
  data() {
    return {
      dialog: false,
      personalData: {
        id: "",
        writtenScore: "",
      },
      selectedIds: [], //所有选中的id
      value: "",
      dataList: [],
    };
  },
  created() {
    this.getWrittenList();
  },
  methods: {
    handleSelectionChange(data) {
      this.selectedIds = data.map((item) => {
        return item.id;
      });
      console.log(this.selectedIds);
    },
    openWrittenScoreDialog(id) {
      this.dialog = true;
      this.personalData.id = id;
    },
    getWrittenList() {
      api.getWrittenList({ recruitmentJob: "" }).then((res) => {
        this.dataList = res.data;
      });
    },
    // 填写笔试成绩
    writtenScore() {
      api.writtenScore(this.personalData).then((res) => {
        this.$message.success("操作成功！");
        this.dialog = false;
        this.getWrittenList();
      });
    },
    handleDownload(row) {
      var name = row.fileName;
      var url = row.filePath;
      var suffix = url.substring(url.lastIndexOf("."), url.length);
      const a = document.createElement("a");
      a.setAttribute("download", name + suffix);
      a.setAttribute("target", "_blank");
      a.setAttribute("href", url);
      a.click();
    },
    exportTemplate() {
      if (this.selectedIds.length > 0) {
        api.exportTemplate({ ids: this.selectedIds }).then((res) => {
          console.log(99, res);
          // downloadFile(res, "xxx", ".xls");
          // api.downloadFile({ fileName: res.msg, delete: true }).then((res) => {

          // });
        });
      } else {
        this.$message.warning("请选择要导出的内容！");
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.written {
  .search {
    margin-bottom: 20px;
  }
}
</style>