<template>
    <div>
        <a-modal
            :visible="shipNodisplay" 
            title="新建航次号"
            ok-text="确认"
            cancel-text="取消"
            :confirm-loading="confirmLoading"
            :maskClosable="true"
            :width="'40%'"
            @cancel="handleCancel"
            @ok="handleOk">
            
            
            <a-form-model @submit="handleOk" :model="handleSubmitForm"
                ref="ruleForm"
                :rules="rules">
                <a-row class="form-row" :gutter="16">
                    <!-- 船名 -->
                    <a-col :lg="{ span: 12 }" :md="{ span: 12 }" :sm="20">
                        <a-form-model-item label="船名">
                            <a-input
                                :maxLength="20"
                                disabled
                                v-model="shipInformation.IMO"
                                placeholder="IMO"
                            />
                        </a-form-model-item>
                    </a-col>
                    <!-- 航次号 -->
                    <a-col :lg="{ span: 12 }" :md="{ span: 12 }" :sm="20">
                        <a-form-model-item label="航次号" prop="Voyage">
                            <a-input
                                :maxLength="20"
                                v-model="handleSubmitForm.Voyage"
                                placeholder="航次号"
                            />
                        </a-form-model-item>
                    </a-col>
                    <!-- 出发港 -->
                    <a-col :lg="{ span: 12 }" :md="{ span: 12 }" :sm="20">
                        <a-form-model-item label="出发港" prop="setPort">
                            <a-select
                                v-model="handleSubmitForm.setPort"
                                style="width: 100%"
                                :options="harbors"
                                placeholder="出发港"
                            ></a-select>
                        </a-form-model-item>
                    </a-col>
                    <!-- 终到港 -->
                    <a-col :lg="{ span: 12 }" :md="{ span: 12 }" :sm="20">
                        <a-form-model-item label="终到港" prop="endPort">
                            <a-select
                                v-model="handleSubmitForm.endPort"
                                style="width: 100%"
                                :options="harbors"
                                placeholder="终到港"
                            ></a-select>
                        </a-form-model-item>
                    </a-col>
                </a-row>
                <a-row class="form-row" :gutter="16">
                    <!-- 出发日期 -->
                    <a-col :lg="{ span: 12 }" :md="{ span: 12 }" :sm="20">
                        <a-form-model-item prop="beginTime" label="出发日期">
                        <a-date-picker
                            placeholder="出发日期"
                            format="YYYY-MM-DD"
                            v-model="handleSubmitForm.beginTime" />
                        </a-form-model-item>
                    </a-col>
                    <!-- 到港日期 -->
                    <a-col :lg="{ span: 12 }" :md="{ span: 12 }" :sm="20">
                        <a-form-model-item prop="endTime" label="到港日期">
                        <a-date-picker
                            placeholder="到港日期"
                            format="YYYY-MM-DD"
                            v-model="handleSubmitForm.endTime" />
                        </a-form-model-item>
                    </a-col>
                </a-row>
            </a-form-model>

        </a-modal>
    </div>
  </template>
  <script>
import { baseMixin } from "@/store/app-mixin";
  import { harbors } from "./data";
  export default {
    mixins: [baseMixin],
    name: "",
    data() {
      return {
        confirmLoading: false,
        handleSubmitForm: {
            setPort: '',
            endPort: '',
            beginTime: '',
            endTime: '',
            Voyage: '',
        },
        rules: {
            Voyage: [{ required: true, message: '请输入航次号', trigger: 'blur' }],
            setPort: [{ required: true, message: '请输入出发港', trigger: 'blur' }],
            endPort: [{ required: true, message: '请输入终到港', trigger: 'blur' }],
            beginTime: [{ required: true, message: '请选择出发日期', trigger: 'change' }],
            endTime: [{ required: true, message: '请选择到港日期', trigger: 'change' }],
          },
        harbors,
        };
    },
    components: {

    },
    props: {
        shipNodisplay: {
            type: Boolean
        },
        shipInformation: {
            type: Object
        }
    },
    watch: {

    },
    created() {
        console.log(this.shipNodisplay);
    },
    methods: {
        handleCancel() {
            this.$emit("closeFrame");
        },
        handleOk() {
            this.$refs.ruleForm.validate(valid => {
                if (valid) {
                    let arr = JSON.parse(JSON.stringify(this.handleSubmitForm))
                    arr.setPort = harbors.filter(item=>{return item.value == arr.setPort})[0]
                    arr.endPort = harbors.filter(item=>{return item.value == arr.endPort})[0]
                    this.$emit("shipCancel", arr);
                    this.handleCancel()
                } else {
                    return false;
                }
            });
        },
    },
  };
  </script>
  <style lang="less" scoped>
  </style>