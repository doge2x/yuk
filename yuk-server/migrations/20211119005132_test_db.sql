/* rename `answers.answers` to `ansewers.result` */
ALTER TABLE answers
    RENAME COLUMN answers TO result;
/* change datatype of `answers.exam_id` to `BIGINT` */
ALTER TABLE answers
ALTER COLUMN exam_id TYPE BIGINT USING exam_id::BIGINT;
/* make `(answers.exam_id, answers.problem_id, answers.user_id)` unique */
ALTER TABLE answers
ADD CONSTRAINT answer_unique UNIQUE (exam_id, problem_id, user_id);