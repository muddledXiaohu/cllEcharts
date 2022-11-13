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
    { value: "Gas Oil", label: "轻柴油" },
    { value: "LFO", label: "轻质燃料油" },
    { value: "HFO", label: "重质燃料油" },
    { value: "Propane", label: "丙烷" },
    { value: "Butane", label: "丁烷" },
    { value: "LNG", label: "液化天然气" },
    { value: "Methanol", label: "甲醇" },
    { value: "Ethanol", label: "乙醇" },
    { value: "other", label: "其他" },
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
  {
    title: "航船名",
    dataIndex: "IMO",
  },
  {
    title: "日期",
    dataIndex: "Date_UTC",
  },
  {
    title: "航次号",
    dataIndex: "Voyage_From",
  },
  {
    title: "经度时（未格式化）",
    dataIndex: "Latitude_Degree",
  },
  {
    title: "纬度时（未格式化）",
    dataIndex: "Longitude_Degree",
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