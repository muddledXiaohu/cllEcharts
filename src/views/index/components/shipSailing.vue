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
                    <a-col :lg="{ span: 8 }" :md="{ span: 8 }" :sm="20">
                        <a-form-model-item label="船名">
                        <a-input
                            :maxLength="20"
                            disabled
                            v-model="shipInformation.username"
                            placeholder="船名"
                        />
                        </a-form-model-item>
                    </a-col>
                    <!-- IMO -->
                    <a-col :lg="{ span: 8 }" :md="{ span: 8 }" :sm="20">
                        <a-form-model-item label="IMO" prop="imo">
                        <a-input
                            :maxLength="20"
                            v-model="handleSubmitForm.imo"
                            placeholder="IMO"
                        />
                        </a-form-model-item>
                    </a-col>
                    <!-- 出发港 -->
                    <a-col :lg="{ span: 8 }" :md="{ span: 8 }" :sm="20">
                        <a-form-model-item label="出发港" prop="setPort">
                        <a-input
                            :maxLength="20"
                            v-model="handleSubmitForm.setPort"
                            placeholder="出发港"
                        />
                        </a-form-model-item>
                    </a-col>
                </a-row>
                <a-row class="form-row" :gutter="16">
                    <!-- 终到港 -->
                    <a-col :lg="{ span: 8 }" :md="{ span: 8 }" :sm="20">
                        <a-form-model-item label="终到港" prop="endPort">
                        <a-input
                            :maxLength="20"
                            v-model="handleSubmitForm.endPort"
                            placeholder="终到港"
                        />
                        </a-form-model-item>
                    </a-col>
                    <!-- 出发日期 -->
                    <a-col :lg="{ span: 8 }" :md="{ span: 8 }" :sm="20">
                        <a-form-model-item prop="beginTime" label="出发日期">
                        <a-date-picker
                            placeholder="出发日期"
                            format="YYYY-MM-DD"
                            v-model="handleSubmitForm.beginTime" />
                        </a-form-model-item>
                    </a-col>
                    <!-- 到港日期 -->
                    <a-col :lg="{ span: 8 }" :md="{ span: 8 }" :sm="20">
                        <a-form-model-item prop="endTime" label="到港日期">
                        <a-date-picker
                            placeholder="到港日期"
                            format="YYYY-MM-DD"
                            v-model="handleSubmitForm.endTime" />
                        </a-form-model-item>
                    </a-col>
                </a-row>

                <a-row class="form-row" :gutter="16">
                    <!-- 经度 -->
                    <a-col :lg="{ span: 8 }" :md="{ span: 8 }" :sm="20">
                        <a-form-model-item label="经度" prop="longitude">
                        <a-input-number
                        :min="0"
                        :step="0.01"
                        v-model="handleSubmitForm.longitude"
                        placeholder="经度" />
                        </a-form-model-item>
                    </a-col>
                    <!-- 纬度 -->
                    <a-col :lg="{ span: 8 }" :md="{ span: 8 }" :sm="20">
                        <a-form-model-item label="纬度" prop="latitude">
                        <a-input-number
                        :min="0"
                        :step="0.01"
                        v-model="handleSubmitForm.latitude"
                        placeholder="纬度" />
                        </a-form-model-item>
                    </a-col>
                </a-row>
            </a-form-model>

        </a-modal>
    </div>
  </template>
  <script>
  import { baseMixin } from "@/store/app-mixin";
  export default {
    mixins: [baseMixin],
    name: "",
    data() {
      return {
        confirmLoading: false,
        handleSubmitForm: {
            imo: '',
            setPort: '',
            endPort: '',
            beginTime: '',
            endTime: '',
            longitude: '',
            latitude: ''
        },
        rules: {
            imo: [{ required: true, message: '请输入IMO', trigger: 'blur' }],
            setPort: [{ required: true, message: '请输入出发港', trigger: 'blur' }],
            endPort: [{ required: true, message: '请输入终到港', trigger: 'blur' }],
            longitude: [{ required: true, message: '请输入经度', trigger: 'blur' }],
            latitude: [{ required: true, message: '请输入纬度', trigger: 'blur' }],
            beginTime: [{ required: true, message: '请选择出发日期', trigger: 'change' }],
            endTime: [{ required: true, message: '请选择到港日期', trigger: 'change' }],
            // customerId: [{ required: true, message: '请选择客户', trigger: 'change' }],
        },
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
                    this.$emit("shipCancel", this.handleSubmitForm);
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