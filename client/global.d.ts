declare var DEV_MODE: boolean;

declare module "*.mod.less" {
  const locals: { [k: string]: string };
  export = locals;
}
