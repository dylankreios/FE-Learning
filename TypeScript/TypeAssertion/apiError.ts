/**
 * 类型断言适用于接口，因为接口在编译之后会被删除
 * instanceof 适用于类
 */

class ApiError extends Error {
  code: number = 0;
}
class HttpError extends Error {
  statusCode: number = 200;
}
// 判断传入的参数是不是 ApiError 类型
function isApiError1(error: Error) {
  return error instanceof ApiError ? true : false;
}

interface ApiError extends Error {
  code: number;
}
interface HttpError extends Error {
  statusCode: number;
}
function isApiError2(error: Error) {
  return typeof (error as ApiError).code === "number" ? true : false;
}
