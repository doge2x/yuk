declare var DEV_MODE: boolean;

declare module "*.mod.less" {
  const style: {
    locals: { [k: string]: string };
    use(opt?: {}): void;
  };
  const locals: { [k: string]: string };
  export = locals;
}
