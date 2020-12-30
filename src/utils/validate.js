// 过滤特殊字符
export function stripscript(s) {
  var pattern = new RegExp(
    "[`~!#$^&*()=|{}':;',\\[\\]<>/?~！#￥……&*（）——|{}【】‘；：”“'。，、？]"
  );
  var rs = "";
  for (var i = 0; i < s.length; i++) {
    rs = rs + s.substr(i, 1).replace(pattern, "");
  }
  return rs;
}
// 验证邮箱
export function regEmail(value) {
  let reg = /^(([^<>()[\]\\,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (!reg.test(value)) {
    return true;
  } else {
    return false;
  }
}
// 验证密码
export function regPassword(value) {
  let reg = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
  if (!reg.test(value)) {
    return true;
  } else {
    return false;
  }
}
// 验证验证码
export function regCode(value) {
  let reg = /^[a-z0-9]{6}$/;
  return !reg.test(value) ? true : false;
}
