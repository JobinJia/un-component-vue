export enum DataTypeEnum {
  BOOLEAN = '[object Boolean]',
  NUMBER = '[object Number]',
  FUNCTION = '[object Function]',
  STRING = '[object String]',
}

function getType(arg: any) {
  return Object.prototype.toString.call(arg)
}

export function isBoolean(arg: any): arg is boolean {
  return getType(arg) === DataTypeEnum.BOOLEAN
}
export function isNumber(arg: any): arg is number {
  return getType(arg) === DataTypeEnum.NUMBER
}

export function isFunction(arg: any): arg is Function {
  return getType(arg) === DataTypeEnum.FUNCTION
}

export function isString(arg: any): arg is Function {
  return getType(arg) === DataTypeEnum.STRING
}
