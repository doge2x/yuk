export function injectLoginButton(onClick: () => void) {
  document.querySelectorAll(".header-title").forEach((header) => {
    const button = document.createElement("a");
    button.href = "javascript:void(0);";
    button.onclick = onClick;
    button.innerHTML = header.innerHTML;
    header.innerHTML = "";
    header.appendChild(button);
  });
}
