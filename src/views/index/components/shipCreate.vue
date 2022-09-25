<template>
    <div>
        <a-modal
            :visible="shipdisplay" 
            title="新建船舶"
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
                        <a-form-model-item label="船名" prop="username">
                        <a-input
                            :maxLength="20"
                            v-model="handleSubmitForm.username"
                            placeholder="船名"
                        />
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
            username: "",
        },
        rules: {
            username: [{ required: true, message: '请输入船名', trigger: 'blur' }],
        },
      };
    },
    components: {

    },
    props: {
        shipdisplay: {
            type: Boolean
        }
    },
    watch: {

    },
    created() {
        console.log(this.shipdisplay);
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