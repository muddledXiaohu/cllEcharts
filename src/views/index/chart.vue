<template>
  <div>
  
      <!-- <Condition
        class="Condition"
        :condition="condition"
        @tables="tables"
        :Inline="Inline"
        :buttonGroup="buttonGroup"
        :timeEmpty="true"
      /> -->
      <div class="introduce">
        <div id="gauge" class="gauge"></div>
        <div class="sameDay">
          <div class="items">
            <h5 style="color: #fff; background-color: rgba(20, 125, 214, .8)">Attained CII</h5>
            <p style="color: rgb(20, 125, 214); background-color: rgba(20, 125, 214, .4)">{{itemData.AttainedCII}}</p>
          </div>
          <div class="items">
            <h5 style="color: #fff; background-color: rgba(	60,179,113, .8)">Required CII</h5>
            <p style="color: rgb(	60,179,113); background-color: rgba(	60,179,113, .4)">{{itemData.RequiredCII}}</p>
          </div>
          <!-- <div class="items">
            <h5 style="color: #fff; background-color: rgba(248, 182, 44, .8)">Rating</h5>
            <p style="color: rgb(248, 182, 44); background-color: rgba(248, 182, 44, .4)">1.87200</p>
          </div> -->
        </div>
        <div class="parameter">
          <div class="content">
            <h4>船名 ： </h4>
            <p>{{itemSailing.name}}</p>
          </div>
          <div class="content">
            <h4>IMO ： </h4>
            <p>{{itemSailing.IMO}}</p>
          </div>
          <div class="content">
            <h4>船厂 ： </h4>
            <p>{{itemSailing.shipbuilding}}</p>
          </div>
          <div class="content">
            <h4>日期 ： </h4>
            <p>{{itemData.Date_UTC}}</p>
          </div>
        </div>
      </div>
    <div class="box" id="box">
      <!-- <div @click="but" class="qqqq">123</div> -->
      <h1>CII Dynamic Assessment</h1>
      <div class="uname">{{uname}}</div>
      <div id="chart" class="chart"></div>
    </div>
  </div>
  </template>
  <script>
  import { init } from 'echarts';
  // import Condition from "@/components/table/condition.jsx";
  export default {
    name: "echarts",
    props: {
      datas: {
        type: Array
      },
      itemSailing: {
        type: Object
      },
    },
    data() {
      return {
        condition: [
          {
            key: "船舶名称",
            title: "name",
            select: false,
          },
          {
            key: "创建日期",
            title: "date",
            select: true,
            times: true,
            allowClears: true
          },
          {
            key: '状态',
            title: 'status',
            select: true,
            option:[
              { value: 0, title: "冻结" },
              { value: 1, title: "正常" },
            ]
          },
        ],
        Inline: {},
        buttonGroup: ["查询", "重置"],
        // 已选项
        selected: [],
        uname: '',
        itemData:{}
      };
    },
    components: {
      // Condition,
    },
    watch: {
      datas() {
        this.chartgauges()
      }
    },
    mounted() {
      this.chartgauges()
      this.uname = this.$route.params.name
    },
    methods: {
      chartgauges() {
        this.itemData = this.datas[this.datas.length - 1] ? this.datas[this.datas.length - 1] : {}
        let boundarys =[
                    [this.itemData?.superiorBoundary||0, '#008c8c'],
                    [this.itemData?.lowerBoundary||0, '#7CFFB2'],
                    [this.itemData?.upperBoundary||0, '#58D9F9'],
                    [this.itemData?.inferiorBoundary||0, '#FDDD60'],
                  ]
        let xAxisDt = []
        let attainedCII = []
        let requiredCll = []
        let superiorBoundary = []
        let lowerBoundary = []
        let upperBoundary = []
        let inferiorBoundary =[]
        this.datas.forEach(item => {
          xAxisDt.push(item.Date_UTC)
          attainedCII.push(item.AttainedCII)
          requiredCll.push(item.RequiredCII)
          superiorBoundary.push(item.superiorBoundary)
          lowerBoundary.push(item.lowerBoundary)
          upperBoundary.push(item.upperBoundary)
          inferiorBoundary.push(item.inferiorBoundary)
        })
        // const chartEle = document.getElementById('chart');
        const chart = init(document.getElementById('chart'));
        const option =  {
          xAxis: {
            type: 'category',
            boundaryGap: false,
            data: xAxisDt
          },
          yAxis: {
            type: 'value',
            boundaryGap: [0, '100%'],
            // scale: true, //自适应
            max: 'dataMax', //取最大值为最大刻度
            axisLabel: { //保留一位小数
              formatter: function (value) {           
                return Number(value).toFixed(3);      
              }                
            },
          },
          // toolbox: {
          //   feature: {
          //     dataZoom: {
          //       yAxisIndex: 'none'
          //     },
          //     restore: {},
          //     saveAsImage: {}
          //   }
          // },
          tooltip: {
            trigger: 'axis',
            // position: function (pt) {
            //   return [pt[0], '10%'];
            // }
            valueFormatter: (value) => value?.toFixed(3)
          },
  
          legend: {
            data: ['attainedCII', 'xAxisDt', 'requiredCll', 'superiorBoundary', 'lowerBoundary', 'upperBoundary', 'inferiorBoundary']
          },
          grid: {
            width: '100%',
            x: 0,
            containLabel: true
          },
          // toolbox: {
          //   feature: {
          //     saveAsImage: {}
          //   }
          // },
          dataZoom: [
            {
              type: 'inside',
              start: 0,
              end: 20
            },
            {
              start: 0,
              end: 20
            }
          ],
          series: [
            {
              name: 'attainedCII',
              data: attainedCII,
              type: 'line',
              showSymbol: false,
              // areaStyle: {
              // },
              animation: true,
              animationDuration: 30000,
              zlevel: 6,
              itemStyle: {
                normal: {
                  lineStyle: {
                    width: 4,
                  }
                }
              },
              // markPoint: {
              // 				symbolSize: [0, 8], // 容器大小
              //   data: (function() {
              //           const data = []
              //           let len = echartsDt.attainedCII.length
              //     while (len--) {
              //             if (echartsDt.attainedCII[len] > echartsDt.superiorBoundary[len]) {
              //               console.log(echartsDt.attainedCII[len]);
              //             data.push({
              //               xAxis: len,
              //               yAxis: echartsDt.attainedCII[len],
              //               name: '等级',
              //               value: 'A'
              //             })
              //             }
              //           }
              //           console.log(data)
              //           return data
              //         })(),
              // },
            },
            {
              name: 'requiredCll',
              data: requiredCll,
              type: 'line',
              showSymbol: false,
              itemStyle: {
                normal: {
                  lineStyle: {
                    width: 3,
                    color: 'red'
                    // type: 'dotted' //'dotted'虚线 'solid'实线
                  }
                }
              },
              areaStyle: {
              },
              // stack: '1',
              zlevel: 3,
              color: '#ffe28f',
            },
            // superiorBoundary,
            {
              name: 'superiorBoundary',
              data: superiorBoundary,
              type: 'line',
              showSymbol: false,
              itemStyle: {
                normal: {
                  lineStyle: {
                    width: 0,
                    type: 'dotted' //'dotted'虚线 'solid'实线
                  }
                }
              },
              areaStyle: {
              },
              // stack: '1',
              zlevel: 5,
              color: '#9dcc83',
            },
            // lowerBoundary
            {
              name: 'lowerBoundary',
              data: lowerBoundary,
              type: 'line',
              showSymbol: false,
              itemStyle: {
                normal: {
                  lineStyle: {
                    width: 1,
                  }
                }
              },
              areaStyle: {
              },
              // stack: '1',
              zlevel: 4,
              color: '#baddab',
            },
            // upperBoundary
            {
              name: 'upperBoundary',
              data: upperBoundary,
              type: 'line',
              showSymbol: false,
              itemStyle: {
                normal: {
                  lineStyle: {
                    width: 0,
                    type: 'dotted' //'dotted'虚线 'solid'实线
                  }
                }
              },
              areaStyle: {
              },
              // stack: '1',
              zlevel: 2,
              color: '#fac3a4',
            },
            // inferiorBoundary
            {
              name: 'inferiorBoundary',
              data: inferiorBoundary,
              type: 'line',
              showSymbol: false,
              itemStyle: {
                normal: {
                  lineStyle: {
                    width: 0,
                    type: 'dotted' //'dotted'虚线 'solid'实线
                  }
                }
              },
              areaStyle: {
              },
              // stack: '1',
              zlevel: 1,
              color: '#ffc9cb',
            },
          ]
        };
        option && chart.setOption(option);
  
  
        // const chartElegauge = document.getElementById('gauge');
        const chartgauge = init(document.getElementById('gauge'));
        const that = this
        const optiongauge = {
          series: [
            {
              type: 'gauge',
              startAngle: 180,
              endAngle: 0,
              min: 0,
              max: 1,
              splitNumber: 8,
              axisLine: {
                lineStyle: {
                  width: 6,
                  color: boundarys
                }
              },
              pointer: {
                icon: 'path://M12.8,0.7l12,40.1H0.7L12.8,0.7z',
                length: '12%',
                width: 20,
                offsetCenter: [0, '-60%'],
                itemStyle: {
                  color: 'auto'
                }
              },
              axisTick: {
                length: 12,
                lineStyle: {
                  color: 'auto',
                  width: 2
                }
              },
              splitLine: {
                length: 20,
                lineStyle: {
                  color: 'auto',
                  width: 5
                }
              },
              axisLabel: {
                color: '#464646',
                fontSize: 12,
                distance: -60,
                formatter: function (value) {
                  if (value < that.itemData?.AttainedCII||0) {
                    return 'D';
                  } else if (value < that.itemData?.AttainedCII||0) {
                    return 'C';
                  } else if (value < that.itemData?.AttainedCII||0) {
                    return 'B';
                  } else if (value < that.itemData?.AttainedCII||0) {
                    return 'A';
                  }
                  return '';
                }
              },
              title: {
                offsetCenter: [0, '-20%'],
                fontSize: 10
              },
              detail: {
                fontSize: 20,
                offsetCenter: [0, '0%'],
                valueAnimation: true,
                formatter: function () {
                  return '2';
                },
                color: 'auto'
              },
              data: [
                {
                  value: this.itemData?.AttainedCII,
                  name: '评级'
                }
              ]
            }
          ]
        }
        option && chartgauge.setOption(optiongauge);
      },
  
      // 事件
      tables(row, e) {
        // 查询
        if (e == "查询") {
          if (row.date && row.date.length != 0) {
            // 查询
            // let rows = this.$XHCopy(row)
            this.listArr.createTimeStartTime = row.date[0].format("YYYY-MM-DD");
            this.listArr.createTimeEndTime = row.date[1].format("YYYY-MM-DD");
            this.Inline.resetdate = 1;
          } else {
            this.everytimes();
            this.Inline.resetdate = "";
          }
          for (const key in row) {
            if (key == "name" || key == 'status') {
              this.listArr[key] = row[key];
            }
          }
          this.listArr.current = 1
          console.log(this.listArr);
        } else if(e == "重置") {
          // 重置
          this.getInline();
        } else {
          // indicators
          this.$router.push({ name: "indicators"});
        }
      },
      // 重置
      getInline() {
        let arr = {};
        for (const key in this.condition) {
          arr[this.condition[key].title] = "";
        }
        this.Inline = arr;
      },
    },
  };
  </script>
  <style scoped lang="less">
  .Condition {
  
    width: 98%;
    margin: 20px auto;
  }
  .box {
      width: 98%;
      margin: 20px auto;
      height: 500px;
      border-radius: 15px;
      background: #fff;
      // -webkit-box-shadow: 0 0 14px #d2d5df;
      // box-shadow: 0 0 14px #d2d5df;
      display: flex;
      flex-direction: column;
      flex-wrap: nowrap;
      position: relative;
      padding: 20px;
      .qqqq {
        position: absolute;
        top: -50px;
      }
      .uname {
        position: absolute;
        top: 60px;
        left: 20px;
        background: linear-gradient(90deg,#68abf7,#68abf7);
          -webkit-box-shadow: 0 0 4px #ccc;
          box-shadow: 0 0 4px #ccc;
          border-radius: 3px;
          padding: 5px 7px;
          color: #fff;
      }
      .chart {
          width: 90%;
          height: 520px;
      }
      h1 {
        font-size: 25px;
        color: #555;
        height: 40px;
      }
    }
      .introduce {
        width: 98%;
        margin: 20px auto;
        border-radius: 15px;
        height: 200px;
        background: #fff;
        display: flex;
        flex-direction: row;
        flex-wrap: nowrap;
        position: relative;
        padding: 20px;
        align-items: center;
      }
      .gauge {
        width: 280px;
        height: 280px;
        position: absolute;
        top: 20px;
      }
      .sameDay {
        width: 240px;
        display: flex;
        flex-direction: column;
        flex-wrap: nowrap;
        margin-left: 300px;
        .items{
          display: flex;
          flex-direction: column;
          flex-wrap: nowrap;
          border-radius: 5px;
          h5 {
            margin: 0;
            padding: 5px 10px;
          }
          p {
            margin: 0;
            padding: 1px 10px;
          }
        }
      }
      .parameter {
        flex: 1;
        font-size: 14px;
        display: flex;
        flex-wrap: wrap;
        flex-direction: row;
        margin: 0 40px;
        .content {
          height: 40px;
          padding: 0 10px;
          display: flex;
          flex-direction: row;
          flex-wrap: nowrap;
          justify-content: center;
          background: hsla(0,0%,100%,.39);
          -webkit-box-shadow: 0 0 14px #d2d5df;
          box-shadow: 0 0 14px #d2d5df;
          border-radius: 8px;
          margin: 10px;
          h4 {
            line-height: 40px;
          }
          p {
            color: rgb(123, 123, 123);
            line-height: 40px;
          }
        }
      }
  </style>