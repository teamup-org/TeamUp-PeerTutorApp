CREATE TABLE user_feedback (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id VARCHAR(255),
    rating INT,
    feedback1 TEXT,
    feedback2 TEXT,
    feedback3 TEXT,
    feedback4 TEXT,
    feedback5 TEXT,
    feedback6 TEXT,
    feedback7 TEXT
);
