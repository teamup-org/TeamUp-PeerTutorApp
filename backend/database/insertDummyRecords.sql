INSERT INTO major
    (major_name, major_abbreviation)
VALUES
    ('computer science', 'csce'),
    ('mechanical engineering', 'meen'),
    ('electrical engineering', 'ecen'),
    ('aerospace engineering', 'aero'),
    ('civil engineering', 'cven');

INSERT INTO course
    (course_title, major_abbreviation, course_number)
VALUES
    ('introduction to program design and concepts', 'csce', 121),
    ('data structures and algorithms', 'csce', 221),
    ('computer organization', 'csce', 312),
    ('introduction to computer systems', 'csce', 313),
    ('programming languages', 'csce', 314);

INSERT INTO location
    (location_name)
VALUES
    ('business library & collaboration commons'),
    ('evans'),
    ('annex'),
    ('cushing memorial library & archives'),
    ('medical sciences library'),
    ('zachary'),
    ('msc'),
    ('ilcb'),
    ("academic building"),
    ("all saints"),
    ("quadbucks"),
    ("hullabaloo hall"),
    ("sbisa"),
    ("blocker"),
    ("online");



INSERT INTO rating
    (number_stars)
VALUES
    (1),
    (2),
    (3),
    (4),
    (5);

INSERT INTO seniority
    (seniority_name)
VALUES
    ('freshman'),
    ('sophomore'),
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
    (112345678, 'edgar', 'excellent', 5, 5, 5555555555, 'edgar@gmail.com'),
    (234567891, 'sophia', 'dupont', 3, 4, 9876543210, 'sophia@gmail.com'),
    (345678902, 'liam', 'garcia', 2, 5, 8765432109, 'liam@gmail.com'),
    (456789013, 'olivia', 'lopez', 4, 1, 7654321098, 'olivia@gmail.com'),
    (567890124, 'noah', 'martinez', 1, 2, 6543210987, 'noah@gmail.com'),
    (678901235, 'ava', 'hernandez', 5, 3, 5432109876, 'ava@gmail.com'),
    (789012346, 'william', 'young', 3, 1, 4321098765, 'william@gmail.com'),
    (890123457, 'isabella', 'lee', 1, 4, 3210987654, 'isabella@gmail.com'),
    (901234568, 'james', 'nguyen', 4, 5, 2109876543, 'james@gmail.com'),
    (123456779, 'emma', 'kim', 2, 3, 1098765432, 'emma@gmail.com'),
    (123456780, 'benjamin', 'patel', 5, 2, 8901234567, 'benjamin@gmail.com');


INSERT INTO active_status
    (active_status_name)
VALUES
    ("active"),
    ("inactive");

INSERT INTO tutor
    (uin, first_name, last_name, major_id, seniority_id, pay_rate, bio_text, picture_url, phone_number, email, active_status_id, listing_title)
VALUES
    (123456789, 'john', 'smith', 1, 1, 10.00, 'Hi', 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e3/Branden_Loera_Headshot.jpg/394px-Branden_Loera_Headshot.jpg?20231019200804', 1234567890, 'john@gmail.com', 1, "Math and Chem Tutor"),
    (234567891, 'maria', 'garcia', 2, 2, 15.00, 'Hello', 'https://upload.wikimedia.org/wikipedia/commons/0/07/Avantika_Headshot.jpg', 3123456789, 'maria@gmail.com', 2, "Science and History Tutor"),
    (345678912, 'james', 'johnson', 3, 3, 20.00, 'Greetings', 'https://upload.wikimedia.org/wikipedia/commons/d/de/Kenneth_Harris_II.jpg', 9012345678, 'james@gmail.com', 1, "Computer Science and Statistics Tutor"),
    (456789123, 'david', 'rodriquez', 4, 4, 25.00, 'Salutations', 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8a/Updated-hs-zameer-rizvi-headshot-1.jpg/510px-Updated-hs-zameer-rizvi-headshot-1.jpg?20231107221652', 8901234567, 'david@gmail.com', 2, "English and Japanese Tutor"),
    (567891234, 'mary', 'martinez', 5, 5, 30.00, 'Howdy', 'https://upload.wikimedia.org/wikipedia/commons/7/77/Melissa_Huang_headshot.jpg', 7890123456, 'mary@gmail.com', 1, "Music Tutor"),
    (123456781, "sophie", "dubois", 3, 2, 45.50, "Hello! I'm Sophie Dubois.", "https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Headshot_of_Peixuan.jpg/640px-Headshot_of_Peixuan.jpg", 1234567890, "sophie@gmail.com", 1, "Literature Tutor"),
    (234567892, "lucas", "martin", 1, 3, 33.25, "Greetings! I'm Lucas Martin.", "https://upload.wikimedia.org/wikipedia/commons/thumb/2/28/Alan_Bates_vintage_headshot_from_%22The_Entertainer%22_%281960%29.jpg/640px-Alan_Bates_vintage_headshot_from_%22The_Entertainer%22_%281960%29.jpg", 9876543210, "lucas@gmail.com", 2, "Computer Science Tutor"),
    (345678903, "emma", "lefevre", 2, 1, 20.75, "Hi there! I'm Emma Lefevre.", "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7f/Sarah_Lirley_headshot.jpg/640px-Sarah_Lirley_headshot.jpg", 8765432109, "emma@gmail.com", 1, "Biology Tutor"),
    (456789014, "nathan", "bernard", 5, 4, 70.00, "Nice to meet you! I'm Nathan Bernard.", "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a6/William_G._Johnsson.jpg/640px-William_G._Johnsson.jpg", 7654321098, "nathan@gmail.com", 2, "Engineering Tutor"),
    (567890125, "chloe", "girard", 4, 2, 52.80, "Hey everyone! I'm Chloe Girard.", "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6a/WGJ_original_editor_shot_copy.jpg/640px-WGJ_original_editor_shot_copy.jpg", 6543210987, "chloe@gmail.com", 1, "Psychology Tutor"),
    (678901236, "louis", "moreau", 3, 5, 80.00, "Hello world! I'm Louis Moreau.", "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c0/Dr_Prash_Ladva.jpg/640px-Dr_Prash_Ladva.jpg", 5432109876, "louis@gmail.com", 2, "Business Tutor"),
    (789012347, "lea", "rousseau", 1, 3, 38.90, "Greetings from Lea Rousseau!", "https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/Aphrodite_Evans_Primary_Headshots_%282%29.jpg/640px-Aphrodite_Evans_Primary_Headshots_%282%29.jpg", 4321098765, "lea@gmail.com", 1, "Computer Science Tutor"),
    (890123458, "hugo", "durand", 2, 2, 25.50, "Hi, I'm Hugo Durand!", "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e9/Kim_Hunter_1950s_autographed_portrait_%28front%29.jpg/640px-Kim_Hunter_1950s_autographed_portrait_%28front%29.jpg", 3210987654, "hugo@gmail.com", 2, "Biology Tutor"),
    (901234569, "manon", "laurent", 4, 1, 15.75, "Nice to meet you! I'm Manon Laurent.", "https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/01_RickBrennan-Headshot.jpg/640px-01_RickBrennan-Headshot.jpg", 2109876543, "manon@gmail.com", 1, "Psychology Tutor"),
    (212345670, "gabriel", "simon", 5, 4, 88.25, "Hey there! I'm Gabriel Simon.", "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Pat_Rowley_Headshot_-_Dairy_Australia.jpg/640px-Pat_Rowley_Headshot_-_Dairy_Australia.jpg", 1098765432, "gabriel@gmail.com", 2, "Engineering Tutor");


INSERT INTO tutor_location_preference
    (tutor_id, location_id)
VALUES
    (1, 1),
    (2, 2),
    (3, 3),
    (4, 4),
    (5, 5),
    (6, 6),
    (7, 7),
    (8, 8),
    (9, 9),
    (10, 10),
    (11, 11),
    (12, 12),
    (13, 13),
    (14, 14),
    (15, 15);



INSERT INTO tutor_eligible_course
    (tutor_id, course_id, course_grade)
VALUES
    (1, 1, 'a'),
    (2, 2, 'b'),
    (3, 3, 'c'),
    (4, 4, 'd'),
    (5, 5, 'f'),
    (6, 1, "a"),
    (7, 2, "b"),
    (8, 3, "c"),
    (9, 4, "d"),
    (10, 5, "f"),
    (11, 1, "a"),
    (12, 2, "b"),
    (13, 3, "c"),
    (14, 4, "d"),
    (15, 5, "f");

    
INSERT INTO tutor_course_preference
    (tutor_id, eligibility_id)
VALUES
    (1, 1),
    (2, 2),
    (3, 3),
    (4, 4),
    (5, 5),
    (6, 6),
    (7, 7),
    (8, 8),
    (9, 9),
    (10, 10),
    (11, 11),
    (12, 12),
    (13, 13),
    (14, 14),
    (15, 15);


INSERT INTO time_increment
    (time_value)
VALUES
    ('00:00:00'),
    ('00:15:00'),
    ('00:30:00'),
    ('00:45:00'),
    ('01:00:00'),
    ('01:15:00'),
    ('01:30:00'),
    ('01:45:00'),
    ('02:00:00'),
    ('02:15:00'),
    ('02:30:00'),
    ('02:45:00'),
    ('03:00:00'),
    ('03:15:00'),
    ('03:30:00'),
    ('03:45:00'),
    ('04:00:00'),
    ('04:15:00'),
    ('04:30:00'),
    ('04:45:00'),
    ('05:00:00'),
    ('05:15:00'),
    ('05:30:00'),
    ('05:45:00'),
    ('06:00:00'),
    ('06:15:00'),
    ('06:30:00'),
    ('06:45:00'),
    ('07:00:00'),
    ('07:15:00'),
    ('07:30:00'),
    ('07:45:00'),
    ('08:00:00'),
    ('08:15:00'),
    ('08:30:00'),
    ('08:45:00'),
    ('09:00:00'),
    ('09:15:00'),
    ('09:30:00'),
    ('09:45:00'),
    ('10:00:00'),
    ('10:15:00'),
    ('10:30:00'),
    ('10:45:00'),
    ('11:00:00'),
    ('11:15:00'),
    ('11:30:00'),
    ('11:45:00'),
    ('12:00:00'),
    ('12:15:00'),
    ('12:30:00'),
    ('12:45:00'),
    ('13:00:00'),
    ('13:15:00'),
    ('13:30:00'),
    ('13:45:00'),
    ('14:00:00'),
    ('14:15:00'),
    ('14:30:00'),
    ('14:45:00'),
    ('15:00:00'),
    ('15:15:00'),
    ('15:30:00'),
    ('15:45:00'),
    ('16:00:00'),
    ('16:15:00'),
    ('16:30:00'),
    ('16:45:00'),
    ('17:00:00'),
    ('17:15:00'),
    ('17:30:00'),
    ('17:45:00'),
    ('18:00:00'),
    ('18:15:00'),
    ('18:30:00'),
    ('18:45:00'),
    ('19:00:00'),
    ('19:15:00'),
    ('19:30:00'),
    ('19:45:00'),
    ('20:00:00'),
    ('21:00:00'),
    ('21:15:00'),
    ('21:30:00'),
    ('21:45:00'),
    ('22:00:00'),
    ('22:15:00'),
    ('22:30:00'),
    ('22:45:00'),
    ('23:00:00'),
    ('23:15:00'),
    ('23:30:00'),
    ('23:45:00');

INSERT INTO tutor_time_preference
    (tutor_id, start_time_id, end_time_id)
VALUES
    (1, 1, 2),
    (2, 1, 3),
    (3, 1, 4),
    (4, 1, 5),
    (5, 2, 3),
    (6, 1, 8),
    (7, 10, 20),
    (8, 25, 35),
    (9, 45, 60),
    (10, 20, 40),
    (11, 5, 30),
    (12, 15, 45),
    (13, 2, 18),
    (14, 12, 28),
    (15, 38, 52);


INSERT INTO request_type
    (request_type_name)
VALUES
    ('request appointment'),
    ('cancel appointment'),
    ('reschedule appointment');

INSERT INTO request_status
    (request_status_name)
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
    (appointment_status_name)
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
    (1, 5, 5, '2024-03-05', 2, 3, 5, 2),
    (1, 6, 6, '2024-03-02', 1, 8, 6, 1),
    (2, 7, 7, '2024-03-03', 10, 20, 7, 2),
    (1, 8, 8, '2024-03-04', 25, 35, 8, 3),
    (2, 9, 9, '2024-03-05', 45, 60, 9, 1),
    (1, 10, 10, '2024-03-06', 20, 40, 10, 2),
    (2, 11, 11, '2024-03-07', 5, 30, 11, 3),
    (1, 12, 12, '2024-03-08', 15, 45, 12, 1),
    (2, 13, 13, '2024-03-09', 2, 18, 13, 2),
    (1, 14, 14, '2024-03-10', 12, 28, 14, 3),
    (2, 15, 15, '2024-03-11', 38, 52, 15, 1);



INSERT INTO appointment_request
    (request_type_id, appointment_id, initiator_type_id, request_status_id)
VALUES
    (1, 1, 1, 1),
    (2, 2, 2, 2),
    (3, 3, 1, 3),
    (1, 4, 2, 4),
    (2, 5, 1, 1),
    (1, 6, 1, 1),
    (2, 7, 2, 2),
    (3, 8, 1, 3),
    (1, 9, 2, 4),
    (2, 10, 1, 1),
    (3, 11, 2, 2),
    (1, 12, 1, 3),
    (2, 13, 2, 4),
    (3, 14, 1, 1),
    (1, 15, 2, 2);


INSERT INTO tutor_review
    (tutor_id, tutee_id, rating_id, review_text)
VALUES
    (1, 1, 1, "very bad"),
    (2, 2, 2, "somewhat bad"),
    (3, 3, 3, "okay"),
    (4, 4, 4, "somewhat okay"),
    (5, 5, 5, "very good"),
    (1, 2, 2, "somewhat bad"),
    (6, 7, 4, "Great tutor, highly recommend!"),
    (7, 8, 5, "Excellent session, very informative."),
    (8, 9, 3, "Good tutor, helpful explanations."),
    (9, 10, 2, "Average tutoring, could improve."),
    (10, 11, 5, "Fantastic tutor, exceeded expectations."),
    (11, 12, 4, "Really helpful, clarified difficult concepts."),
    (12, 13, 1, "Poor tutoring, not recommended."),
    (13, 14, 3, "Decent tutor, could be more engaging."),
    (14, 15, 5, "Outstanding tutor, best experience!"),
    (15, 6, 4, "Very satisfied, would book again.");

    



















