DROP TABLE `capstone`.`appointment`, `capstone`.`appointment_size`, `capstone`.`course`, `capstone`.`location`, `capstone`.`major`, `capstone`.`rating`, `capstone`.`seniority`, `capstone`.`tutee`, `capstone`.`tutor`, `capstone`.`tutor_course_preference`, `capstone`.`tutor_eligible_course`, `capstone`.`tutor_location_preference`, `capstone`.`tutor_review`, `capstone`.`tutor_time_preference`, `capstone`.`user_active_status`, `capstone`.`weekday`;
DROP VIEW `capstone`.`tutor_average_rating`;

CREATE TABLE major (
	major_abbreviation CHAR(4) NOT NULL,
	major_name VARCHAR(100) NOT NULL,
	PRIMARY KEY (major_abbreviation),
	UNIQUE (major_name)
);

CREATE TABLE course (
	course_number INTEGER NOT NULL,
	course_title VARCHAR(100) NOT NULL,
	major_abbreviation CHAR(4) NOT NUll,
	PRIMARY KEY (major_abbreviation, course_number),
	FOREIGN KEY (major_abbreviation) REFERENCES major(major_abbreviation) ON UPDATE CASCADE ON DELETE CASCADE,
	CHECK (course_number BETWEEN 100 AND 800)
);

CREATE TABLE location (
	location_name VARCHAR(100) NOT NULL,
	PRIMARY KEY (location_name)
);

CREATE TABLE rating (
	number_stars INTEGER NOT NULL,
	PRIMARY KEY (number_stars),
	CHECK (number_stars BETWEEN 1 AND 5)
);

CREATE TABLE seniority (
	seniority_name VARCHAR(25) NOT NULL,
	PRIMARY KEY (seniority_name)
);

CREATE TABLE user_active_status (
	user_active_status_name VARCHAR(20) NOT NULL,
	PRIMARY KEY (user_active_status_name)
);

CREATE TABLE tutor (
	bio_text VARCHAR(1000),
	email VARCHAR(30) NOT NULL,
	first_name VARCHAR(20) NOT NULL,
	last_name VARCHAR(20) NOT NULL,
	pay_rate DECIMAL (6, 2) NOT NULL,
	phone_number BIGINT NOT NULL,
	picture_url VARCHAR(2000),
	seniority_name VARCHAR(25) NOT NULL,
    active_status_name VARCHAR(20) NOT NULL,
    listing_title VARCHAR(100),
    major_abbreviation CHAR(4) NOT NULL,
	PRIMARY KEY (email),
	FOREIGN KEY (major_abbreviation) REFERENCES major(major_abbreviation) ON UPDATE CASCADE ON DELETE CASCADE,
	FOREIGN KEY (seniority_name) REFERENCES seniority(seniority_name) ON UPDATE CASCADE ON DELETE CASCADE,
	FOREIGN KEY (active_status_name) REFERENCES user_active_status(user_active_status_name) ON UPDATE CASCADE ON DELETE CASCADE,
	CHECK (phone_number BETWEEN 1000000000 AND 9999999999),
	CHECK (email LIKE '_%@_%._%')
);

CREATE TABLE weekday (
	weekday_name VARCHAR(15) NOT NULL,
	PRIMARY KEY (weekday_name)
);

CREATE TABLE tutor_time_preference (
	end_time TIME NOT NULL,
	start_time TIME NOT NULL,
	tutor_email VARCHAR(30) NOT NULL,
	weekday_name VARCHAR(15) NOT NULL,
	PRIMARY KEY (tutor_email, weekday_name, start_time, end_time),
	FOREIGN KEY (tutor_email) REFERENCES tutor(email) ON UPDATE CASCADE ON DELETE CASCADE,
	FOREIGN KEY (weekday_name) REFERENCES weekday(weekday_name) ON UPDATE CASCADE ON DELETE CASCADE,
	CHECK (MOD(MINUTE(start_time), 15) = 0),
	CHECK (MOD(MINUTE(end_time), 15) = 0),
	CHECK (end_time > start_time)
);

CREATE TABLE tutor_eligible_course (
	course_grade CHAR(1) NOT NULL,
	course_number INTEGER NOT NULL,
	tutor_email VARCHAR(30) NOT NULL,
    major_abbreviation CHAR(4) NOT NUll,
	PRIMARY KEY (tutor_email, major_abbreviation, course_number),
	FOREIGN KEY (tutor_email) REFERENCES tutor(email) ON UPDATE CASCADE ON DELETE CASCADE,
	FOREIGN KEY (major_abbreviation, course_number) REFERENCES course(major_abbreviation, course_number) ON UPDATE CASCADE ON DELETE CASCADE,
	UNIQUE (tutor_email, major_abbreviation, course_number, course_grade),
    CHECK (course_grade in ('a', 'b', 'c', 'd', 'f', 'w', 'q', 's', '*', 'A', 'B', 'C', 'D', 'F', 'W', 'Q', 'S'))
);

CREATE TABLE tutor_course_preference (
	course_grade CHAR(1) NOT NULL,
	course_number INTEGER NOT NULL,
	tutor_email VARCHAR(30) NOT NULL,
    major_abbreviation CHAR(4) NOT NUll,
	PRIMARY KEY (tutor_email, major_abbreviation, course_number),
	FOREIGN KEY (tutor_email, major_abbreviation, course_number, course_grade) REFERENCES tutor_eligible_course(tutor_email, major_abbreviation, course_number, course_grade) ON UPDATE CASCADE ON DELETE CASCADE
);

CREATE TABLE tutor_location_preference (
	location_name VARCHAR(100) NOT NULL,
	tutor_email VARCHAR(30) NOT NULL,
	PRIMARY KEY (tutor_email, location_name),
	FOREIGN KEY (tutor_email) REFERENCES tutor(email) ON UPDATE CASCADE ON DELETE CASCADE,
	FOREIGN KEY (location_name) REFERENCES location(location_name) ON UPDATE CASCADE ON DELETE CASCADE
);

CREATE TABLE tutee (
	email VARCHAR(30) NOT NULL,
	first_name VARCHAR(20) NOT NULL,
	last_name VARCHAR(20) NOT NULL,
    active_status_name VARCHAR(20) NOT NULL,
    major_abbreviation CHAR(4) NOT NULL,
    phone_number BIGINT NOT NULL,
    seniority_name VARCHAR(25) NOT NULL,
	PRIMARY KEY (email),
	FOREIGN KEY (major_abbreviation) REFERENCES major(major_abbreviation) ON UPDATE CASCADE ON DELETE CASCADE,
	FOREIGN KEY (seniority_name) REFERENCES seniority(seniority_name) ON UPDATE CASCADE ON DELETE CASCADE,
	FOREIGN KEY (active_status_name) REFERENCES user_active_status(user_active_status_name) ON UPDATE CASCADE ON DELETE CASCADE,
	CHECK (phone_number BETWEEN 1000000000 AND 9999999999),
	CHECK (email LIKE '_%@_%._%')
);

CREATE TABLE appointment_size (
	appointment_size_name VARCHAR(50) NOT NULL,
	PRIMARY KEY (appointment_size_name)
);

CREATE TABLE appointment (
	appointment_date DATE NOT NULL,
	appointment_id INTEGER NOT NULL AUTO_INCREMENT,
	end_time TIME NOT NULL,
	start_time TIME NOT NULL,
	tutee_email VARCHAR(30) NOT NULL,
	tutor_email VARCHAR(30) NOT NULL,
	appointment_size_name VARCHAR(50) NOT NULL,
    location_name VARCHAR(100) NOT NULL,
    is_cancelled BOOLEAN NOT NULL DEFAULT FALSE,
    cancellation_reason VARCHAR(1000),
	PRIMARY KEY (appointment_id),
	FOREIGN KEY (tutor_email) REFERENCES tutor(email) ON UPDATE CASCADE ON DELETE CASCADE,
	FOREIGN KEY (tutee_email) REFERENCES tutee(email) ON UPDATE CASCADE ON DELETE CASCADE,
	FOREIGN KEY (location_name) REFERENCES location(location_name) ON UPDATE CASCADE ON DELETE CASCADE,
	FOREIGN KEY (appointment_size_name) REFERENCES appointment_size(appointment_size_name) ON UPDATE CASCADE ON DELETE CASCADE,
    UNIQUE (appointment_id, tutor_email, tutee_email),
	CHECK (MOD(MINUTE(start_time), 15) = 0),
	CHECK (MOD(MINUTE(end_time), 15) = 0),
	CHECK (end_time > start_time)
);

CREATE TABLE tutor_review (
	appointment_id INTEGER NOT NULL,
	review_text VARCHAR(1000),
	tutor_email VARCHAR(30) NOT NULL,
    number_stars INTEGER NOT NULL,
    tutee_email VARCHAR(30) NOT NULL,
	PRIMARY KEY (appointment_id),
	FOREIGN KEY (appointment_id, tutor_email, tutee_email) REFERENCES appointment(appointment_id, tutor_email, tutee_email) ON UPDATE CASCADE ON DELETE CASCADE,
	FOREIGN KEY (number_stars) REFERENCES rating(number_stars) ON UPDATE CASCADE ON DELETE CASCADE
);

CREATE VIEW tutor_average_rating AS
SELECT t.email, AVG(tr.number_stars) AS average_rating, COUNT(tutor_email) AS number_of_ratings
FROM tutor as t
INNER JOIN tutor_review AS tr ON t.email = tr.tutor_email
GROUP BY tutor_email;