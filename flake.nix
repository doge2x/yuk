{
  inputs = {
    nixpkgs.url = "github:nixos/nixpkgs/nixos-unstable";
    utils.url = "github:numtide/flake-utils";
    rust-overlay.url = "github:oxalica/rust-overlay";
  };

  outputs = { self, nixpkgs, utils, rust-overlay }:
    utils.lib.eachDefaultSystem (system:
      let
        pkgs = import nixpkgs {
          inherit system;
          overlays = [
            rust-overlay.overlay
          ];
        };
      in
      {
        devShell = pkgs.mkShell
          {
            buildInputs = with pkgs; [
              (rust-bin.stable.latest.default.override {
                extensions = [ "rust-src" ];
              })
              openssl.dev
              sqlx-cli
            ];
            nativeBuildInputs = with pkgs; [
              pkg-config
            ];
          };
      }
    );
}
