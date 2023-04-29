FROM alpine:3.17 AS base

FROM lukemathwalker/cargo-chef:latest-rust-1.69-alpine3.17 AS chef
WORKDIR /app

FROM chef AS planner
COPY . .
RUN cargo chef prepare --recipe-path recipe.json

FROM chef AS builder 
COPY --from=planner /app/recipe.json recipe.json
RUN cargo chef cook --release --recipe-path recipe.json
COPY . .
RUN cargo build --release

FROM scratch as artifact
COPY --from=builder /app/target/release/yuk-server /bin/yuk-server

FROM base as app
COPY --from=artifact /bin/yuk-server /usr/local/bin/yuk-server
ENTRYPOINT [ "/usr/local/bin/yuk-server" ]
