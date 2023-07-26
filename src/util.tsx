import { Cookies } from "react-cookie";

const cookies = new Cookies();

function emailRegex(val: string) {
  let regex = new RegExp("([!#-'*+/-9=?A-Z^-~-]+(\.[!#-'*+/-9=?A-Z^-~-]+)*|\"\(\[\]!#-[^-~ \t]|(\\[\t -~]))+\")@([!#-'*+/-9=?A-Z^-~-]+(\.[!#-'*+/-9=?A-Z^-~-]+)*|\[[\t -Z^-~]*])");
  return regex.test(val);
}

function setCookie(name: string, value: string, options?: any) {
  return cookies.set(name, value, {...options});
}

function getCookie(name: string) {
  return cookies.get(name);
}

export { emailRegex, setCookie, getCookie };