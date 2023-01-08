export const harbors = [
    {
        value: '1',
        label: '测试港口01',
        longitude: '39.907325',
        latitude: '116.391450',
    },
    {
        value: '2',
        label: '测试港口02',
        longitude: '44.907325',
        latitude: '95.391450',
    },
]
export const fuelType = [
    { value: "Diesel", label: "柴油" },
    { value: "LFO", label: "轻质燃料油" },
    { value: "HFO", label: "重质燃料油" },
    { value: "Propane", label: "液化石油气丙烷" },
    { value: "Butane", label: "液化石油气丁烷" },
    { value: "LNG", label: "液化天然气" },
    { value: "Methanol", label: "甲醇" },
    { value: "Ethanol", label: "乙醇" },
    { value: "other", label: "其他" },
]

export const homeColumns = [
  {
    title: "序号",
    dataIndex: "index",
    scopedSlots: { customRender: 'index' },
  },
  {
    title: "船名",
    dataIndex: "name",
  },
  {
    title: "IMO",
    dataIndex: "IMO",
  },
  {
    title: "船型",
    dataIndex: "models",
    scopedSlots: { customRender: 'models' },
  },
  {
    title: "总长(m)",
    dataIndex: "lengthOverAll",
  },
  {
    title: "船宽(m)",
    dataIndex: "shipBreadth",
  },
  {
    title: "夏季载重吨(tons)",
    dataIndex: "summerDeadWeight",
  },
  {
    title: "总吨(tons)",
    dataIndex: "gt",
  },
  {
    title: "燃油类型",
    dataIndex: "fuelType",
    scopedSlots: { customRender: 'fuelType' },
  },
  {
    title: "操作",
    dataIndex: "operations",
    scopedSlots: { customRender: 'operations' },
  },
]

export const columns = [
  {
    title: "燃油名",
    scopedSlots: { customRender: 'uname' },
  },
  {
    title: "燃油消耗量(升)",
    scopedSlots: { customRender: 'capacity' },
  },
]
export const digitalFormcolumns = [
  // {
  //   title: "IMO",
  //   scopedSlots: { customRender: 'IMO' },
  // },
  {
    title: "日期",
    dataIndex: "Date_UTC",
    scopedSlots: { customRender: 'IMO' },
  },
  {
    title: "记录时刻",
    dataIndex: "Time_UTC",
  },
  {
    title: "出发港",
    dataIndex: "Voyage_From",
  },
  {
    title: "抵达港",
    dataIndex: "Voyage_To",
  },
  {
    title: "经度",
    dataIndex: "Latitude_Degree",
    scopedSlots: { customRender: 'Latitude_Degree' },
  },
  {
    title: "纬度",
    dataIndex: "Longitude_Degree",
    scopedSlots: { customRender: 'Longitude_Degree' },
  },
  {
    title: "距离上次时间",
    dataIndex: "Time_Since_Previous_Report",
  },
  {
    title: "停靠时间",
    dataIndex: "Time_Elapsed_Anchoring",
  },
  {
    title: "行驶距离",
    dataIndex: "Distance",
  },
  {
    title: "HFO使用量(升)",
    dataIndex: "ME_Consumption_HFO",
  },
  {
    title: "MGO使用量(升)",
    dataIndex: "ME_Consumption_MGO",
  },
  {
    title: "HFO剩余量(升)",
    dataIndex: "HFO_ROB",
  },
  {
    title: "MGO剩余量(升)",
    dataIndex: "MGO_ROB",
  },
];
export const coordinatesConvertDegreeMinuteSecond= (coordinates)=> {
  const coords = String(coordinates).split('.');
  const degree = coords[0];
  const mArr = String((Number(String(0+'.'+coords[1]))*60)).split('.');
  const minute = mArr[0];
  // 秒 通过获取数组第二位进行计算生成秒  截取小数点后两位
  // const second = (Number(String(0+'.'+mArr[1]))*60).toFixed(2);
  const result = [degree, minute];
  return result;
}


export const vesselType = [
  { value: "Tanker", label: "油船" },
  { value: "Bulk carrier", label: "散货船" },
  { value: "Gas carrier", label: "气体运输船" },
  { value: "Containership", label: "集装箱船" },
  { value: "General cargo ship", label: "杂货船" },
  { value: "Combination carrier", label: "混装船" },
  { value: "LNG carrier", label: "LNG运输船" },
  {
    value: "Ro-ro cargo ship(vehicle carrier)",
    label: "滚装货船（汽车）",
  },
  { value: "Ro-ro cargo ship", label: "滚装货船" },
  { value: "Ro-ro passenger ship", label: "滚装客船" },
  { value: "Refrigerated cargo carrier", label: "冷藏货船" },
  {
    value: "Cruise passenger ship having non-conventional propulsion",
    label: "非常规推进客船",
  },
  { value: "other", label: "其他" },
]

export const shipParameter = (data) => {
  let models = ''
  if (data.models) {
    const modeleName = vesselType.filter(item =>{return item.value== data.models})[0]
    models =modeleName.label
  }
  let vModelData = ``
  if (data.vModelData&&JSON.stringify(data.vModelData)!='{}') {
    for (const key in data.vModelData) {
      const fuelTypeName = fuelType.filter(item => { return item.value == key })[0]
      vModelData += `${fuelTypeName.label}：${data.vModelData[key]}`
    }
  }
  let aeVmodelData = ``
  if (data.aeVmodelData && JSON.stringify(data.aeVmodelData) != '{}') {
    for (const key in data.aeVmodelData) {
      const fuelTypeName = fuelType.filter(item =>{return item.value== key})[0]
      aeVmodelData += `${fuelTypeName.label}：${data.aeVmodelData[key]}`
    }
  }
  return [
    {value: models, label: '船型'},
    {value: data.name, label: '船名'},
    {value: data.IMO, label: 'IMO'},
    {value: data.numberNo, label: '船号'},
    {value: data.shipowner, label: '船东'},
    {value: data.shipbuilding, label: '造船厂'},
    {value: data.classCcs, label: '航级社'},
    {value: data.shipDesigner, label: '船舶设计公司'},
    {value: data.lengthOverAll, label: '总长(m)'},
    {value: data.betwLength, label: '垂线间长(m)'},
    {value: data.shipBreadth, label: '船宽(m)'},
    {value: data.designDraught, label: '设计吃水(m)'},
    {value: data.scantlingDraught, label: '结构吃水(m)'},
    {value: data.ballastDraught, label: '压载吃水(m)'},
    {value: data.gt, label: '总吨(tons)'},
    {value: data.summerDeadWeight, label: '夏季载重吨(tons)'},
    {value: data.meType, label: '主机型号'},
    {value: data.meNumber, label: '主机数量'},
    {value: data.meSMCR, label: '最大持续功率(KW)'},
    {value: data.meCSR, label: '持续服务功率(KW)'},
    {value: data.limitEEXI, label: 'EEXI限制功率(KW)'},
    {value: vModelData, label: '主机燃油信息'},
    {value: data.aeType, label: '辅机型号'},
    {value: data.aeNumber, label: '辅机数量'},
    {value: data.aeSMCR, label: '额定功率(KW)'},
    {value: aeVmodelData, label: '辅机燃油信息'},
    {value: data.remarks, label: '备注'},
  ]
}

export const CIIColumns = [
  {
    dataIndex: "indexId",
    // slots: { title: 'customTitle' },
    title: "序号",
  },
  {
    title: "船名",
    dataIndex: "name",
  },
  {
    title: "船型",
    dataIndex: "models",
    scopedSlots: { customRender: 'models' },
  },
  {
    title: "夏季载重吨（tons）",
    dataIndex: "summerDeadWeight",
  },
  {
    title: "午报数据最近截止时间",
    dataIndex: "Time_Since_Previous_Report",
  },
  {
    title: "Attained CII（YTD）",
    dataIndex: "AttainedCII",
  },
  {
    title: "CII Trend(3 adys-avg)",
    dataIndex: "performance",
    scopedSlots: { customRender: "cllTrend" },
  },
  {
    title: "CII  Rating（YTD）",
    dataIndex: "M",
  },
  {
    title: 'Attained CII',
    children: [
      {
        title: '2019',
        dataIndex: 'aa'
      },
      {
        title: '2020',
        dataIndex: 'bb'
      },
      {
        title: '2021',
        dataIndex: 'cc'
      },
      {
        title: '2022',
        dataIndex: 'dd'
      },
      {
        title: '2023',
        dataIndex: 'ee'
      },
    ]
  },
  {
    title: 'Attained CII rating',
    children: [
      {
        title: '2019',
        dataIndex: 'aaa'
      },
      {
        title: '2020',
        dataIndex: 'bbb'
      },
      {
        title: '2021',
        dataIndex: 'ccc'
      },
      {
        title: '2022',
        dataIndex: 'ddd'
      },
      {
        title: '2023',
        dataIndex: 'eee'
      },
    ]
  },
  {
    title: "查看",
    width: 200,
    fixed: 'right',
    dataIndex: "operationLook",
    scopedSlots: { customRender: 'operationLook' },
  },
];