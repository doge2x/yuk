/* add foreign key constraint to `answers.user_id` */
ALTER TABLE answers
ADD CONSTRAINT user_id_fkey FOREIGN KEY (user_id) REFERENCES users (id);