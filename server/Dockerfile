FROM rust as chef
RUN cargo install cargo-chef
WORKDIR /app

FROM chef as planner
COPY . .
RUN cargo chef prepare --recipe-path recipe.json

FROM chef AS builder
COPY --from=planner /app/recipe.json recipe.json
RUN cargo chef cook --release --recipe-path recipe.json
COPY . .
RUN cargo build --release

FROM scratch as artifact
WORKDIR /app
COPY --from=builder /app/target/release/yuk-server /bin/yuk-server

FROM ubuntu as runtime
COPY --from=artifact /bin/yuk-server /usr/local/bin/yuk-server
ENTRYPOINT [ "/usr/local/bin/yuk-server" ]
