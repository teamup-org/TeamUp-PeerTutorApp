INSERT INTO course
    (course_name, course_dept, course_number)
VALUES
    ('introduction to program design and concepts', 'csce', 121),
    ('data structures and algorithms', 'csce', 221),
    ('computer organization', 'csce', 312),
    ('introduction to computer systems', 'csce', 313),
    ('programming languages', 'csce', 314);

INSERT INTO location
    (location_name, is_indoor, is_oncampus, is_online)
VALUES
    ('business library & collaboration commons', TRUE, TRUE, FALSE),
    ('evans', TRUE, TRUE, FALSE),
    ('annex', TRUE, TRUE, FALSE),
    ('cushing memorial library & archives', TRUE, TRUE, FALSE),
    ('medical sciences library', TRUE, TRUE, FALSE);

INSERT INTO rating
    (number_stars)
VALUES
    (1),
    (2),
    (3),
    (4),
    (5);

INSERT INTO major
    (major_name)
VALUES
    ('computer science'),
    ('mechanical engineering'),
    ('electrical engineering'),
    ('aerospace engineering'),
    ('civil engineering');

INSERT INTO seniority
    (seniority_name)
VALUES
    ('freshman'),
    ('sophmore'),
    ('junior'),
    ('senior'),
    ('graduate');

INSERT INTO tutee
    (uin, first_name, last_name, major_id, seniority_id, phone_number, email)
VALUES
    (678912345, 'amber', 'awesome', 1, 1, 1111111111, 'amber@gmail.com'), 
    (789123456, 'bobby', 'bold', 2, 2, 2222222222, 'bobby@gmail.com'), 
    (891234567, 'calvin', 'cool', 3, 3, 3333333333, 'calvin@gmail.com'), 
    (912345678, 'denise', 'dangerous', 4, 4, 4444444444, 'denise@gmail.com'),
    (112345678, 'edgar', 'excellent', 5, 5, 5555555555, 'edgar@gmail.com');

INSERT INTO active_status
    (status_name)
VALUES
    ("active"),
    ("inactive");

INSERT INTO tutor
    (uin, first_name, last_name, major_id, seniority_id, pay_rate, bio_text, picture_url, phone_number, email, average_rating, active_status_id)
VALUES
    (123456789, 'john', 'smith', 1, 1, 10.00, 'Hi', 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e3/Branden_Loera_Headshot.jpg/394px-Branden_Loera_Headshot.jpg?20231019200804', 1234567890, 'john@gmail.com', 1, 1),
    (234567891, 'maria', 'garcia', 2, 2, 15.00, 'Hello', 'https://upload.wikimedia.org/wikipedia/commons/0/07/Avantika_Headshot.jpg', 3123456789, 'maria@gmail.com', 2, 2),
    (345678912, 'james', 'johnson', 3, 3, 20.00, 'Greetings', 'https://upload.wikimedia.org/wikipedia/commons/d/de/Kenneth_Harris_II.jpg', 9012345678, 'james@gmail.com', 3, 1),
    (456789123, 'david', 'rodriquez', 4, 4, 25.00, 'Salutations', 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8a/Updated-hs-zameer-rizvi-headshot-1.jpg/510px-Updated-hs-zameer-rizvi-headshot-1.jpg?20231107221652', 8901234567, 'david@gmail.com', 4, 2),
    (567891234, 'mary', 'martinez', 5, 5, 30.00, 'Howdy', 'https://upload.wikimedia.org/wikipedia/commons/7/77/Melissa_Huang_headshot.jpg', 7890123456, 'mary@gmail.com', 5, 1);

INSERT INTO tutor_location_preference
    (tutor_id, location_id)
VALUES
    (1, 1),
    (2, 2),
    (3, 3),
    (4, 4),
    (5, 5);

INSERT INTO tutor_eligibility
    (tutor_id, course_id, course_grade, is_eligible)
VALUES
    (1, 1, 'a', TRUE),
    (2, 2, 'b', TRUE),
    (3, 3, 'c', FALSE),
    (4, 4, 'd', FALSE),
    (5, 5, 'f', FALSE);

INSERT INTO time_increment
    (time_value)
VALUES
    ('13:00:00'),
    ('14:00:00'),
    ('15:00:00'),
    ('16:00:00'),
    ('17:00:00');

INSERT INTO tutor_time_preference
    (tutor_id, start_time_id, end_time_id)
VALUES
    (1, 1, 2),
    (2, 1, 3),
    (3, 1, 4),
    (4, 1, 5),
    (5, 2, 3);

INSERT INTO request_type
    (request_type_name)
VALUES
    ('request appointment'),
    ('cancel appointment'),
    ('reschedule appointment');

INSERT INTO request_status
    (status_name)
VALUES
    ('pending'),
    ('accepted'),
    ('denied'),
    ('cancelled');

INSERT INTO initiator_type
    (initiator_type_name)
VALUES
    ('tutor'),
    ('tutee');

INSERT INTO appointment_type
    (appointment_type_name)
VALUES
    ('single'),
    ('group');

INSERT INTO appointment_status
    (status_name)
VALUES
    ('confirmed'),
    ('pending'),
    ('cancelled');

INSERT INTO appointment
    (appointment_type_id, tutor_id, tutee_id, appointment_date, start_time_id, end_time_id, location_id, appointment_status_id)
VALUES
    (1, 1, 1, '2024-03-01', 1, 2, 1, 1),
    (1, 2, 2, '2024-03-02', 1, 3, 2, 2),
    (1, 3, 3, '2024-03-03', 1, 4, 3, 3),
    (1, 4, 4, '2024-03-04', 1, 5, 4, 1),
    (1, 5, 5, '2024-03-05', 2, 3, 5, 2);

INSERT INTO appointment_request
    (request_type_id, appointment_id, initiator_type_id, request_status_id)
VALUES
    (1, 1, 1, 1),
    (2, 2, 2, 2),
    (3, 3, 1, 3),
    (1, 4, 2, 4),
    (2, 5, 1, 1);

INSERT INTO tutor_review
    (tutor_id, tutee_id, rating_id, review_text)
VALUES
    (1, 1, 1, "very bad"),
    (2, 2, 2, "somewhat bad"),
    (3, 3, 3, "okay"),
    (4, 4, 4, "somewhat okay"),
    (5, 5, 5, "very good");



















