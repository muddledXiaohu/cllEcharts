<template>
  <div class="NewCustomer">
    <div class="OperationReturn">
      <a-button
        @click="handleSubmit"
        type="primary"
        html-type="submit"
        class="saveSubmit"
        :disabled="hasErrors(handleSubmitForm.getFieldsError())"
      >
        保存
      </a-button>
      <a-button class="antReturn" @click="customerReturn">返回</a-button>
    </div>
    <h2 class="divider" orientation="left">
      基本信息
    </h2>
    <a-row type="flex">
      <a-col :span="19">
        <a-form :form="handleSubmitForm" @submit="handleSubmit"  :label-col="{ span: 3 }" :wrapper-col="{ span: 10 }">
          <a-row class="form-row" :gutter="16">
            <!-- name -->
            <a-col :lg="19" :md="19" :sm="19">
              <a-form-item
                :validate-status="nameError() ? 'error' : ''"
                :help="nameError() || ''"
                label="客户名称"
              >
                <a-input
                  v-decorator="['name', ValidateRules.name]"
                  placeholder="客户名称"
                />
              </a-form-item>
            </a-col>
            <!-- sourceType -->
            <a-col :lg="19" :md="19" :sm="19">
              <a-form-item
                :validate-status="sourceTypeError() ? 'error' : ''"
                :help="sourceTypeError() || ''"
                label="客户属性"
              >
                <a-select
                  placeholder="请选择"
                  v-decorator="['sourceType']"
                >
                  <a-select-option value="1">
                    直客
                  </a-select-option>
                  <a-select-option value="2">
                    渠道
                  </a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
            <!-- tariffNumber -->
            <a-col :lg="19" :md="19" :sm="19">
              <a-form-item
                :validate-status="tariffNumberError() ? 'error' : ''"
                :help="tariffNumberError() || ''"
                label="纳税人识别号"
              >
                <a-input
                  placeholder="纳税人识别号"
                  v-decorator="['tariffNumber']"
                />
              </a-form-item>
            </a-col>
            <!-- industryDictCode -->
            <a-col :lg="19" :md="19" :sm="19">
              <a-form-item
                :validate-status="industryDictCodeError() ? 'error' : ''"
                :help="industryDictCodeError() || ''"
                label="行业"
              >
                <a-select
                  placeholder="请选择"
                  v-decorator="['industryDictCode']"
                >
                  <a-select-option value="1">
                    金融
                  </a-select-option>
                  <a-select-option value="2">
                    电信
                  </a-select-option>
                  <a-select-option value="3">
                    教育
                  </a-select-option>
                  <a-select-option value="4">
                    高科技
                  </a-select-option>
                  <a-select-option value="5">
                    政府
                  </a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
            <!-- 地区 -->
            <a-col :lg="19" :md="19" :sm="19">
              <a-form-item
                :validate-status="regionError() ? 'error' : ''"
                :help="regionError() || ''"
                label="地区"
              >
                <area-select
                  @change="selectArea"
                  :default-value="defaultArea"
                />
              </a-form-item>
            </a-col>
            <!-- location -->
            <a-col :lg="19" :md="19" :sm="19">
              <a-form-item
                :validate-status="locationError() ? 'error' : ''"
                :help="locationError() || ''"
                label="详细地址"
              >
                <a-input
                  placeholder="详细地址"
                  v-decorator="['location']"
                />
              </a-form-item>
            </a-col>
            <!-- telephone -->
            <a-col :lg="19" :md="19" :sm="19">
              <a-form-item
                :validate-status="telephoneError() ? 'error' : ''"
                :help="telephoneError() || ''"
                label="手机号"
              >
                <a-input
                  placeholder="手机号"
                  v-decorator="['telephone']"
                />
              </a-form-item>
            </a-col>
            <!-- tags -->
            <a-col :lg="19" :md="19" :sm="19">
              <a-form-item
                :validate-status="tagsError() ? 'error' : ''"
                :help="tagsError() || ''"
                label="标签"
              >
                <a-input
                  placeholder="标签"
                  v-decorator="['tags']"
                />
              </a-form-item>
            </a-col>
          </a-row>
        </a-form>
          <h2 class="divider" orientation="left">
            联系人信息
          </h2>
      </a-col>
      <a-col :span="19">
        <a-row class="form-row" :gutter="16">
          <a-col :span="19">
            <ContactsForm
              :contacts="contacts"
              @CaseDeletion="CaseDeletion"
            />
          </a-col>
          <a-col :span="5">
          </a-col>
          <a-col :span="15" style="padding-bottom: 30px;">
            <a-button
              type="dashed"
              style="width: 50%; display: block;margin-left: 14%;"
              @click="AddAContact"
            >
              +  添加联系人
            </a-button>
          </a-col>
        </a-row>
      </a-col>
    </a-row>
  </div>
</template>
<script>
import areaSelect from "@/components/NewCustomer/areaselect.vue";
import ContactsForm from "@/components/NewCustomer/contactsForm.jsx";
import { save, contactsSave } from '@/api/customer'
import { baseMixin } from '@/store/app-mixin'
function hasErrors(fieldsError) {
  return Object.keys(fieldsError).some(field => fieldsError[field]);
}
export default {
  name: 'NewCustomer',
  mixins: [baseMixin],
  components: {
    areaSelect,
    ContactsForm
  },
  data() {
    return {
      hasErrors,
      defaultArea:[],
      handleSubmitForm: this.$form.createForm(this, { name: "Information" }),
      ValidateRules: {
        name: {
          rules: [{ required: true, message: "请输入客户名称！" }],
        },
      },
      selectAreaNumber: [],
      // 联系人
      contacts: [],
      NewCustomerForm: this.$route.params,
    }
  },
  created() {
    this.paramsForm()
  },
  
  // watch:{
  //   NewCustomerForm(){
  //     this.paramsForm()
  //   }
  // },
  methods: {
    paramsForm () {
      console.log(this.NewCustomerForm);
      console.log(this.handleSubmitForm);
    },
      //选择地区之后的回调
      selectArea(selectedArea) {
        this.selectAreaNumber = selectedArea
      },
      customerReturn () {
        this.$router.go(-1);
      },

      // Only show error after a field is touched.
      nameError() {
        const { getFieldError, isFieldTouched } = this.handleSubmitForm;
        return isFieldTouched("name") && getFieldError("name");
      },
      // sourceTypeError
      sourceTypeError() {
        const { getFieldError, isFieldTouched } = this.handleSubmitForm;
        return isFieldTouched("sourceType") && getFieldError("sourceType");
      },
      // tariffNumberError
      tariffNumberError() {
        const { getFieldError, isFieldTouched } = this.handleSubmitForm;
        return isFieldTouched("tariffNumber") && getFieldError("tariffNumber");
      },
      // industryDictCodeError
      industryDictCodeError() {
        const { getFieldError, isFieldTouched } = this.handleSubmitForm;
        return isFieldTouched("industryDictCode") && getFieldError("industryDictCode");
      },
      // regionError
      regionError() {
        const { getFieldError, isFieldTouched } = this.handleSubmitForm;
        return isFieldTouched("region") && getFieldError("region");
      },
      // locationError
      locationError() {
        const { getFieldError, isFieldTouched } = this.handleSubmitForm;
        return isFieldTouched("location") && getFieldError("location");
      },
      // telephone
      telephoneError() {
        const { getFieldError, isFieldTouched } = this.handleSubmitForm;
        return isFieldTouched("telephone") && getFieldError("telephone");
      },
      // tags
      tagsError() {
        const { getFieldError, isFieldTouched } = this.handleSubmitForm;
        return isFieldTouched("tags") && getFieldError("tags");
      },
      async handleSubmit(e) {
        // const aa = document.getElementById("name");
        // console.log(aa.value);
        e.preventDefault();
        this.handleSubmitForm.validateFields( async (err, values) => {
          if (!err) {
            let array = { ...values }
            if (this.selectAreaNumber.length != 0) {
                array.provinceNumber = this.selectAreaNumber[0]
                array.cityNumber = this.selectAreaNumber[1]
                array.zoneNumber = this.selectAreaNumber[2]
            } else {
                array.provinceNumber = undefined
                array.cityNumber = undefined
                array.zoneNumber = undefined
            }
            array.belongUid = 1
            await save(array)
              .then((res) => {
                console.log(res)
                // const { data } = res
                this.contactsSubmit()
              }).catch(err => console.log(err))
          }
        });
        // console.log(this.handleSubmitForm.getFieldsValue());
      },
      // 
      async contactsSubmit () {
        for (const key in this.contacts) {
          console.log(this.contacts[key]);
            await contactsSave(this.contacts[key])
              .then((res) => {
                console.log(res)
              }).catch(err => {
                console.log(err)
                return;
              })
        }
        this.$message.success(
          '保存成功！'
        );
      },
      // 添加联系人
      AddAContact () {
        let belong = JSON.parse(JSON.stringify(this.roleid))
        this.contacts.push({
          customerId: 1,
          name:'',
          duty:'',
          phone:'',
          telephone:'',
          email:'',
          qqNumber:'',
          wechatNumber:'',
          remark:'',
          createUid:belong.id
        })
      },
      // 删除联系人
      CaseDeletion (row) {
        this.contacts.splice(row,1)
      }
  }
};
</script>
<style lang="less" scoped>
.NewCustomer {
    padding-top: 20px;
    width: 98%;
    margin: 0 auto;
    margin-top: 15px;
    background-color: #fff;
    border-radius: 10px;
    position: relative;
}
.OperationReturn {
    text-align: right;
    .antReturn {
        margin-right: 20px;
    }
}
.form-row {
  padding: 10px;
}
.saveSubmit {
  margin-right: 6px;
}
.divider {
  padding-left: 30px;
}
</style>
<style lang="less">
.contactJsx {
  display: flex;
  justify-content: space-between;
  padding-right: 50px;
}
</style>