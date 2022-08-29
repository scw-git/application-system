<template>
  <div class="work" v-loading="loading">
    <div class="workAndStudy frame">
      <div class="frame_title">学习/工作情况：</div>
      <el-form
        ref="ruleForm"
        class="form"
        :model="studyAndWork"
        :rules="rules"
        label-width="125px"
      >
        <div class="left">
          <el-form-item label="学历:" prop="education">
            <el-select v-model="studyAndWork.education" placeholder="请选择">
              <el-option
                v-for="item in education"
                :label="item.name"
                :key="item.value"
                :value="item.name"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="学位:" prop="degree">
            <el-select v-model="studyAndWork.degree" placeholder="请选择">
              <el-option
                v-for="item in degree"
                :label="item.name"
                :key="item.value"
                :value="item.name"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="毕业院校:" prop="graduatedSchool">
            <el-input
              placeholder="请填写院校"
              v-model="studyAndWork.graduatedSchool"
            ></el-input> </el-form-item
          ><el-form-item label="详细专业:" prop="detailedProfessional">
            <el-input
              placeholder="请填写专业"
              v-model="studyAndWork.detailedProfessional"
            ></el-input>
          </el-form-item>
        </div>
        <div class="right">
          <el-form-item label="是否全日制:" prop="educationType">
            <el-select
              v-model="studyAndWork.educationType"
              placeholder="请选择"
            >
              <el-option label="是" value="1"></el-option>
              <el-option label="否" value="0"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="毕业时间:" prop="graduatedTime">
            <el-date-picker
              value-format="yyyy-MM-dd"
              v-model="studyAndWork.graduatedTime"
              type="date"
              placeholder="选择日期"
            >
            </el-date-picker>
          </el-form-item>
          <el-form-item label="外语水平:" prop="languageLevel">
            <el-input
              placeholder="请填写外语水平"
              v-model="studyAndWork.languageLevel"
            ></el-input>
          </el-form-item>
          <el-form-item label="专业技术职称:" prop="professionalTechnicalTitle">
            <el-input
              placeholder="请填写技术职称"
              v-model="studyAndWork.professionalTechnicalTitle"
            ></el-input>
          </el-form-item>
        </div>
      </el-form>
    </div>
    <div class="workAndStudy frame">
      <div
        class="frame_title"
        style="display: flex; justify-content: space-between"
      >
        <span
          ><span style="color: red">*</span> 学习经历 (<span style="color: red"
            >按时间顺序，从高中开始填起</span
          >)：</span
        >
        <el-button size="mini" @click="openAddDialog('study')" type="warning"
          >添加</el-button
        >
      </div>
      <el-table border :data="studyData">
        <el-table-column
          width="150"
          align="center"
          prop="admissionDate"
          label="入学日期"
        ></el-table-column>
        <el-table-column
          width="150"
          align="center"
          prop="graduationDate"
          label="毕业日期"
        ></el-table-column>
        <el-table-column
          prop="graduatedSchool"
          label="毕业院校"
        ></el-table-column>
        <el-table-column
          align="center"
          prop="major"
          label="所学专业"
        ></el-table-column>
        <el-table-column align="center" prop="education" label="学历">
          <template slot-scope="scope">
            {{ scope.row.education }}
            <!-- {{ formatterStatus("education", scope.row.education) }} -->
          </template>
        </el-table-column>
        <el-table-column align="center" prop="degree" label="学位">
          <template slot-scope="scope">
            {{ scope.row.degree }}
            <!-- {{ formatterStatus("degree", scope.row.degree) }} -->
          </template>
        </el-table-column>
        <el-table-column align="center" prop="educationType" label="教育类别">
          <template slot-scope="scoped">
            {{ scoped.row.educationType }}
            <!-- {{ scoped.row.educationType == "1" ? "全日制" : "非全日制" }} -->
          </template></el-table-column
        >
        <el-table-column align="center" width="200" label="操作">
          <template slot-scope="scope">
            <el-button size="mini" @click="openEditDialog('study', scope.row)"
              >编辑</el-button
            >
            <el-button
              size="mini"
              type="danger"
              @click="delData('study', scope.row.id)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="workAndStudy frame">
      <div
        class="frame_title"
        style="display: flex; justify-content: space-between"
      >
        <span
          ><span style="color: red">*</span> 工作经历<span style="color: red"
            >(请从最近的经历开始填写)</span
          ></span
        >
        <el-button size="mini" @click="openAddDialog('work')" type="warning"
          >添加</el-button
        >
      </div>
      <el-table border :data="workData">
        <el-table-column
          width="150"
          align="center"
          prop="entryDate"
          label="入职日期"
        ></el-table-column>
        <el-table-column
          width="150"
          align="center"
          prop="resignationDate"
          label="离职日期"
        ></el-table-column>
        <el-table-column
          prop="currentUnit"
          align="center"
          label="所在单位"
        ></el-table-column>
        <el-table-column
          prop="jobTitle"
          align="center"
          label="职务"
        ></el-table-column>

        <el-table-column align="center" width="200" label="操作">
          <template slot-scope="scope">
            <el-button size="mini" @click="openEditDialog('work', scope.row)"
              >编辑</el-button
            >
            <el-button
              size="mini"
              type="danger"
              @click="delData('work', scope.row.id)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>

    <!-- 学习经历弹出框 -->
    <div class="dialog">
      <el-dialog :title="title" :visible.sync="studyDialog">
        <el-form
          inline
          label-width="120px"
          ref="addStudy"
          :rules="rules"
          :model="addStudy"
        >
          <el-form-item label="入学日期:" prop="admissionDate">
            <el-date-picker
              value-format="yyyy-MM-dd"
              v-model="addStudy.admissionDate"
              type="date"
              placeholder="选择日期"
            >
            </el-date-picker>
          </el-form-item>
          <el-form-item label="毕业日期:" prop="graduationDate">
            <el-date-picker
              value-format="yyyy-MM-dd"
              v-model="addStudy.graduationDate"
              type="date"
              placeholder="选择日期"
            >
            </el-date-picker>
          </el-form-item>
          <el-form-item label="毕业院校" prop="graduatedSchool">
            <el-input v-model="addStudy.graduatedSchool" placeholder="请填写">
            </el-input>
          </el-form-item>
          <el-form-item label="所学专业" prop="major">
            <el-input v-model="addStudy.major" placeholder="请填写"> </el-input>
          </el-form-item>
          <el-form-item label="学历" prop="education">
            <el-select v-model="addStudy.education" placeholder="请选择">
              <el-option
                v-for="item in education"
                :label="item.name"
                :key="item.value"
                :value="item.name"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="学位" prop="degree">
            <el-select v-model="addStudy.degree" placeholder="请选择">
              <el-option
                v-for="item in degree"
                :label="item.name"
                :key="item.value"
                :value="item.name"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="教育类别" prop="educationType">
            <el-select v-model="addStudy.educationType" placeholder="请选择">
              <el-option label="全日制" value="全日制"></el-option>
              <el-option label="非全日制" value="非全日制"></el-option>
            </el-select>
          </el-form-item>
        </el-form>

        <div style="text-align: center" slot="footer" class="dialog-footer">
          <el-button
            v-if="title == '添加学习经历'"
            size="medium"
            type="primary"
            @click="addData('study')"
            >添 加</el-button
          >
          <el-button
            v-else
            size="medium"
            type="primary"
            @click="editData('study')"
            >编 辑</el-button
          >
          <el-button size="medium" @click="studyDialog = false"
            >取 消</el-button
          >
        </div>
      </el-dialog>
    </div>
    <!-- 工作经历弹出框 -->
    <div class="dialog">
      <el-dialog :title="title" :visible.sync="workDialog">
        <el-form
          inline
          label-width="120px"
          ref="addWork"
          :rules="rules"
          :model="addWork"
        >
          <el-form-item label="入职日期:" prop="entryDate">
            <el-date-picker
              value-format="yyyy-MM-dd"
              v-model="addWork.entryDate"
              type="date"
              placeholder="选择日期"
            >
            </el-date-picker>
          </el-form-item>
          <el-form-item label="离职日期:">
            <el-date-picker
              value-format="yyyy-MM-dd"
              v-model="addWork.resignationDate"
              type="date"
              placeholder="选择日期"
            >
            </el-date-picker>
          </el-form-item>
          <el-form-item label="所在单位" prop="currentUnit">
            <el-input v-model="addWork.currentUnit"></el-input>
          </el-form-item>
          <el-form-item label="职位" prop="jobTitle">
            <el-input v-model="addWork.jobTitle"></el-input>
          </el-form-item>
        </el-form>
        <div style="text-align: center" slot="footer" class="dialog-footer">
          <el-button
            v-if="title == '添加工作经历'"
            size="medium"
            type="primary"
            @click="addData('work')"
            >添 加</el-button
          >
          <el-button
            v-else
            size="medium"
            type="primary"
            @click="editData('work')"
            >编 辑</el-button
          >
          <el-button size="medium" @click="workDialog = false">取 消</el-button>
        </div>
      </el-dialog>
    </div>
    <div class="next">
      <el-button type="primary" size="small" @click="next(1)">上一步</el-button>
      <el-button type="primary" @click="next(2)">下一步</el-button>
    </div>
  </div>
</template>
<script>
import * as api from "@/api/info";

export default {
  data() {
    return {
      loading: false,
      textarea: "",
      workDialog: false,
      studyDialog: false,
      rules: {
        admissionDate: [
          { required: true, message: "请选择日期", trigger: "blur" },
        ],

        resignationDate: [
          { required: true, message: "请选择日期", trigger: "blur" },
        ],
        entryDate: [{ required: true, message: "请选择日期", trigger: "blur" }],
        graduationDate: [
          { required: true, message: "请选择日期", trigger: "blur" },
        ],
        graduatedTime: [
          { required: true, message: "请选择日期", trigger: "blur" },
        ],
        graduatedSchool: [
          { required: true, message: "请填写毕业院校", trigger: "blur" },
        ],

        detailedProfessional: [
          { required: true, message: "请填写专业", trigger: "blur" },
        ],
        major: [{ required: true, message: "请填写专业", trigger: "blur" }],
        education: [{ required: true, message: "请选择学历", trigger: "blur" }],
        degree: [{ required: true, message: "请选择学位", trigger: "blur" }],
        currentUnit: [
          { required: true, message: "请输入单位", trigger: "blur" },
        ],
        jobTitle: [{ required: true, message: "请输入职位", trigger: "blur" }],
        educationType: [
          { required: true, message: "请选择教育类别", trigger: "blur" },
        ],
      },
      allStatus: {
        education: {
          1: "研究生毕业",
          2: "大学本科毕业",
          3: "大专毕业",
          4: "中专毕业",
          5: "技工学校毕业",
          6: "高中毕业",
          7: "初中毕业",
        },
        degree: {
          1: "博士",
          2: "硕士",
          3: "学士",
          4: "无",
        },
      },
      education: [
        { name: "研究生毕业", value: "1" },
        { name: "大学本科毕业", value: "2" },
        { name: "大专毕业", value: "3" },
        { name: "中专毕业", value: "4" },
        { name: "技工学校毕业", value: "5" },
        { name: "高中毕业", value: "6" },
        { name: "初中毕业", value: "7" },
      ],
      degree: [
        { name: "博士", value: "1" },
        { name: "硕士", value: "2" },
        { name: "学士", value: "3" },
        { name: "无", value: "4" },
      ],
      title: "添加学习经历",
      // 用于存储“添加学习经历”的数据
      addStudy: {},
      addWork: {},
      // 用于更新
      updStudy: {},
      updWork: {},
      form: {},
      // 学习/工作经历
      studyAndWork: {},
      // 学习经历
      studyData: [],
      // 工作经历
      workData: [],
    };
  },
  created() {
    this.getStudyWork();
    this.getStudyData();
    this.getWorkData();
  },
  methods: {
    // 删除
    delData(type, id) {
      this.$confirm("是否确定删除该条数据?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        if (type == "study") {
          api.delStudy(id).then((res) => {
            if (res.code == 200) {
              this.getStudyData();
              this.$message.success("删除成功");
            }
          });
        } else {
          api.delWork(id).then((res) => {
            if (res.code == 200) {
              this.getWorkData();
              this.$message.success("删除成功");
            }
          });
        }
      });
    },
    // 更新学习经历或工作经历
    editData(type) {
      if (type == "study") {
        api.updateStudy({ ...this.addStudy }).then((res) => {
          if (res.code == 200) {
            this.studyDialog = false;
            this.$message.success("更新成功");
            this.getStudyData();
          }
        });
      } else {
        api.updateWork({ ...this.addWork }).then((res) => {
          if (res.code == 200) {
            this.$message.success("更新成功");
            this.workDialog = false;
            this.getWorkData();
          }
        });
      }
    },
    // 点击编辑时打开弹框
    openEditDialog(type, data) {
      if (type == "study") {
        this.title = "编辑学习经历";
        this.studyDialog = true;
        // this.addStudy = data;
        // 不能像上面那么写，点击编辑出过来的是地址。弹框改变了表格里面的数据也会改变
        this.addStudy = { ...data };
      } else {
        this.title = "编辑工作经历";
        this.workDialog = true;
        // this.addWork = data ;
        this.addWork = { ...data };
      }
    },
    // 点击新增时打开弹框
    openAddDialog(type) {
      this.addStudy = [];
      this.addWork = [];
      if (type == "study") {
        this.title = "添加学习经历";
        this.studyDialog = true;
      } else if (type == "work") {
        this.title = "添加工作经历";
        this.workDialog = true;
      }
    },
    formatterStatus(type, data) {
      if (data != null) {
        return this.allStatus[type][data];
      } else {
        return "未确定";
      }
    },
    // 获取学习/工作情况
    getStudyWork() {
      this.loading = true;
      api.getStudyWork().then((res) => {
        if (res.data) {
          this.studyAndWork = res.data;
          this.loading = false;
        }
      });
    },
    next(n) {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          if (this.workData.length == 0 || this.studyData.length == 0) {
            this.$message.warning("请完善信息！");
          } else {
            api.saveStudyWork({ ...this.studyAndWork }).then((res) => {
              if (res.code == 200) {
                this.$message.success("保存成功");
                this.getStudyWork();
                if (n == 1) {
                  this.$router.push("student_info_basic");
                } else {
                  this.$router.push("student_info_other");
                }
              }
            });
          }
        }
      });
    },
    // 获取学习经历
    getStudyData() {
      this.loading = true;
      api.getStudy().then((res) => {
        this.studyData = res.data;
        this.loading = false;
      });
    },
    // 获取工作经历
    getWorkData() {
      api.getWork().then((res) => {
        this.workData = res.data;
      });
    },
    // 添加学习经历和工作经历
    addData(type) {
      if (type == "study") {
        this.$refs.addStudy.validate((valid) => {
          if (valid) {
            api.saveStudy({ ...this.addStudy }).then((res) => {
              if (res.code == 200) {
                this.$message.success("添加成功");
                this.studyDialog = false;
                this.getStudyData();
              }
            });
          }
        });
      } else {
        this.$refs.addWork.validate((valid) => {
          if (valid) {
            api.saveWork({ ...this.addWork }).then((res) => {
              if (res.code == 200) {
                this.$message.success("添加成功");
                this.workDialog = false;
                this.getWorkData();
              }
            });
          }
        });
      }
    },
  },
};
</script>
<style lang="scss" scoped>
</style>