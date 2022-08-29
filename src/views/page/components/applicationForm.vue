<template>
  <div class="applicationFrom">
    <!-- <el-button @click="aa('#getPdf')">pdf</el-button> -->

    <div id="getPdf" class="wrap">
      <div class="title">
        <h1>
          广西壮族自治区财政厅厅属事业单位
          <br />{{ year }}年度公开招聘工作人员报名表
        </h1>
      </div>
      <div class="body">
        <table border="1">
          <tr>
            <td class="tac">报考单位</td>
            <td v-if="data.examInfo" colspan="5">
              {{ data.examInfo.examUnit }}
            </td>
            <td rowspan="5" style="height: 156px; width: 169px">
              <img
                v-if="data.examineVo"
                style="width: 100%"
                :src="`${data.examineVo.personalPicture}`"
                alt
              />
            </td>
          </tr>
          <tr v-if="data.examInfo">
            <td class="tac">报考岗位</td>
            <td colspan="3">{{ data.examInfo.recruitmentJob }}</td>
            <td class="tac">岗位代码</td>
            <td>{{ data.examInfo.recruitmentNumber }}</td>
          </tr>
          <tr v-if="data.examineVo">
            <td class="tac">姓名</td>
            <td>{{ data.examineVo.name }}</td>
            <td class="tac">性别</td>
            <td>{{ data.examineVo.sex == "1" ? "男" : "女" }}</td>
            <td class="tac">出生年月</td>
            <td>{{ data.examineVo.birthday }}</td>
          </tr>
          <tr v-if="data.examineVo">
            <td class="tac">籍贯</td>
            <td>{{ data.examineVo.nativePlace }}</td>
            <td class="tac">民族</td>
            <td>{{ data.examineVo.nation }}</td>
            <td class="tac">政治面貌</td>
            <td>{{ data.examineVo.politics }}</td>
          </tr>
          <tr v-if="data.learningBase">
            <!-- <td class="tac">个人特长</td>
            <td>玩游戏</td> -->
            <td>语言等级</td>
            <td colspan="2">
              {{ data.learningBase.languageLevel }}
            </td>
            <td class="tac">专业技术职务</td>
            <td colspan="2">
              {{ data.learningBase.professionalTechnicalTitle }}
            </td>
          </tr>
          <tr v-if="data.examineVo">
            <td class="tac" rowspan="2">身份证号码</td>
            <td rowspan="2" colspan="3">
              {{ data.examineVo.certificateNumber }}
            </td>
            <td class="tac" style="height: 25px">手机号码</td>
            <td style="height: 17px" colspan="2">
              {{ data.examineVo.phoneNumber }}
            </td>
          </tr>
          <tr>
            <td class="tac" style="height: 25px">电子邮箱</td>
            <td v-if="data.examineVo" style="height: 17px" colspan="2">
              {{ data.examineVo.email }}
            </td>
          </tr>
          <tr v-if="data.learningBase">
            <td class="tac">教育程度</td>
            <td v-if="data.learningBase" colspan="2">
              {{ data.learningBase.degree }}
            </td>
            <!-- <td>本科、学士</td> -->
            <td>毕业院校及专业</td>
            <td colspan="3">
              {{
                data.learningBase.graduatedSchool +
                " " +
                data.learningBase.detailedProfessional
              }}
            </td>
          </tr>
          <tr>
            <td class="tac" colspan="2">
              现工作单位及职务
              <br />(在职人员填写)
            </td>
            <td colspan="5">
              <span v-if="data.workExperience.length > 0">
                {{
                  data.workExperience[0].currentUnit +
                  " " +
                  data.workExperience[0].jobTitle
                }}</span
              >
            </td>
          </tr>
          <tr>
            <td class="tac">家庭住址</td>
            <td colspan="6">
              {{ data.examineVo.address }}
            </td>
          </tr>
          <tr>
            <td style="padding: 10px 0; height: 200px" class="tac">
              学习及工作经历
              <!-- <br />(从大大学开始填写) -->
            </td>
            <td style="vertical-middle: top" colspan="6">
              <span v-for="item in data.learningExperience" :key="item.id">
                {{
                  item.admissionDate +
                  " 至 " +
                  item.graduationDate +
                  " " +
                  item.graduatedSchool +
                  " " +
                  item.major +
                  " " +
                  item.degree
                }}
                <br />
              </span>
              <br />
              <div v-if="data.workExperience">
                <span v-for="item in data.workExperience" :key="item.id"
                  >{{
                    item.entryDate +
                    " 至 " +
                    item.resignationDate +
                    " " +
                    item.currentUnit +
                    " " +
                    item.jobTitle
                  }}
                  <br
                /></span>
              </div>
            </td>
          </tr>
          <tr>
            <td style="height: 100px" class="tac">奖惩情况</td>
            <td colspan="6">
              <span v-if="data.rewardsPunishments">{{
                data.rewardsPunishments.rewardsAndPunishments
              }}</span>
            </td>
          </tr>
          <tr>
            <td style="height: 50px" class="tac">个人特长</td>

            <td colspan="6">
              <span v-if="data.rewardsPunishments">{{
                data.rewardsPunishments.specialty
              }}</span>
            </td>
          </tr>
          <tr>
            <td class="tac" :rowspan="n">家庭主要成员及社会关系</td>
            <td>关系</td>
            <td>姓名</td>
            <td colspan="2">工作单位及职位</td>
            <!-- <td>出生年月</td> -->
            <td colspan="2">户口所在地</td>
          </tr>
          <tr v-for="item in data.familySituation" :key="item.id">
            <td>{{ item.relation }}</td>
            <td>{{ item.name }}</td>
            <td colspan="2">{{ item.jobsAndDuties }}</td>

            <td colspan="2">{{ item.registeredResidence }}</td>
          </tr>
          <!-- 
          <tr>
            <td class="tac" style="padding: 5px 0">
              招聘单位
              <br />审核意见
            </td>
            <td colspan="6"></td>
          </tr> -->
        </table>
      </div>
    </div>
  </div>
</template>
<script>
import { getPdf } from "@/utils/htmlToPdf";
export default {
  props: ["data"],
  data() {
    return {
      year: new Date().getFullYear(),
      dataList: [
        {
          unit: "广西财会培训考试中心",
        },
      ],
    };
  },
  computed: {
    n() {
      if (this.data.familySituation.length) {
        return this.data.familySituation.length + 1;
      } else {
        return 2;
      }
    },
  },
  methods: {
    // aa(id) {
    //   getPdf(id);
    // },
  },
};
</script>
<style lang="scss" scoped>
.applicationFrom {
  padding: 20px 30px;

  .wrap {
    .title {
      text-align: center;
      h1 {
        font-weight: 700;
        font-size: 26px;
      }
    }
    .body {
      display: flex;
      justify-content: center;
      .tac {
        text-align: center;
        padding-left: 0px;
      }
      td {
        padding-left: 15px;
        width: 110px;
        height: 37px;
      }
    }
  }
}
</style>