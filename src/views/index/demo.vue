<!-- <template>
  <div>
    <div
      class='drop-zone'
      @drop='onDrop($event, 1)'
      @dragover.prevent
      @dragenter.prevent
    >
    <div 
        class='drag-el'
        v-for='item in listOne'
        :key='item.title'
        draggable
        @dragstart='startDrag($event, item)'
    >
        {{ item.title }}
      </div>
    </div>
    <div
      class='drop-zone'
      @drop='onDrop($event, 2)'
      @dragover.prevent
      @dragenter.prevent
    >
        <div
            class='drag-el'
            v-for='item in listTwo'
            :key='item.title'
            draggable
            @dragstart='startDrag($event, item)'
        >
            {{ item.title }}
        </div>
    </div>
  </div>
</template>
<script>
export default {
    data () {
        return {
        items: [
        {
            id: 0,
            title: 'Item A',
            list: 1
        },
        {
            id: 1,
            title: 'Item B',
            list: 1
        },
        {
            id: 2,
            title: 'Item C',
            list: 2
        }]
        }
    },
    computed: {
        listOne () {
            return this.items.filter(item => item.list === 1)
        },
        listTwo () {
            return this.items.filter(item => item.list === 2)
        }
    },
    methods: {
        startDrag(evt, item) {
            evt.dataTransfer.dropEffect = 'move'
            evt.dataTransfer.effectAllowed = 'move'
            evt.dataTransfer.setData('itemID', item.id)
        },
        onDrop (evt, list) {
            const itemID = evt.dataTransfer.getData('itemID')
            const item = this.items.find(item => item.id == itemID)
            item.list = list
            console.log(this.listOne);
            console.log(this.listTwo);
        }
    }
}
</script>
<style scoped>
  .drop-zone {
    background-color: #eee;
    margin-bottom: 10px;
    padding: 10px;
  }
 
  .drag-el {
    background-color: #fff;
    margin-bottom: 10px;
    padding: 5px;
  }
</style> -->

<template>
    <div class="group-box">
  <div class="group">
      人员
      <vuedraggable v-model="arr1" group="site" >
        <transition-group>
            <div class="item active" v-for="item in arr1" :key="item.id">{{item.name}}</div>
        </transition-group>
    </vuedraggable>
  </div>
  <div class="group">
      不参与人员
      <vuedraggable v-model="arr2" group="site" >
        <transition-group>
            <div class="item" v-for="item in arr2" :key="item.id">{{item.name}}</div>
        </transition-group>
    </vuedraggable>
  </div>
  <div>
      <button @click="savePeo">提交数据</button>
  </div>
</div>
</template>
<script>
import vuedraggable from 'vuedraggable';
export default {
    data () {
        return {
            arr1:[{id:1,name:'小凌'},{id:2,name:'小铁'},{id:3,name:'小伟'},{id:4,name:'小涵'}],
            arr2:[{id:5,name:'酒桶'},{id:6,name:'木兰'},{id:7,name:'典韦'},{id:8,name:'瑞兹'}]
        }
    },
    components: { vuedraggable},
    computed: {
    },
    methods: {
        savePeo(){
            let saveList = []
            let noJoinList = []
            this.arr1.forEach(item => saveList.push(item.name));
            this.arr2.forEach(item => noJoinList.push(item.name));
            console.log(`人员：${saveList.join(',')}; \n 不参与人员${noJoinList.join(',')}`);
        }
    }
}
</script>