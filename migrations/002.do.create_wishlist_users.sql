CREATE TABLE wishlist_users (
    id INTEGER PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY,
    signup_date DATE DEFAULT now(),
    preferred_name TEXT NOT NULL,
    user_name TEXT NOT NULL,
    password TEXT NOT NULL
);

ALTER TABLE IF EXISTS wishlist_lists
  ADD COLUMN
    user_id INTEGER REFERENCES wishlist_users(id) NOT NULL; 