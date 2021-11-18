/* users */
CREATE TABLE IF NOT EXISTS users (
    id BIGSERIAL PRIMARY KEY,
    nick_name TEXT NOT NULL
);
/* answers */
CREATE TABLE IF NOT EXISTS answers (
    id BIGSERIAL PRIMARY KEY,
    exam_id TEXT NOT NULL,
    problem_id BIGINT NOT NULL,
    user_id BIGINT NOT NULL,
    answers JSON NOT NULL
);