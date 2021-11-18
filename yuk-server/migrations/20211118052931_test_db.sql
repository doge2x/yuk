/* rename `users.nick_name` to `users.username` */
ALTER TABLE users
    RENAME COLUMN nick_name TO username;
/* change datatype of `users.username` to `VARCHAR` */
ALTER TABLE users
ALTER COLUMN username TYPE VARCHAR(31);
/* make `users.username` unique */
ALTER TABLE users
ADD CONSTRAINT username_unique UNIQUE (username);