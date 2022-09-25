<template>
    <div>
        <div class="box">
            <div class="hd" v-for="(it) in 400" :key="it" @click="btn(it)">
                <div class="a1" v-show="a1[it]"></div>
                <div class="a2" v-show="a2[it]"></div>
            </div>
        </div>
    </div>
</template>
<script>
// import { forEach } from 'store/storages/all';

export default {
        data() {
            return {
                a1: [],
                a2: [],
                cle: false
            }
    },
    watch: {
        a1() {
            // console.log(this.a1);
            this.getA1()
        }
    },
    mounted() {
        this.init()
            console.log(this.a2);
        },
        methods: {
            btn(it) {
                this.cle = !this.cle
                if (this.cle) {
                    this.$set(this.a1, it, true)
                } else {
                    this.$set(this.a2, it, true)
                }
            },
            init() {
                for (let index = 0; index < 400; index++) {
                    this.a1.push(false)
                    this.a2.push(false)
                }
            },
            // a1获胜
            getA1() {
                let it = 0
                let too = 0
                for (let index = 0; index < this.a1.length; index++) {
                    if (this.a1[index] && too == 0) {
                        it = index
                        too++
                        console.log(1);
                    }else if (too && this.a1[index] && index-1 == it) {
                        it = index
                        too++
                        console.log(2);
                    }
                }
                    console.log(too);
            }
        }
    }
</script>
<style lang="less">
.box {
    width: 500px;
    height: 500px;
    background-color: aliceblue;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: flex-start;
    .hd {
        width: 25px;
        height: 25px;
        border: 1px solid #000;
        div {
            width: 100%;
            height: 100%;
            border-radius: 50%;
        }
        .a1 {
            background-color: #000;
        }
        .a2 {
            background-color: rgb(148, 57, 57);
        }
    }
}
</style>