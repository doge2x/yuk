declare namespace StyleModCssNamespace {
  export interface IStyleModCss {
    about: string;
    answerDetail: string;
    clickable: string;
    confirmUpload: string;
    imageContainer: string;
    mainBody: string;
    settings: string;
    settingsEntry: string;
    settingsSubmit: string;
    shorAnswer: string;
    title: string;
    uploadImg: string;
  }
}

declare const StyleModCssModule: StyleModCssNamespace.IStyleModCss & {
  /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
  locals: StyleModCssNamespace.IStyleModCss;
};

export = StyleModCssModule;
