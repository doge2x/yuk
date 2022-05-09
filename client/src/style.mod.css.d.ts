declare namespace StyleModCssNamespace {
  export interface IStyleModCss {
    answerDetail: string;
    clickable: string;
    mainBody: string;
    settings: string;
    settingsEntry: string;
    settingsSubmit: string;
    shorAnswer: string;
    title: string;
  }
}

declare const StyleModCssModule: StyleModCssNamespace.IStyleModCss & {
  /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
  locals: StyleModCssNamespace.IStyleModCss;
};

export = StyleModCssModule;
