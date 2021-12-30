
import areaData from "@/assets/areadata";
const address = (provinceNumber, cityNumber, zoneNumber) => {
  let regions = ''
  // if (provinceNumber == 1) {
  //   let province = {};
  //   province = areaData.find((item)=>{
  //     return item.value == provinceNumber;
  //   });
  //   console.log(province);
  //   regions += `${province.label}`
  //   let city = {};
  //   if (zoneNumber && province.children) {
  //     city = province.children[0].children.find((item)=>{
  //       return item.value == zoneNumber;
  //     });
  //     regions += `/${city.label}`
  //   }
  //   return regions
  // } else {
    let province = {};
    province = areaData.find((item)=>{
      return item.value == provinceNumber;
    });
    regions += `${province.label}`
    let city = {};
    if (cityNumber && province.children) {
      city = province.children.find((item)=>{
        return item.value == cityNumber;
      });
      regions += `/${city.label}`
    }
    let area = {};
    if (zoneNumber && city.children) {
      area = city.children.find((item)=>{
        return item.value == zoneNumber;
      });
      regions += `/${area.label}`
    }
    return regions
  // }
}
export default address