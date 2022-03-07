//由经纬度计算距离
/**
 * 简单说明下，开发过程中，很多地方需要用到用户距离与商家距离。
 * 但是相关接口中返回的都是经纬度，也没有找到计算距离的接口，因为我也没有开发经验，也没有去github上提issue， 自己对经纬度这些地理概念也不懂，不知道怎么由经纬度计算距离，所以就从网上找了个计算方法
 * https://segmentfault.com/a/1190000010371592， 感谢
 */
function getDistance( lat1,  lng1,  lat2,  lng2){
    var radLat1 = lat1*Math.PI / 180.0;
    var radLat2 = lat2*Math.PI / 180.0;
    var a = radLat1 - radLat2;
    var  b = lng1*Math.PI / 180.0 - lng2*Math.PI / 180.0;
    var s = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(a/2),2) +
    Math.cos(radLat1)*Math.cos(radLat2)*Math.pow(Math.sin(b/2),2)));
    s = s *6378.137 ;// EARTH_RADIUS;
    s = Math.round(s * 10000) / 10000;
    return s;
}

export default getDistance