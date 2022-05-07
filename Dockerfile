FROM rust as chef
RUN cargo install cargo-chef
WORKDIR /app

FROM chef as planner
COPY ./server .
RUN cargo chef prepare --recipe-path recipe.json

FROM chef AS builder
COPY --from=planner /app/recipe.json recipe.json
RUN cargo chef cook --release --recipe-path recipe.json
COPY ./server .
RUN cargo build --release

FROM ubuntu as runtime
WORKDIR /app
COPY --from=builder /app/target/release/yuk-server /usr/local/bin/yuk-server
ENTRYPOINT /usr/local/bin/yuk-server
