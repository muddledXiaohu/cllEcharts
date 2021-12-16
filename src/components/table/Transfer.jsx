
export default {
    props: {
        dataSource: {
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
                if (this.dataSource[key].title) {
                    this.data.push({
                        key: key.toString(),
                        title: this.dataSource[key].title,
                    })
                }
            }
        },
        handleChange(targetKeys, direction, moveKeys) {
          console.log(targetKeys, direction, moveKeys);
          this.targetKeys = targetKeys;
        },
        handleSearch(dir, value) {
          console.log(1);
          console.log('search:', dir, value);
        },
    },
  }