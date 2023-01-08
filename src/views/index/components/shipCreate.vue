<template>
  <div>
    <div class="headBtn">
      <a-button @click="toReturn">返回</a-button>
      <a-button type="primary" @click="handleOk">
        确认
      </a-button>
    </div>
    <div class="shipCreate">
      <a-form-model
        @submit="handleOk"
        :model="handleSubmitForm"
        ref="ruleForm"
        :rules="rules"
        layout="horizontal"
        :label-col="labelCol"
        :wrapper-col="wrapperCol"
      >
        <a-row class="form-row" :gutter="16">
          <!-- 船名 -->
          <a-col :span="13">
          <h3>基本信息：</h3>
          </a-col>
          <a-col :span="13">
            <a-form-model-item label="船型" prop="models">
              <a-select placeholder="请选择"
                v-model="handleSubmitForm.models">
                <a-select-option
                  v-for="(it, id) in vesselType"
                  :key="id"
                  :value="it.value"
                >
                  {{ it.label }}
                </a-select-option>
              </a-select>
            </a-form-model-item>
          </a-col>
          <a-col :span="13">
            <a-form-model-item label="船名" prop="name">
              <a-input
                :maxLength="20"
                v-model="handleSubmitForm.name"
                placeholder="请输入船名"
              />
            </a-form-model-item>
          </a-col>
          <a-col :span="13">
            <a-form-model-item label="IMO" prop="IMO">
              <a-input
                :maxLength="20"
                v-model="handleSubmitForm.IMO"
                placeholder="请输入IMO"
              />
            </a-form-model-item>
          </a-col>
          <a-col :span="13">
            <a-form-model-item label="船号" prop="numberNo">
              <a-input
                :maxLength="20"
                v-model="handleSubmitForm.numberNo"
                placeholder="请输入船号"
              />
            </a-form-model-item>
          </a-col>
          <a-col :span="13">
            <a-form-model-item label="船东" prop="shipowner">
              <a-input
                :maxLength="20"
                v-model="handleSubmitForm.shipowner"
                placeholder="请输入船东"
              />
            </a-form-model-item>
          </a-col>
          <a-col :span="13">
            <a-form-model-item label="造船厂" prop="shipbuilding">
              <a-input
                :maxLength="20"
                v-model="handleSubmitForm.shipbuilding"
                placeholder="请输入造船厂"
              />
            </a-form-model-item>
          </a-col>
          <a-col :span="13">
            <a-form-model-item label="航级社" prop="classCcs">
              <a-input
                :maxLength="20"
                v-model="handleSubmitForm.classCcs"
                placeholder="请输入航级社"
              />
            </a-form-model-item>
          </a-col>
          <a-col :span="13">
            <a-form-model-item label="船舶设计公司" prop="shipDesigner">
              <a-input
                :maxLength="20"
                v-model="handleSubmitForm.shipDesigner"
                placeholder="请输入船舶设计公司"
              />
            </a-form-model-item>
          </a-col>
          <a-col :span="13">
          <h3>船体参数：</h3>
          </a-col>
          <a-col :span="13">
            <a-form-model-item label="总长(m)">
              <a-input-number
                style="width: 100%"
                :min="0"
                placeholder="请输入总长"
                v-model="handleSubmitForm.lengthOverAll"
              />
            </a-form-model-item>
          </a-col>
          <a-col :span="13">
            <a-form-model-item label="垂线间长(m)">
              <a-input-number
                style="width: 100%"
                :min="0"
                placeholder="请输入垂线间长"
                v-model="handleSubmitForm.betwLength"
              />
            </a-form-model-item>
          </a-col>
          <a-col :span="13">
            <a-form-model-item label="船宽(m)">
              <a-input-number
                style="width: 100%"
                :min="0"
                placeholder="请输入船宽"
                v-model="handleSubmitForm.shipBreadth"
              />
            </a-form-model-item>
          </a-col>
          <a-col :span="13">
            <a-form-model-item label="设计吃水(m)">
              <a-input-number
                style="width: 100%"
                :min="0"
                placeholder="请输入设计吃水"
                v-model="handleSubmitForm.designDraught"
              />
            </a-form-model-item>
          </a-col>
          <a-col :span="13">
            <a-form-model-item label="结构吃水(m)">
              <a-input-number
                style="width: 100%"
                :min="0"
                placeholder="请输入结构吃水"
                v-model="handleSubmitForm.scantlingDraught"
              />
            </a-form-model-item>
          </a-col>
          <a-col :span="13">
            <a-form-model-item label="压载艏吃水(m)">
              <a-input-number
                style="width: 100%"
                :min="0"
                placeholder="请输入压载艏吃水"
                v-model="handleSubmitForm.ballastDraughtTop"
              />
            </a-form-model-item>
          </a-col>
          <a-col :span="13">
            <a-form-model-item label="压载艉吃水(m)">
              <a-input-number
                style="width: 100%"
                :min="0"
                placeholder="请输入压载艉吃水"
                v-model="handleSubmitForm.ballastDraughtTail"
              />
            </a-form-model-item>
          </a-col>
          <a-col :span="13">
            <a-form-model-item label="总吨(tons)">
              <a-input-number
                style="width: 100%"
                :min="0"
                placeholder="请输入总吨"
                v-model="handleSubmitForm.gt"
              />
            </a-form-model-item>
          </a-col>
          <a-col :span="13">
            <a-form-model-item label="夏季载重吨(tons)">
              <a-input-number
                style="width: 100%"
                :min="0"
                placeholder="请输入夏季载重吨"
                v-model="handleSubmitForm.summerDeadWeight"
              />
            </a-form-model-item>
          </a-col>

          <a-col :span="13">
            <h3>主机：</h3>
          </a-col>
          <a-col :span="13">
            <a-form-model-item label="主机型号" prop="meType">
              <a-input
                :maxLength="20"
                v-model="handleSubmitForm.meType"
                placeholder="请输入主机型号"
              />
            </a-form-model-item>
          </a-col>
          <a-col :span="13">
            <a-form-model-item label="主机数量">
              <a-input-number
                style="width: 100%"
                :min="0"
                placeholder="请输入主机数量"
                v-model="handleSubmitForm.meNumber"
              />
            </a-form-model-item>
          </a-col>
          <a-col :span="13">
            <a-form-model-item label="最大持续功率(KW)">
              <a-input-group size="large">
                <a-row :gutter="24">
                  <a-col :span="12">
                    <a-input
                      placeholder="请输入最大持续功率(KW)"
                      v-model="handleSubmitForm.meSMCR"
                      addon-after="(KW)"
                    />
                  </a-col>
                  <a-col :span="12">
                    <a-input
                      placeholder="请输入转速"
                      v-model="handleSubmitForm.meSmcrRpm"
                      addon-after="(rpm)"
                    />
                  </a-col>
                </a-row>
              </a-input-group>
            </a-form-model-item>
          </a-col>
          <a-col :span="13">
            <a-form-model-item label="持续服务功率(KW)">
              <a-input-group size="large">
                <a-row :gutter="24">
                  <a-col :span="12">
                    <a-input
                      placeholder="请输入持续服务功率(KW)"
                      v-model="handleSubmitForm.meCSR"
                      addon-after="(KW)"
                    />
                  </a-col>
                  <a-col :span="12">
                    <a-input
                      placeholder="请输入转速"
                      v-model="handleSubmitForm.meCsrRpm"
                      addon-after="(rpm)"
                    />
                  </a-col>
                </a-row>
              </a-input-group>
            </a-form-model-item>
          </a-col>
          <a-col :span="13">
            <a-form-model-item label="EEXI限制功率(KW)">
              <a-input-group size="large">
                <a-row :gutter="24">
                  <a-col :span="12">
                    <a-input
                      placeholder="请输入EEXI限制功率(KW)"
                      v-model="handleSubmitForm.limitEEXI"
                      addon-after="(KW)"
                    />
                  </a-col>
                  <a-col :span="12">
                    <a-input
                      placeholder="请输入转速"
                      v-model="handleSubmitForm.limitEEXIRpm"
                      addon-after="(rpm)"
                    />
                  </a-col>
                </a-row>
              </a-input-group>
            </a-form-model-item>
          </a-col>
          <a-col :span="13">
            <a-form-item label="主机燃油信息">
              <a-select
                placeholder="请选择燃油信息"
                mode="multiple"
                v-model="handleSubmitForm.fuelType"
              >
                <a-select-option
                  v-for="(it, id) in fuelType"
                  :key="id"
                  :value="it.value"
                >
                  {{ it.label }}
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <!-- <a-col :span="13">
            <a-form-model-item label="主机燃油容量">
              <CreateTable
                class="createTable"
                :data="handleSubmitForm.fuelType"
                :columns="columns"
                :vModelData="handleSubmitForm.vModelData"
              />
            </a-form-model-item>
          </a-col> -->
          <a-col :span="13">
            <h3>辅机：</h3>
          </a-col>
          <a-col :span="13">
            <a-form-model-item label="辅机型号" prop="aeType">
              <a-input
                :maxLength="20"
                v-model="handleSubmitForm.aeType"
                placeholder="请输入辅机型号"
              />
            </a-form-model-item>
          </a-col>
          <a-col :span="13">
            <a-form-model-item label="辅机数量">
              <a-input-number
                style="width: 100%"
                :min="0"
                placeholder="请输入辅机数量"
                v-model="handleSubmitForm.aeNumber"
              />
            </a-form-model-item>
          </a-col>
          <a-col :span="13">
            <a-form-model-item label="额定功率(KW)">
              <a-input-number
                style="width: 100%"
                :min="0"
                placeholder="请输入额定功率"
                v-model="handleSubmitForm.aeSMCR"
              />
            </a-form-model-item>
          </a-col>
          <a-col :span="13">
            <a-form-item label="辅机燃油信息">
              <a-select
                placeholder="请选择燃油信息"
                mode="multiple"
                v-model="handleSubmitForm.aeFuelType"
              >
                <a-select-option
                  v-for="(it, id) in fuelType"
                  :key="id"
                  :value="it.value"
                >
                  {{ it.label }}
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <!-- <a-col :span="13">
            <a-form-model-item label="辅机燃油容量">
              <CreateTable
                class="createTable"
                :data="handleSubmitForm.aeFuelType"
                :columns="columns"
                :vModelData="handleSubmitForm.aeVmodelData"
              />
            </a-form-model-item>
          </a-col> -->
          <a-col :span="13">
            <a-form-model-item label="备注">
              <a-input
                style="width: 100%"
                type="textarea"
                :min="0"
                placeholder="请输入备注"
                v-model="handleSubmitForm.remarks"
              />
            </a-form-model-item>
          </a-col>
        </a-row>
        <!-- handleSubmitForm.fuelType -->
      </a-form-model>
    </div>
  </div>
</template>
<script>
import { baseMixin } from "@/store/app-mixin";
import { fuelType, columns, vesselType } from "./data";
// import CreateTable from "@/components/table/createTable.jsx";
import {
  createShipping,
  modifyShipping,
} from "@/api/indicators";
export default {
  mixins: [baseMixin],
  name: "",
  components: {
    // CreateTable,
  },
  data() {
    return {
      confirmLoading: false,
      handleSubmitForm: {
        IMO: "",
        fuelType: ["LFO", "HFO"],
        vModelData: {},
        aeVmodelData:{},
        load: 0,
      },
      rules: {
        IMO: [{ required: true, message: "请输入船名", trigger: "blur" }],
        load: [
          { required: true, message: "请输入船舶最高载重", trigger: "blur" },
        ],
      },
      labelCol: { span: 4 },
      wrapperCol: { span: 14 },
      fuelType,
      vesselType,
      columns,
    };
  },
  props: {
  },
  watch: {},
  created() {
    if (this.$route.params&&this.$route.params.shipInformation) {
      this.shipInformationFnc(this.$route.params.shipInformation)
    }
  },
  methods: {
    handleOk() {
      this.$refs.ruleForm.validate( async(valid) => {
        if (valid) {
          if (this.handleSubmitForm.id) {
            console.log(this.handleSubmitForm);
            let res = await modifyShipping(this.handleSubmitForm);
            if (res.start !== 200) return this.$message.error("船舶修改错误!");
            this.$message.success("船舶修改成功!");
            this.toReturn();
          } else {
            let res = await createShipping(this.handleSubmitForm);
            if (res.start !== 200) return this.$message.error("船舶创建错误!");
            this.$message.success("船舶创建成功!");
            this.toReturn();
          }
        } else {
          return false;
        }
      });
    },
    toReturn() {
      this.handleSubmitForm = {
        IMO: "",
        fuelType: ["LFO", "HFO"],
        vModelData: {},
        aeVmodelData:{},
        load: 0,
      }
      this.$router.push({ path: '/index/digitalForm' });
    },

    /**
     *
     * @description: 修改默认参数
     */
    shipInformationFnc(shipInformation) {
      console.log(shipInformation);
      this.handleSubmitForm = shipInformation
    }
  },
};
</script>
<style lang="less" scoped>
.headBtn {
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  padding-top: 20px;
  padding-right: 20px;
  border-radius: 10px;
  .ant-btn {
    margin-left: 10px;
  }
}
.shipCreate {
  margin: 20px;
  padding: 20px;
  padding-left: 40px;
  border-radius: 10px;
  background-color: #fff;
}
</style>
