<template>
  <div class="written p15">
    <div class="search">
      <el-input
        style="width: 220px"
        v-model="searchValue"
        placeholder="请输入搜索内容"
      >
      </el-input>
      <!-- <el-select v-model="value" placeholder="选择岗位">
        <el-option label="岗位一" value="1"> </el-option>
        <el-option label="岗位二" value="2"> </el-option>
      </el-select> -->
      <el-button
        @click="exportTemplate"
        style="margin-left: 20px"
        size="medium"
        type="primary"
      >
        批量导出</el-button
      >
      <el-upload
        ref="upload"
        style="display: inline-block; padding: 0 10px"
        class="upload-demo"
        action="/api/apply-info/written-batch-import"
        :limit="1"
        :headers="headers"
        accept=".xlsx, .xls"
        :on-success="handleFileSuccess"
        :show-file-list="false"
      >
        <el-button size="medium" type="primary"> 批量导入成绩</el-button>
      </el-upload>

      <el-button size="medium" type="primary" @click="allSendIntervie">
        批量发送面试通知</el-button
      >
    </div>
    <div class="table" v-loading="loading">
      <el-table
        @selection-change="handleSelectionChange"
        border
        :data="dataList"
        ref="table"
      >
        <el-table-column align="center" type="selection" width="50">
        </el-table-column>
        <el-table-column
          align="center"
          width="50"
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
            <el-button
              size="mini"
              type="success"
              @click="openDialog(scope.row.id)"
            >
              通知面试</el-button
            >
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
    <el-dialog title="发送面试" :visible.sync="dialogVisible" width="30%">
      <el-table
        @selection-change="handleInterviewSelectionChange"
        :data="interviewSiteList"
        border
      >
        <el-table-column
          label="序号"
          width="60"
          align="center"
          type="selection"
        ></el-table-column>

        <el-table-column align="center" prop="time" label="面试时间">
          <template slot-scope="scope">
            {{ scope.row.startExamDate }} <br />{{ scope.row.endExamDate }}
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          prop="placeAddress"
          label="面试地点"
        ></el-table-column>
      </el-table>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="confirmSendIntervie">确 定</el-button>
        <el-button @click="dialogVisible = false">取 消</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import * as api from "@/api/examinee";
import { getInterviewSiteList } from "@/api/site";
import { downloadFile } from "@/utils/downloadFile";
import { saveAs } from "file-saver";
export default {
  data() {
    return {
      laoding: false,
      dialogVisible: false,
      searchValue: "",
      dialog: false,
      interviewSiteList: [], //面试地点列表
      ids: {}, //通知面试所需的两个id
      personalData: {
        id: "",
        writtenScore: "",
      },
      selectedIds: [], //所有选中的id
      selectedArr: [],
      value: "",
      dataList: [],
      tag: false, //区分批量面试通知还是单人
      headers: {
        Authorization: JSON.parse(sessionStorage.getItem("loginInfo")).token,
      },
    };
  },
  created() {
    this.getWrittenList();
    this.getInterviewSiteList(); //获取面试地点列表
  },
  methods: {
    // 批量发送面试通知
    allSendIntervie() {
      if (this.selectedIds.length > 0) {
        this.dialogVisible = true;
        this.tag = true;
      } else {
        this.tag = false;
        this.$message.warning("请选择考生！");
      }
    },
    confirmSendIntervie() {
      if (this.selectedArr.length == 1) {
        if (this.tag) {
          console.log(9, this.ids);
          api
            .allSendIntervie({
              applyIds: this.selectedIds,
              facePlaceId: this.ids.faceInfoId,
            })
            .then((res) => {
              if (res.code == 200) {
                this.$message.success("通知面试成功");
                this.getWrittenList();
                this.dialogVisible = false;
              }
            });
        } else {
          api.confirmSendIntervie(this.ids).then((res) => {
            if (res.code == 200) {
              this.$message.success("通知面试成功");
              this.getWrittenList();
              this.dialogVisible = false;
            }
          });
        }
      } else {
        this.$message.warning("只能选一个面试地址！");
      }
    },
    handleInterviewSelectionChange(data) {
      this.selectedArr = data;
      this.ids.faceInfoId = data[0].id;
    },
    openDialog(id) {
      this.dialogVisible = true;
      this.ids.id = id;
    },
    // 获取面试列表
    getInterviewSiteList() {
      getInterviewSiteList().then((res) => {
        this.interviewSiteList = res.rows;
      });
    },
    // 文件上传成功处理
    handleFileSuccess(res, file, fileList) {
      if (res.code == 200) {
        this.$message.success("导入成功！");
        this.getWrittenList();
      }
    },

    handleSelectionChange(data) {
      this.selectedIds = data.map((item) => {
        return item.id;
      });
    },
    openWrittenScoreDialog(id) {
      this.dialog = true;
      this.personalData.id = id;
    },
    getWrittenList() {
      this.loading = true;
      api.getWrittenList({ recruitmentJob: "" }).then((res) => {
        this.dataList = res.data;
        this.loading = false;
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

    exportTemplate() {
      if (this.selectedIds.length > 0) {
        let name = new Date().getFullYear() + "年笔试统计.xlsx";
        api
          .exportTemplate({
            ids: this.selectedIds,
            recruitmentJob: this.searchValue,
          })
          .then((res) => {
            downloadFile(res, name);
            this.$refs.table.clearSelection();
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