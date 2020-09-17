CREATE TABLE wishlist_wishes (
    id INTEGER PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY,
    wish_title TEXT NOT NULL,
    wish_url TEXT,
    purchased BOOLEAN DEFAULT FALSE,
    date_added TIMESTAMPTZ DEFAULT now() NOT NULL,
    list_id INTEGER REFERENCES wishlist_lists(id) ON DELETE CASCADE NOT NULL,
    user_id INTEGER REFERENCES wishlist_users(id) NOT NULL
);