
import moment from 'moment';
import { fuelType } from "@/views/index/components/data";
export default {
  props: {
    data: {
      type: Array
    },
    columns: {
      type: Array
    },
    vModelData: {
        type: Object
    },
  },
  data() {
      return {
        fuelType,
    };
  },
  render() {
    let tbData = this.data.map(item => {
       return {name: item}
    })
      const scopedSlots = {
        uname: (title) => {
            const name = this.fuelType.filter(it => {return it.value === title.name})[0].label
            return (
                name
            );
        },
        capacity: (title) => {
            return (
                <a-input
                    vModel= {this.vModelData[title.name]}
                />
            );
        },
      }
    return (
        <a-table
          columns={this.columns}
          data-source={tbData}
          pagination={false}
          {...{ scopedSlots }}
        >
        </a-table>
    );
  },
  methods: {
    moment,
  },
}