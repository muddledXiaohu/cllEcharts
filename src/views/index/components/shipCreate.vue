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
      @ok="handleOk"
    >
      <a-form-model
        @submit="handleOk"
        :model="handleSubmitForm"
        ref="ruleForm"
        :rules="rules"
      >
        <a-row class="form-row" :gutter="16">
          <!-- 船名 -->
          <a-col :span="12">
            <a-form-model-item label="船名" prop="IMO">
              <a-input
                :maxLength="20"
                v-model="handleSubmitForm.IMO"
                placeholder="船名"
              />
            </a-form-model-item>
          </a-col>
              <a-col :span="12">
                <a-form-model-item label="船舶最高载重">
                  <a-input-number
                    style="width: 100%"
                    :min="0"
                    :step="0.01"
                    placeholder="船舶最高载重"
                    v-model="handleSubmitForm.load"
                  />
                </a-form-model-item>
              </a-col>
          <a-col :span="12">
            <a-form-item label="请选择燃油信息">
              <a-select
                placeholder="请选择"
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
          <a-col :span="12">
            <!-- <a-form-item  label="燃油消耗量">
                        <a-input-number
                        style="width: 100%;"
                        placeholder="燃油消耗量"
                        :maxLength="12"
                        :step="1"
                        v-model="handleSubmitForm.capacity"
                        />
                    </a-form-item> -->
          </a-col>
        </a-row>
        <!-- handleSubmitForm.fuelType -->
        <CreateTable
          class="createTable"
          :data="handleSubmitForm.fuelType"
          :columns="columns"
          :vModelData="handleSubmitForm.vModelData"
        />
      </a-form-model>
    </a-modal>
  </div>
</template>
<script>
import { baseMixin } from "@/store/app-mixin";
import { fuelType, columns } from "./data";
import CreateTable from "@/components/table/createTable.jsx";
export default {
  mixins: [baseMixin],
  name: "",
  components: {
    CreateTable,
  },
  data() {
    return {
      confirmLoading: false,
      handleSubmitForm: {
        IMO: "",
        fuelType: ["LFO", "HFO"],
        vModelData: {},
        load: 0
      },
      rules: {
        IMO: [{ required: true, message: "请输入船名", trigger: "blur" }],
        load: [{ required: true, message: "请输入船舶最高载重", trigger: "blur" }],
      },
      fuelType,
      columns,
    };
  },
  props: {
    shipdisplay: {
      type: Boolean,
    },
  },
  watch: {},
  created() {
    console.log(this.shipdisplay);
  },
  methods: {
    handleCancel() {
      this.$emit("closeFrame");
    },
    handleOk() {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          this.$emit("shipCancel", {
            IMO: this.handleSubmitForm.IMO,
            vModelData: this.handleSubmitForm.vModelData,
          });
          this.handleCancel();
        } else {
          return false;
        }
      });
    },
  },
};
</script>
<style lang="less" scoped></style>
