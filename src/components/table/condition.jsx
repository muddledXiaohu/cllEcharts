
import moment from 'moment';
// import {  ACCESS_ROLEID } from '@/store/mutation-types'
// import storage from 'store'
export default {
  components: {
  },
  props: {
    condition: {
      type: Array
    },
    // vModel
    Inline: {
      type: Object
    },
    // 查询按钮表
    buttonGroup: {
      type: Array
    },
    // 时间
    sendDateStartTime: {
      type: String
    },
    sendDateEndTime: {
      type: String
    },
    // 是否时间为空
    timeEmpty:{
      type: Boolean
    },
  },
  data() {
    return {
      formInline: {},
      rangePickerDateFC: [],
      createValue: [],
      shortcutKeySize: -1,
    };
  },
  render() {
    const that = this;
    // form每一项
    let panes = null
    if (that.condition) {
      panes = that.condition.map((item) => {
        return !item.select ? (
          <a-form-model-item label={item.key}>
            <a-input
              maxLength={50}
              vModel={this.formInline[item.title]} />
          </a-form-model-item>
        ) : (
          item.times ?
          (!item.month ? (item.shortcutKey ? 
            <a-form-model-item label={item.key}>
            <a-range-picker
             allowClear={false}
             vModel={this.rangePickerDateFC}
             onChange={this.selectTime}
             format="YYYY-MM-DD"
             placeholder={['开始时间', '结束时间']} />
              <a-radio-group value={this.shortcutKeySize} onChange={this.handleSizeChange}>
                <a-radio-button value={1}>昨天</a-radio-button>
                <a-radio-button value={2}>本周</a-radio-button>
                <a-radio-button value={3}>本月</a-radio-button>
                <a-radio-button value={4}>上月</a-radio-button>
              </a-radio-group>
          </a-form-model-item> : <a-form-model-item label={item.key}>
            <a-range-picker
             allowClear={item.allowClears ? true : false}
             vModel={this.rangePickerDateFC}
             onChange={this.selectTime}
             format="YYYY-MM-DD"
             placeholder={['开始时间', '结束时间']} />
          </a-form-model-item>) : <a-form-model-item label={item.key}>
          <a-month-picker
            vModel={this.createValue}  onChange={this.selectTime} format="YYYY-MM" />
          </a-form-model-item>) : (
          <a-form-model-item label={item.key}>
            <a-select
              vModel={this.formInline[item.title]}
              placeholder='请选择'
              show-search
              allowClear
              showArrow={!item.showArrow}
              filter-option={this.filterOption}
              not-found-content={null}
              style={item.styleWt ? item.styleWt : "min-width: 120px"}
              onSearch={(value)=> {item.channelBusinessId ? this.channelBusiness(value, item.key) : this.searchChange(value)}}
              >
              {item.option.map(optionItem => {
                return (
                  <a-select-option value={optionItem.value} title={optionItem.title}>
                    {optionItem.title}
                  </a-select-option>)
              })}
            </a-select>
          </a-form-model-item>));
      });
    }
    // 查询按钮
    let HButton = null
    if (that.buttonGroup) {
      HButton = that.buttonGroup.map(a => {
        return  a == '返回' ?(<a-button
            style="position: absolute;right: 32px;"
            {...{ on: { click: () => { this.search(a) } } }}>
            {a}
          </a-button>) : (<a-button
            type="primary"
            style="margin-left: 10px;"
            {...{ on: { click: () => { this.search(a) } } }}>
            {a}
          </a-button>)
      })
    }
    const collapses =
      that.condition && that.condition.length > 0 ?
      <a-form-model class="formModelMenuHeader" layout="inline" props={{ model: this.formInline }}>
        {panes}
        {HButton}
    </a-form-model> : null
    return (
      <div>
        {collapses}
      </div>
    );
  },
  created() {
    this.getformInline()
  },
  watch: {
    Inline() {
      this.getformInline()
    },
    sendDateStartTime() {
      if (this.sendDateStartTime) {
        this.getformInline()
      }
    },
    rangePickerDateFC() {
      this.dailyGrossDateFc()
    }
  },
  methods: {
    moment,
    getformInline() {
      this.formInline = this.Inline || {}
      if (this.formInline.resetdate != 1) {
        this.rangePickerDateFC = []
        this.createValue = []
         this.rangePickerDateFC = this.timeEmpty ? [] : [
          moment(this.currentStartTime(), 'YYYY-MM-DD'),
          moment(this.currentEndTime(), 'YYYY-MM-DD')
        ]
        this.createValue = moment(this.gainMonthDate(), 'YYYY-MM')
      }
    },
    $_handleInputUser(value) {
      this.formInline.user = value
    },
    // 搜索
    search(e) {
      let result = false
      this.$emit('tables', this.formInline, e, val => { result = val }) // 传函数给父组件
      return result
    },
    // 修改头部表单标题栏
    transfers(row) {
      console.log(row);
    },
    selectTime (e) {
      this.formInline.date = e
    },
    // 搜索功能
    filterOption(input, option) {
      return option.componentOptions.children[0].text.indexOf(input) > -1;
    },
    // 
    searchChange (input) {
      this.$emit('tbFilterOption', input) // 传函数给父组件
    },
    channelBusiness (input, key) {
      this.$emit('tbchannelBusiness', input, key) // 传函数给父组件
    },
    // 获取当前开始时间
    currentStartTime () {
      if (this.sendDateStartTime) {
        return this.sendDateStartTime
      }
      let curDate = new Date();
      let nowDate = new Date(curDate.getTime() - 24*60*60*1000); //前一天
      let year = nowDate.getFullYear()
      let month = nowDate.getMonth() + 1
      let day = nowDate.getDate()
      if (month < 10) month = '0' + month
      if (day < 10) day = '0' + day
      return year + '-' + month + '-' +day
    },
    // 获取当前结束时间
    currentEndTime () {
      if (this.sendDateEndTime) {
        return this.sendDateEndTime
      }
      let curDate = new Date();
      let nowDate = new Date(curDate.getTime() - 24*60*60*1000); //前一天
      let year = nowDate.getFullYear()
      let month = nowDate.getMonth() + 1
      let day = nowDate.getDate()
      if (month < 10) month = '0' + month
      if (day < 10) day = '0' + day
      return year + '-' + month + '-' +day
    },
    // 获取monthDate
    gainMonthDate () {
      let nowDate = new Date()
      let year = nowDate.getFullYear()
      let month = nowDate.getMonth() + 1
      if (month < 10) month = '0' + month
      return year + '-' + month
    },
    // 日期快捷键
    handleSizeChange(e) {
      this.shortcutKeySize = e.target.value;
      let times = this.moments(e.target.value)
      this.rangePickerDateFC =  [
       moment(times[0], 'YYYY-MM-DD'),
       moment(times[1], 'YYYY-MM-DD')
     ]
     this.$emit('shortcutKeyBun', times)
     this.$emit('tables', this.formInline, '查询') // 传函数给父组件
    },
    moments(e) {
      if (e == 1) {
        // console.log(moment().subtract(1, 'days').format('YYYY-MM-DD'));
        const startEnd = moment().subtract(1, 'days').format('YYYY-MM-DD')
        return [startEnd, startEnd]
      } else if (e == 2) {
        // const startDate = moment().startOf('week').format('YYYY-MM-DD')
        // const endDate = moment().endOf('week').format('YYYY-MM-DD')
        const startDate = moment().weekday(1).format('YYYY-MM-DD')
        const endDate = moment().weekday(7).format('YYYY-MM-DD')
        return [startDate, endDate]
      } else if (e == 3) {
        const startDate = moment().startOf('month').format('YYYY-MM-DD')
        const endDate = moment().endOf('month').format('YYYY-MM-DD')
        return [startDate, endDate]
      } else if (e == 4) {
        const startDate = moment().month(moment().month() - 1).startOf('month').format('YYYY-MM-DD')
        const endDate = moment().month(moment().month() - 1).endOf('month').format('YYYY-MM-DD')
        return [startDate, endDate]
      }
      // console.log(moment().weekday(1).format('YYYY-MM-DD'));
      // console.log(moment().weekday(7).format('YYYY-MM-DD'));
    },
    dailyGrossDateFc() {
      let conditions = false
      let conditionArr = this.condition ?? []
      conditionArr.forEach( item => {
        if (item.shortcutKey) {
          conditions = true
        }
      })
      if (conditions) {
        let date1 = this.rangePickerDateFC[0].format('YYYY-MM-DD')
        let date2 = this.rangePickerDateFC[1].format('YYYY-MM-DD')
        const startEnd = moment().subtract(1, 'days').format('YYYY-MM-DD')
        const startDate1 = moment().weekday(1).format('YYYY-MM-DD')
        const endDate1 = moment().weekday(7).format('YYYY-MM-DD')
        const startDate2 = moment().startOf('month').format('YYYY-MM-DD')
        const endDate2 = moment().endOf('month').format('YYYY-MM-DD')
        const startDate3 = moment().month(moment().month() - 1).startOf('month').format('YYYY-MM-DD')
        const endDate3 = moment().month(moment().month() - 1).endOf('month').format('YYYY-MM-DD')
        if (date1 === startEnd && date2 === startEnd) {
          this.shortcutKeySize = 1
        }else if (date1 === startDate1 && date2 === endDate1) {
          this.shortcutKeySize = 2
        }else if (date1 === startDate2 && date2 === endDate2) {
          this.shortcutKeySize = 3
        }else if (date1 === startDate3 && date2 === endDate3) {
          this.shortcutKeySize = 4
        } else {
          this.shortcutKeySize = -1
        }
      }
    },
  },
  computed: {
  }
}