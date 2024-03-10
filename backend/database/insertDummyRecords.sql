INSERT INTO major
    (major_abbreviation, major_name)
VALUES
    ('csce', 'computer science'),
    ('meen', 'mechanical engineering'),
    ('ecen', 'electrical engineering'),
    ('aero', 'aerospace engineering'),
    ('cven', 'civil engineering');

INSERT INTO course
    (major_abbreviation, course_number, course_title)
VALUES
    ('csce', 121, 'introduction to program design and concepts'),
    ('csce', 221, 'data structures and algorithms'),
    ('csce', 312, 'computer organization'),
    ('csce', 313, 'introduction to computer systems'),
    ('csce', 314, 'programming languages');

INSERT INTO location
    (location_name)
VALUES
    ('in-person off-campus'),
    ('in-person on-campus'),
    ('online');

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

INSERT INTO user_active_status
    (user_active_status_name)
VALUES
    ("active"),
    ("inactive"),
    ("banned");

INSERT INTO tutor

    (first_name, last_name, major_abbreviation, seniority_name, pay_rate, bio_text, picture_url, phone_number, email, active_status_name, listing_title)
VALUES
    ('john', 'smith', 'csce', 'freshman', 10.00, 'Hi', 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e3/Branden_Loera_Headshot.jpg/394px-Branden_Loera_Headshot.jpg?20231019200804', 1234567890, 'john@gmail.com', 'active', "Math and Chem Tutor"),
    ('maria', 'garcia', 'meen', 'sophomore', 15.00, 'Hello', 'https://upload.wikimedia.org/wikipedia/commons/0/07/Avantika_Headshot.jpg', 3123456789, 'maria@gmail.com', 'active', "Science and History Tutor"),
    ('james', 'johnson', 'ecen', 'junior', 20.00, 'Greetings', 'https://upload.wikimedia.org/wikipedia/commons/d/de/Kenneth_Harris_II.jpg', 9012345678, 'james@gmail.com', 'active', "Computer Science and Statistics Tutor"),
    ('david', 'rodriquez', 'aero', 'senior', 25.00, 'Salutations', 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8a/Updated-hs-zameer-rizvi-headshot-1.jpg/510px-Updated-hs-zameer-rizvi-headshot-1.jpg?20231107221652', 8901234567, 'david@gmail.com', 'active', "English and Japanese Tutor"),
    ('mary', 'martinez', 'cven', 'freshman', 30.00, 'Howdy', 'https://upload.wikimedia.org/wikipedia/commons/7/77/Melissa_Huang_headshot.jpg', 7890123456, 'mary@gmail.com', 'active', "Music Tutor"),
    ("sophie", "dubois", 'csce', 'sophomore', 35.00, "Hello! I'm Sophie Dubois.", "https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Headshot_of_Peixuan.jpg/640px-Headshot_of_Peixuan.jpg", 1234567890, "sophie@gmail.com", 'active', "Literature Tutor"),
    ("lucas", "martin", 'meen', 'junior', 40.00, "Greetings! I'm Lucas Martin.", "https://upload.wikimedia.org/wikipedia/commons/thumb/2/28/Alan_Bates_vintage_headshot_from_%22The_Entertainer%22_%281960%29.jpg/640px-Alan_Bates_vintage_headshot_from_%22The_Entertainer%22_%281960%29.jpg", 9876543210, "lucas@gmail.com", 'active', "Computer Science Tutor"),
    ("emma", "lefevre", 'ecen', 'senior', 45.00, "Hi there! I'm Emma Lefevre.", "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7f/Sarah_Lirley_headshot.jpg/640px-Sarah_Lirley_headshot.jpg", 8765432109, "emma@gmail.com", 'active', "Biology Tutor"),
    ("nathan", "bernard", 'aero', 'freshman', 50.00, "Nice to meet you! I'm Nathan Bernard.", "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a6/William_G._Johnsson.jpg/640px-William_G._Johnsson.jpg", 7654321098, "nathan@gmail.com", 'active', "Engineering Tutor"),
    ("chloe", "girard", 'cven', 'sophomore', 55.00, "Hey everyone! I'm Chloe Girard.", "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6a/WGJ_original_editor_shot_copy.jpg/640px-WGJ_original_editor_shot_copy.jpg", 6543210987, "chloe@gmail.com", 'active', "Psychology Tutor"),
    ("louis", "moreau", 'csce', 'junior', 60.00, "Hello world! I'm Louis Moreau.", "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c0/Dr_Prash_Ladva.jpg/640px-Dr_Prash_Ladva.jpg", 5432109876, "louis@gmail.com", 'active', "Business Tutor"),
    ("lea", "rousseau", 'meen', 'senior', 65.00, "Greetings from Lea Rousseau!", "https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/Aphrodite_in-person on-campus_Primary_Headshots_%282%29.jpg/640px-Aphrodite_in-person on-campus_Primary_Headshots_%282%29.jpg", 4321098765, "lea@gmail.com", 'active', "Computer Science Tutor"),
    ("hugo", "durand", 'ecen', 'freshman', 70.00, "Hi, I'm Hugo Durand!", "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e9/Kim_Hunter_1950s_autographed_portrait_%28front%29.jpg/640px-Kim_Hunter_1950s_autographed_portrait_%28front%29.jpg", 3210987654, "hugo@gmail.com", 'active', "Biology Tutor"),
    ("manon", "laurent", 'aero', 'sophomore', 75.00, "Nice to meet you! I'm Manon Laurent.", "https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/01_RickBrennan-Headshot.jpg/640px-01_RickBrennan-Headshot.jpg", 2109876543, "manon@gmail.com", 'inactive', "Psychology Tutor"),
    ("gabriel", "simon", 'cven', 'junior', 80.00, "Hey there! I'm Gabriel Simon.", "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Pat_Rowley_Headshot_-_Dairy_Australia.jpg/640px-Pat_Rowley_Headshot_-_Dairy_Australia.jpg", 1098765432, "gabriel@gmail.com", 'banned', "Engineering Tutor");

INSERT INTO weekday
    (weekday_name)
VALUES
    ('monday'),
    ('tuesday'),
    ('wednesday'),
    ('thursday'),
    ('friday'),
    ('saturday'),
    ('sunday');

INSERT INTO tutor_time_preference
    (tutor_email, start_time, end_time, weekday_name)
VALUES
    ("john@gmail.com", '09:00:00', '12:00:00', 'monday'),
    ("john@gmail.com", '14:00:00', '18:00:00', 'tuesday'),
    ("john@gmail.com", '07:00:00', '11:00:00', 'wednesday'),
    ("john@gmail.com", '14:00:00', '16:00:00', 'thursday'),
    ("john@gmail.com", '18:00:00', '21:00:00', 'friday'),
    ("maria@gmail.com", '09:00:00', '12:00:00', 'monday'),
    ("maria@gmail.com", '14:00:00', '18:00:00', 'tuesday'),
    ("maria@gmail.com", '07:00:00', '11:00:00', 'wednesday'),
    ("maria@gmail.com", '14:00:00', '16:00:00', 'thursday'),
    ("maria@gmail.com", '18:00:00', '21:00:00', 'friday'),
    ("james@gmail.com", '09:00:00', '12:00:00', 'monday'),
    ("james@gmail.com", '14:00:00', '18:00:00', 'tuesday'),
    ("james@gmail.com", '07:00:00', '11:00:00', 'wednesday'),
    ("james@gmail.com", '14:00:00', '16:00:00', 'thursday'),
    ("james@gmail.com", '18:00:00', '21:00:00', 'friday'),
    ("david@gmail.com", '09:00:00', '12:00:00', 'monday'),
    ("david@gmail.com", '14:00:00', '18:00:00', 'tuesday'),
    ("david@gmail.com", '07:00:00', '11:00:00', 'wednesday'),
    ("david@gmail.com", '14:00:00', '16:00:00', 'thursday'),
    ("david@gmail.com", '18:00:00', '21:00:00', 'friday'),
    ("mary@gmail.com", '09:00:00', '12:00:00', 'monday'),
    ("mary@gmail.com", '14:00:00', '18:00:00', 'tuesday'),
    ("mary@gmail.com", '07:00:00', '11:00:00', 'wednesday'),
    ("mary@gmail.com", '14:00:00', '16:00:00', 'thursday'),
    ("mary@gmail.com", '18:00:00', '21:00:00', 'friday'),
    ("sophie@gmail.com", '09:00:00', '12:00:00', 'monday'),
    ("sophie@gmail.com", '14:00:00', '18:00:00', 'tuesday'),
    ("sophie@gmail.com", '07:00:00', '11:00:00', 'wednesday'),
    ("sophie@gmail.com", '14:00:00', '16:00:00', 'thursday'),
    ("sophie@gmail.com", '18:00:00', '21:00:00', 'friday'),
    ("lucas@gmail.com", '09:00:00', '12:00:00', 'monday'),
    ("lucas@gmail.com", '14:00:00', '18:00:00', 'tuesday'),
    ("lucas@gmail.com", '07:00:00', '11:00:00', 'wednesday'),
    ("lucas@gmail.com", '14:00:00', '16:00:00', 'thursday'),
    ("lucas@gmail.com", '18:00:00', '21:00:00', 'friday'),
    ("emma@gmail.com", '09:00:00', '12:00:00', 'monday'),
    ("emma@gmail.com", '14:00:00', '18:00:00', 'tuesday'),
    ("emma@gmail.com", '07:00:00', '11:00:00', 'wednesday'),
    ("emma@gmail.com", '14:00:00', '16:00:00', 'thursday'),
    ("emma@gmail.com", '18:00:00', '21:00:00', 'friday'),
    ("nathan@gmail.com", '09:00:00', '12:00:00', 'monday'),
    ("nathan@gmail.com", '14:00:00', '18:00:00', 'tuesday'),
    ("nathan@gmail.com", '07:00:00', '11:00:00', 'wednesday'),
    ("nathan@gmail.com", '14:00:00', '16:00:00', 'thursday'),
    ("nathan@gmail.com", '18:00:00', '21:00:00', 'friday'),
    ("chloe@gmail.com", '09:00:00', '12:00:00', 'monday'),
    ("chloe@gmail.com", '14:00:00', '18:00:00', 'tuesday'),
    ("chloe@gmail.com", '07:00:00', '11:00:00', 'wednesday'),
    ("chloe@gmail.com", '14:00:00', '16:00:00', 'thursday'),
    ("chloe@gmail.com", '18:00:00', '21:00:00', 'friday'),
    ("louis@gmail.com", '09:00:00', '12:00:00', 'monday'),
    ("louis@gmail.com", '14:00:00', '18:00:00', 'tuesday'),
    ("louis@gmail.com", '07:00:00', '11:00:00', 'wednesday'),
    ("louis@gmail.com", '14:00:00', '16:00:00', 'thursday'),
    ("louis@gmail.com", '18:00:00', '21:00:00', 'friday'),
    ("lea@gmail.com", '09:00:00', '12:00:00', 'monday'),
    ("lea@gmail.com", '14:00:00', '18:00:00', 'tuesday'),
    ("lea@gmail.com", '07:00:00', '11:00:00', 'wednesday'),
    ("lea@gmail.com", '14:00:00', '16:00:00', 'thursday'),
    ("lea@gmail.com", '18:00:00', '21:00:00', 'friday'),
    ("hugo@gmail.com", '09:00:00', '12:00:00', 'monday'),
    ("hugo@gmail.com", '14:00:00', '18:00:00', 'tuesday'),
    ("hugo@gmail.com", '07:00:00', '11:00:00', 'wednesday'),
    ("hugo@gmail.com", '14:00:00', '16:00:00', 'thursday'),
    ("hugo@gmail.com", '18:00:00', '21:00:00', 'friday'),
    ("manon@gmail.com", '09:00:00', '12:00:00', 'monday'),
    ("manon@gmail.com", '14:00:00', '18:00:00', 'tuesday'),
    ("manon@gmail.com", '07:00:00', '11:00:00', 'wednesday'),
    ("manon@gmail.com", '14:00:00', '16:00:00', 'thursday'),
    ("manon@gmail.com", '18:00:00', '21:00:00', 'friday'),
    ("gabriel@gmail.com", '09:00:00', '12:00:00', 'monday'),
    ("gabriel@gmail.com", '14:00:00', '18:00:00', 'tuesday'),
    ("gabriel@gmail.com", '07:00:00', '11:00:00', 'wednesday'),
    ("gabriel@gmail.com", '14:00:00', '16:00:00', 'thursday'),
    ("gabriel@gmail.com", '18:00:00', '21:00:00', 'friday');

INSERT INTO tutor_eligible_course
    (tutor_email, major_abbreviation, course_number, course_grade)
VALUES
    ("john@gmail.com", 'csce', 121, 'a'),
    ("john@gmail.com", 'csce', 221, 'b'),
    ("john@gmail.com", 'csce', 312, 'a'),
    ("john@gmail.com", 'csce', 313, 'b'),
    ("john@gmail.com", 'csce', 314, 'a'),
    ("maria@gmail.com", 'csce', 121, 'a'),
    ("maria@gmail.com", 'csce', 221, 'b'),
    ("maria@gmail.com", 'csce', 312, 'a'),
    ("maria@gmail.com", 'csce', 313, 'b'),
    ("maria@gmail.com", 'csce', 314, 'a'),
    ("james@gmail.com", 'csce', 121, 'a'),
    ("james@gmail.com", 'csce', 221, 'b'),
    ("james@gmail.com", 'csce', 312, 'a'),
    ("james@gmail.com", 'csce', 313, 'b'),
    ("james@gmail.com", 'csce', 314, 'a'),
    ("david@gmail.com", 'csce', 121, 'a'),
    ("david@gmail.com", 'csce', 221, 'b'),
    ("david@gmail.com", 'csce', 312, 'a'),
    ("david@gmail.com", 'csce', 313, 'b'),
    ("david@gmail.com", 'csce', 314, 'a'),
    ("mary@gmail.com", 'csce', 121, 'a'),
    ("mary@gmail.com", 'csce', 221, 'b'),
    ("mary@gmail.com", 'csce', 312, 'a'),
    ("mary@gmail.com", 'csce', 313, 'b'),
    ("mary@gmail.com", 'csce', 314, 'a'),
    ("sophie@gmail.com", 'csce', 121, 'a'),
    ("sophie@gmail.com", 'csce', 221, 'b'),
    ("sophie@gmail.com", 'csce', 312, 'a'),
    ("sophie@gmail.com", 'csce', 313, 'b'),
    ("sophie@gmail.com", 'csce', 314, 'a'),
    ("lucas@gmail.com", 'csce', 121, 'a'),
    ("lucas@gmail.com", 'csce', 221, 'b'),
    ("lucas@gmail.com", 'csce', 312, 'a'),
    ("lucas@gmail.com", 'csce', 313, 'b'),
    ("lucas@gmail.com", 'csce', 314, 'a'),
    ("emma@gmail.com", 'csce', 121, 'a'),
    ("emma@gmail.com", 'csce', 221, 'b'),
    ("emma@gmail.com", 'csce', 312, 'a'),
    ("emma@gmail.com", 'csce', 313, 'b'),
    ("emma@gmail.com", 'csce', 314, 'a'),
    ("nathan@gmail.com", 'csce', 121, 'a'),
    ("nathan@gmail.com", 'csce', 221, 'b'),
    ("nathan@gmail.com", 'csce', 312, 'a'),
    ("nathan@gmail.com", 'csce', 313, 'b'),
    ("nathan@gmail.com", 'csce', 314, 'a'),
    ("chloe@gmail.com", 'csce', 121, 'a'),
    ("chloe@gmail.com", 'csce', 221, 'b'),
    ("chloe@gmail.com", 'csce', 312, 'a'),
    ("chloe@gmail.com", 'csce', 313, 'b'),
    ("chloe@gmail.com", 'csce', 314, 'a'),
    ("louis@gmail.com", 'csce', 121, 'a'),
    ("louis@gmail.com", 'csce', 221, 'b'),
    ("louis@gmail.com", 'csce', 312, 'a'),
    ("louis@gmail.com", 'csce', 313, 'b'),
    ("louis@gmail.com", 'csce', 314, 'a'),
    ("lea@gmail.com", 'csce', 121, 'a'),
    ("lea@gmail.com", 'csce', 221, 'b'),
    ("lea@gmail.com", 'csce', 312, 'a'),
    ("lea@gmail.com", 'csce', 313, 'b'),
    ("lea@gmail.com", 'csce', 314, 'a'),
    ("hugo@gmail.com", 'csce', 121, 'a'),
    ("hugo@gmail.com", 'csce', 221, 'b'),
    ("hugo@gmail.com", 'csce', 312, 'a'),
    ("hugo@gmail.com", 'csce', 313, 'b'),
    ("hugo@gmail.com", 'csce', 314, 'a'),
    ("manon@gmail.com", 'csce', 121, 'a'),
    ("manon@gmail.com", 'csce', 221, 'b'),
    ("manon@gmail.com", 'csce', 312, 'a'),
    ("manon@gmail.com", 'csce', 313, 'b'),
    ("manon@gmail.com", 'csce', 314, 'a'),
    ("gabriel@gmail.com", 'csce', 121, 'a'),
    ("gabriel@gmail.com", 'csce', 221, 'b'),
    ("gabriel@gmail.com", 'csce', 312, 'a'),
    ("gabriel@gmail.com", 'csce', 313, 'b'),
    ("gabriel@gmail.com"    , 'csce', 314, 'a');

INSERT INTO tutor_course_preference
    (tutor_email, major_abbreviation, course_number, course_grade)
SELECT 
    tutor_email, 
    major_abbreviation, 
    course_number, 
    course_grade
FROM
    tutor_eligible_course;


INSERT INTO tutor_location_preference
    (tutor_email, location_name)
VALUES
    ("john@gmail.com", 'in-person off-campus'),
    ("john@gmail.com", 'in-person on-campus'),
    ("maria@gmail.com", 'in-person off-campus'),
    ("maria@gmail.com", 'in-person on-campus'),
    ("james@gmail.com", 'in-person off-campus'),
    ("james@gmail.com", 'in-person on-campus'),
    ("david@gmail.com", 'in-person off-campus'),
    ("david@gmail.com", 'in-person on-campus'),
    ("mary@gmail.com", 'in-person off-campus'),
    ("mary@gmail.com", 'in-person on-campus'),
    ("sophie@gmail.com", 'in-person off-campus'),
    ("sophie@gmail.com", 'online'),
    ("lucas@gmail.com", 'in-person off-campus'),
    ("lucas@gmail.com", 'online'),
    ("emma@gmail.com", 'in-person off-campus'),
    ("emma@gmail.com", 'online'),
    ("nathan@gmail.com", 'in-person off-campus'),
    ("nathan@gmail.com", 'online'),
    ("chloe@gmail.com", 'in-person off-campus'),
    ("chloe@gmail.com", 'online'),
    ("louis@gmail.com", 'in-person on-campus'),
    ("louis@gmail.com", 'online'),
    ("lea@gmail.com", 'in-person on-campus'),
    ("lea@gmail.com", 'online'),
    ("hugo@gmail.com", 'in-person on-campus'),
    ("hugo@gmail.com", 'online'),
    ("manon@gmail.com", 'in-person on-campus'),
    ("manon@gmail.com", 'online'),
    ("gabriel@gmail.com", 'in-person on-campus'),
    ("gabriel@gmail.com", 'online');

INSERT INTO tutee
    (first_name, last_name, major_abbreviation, seniority_name, phone_number, email, active_status_name)
VALUES
    ('amber', 'awesome', 'csce', 'freshman', 1111111111, 'amber@gmail.com', 'active'),
    ('bobby', 'bold', 'meen', 'sophomore', 2222222222, 'bobby@gmail.com', 'active'),
    ('calvin', 'cool', 'ecen', 'junior', 3333333333, 'calvin@gmail.com', 'active'),
    ('denise', 'dangerous', 'aero', 'senior', 4444444444, 'denise@gmail.com', 'active'),
    ('edgar', 'excellent', 'cven', 'freshman', 5555555555, 'edgar@gmail.com', 'active'),
    ('sophia', 'dupont', 'csce', 'freshman', 9876543210, 'sophia@gmail.com', 'active'),
    ('liam', 'garcia', 'meen', 'sophomore', 8765432109, 'liam@gmail.com', 'active'),
    ('olivia', 'lopez', 'ecen', 'junior', 7654321098, 'olivia@gmail.com', 'active'),
    ('noah', 'martinez', 'aero', 'senior', 6543210987, 'noah@gmail.com', 'active'),
    ('ava', 'hernandez', 'cven', 'freshman', 5432109876, 'ava@gmail.com', 'active'),
    ('william', 'young', 'csce', 'freshman', 4321098765, 'william@gmail.com', 'active'),
    ('isabella', 'lee', 'meen', 'sophomore', 3210987654, 'isabella@gmail.com', 'active'),
    ('james', 'nguyen', 'ecen', 'junior', 2109876543, 'james@gmail.com', 'active'),
    ('emma', 'kim', 'aero', 'senior', 1098765432, 'emma@gmail.com', 'inactive'),
    ('benjamin', 'patel', 'cven', 'freshman', 8901234567, 'benjamin@gmail.com', 'banned');

INSERT INTO appointment_size
    (appointment_size_name)
VALUES
    ('single'),
    ('group');

INSERT INTO appointment
    (appointment_size_name, tutee_email, tutor_email, appointment_date, start_time, end_time, location_name)
VALUES
    ('single', 'amber@gmail.com', 'john@gmail.com', '2024-03-01', '13:00:00', '14:00:00', 'in-person off-campus'),
    ('single', 'bobby@gmail.com', 'maria@gmail.com', '2024-03-02', '08:00:00', '09:00:00', 'in-person on-campus'),
    ('single', 'calvin@gmail.com', 'james@gmail.com', '2024-03-03', '22:00:00', '23:00:00', 'online'),
    ('single', 'denise@gmail.com', 'david@gmail.com', '2024-03-04', '13:00:00', '14:00:00', 'in-person off-campus'),
    ('single', 'edgar@gmail.com', 'mary@gmail.com', '2024-03-05', '08:00:00', '09:00:00', 'in-person on-campus'),
    ('single', 'sophia@gmail.com', 'sophie@gmail.com', '2024-03-02', '22:00:00', '23:00:00', 'online'),
    ('single', 'liam@gmail.com', 'lucas@gmail.com', '2024-03-03', '13:00:00', '14:00:00', 'in-person off-campus'),
    ('single', 'olivia@gmail.com', 'emma@gmail.com', '2024-03-04', '08:00:00', '09:00:00', 'in-person on-campus'),
    ('single', 'noah@gmail.com', 'nathan@gmail.com', '2024-03-05', '22:00:00', '23:00:00', 'online'),
    ('single', 'ava@gmail.com', 'chloe@gmail.com', '2024-03-06', '13:00:00', '14:00:00', 'in-person off-campus'),
    ('single', 'william@gmail.com', 'louis@gmail.com', '2024-03-07', '08:00:00', '09:00:00', 'in-person on-campus'),
    ('single', 'isabella@gmail.com', 'lea@gmail.com', '2024-03-08', '22:00:00', '23:00:00', 'online'),
    ('single', 'james@gmail.com', 'hugo@gmail.com', '2024-03-09', '13:00:00', '14:00:00', 'in-person off-campus'),
    ('single', 'emma@gmail.com', 'manon@gmail.com', '2024-03-10', '08:00:00', '09:00:00', 'in-person on-campus'),
    ('single', 'emma@gmail.com', 'gabriel@gmail.com', '2024-03-11', '22:00:00', '23:00:00', 'online'),
    ('single', 'benjamin@gmail.com', 'gabriel@gmail.com', '2024-03-12', '22:00:00', '23:00:00', 'online');



INSERT INTO tutor_review
    (appointment_id, tutee_email, tutor_email, number_stars, review_text)
VALUES
    (1, 'amber@gmail.com', 'john@gmail.com', 1, "very bad"),
    (2, 'bobby@gmail.com', 'maria@gmail.com', 2, "somewhat bad"),
    (3, 'calvin@gmail.com', 'james@gmail.com', 3, "okay"),
    (4, 'denise@gmail.com', 'david@gmail.com', 4, "somewhat okay"),
    (5, 'edgar@gmail.com', 'mary@gmail.com', 5, "very good"),
    (6, 'sophia@gmail.com', 'sophie@gmail.com', 4, "Great tutor, highly recommend!"),
    (7, 'liam@gmail.com', 'lucas@gmail.com', 5, "Excellent session, very informative."),
    (8, 'olivia@gmail.com', 'emma@gmail.com', 3, "Good tutor, helpful explanations."),
    (9, 'noah@gmail.com', 'nathan@gmail.com', 2, "Average tutoring, could improve."),
    (10, 'ava@gmail.com', 'chloe@gmail.com', 5, "Fantastic tutor, exceeded expectations."),
    (11, 'william@gmail.com', 'louis@gmail.com', 4, "Really helpful, clarified difficult concepts."),
    (12, 'isabella@gmail.com', 'lea@gmail.com', 1, "Poor tutoring, not recommended."),
    (13, 'james@gmail.com', 'hugo@gmail.com', 3, "Decent tutor, could be more engaging."),
    (14, 'emma@gmail.com', 'manon@gmail.com', 5, "Outstanding tutor, best experience!"),
    (15, 'emma@gmail.com', 'gabriel@gmail.com', 1, "Horrible!"),
    (16, 'benjamin@gmail.com', 'gabriel@gmail.com', 4, "Very satisfied, would book again.");


    



















