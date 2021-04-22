/**
 * 只匹配 http://www.qq.com/xxx
 * @param {*} url
 * @returns
 */
const matchQqOnly = (url) => /^https?:\/\/w+\.qq\.com[^.]*$/.test(url);

/**
 * rgb 转十六进制
 * @param {*} rgb
 * @returns
 */
const rgbToHex = (rgb) =>
  rgb
    .match(/\d+/g)
    .map((v) => ("0" + Number(v).toString(16)).slice(-2))
    .reduce((acc, v) => acc + v.toUpperCase(), "#");
