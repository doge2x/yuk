import $ from "jquery";

export function injectLoginButton(onClick: () => void) {
  $(".header-title").wrapInner(
    $(`<a href="javascript:void(0);"></a>`).on("click", onClick)
  );
}
