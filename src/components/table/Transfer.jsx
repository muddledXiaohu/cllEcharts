
export default {
    props: {
      dataSource: {
        type: Array
      },
      selectedHeader: {
        type: Array
      },
    },
    data() {
      return {
        data: [],
        targetKeys: []
      };
    },
    render() {
      return (
        <div>
        <a-transfer
          data-source={this.data}
          show-search
          render={item => item.title}
          target-keys={this.targetKeys}
          on={{
            change: this.handleChange,
            search: this.handleSearch
          }}
        />
        </div>
      );
    },
    created() {
        this.Transfer()
    },
    watch: {
    },
    methods: {
        Transfer () {
            for (const key in this.dataSource) {
                if (this.dataSource[key].title && this.dataSource[key].key) {
                    this.data.push({
                        key: this.dataSource[key].key.toString(),
                        title: this.dataSource[key].title,
                    })
                }
            }
            for (const key1 in this.selectedHeader) {
                if (this.selectedHeader[key1].title && this.selectedHeader[key1].key) {
                    this.targetKeys.push(
                        this.selectedHeader[key1].key.toString())
                }
            }
            console.log(this.targetKeys);
        },
        handleChange(targetKeys, direction, moveKeys) {
          console.log(targetKeys, direction, moveKeys);
          let result = false
          this.targetKeys = targetKeys;
          const data = this.needHeader()
          this.$emit('transfers', data, val => { result = val }) // 传函数给父组件
          return result
        },
        needHeader() {
          const data = []
          for (const key in this.targetKeys) {
            for (const key1 in this.dataSource) {
              if (this.dataSource[key1].key == this.targetKeys[key]) {
                data.push(this.dataSource[key1])
              }
            }
          }
          return data;
        },
        handleSearch(dir, value) {
          console.log(1);
          console.log('search:', dir, value);
        },
    },
  }