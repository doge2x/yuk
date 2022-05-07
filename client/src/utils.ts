export function devLog(msg?: any, ...params: any[]) {
  if (DEV_MODE) {
    console.log(msg, ...params);
  }
}
