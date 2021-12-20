<template>
  <div class="work">
    <div class="workAndStudy frame">
      <div class="frame_title">学习/工作情况：</div>
      <el-form class="form" :rules="rules" label-width="125px">
        <div class="left">
          <el-form-item label="学历:" prop="education">
            <el-select
              v-model="form.studyAndWork.education"
              placeholder="请选择"
            >
              <el-option
                v-for="item in education"
                :label="item.name"
                :key="item.value"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="学位:" prop="degree">
            <el-select v-model="form.studyAndWork.degree" placeholder="请选择">
              <el-option
                v-for="item in degree"
                :label="item.name"
                :key="item.value"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="毕业院校:" prop="graduationSchool">
            <el-input
              placeholder="请填写院校"
              v-model="form.studyAndWork.graduationSchool"
            ></el-input> </el-form-item
          ><el-form-item label="详细专业:" prop="major">
            <el-input
              placeholder="请填写专业"
              v-model="form.studyAndWork.major"
            ></el-input>
          </el-form-item>
        </div>
        <div class="right">
          <el-form-item label="是否全日制:" prop="fullTime">
            <el-select
              v-model="form.studyAndWork.fullTime"
              placeholder="请选择"
            >
              <el-option label="是" :value="1"></el-option>
              <el-option label="否" :value="0"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="毕业时间:" prop="graduationTime">
            <el-date-picker
              value-format="yyyy-MM-dd"
              v-model="form.studyAndWork.graduationTime"
              type="date"
              placeholder="选择日期"
            >
            </el-date-picker>
          </el-form-item>
          <el-form-item label="外语水平:" prop="languageLevel">
            <el-input
              placeholder="请填写外语水平"
              v-model="form.studyAndWork.languageLevel"
            ></el-input>
          </el-form-item>
          <el-form-item label="专业技术职称:" prop="skill">
            <el-input
              placeholder="请填写技术职称"
              v-model="form.studyAndWork.skill"
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
          >学习经历 (<span style="color: red">按时间顺序，从高中开始填起</span
          >)：</span
        >
        <el-button size="mini" @click="addData('study')" type="warning"
          >添加</el-button
        >
      </div>
      <el-table border :data="form.studyData">
        <el-table-column
          width="150"
          align="center"
          prop="startTime"
          label="入学日期"
        ></el-table-column>
        <el-table-column
          width="150"
          align="center"
          prop="endTime"
          label="毕业日期"
        ></el-table-column>
        <el-table-column
          prop="graduationSchool"
          label="毕业院校"
        ></el-table-column>
        <el-table-column
          align="center"
          prop="major"
          label="所学专业"
        ></el-table-column>
        <el-table-column
          align="center"
          prop="education"
          label="学历"
        ></el-table-column>
        <el-table-column
          align="center"
          prop="degree"
          label="学位"
        ></el-table-column>
        <el-table-column align="center" prop="educationType" label="教育类别">
          <template slot-scope="scoped">
            {{ scoped.row.educationType == 1 ? "全日制" : "非全日制" }}
          </template></el-table-column
        >
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
    </div>
    <div class="workAndStudy frame">
      <div
        class="frame_title"
        style="display: flex; justify-content: space-between"
      >
        <span>工作经历：</span>
        <el-button size="mini" @click="addData('work')" type="warning"
          >添加</el-button
        >
      </div>
      <el-table border :data="form.workData">
        <el-table-column
          width="150"
          align="center"
          prop="entryWork"
          label="入职日期"
        ></el-table-column>
        <el-table-column
          width="150"
          align="center"
          prop="leaveWork"
          label="离职日期"
        ></el-table-column>
        <el-table-column
          prop="unit"
          align="center"
          label="所在单位"
        ></el-table-column>
        <el-table-column
          prop="duty"
          align="center"
          label="职务"
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
    </div>
    <!-- 弹出框 -->
    <div class="dialog">
      <el-dialog :title="title" :visible.sync="dialogFormVisible">
        <el-form
          v-if="title == '添加学习经历'"
          inline
          label-width="120px"
          ref="addStudy"
          :rules="rules"
          :model="addStudy"
        >
          <el-form-item label="入学日期:" prop="startTime">
            <el-date-picker
              value-format="yyyy-MM-dd"
              v-model="addStudy.startTime"
              type="date"
              placeholder="选择日期"
            >
            </el-date-picker>
          </el-form-item>
          <el-form-item label="毕业日期:" prop="endTime">
            <el-date-picker
              value-format="yyyy-MM-dd"
              v-model="addStudy.endTime"
              type="date"
              placeholder="选择日期"
            >
            </el-date-picker>
          </el-form-item>
          <el-form-item label="毕业院校" prop="graduationSchool">
            <el-input v-model="addStudy.graduationSchool" placeholder="请填写">
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
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="学位" prop="degree">
            <el-select v-model="addStudy.degree" placeholder="请选择">
              <el-option
                v-for="item in degree"
                :label="item.name"
                :key="item.value"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="教育类别" prop="educationType">
            <el-select v-model="addStudy.educationType" placeholder="请选择">
              <el-option label="全日制" :value="1"></el-option>
              <el-option label="非全日制" :value="0"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <el-form
          v-else
          inline
          label-width="120px"
          ref="addWork"
          :rules="rules"
          :model="addWork"
        >
          <el-form-item label="入职日期:" prop="startTime">
            <el-date-picker
              value-format="yyyy-MM-dd"
              v-model="addWork.entryWork"
              type="date"
              placeholder="选择日期"
            >
            </el-date-picker>
          </el-form-item>
          <el-form-item label="离职日期:">
            <el-date-picker
              value-format="yyyy-MM-dd"
              v-model="addWork.leaveWork"
              type="date"
              placeholder="选择日期"
            >
            </el-date-picker>
          </el-form-item>
          <el-form-item label="所在单位" prop="unit">
            <el-input v-model="addWork.unit"></el-input>
          </el-form-item>
          <el-form-item label="职位" prop="duty">
            <el-input v-model="addWork.duty"></el-input>
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
      <el-button type="primary" size="small" @click="next(1)"
        >保存并上一步</el-button
      >
      <el-button type="primary" size="small" @click="next(2)"
        >保存并下一步</el-button
      >
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      dialogFormVisible: false,
      rules: {
        startTime: [
          { required: true, message: "请选择日期", trigger: "change" },
        ],
        endTime: [{ required: true, message: "请选择日期", trigger: "change" }],
        graduationTime: [
          { required: true, message: "请选择日期", trigger: "change" },
        ],
        graduationSchool: [
          { required: true, message: "请填写毕业院校", trigger: "change" },
        ],
        major: [{ required: true, message: "请填写专业", trigger: "change" }],
        education: [
          { required: true, message: "请选择学历", trigger: "change" },
        ],
        degree: [{ required: true, message: "请选择学位", trigger: "change" }],
        unit: [{ required: true, message: "请输入单位", trigger: "change" }],
        duty: [{ required: true, message: "请输入职位", trigger: "change" }],
        educationType: [
          { required: true, message: "请选择教育类别", trigger: "change" },
        ],
      },
      education: [
        { name: "研究生毕业", value: 1 },
        { name: "大学本科毕业", value: 2 },
        { name: "大专毕业", value: 3 },
        { name: "中专毕业", value: 4 },
        { name: "技工学校毕业", value: 5 },
        { name: "高中毕业", value: 6 },
        { name: "初中毕业", value: 7 },
      ],
      degree: [
        { name: "博士", value: 1 },
        { name: "硕士", value: 2 },
        { name: "学士", value: 3 },
        { name: "无", value: 4 },
      ],
      title: "添加学习经历",
      // 用于存储“添加学习经历”的数据
      addStudy: {},
      addWork: {},
      form: {
        // 学习/工作经历
        studyAndWork: [],
        // 学习经历
        studyData: [
          {
            startTime: "2021 - 10 - 3",
            endTime: "2021 - 10 - 3",
            graduationSchool: "广西民族大学",
            major: "计算机科学与技术",
            education: "本科",
            degree: "学士",
            educationType: "全日制",
          },
        ],
        // 工作经历
        workData: [
          {
            entryWork: "2021-09-08",
            leaveWork: "2021-12-03",
            unit: "广西民族大学",
            duty: "学生",
          },
        ],
      },
    };
  },
  methods: {
    next(n) {
      if (n == 1) {
        this.$router.push("student_info_basic");
      } else {
        this.$router.push("student_info_home");
      }
    },
    addStudyData() {
      this.$refs.addStudy.validate((valid) => {
        if (valid) {
          this.dialogFormVisible = false;
        }
      });
    },
    handleEdit() {},
    handleDelete() {},
    addData(type) {
      this.dialogFormVisible = true;
      if (type == "study") {
        this.title = "添加学习经历";
      } else if (type == "work") {
        this.title = "添加工作经历";
      }
    },
  },
};
</script>
<style lang="scss" scoped>
</style>