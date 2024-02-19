DROP TABLE `capstone`.`appointment`, `capstone`.`appointment_request`, `capstone`.`appointment_type`, `capstone`.`course`, `capstone`.`initiator_type`, `capstone`.`location`, `capstone`.`major`, `capstone`.`rating`, `capstone`.`request_status`, `capstone`.`request_type`, `capstone`.`seniority`, `capstone`.`time_increment`, `capstone`.`tutee`, `capstone`.`tutor`, `capstone`.`tutor_eligibility`, `capstone`.`tutor_location_preference`, `capstone`.`tutor_review`, `capstone`.`tutor_time_preference`;

CREATE TABLE course (
	course_id INTEGER NOT NULL AUTO_INCREMENT,
	course_name VARCHAR(100) NOT NULL,
	course_dept CHAR(4) NOT NULL,
	course_number INTEGER NOT NULL,
	PRIMARY KEY(course_id)
);

CREATE TABLE location (
	location_id INTEGER NOT NULL AUTO_INCREMENT,
	location_name VARCHAR(100) NOT NULL,
	is_indoor BOOLEAN NOT NULL,
	is_oncampus BOOLEAN NOT NULL,
	is_online BOOLEAN NOT NULL,
	PRIMARY KEY(location_id)
);

CREATE TABLE rating (
	rating_id INTEGER NOT NULL AUTO_INCREMENT,
	number_stars INTEGER NOT NULL,
	PRIMARY KEY(rating_id)
);

CREATE TABLE tutor_time_preference (
	tutor_time_preference_id INTEGER NOT NULL AUTO_INCREMENT,
	tutor_id INTEGER NOT NULL,
	start_time_id INTEGER NOT NULL,
	end_time_id INTEGER NOT NULL,
	PRIMARY KEY(tutor_time_preference_id)
);

CREATE TABLE tutor_eligibility (
	eligibility_id INTEGER NOT NULL AUTO_INCREMENT,
	tutor_id INTEGER NOT NULL,
	course_id INTEGER NOT NULL,
	course_grade CHAR(1) NOT NULL,
	is_eligible BOOLEAN NOT NULL,
	PRIMARY KEY(eligibility_id)
);

CREATE TABLE tutor_location_preference (
	location_preference_id INTEGER NOT NULL AUTO_INCREMENT,
	tutor_id INTEGER NOT NULL,
	location_id INTEGER NOT NULL,
	PRIMARY KEY(location_preference_id)
);

CREATE TABLE tutor_review (
	review_id INTEGER NOT NULL AUTO_INCREMENT,
	appointment_id INTEGER NOT NULL,
	rating_id INTEGER NOT NULL,
	review_text VARCHAR(1000),
	PRIMARY KEY(review_id)
);

CREATE TABLE tutor (
	tutor_id INTEGER NOT NULL AUTO_INCREMENT,
	uin INTEGER NOT NULL,
	first_name VARCHAR(20) NOT NULL,
	last_name VARCHAR(20) NOT NULL,
	major_id INTEGER NOT NULL,
	seniority_id INTEGER NOT NULL,
	pay_rate DECIMAL (6, 2) NOT NULL,
	bio_text VARCHAR(1000),
	picture_url VARCHAR(2000),
	phone_number BIGINT NOT NULL,
	email VARCHAR(30) NOT NULL,
	average_rating DECIMAL (2,1) NOT NULL,
	PRIMARY KEY(tutor_id)
);

CREATE TABLE seniority (
	seniority_id INTEGER NOT NULL AUTO_INCREMENT,
	seniority_name VARCHAR(25) NOT NULL,
	PRIMARY KEY(seniority_id)
);

CREATE TABLE time_increment (
	time_id INTEGER NOT NULL AUTO_INCREMENT,
	time_value TIME NOT NULL,
	PRIMARY KEY(time_id)
);

CREATE TABLE appointment (
	appointment_id INTEGER NOT NULL AUTO_INCREMENT,
	appointment_type_id INTEGER NOT NULL,
	tutor_id INTEGER NOT NULL,
	tutee_id INTEGER NOT NULL,
	appointment_date DATE NOT NULL,
	start_time_id INTEGER NOT NULL,
	end_time_id INTEGER NOT NULL,
	location_id INTEGER NOT NULL,
	PRIMARY KEY(appointment_id)
);

CREATE TABLE tutee (
	tutee_id INTEGER NOT NULL AUTO_INCREMENT,
	uin INTEGER NOT NULL,
	first_name VARCHAR(20) NOT NULL,
	last_name VARCHAR(20) NOT NULL,
	major_id INTEGER NOT NULL,
	seniority_id INTEGER NOT NULL,
	phone_number BIGINT NOT NULL,
	email VARCHAR(30) NOT NULL,
	PRIMARY KEY(tutee_id)
);

CREATE TABLE major (
	major_id INTEGER NOT NULL AUTO_INCREMENT,
	major_name VARCHAR(100) NOT NULL,
	PRIMARY KEY(major_id)
);

CREATE TABLE appointment_type (
	appointment_type_id INTEGER NOT NULL AUTO_INCREMENT,
	appointment_type_name VARCHAR(50) NOT NULL,
	PRIMARY KEY(appointment_type_id)
);

CREATE TABLE appointment_request (
	appointment_request_id INTEGER NOT NULL AUTO_INCREMENT,
	request_type_id INTEGER NOT NULL,
	appointment_id INTEGER NOT NULL,
	initiator_type_id INTEGER NOT NULL,
	request_status_id INTEGER NOT NULL,
	PRIMARY KEY(appointment_request_id)
);

CREATE TABLE request_type (
	request_type_id INTEGER NOT NULL AUTO_INCREMENT,
	request_type_name VARCHAR(50) NOT NULL,
	PRIMARY KEY(request_type_id)
);

CREATE TABLE request_status (
	request_status_id INTEGER NOT NULL AUTO_INCREMENT,
	status_name VARCHAR(50) NOT NULL,
	PRIMARY KEY(request_status_id)
);

CREATE TABLE initiator_type (
	initiator_type_id INTEGER NOT NULL AUTO_INCREMENT,
	initiator_type_name VARCHAR(50) NOT NULL,
	PRIMARY KEY(initiator_type_id)
);

ALTER TABLE course
ADD CONSTRAINT uq_course UNIQUE (course_name, course_dept, course_number),
ADD CONSTRAINT chk_course_lowercase CHECK ((BINARY(course_name) = BINARY(LOWER(course_name))) AND (BINARY(course_dept) = BINARY(LOWER(course_dept)))),
ADD CONSTRAINT chk_course_number CHECK (course_number BETWEEN 100 AND 800);

ALTER TABLE location
ADD CONSTRAINT uq_location UNIQUE (location_name),
ADD CONSTRAINT chk_location_lowercase CHECK (BINARY(location_name) = BINARY(LOWER(location_name)));

ALTER TABLE rating
ADD CONSTRAINT uq_rating UNIQUE (number_stars),
ADD CONSTRAINT chk_rating CHECK (number_stars BETWEEN 1 AND 5);

ALTER TABLE tutor_time_preference
ADD CONSTRAINT uq_tutor_time_preference UNIQUE (tutor_id, start_time_id, end_time_id),
ADD CONSTRAINT fk_tutor_time_preference_tutor_id FOREIGN KEY (tutor_id) REFERENCES tutor(tutor_id),
ADD CONSTRAINT fk_tutor_time_preference_start_time_id FOREIGN KEY (start_time_id) REFERENCES time_increment(time_id),
ADD CONSTRAINT fk_tutor_time_preference_end_time_id FOREIGN KEY (end_time_id) REFERENCES time_increment(time_id);

ALTER TABLE tutor_eligibility
ADD CONSTRAINT uq_tutor_eligibility UNIQUE (tutor_id, course_id, course_grade, is_eligible),
ADD CONSTRAINT fk_tutor_eligibility_tutor_id FOREIGN KEY (tutor_id) REFERENCES tutor(tutor_id),
ADD CONSTRAINT fk_tutor_eligibility_course_id FOREIGN KEY (course_id) REFERENCES course(course_id),
ADD CONSTRAINT chk_tutor_eligibility_course_grade CHECK (course_grade in ('a', 'b', 'c', 'd', 'f', 'w', 'q', 's'));

ALTER TABLE tutor_location_preference
ADD CONSTRAINT uq_tutor_location_preference UNIQUE (tutor_id, location_id),
ADD CONSTRAINT fk_tutor_location_preference_tutor_id FOREIGN KEY (tutor_id) REFERENCES tutor(tutor_id),
ADD CONSTRAINT fk_tutor_location_preference_location_id FOREIGN KEY (location_id) REFERENCES location(location_id);

ALTER TABLE tutor_review
ADD CONSTRAINT uq_tutor_review UNIQUE (appointment_id),
ADD CONSTRAINT fk_tutor_review_appointment_id FOREIGN KEY (appointment_id) REFERENCES appointment(appointment_id),
ADD CONSTRAINT fk_tutor_review_rating_id FOREIGN KEY (rating_id) REFERENCES rating(rating_id);

ALTER TABLE tutor
ADD CONSTRAINT uq_tutor UNIQUE (uin),
ADD CONSTRAINT fk_tutor_major_id FOREIGN KEY (major_id) REFERENCES major(major_id),
ADD CONSTRAINT fk_tutor_seniority_id FOREIGN KEY (seniority_id) REFERENCES seniority(seniority_id),
ADD CONSTRAINT chk_tutor_uin CHECK (uin BETWEEN 100000000 AND 999999999),
ADD CONSTRAINT chk_tutor_lowercase CHECK ((BINARY(first_name) = BINARY(LOWER(first_name))) AND (BINARY(last_name) = BINARY(LOWER(last_name))) AND (BINARY(email) = BINARY(LOWER(email)))),
ADD CONSTRAINT chk_tutor_phone_number CHECK (phone_number BETWEEN 1000000000 AND 9999999999),
ADD CONSTRAINT chk_tutor_email CHECK (email LIKE '_%@_%._%'),
ADD CONSTRAINT chk_tutor_average_rating CHECK (average_rating BETWEEN 0 AND 5);

ALTER TABLE seniority
ADD CONSTRAINT uq_seniority UNIQUE (seniority_name),
ADD CONSTRAINT chk_seniority_lowercase CHECK (BINARY(seniority_name) = BINARY(LOWER(seniority_name)));

ALTER TABLE time_increment
ADD CONSTRAINT uq_time_increment UNIQUE (time_value);

ALTER TABLE appointment
ADD CONSTRAINT uq_appointment UNIQUE (appointment_type_id, tutor_id, tutee_id, appointment_date, start_time_id, end_time_id, location_id),
ADD CONSTRAINT fk_appointment_appointment_type_id FOREIGN KEY (appointment_type_id) REFERENCES appointment_type(appointment_type_id),
ADD CONSTRAINT fk_appointment_tutor_id FOREIGN KEY (tutor_id) REFERENCES tutor(tutor_id),
ADD CONSTRAINT fk_appointment_tutee_id FOREIGN KEY (tutee_id) REFERENCES tutee(tutee_id),
ADD CONSTRAINT fk_appointment_start_time_id FOREIGN KEY (start_time_id) REFERENCES time_increment(time_id),
ADD CONSTRAINT fk_appointment_end_time_id FOREIGN KEY (end_time_id) REFERENCES time_increment(time_id),
ADD CONSTRAINT fk_appointment_location_id FOREIGN KEY (location_id) REFERENCES location(location_id);

ALTER TABLE tutee
ADD CONSTRAINT uq_tutee UNIQUE (uin),
ADD CONSTRAINT fk_tutee_major_id FOREIGN KEY (major_id) REFERENCES major(major_id),
ADD CONSTRAINT fk_tutee_seniority_id FOREIGN KEY (seniority_id) REFERENCES seniority(seniority_id),
ADD CONSTRAINT chk_tutee_uin CHECK (uin BETWEEN 100000000 AND 999999999),
ADD CONSTRAINT chk_tutee_lowercase CHECK ((BINARY(first_name) = BINARY(LOWER(first_name))) AND (BINARY(last_name) = BINARY(LOWER(last_name))) AND (BINARY(email) = BINARY(LOWER(email)))),
ADD CONSTRAINT chk_tutee_phone_number CHECK (phone_number BETWEEN 1000000000 AND 9999999999),
ADD CONSTRAINT chk_tutee_email CHECK (email LIKE '_%@_%._%');

ALTER TABLE major
ADD CONSTRAINT uq_major_name UNIQUE (major_name),
ADD CONSTRAINT chk_major_lowercase CHECK (BINARY(major_name) = BINARY(LOWER(major_name)));

ALTER TABLE appointment_type
ADD CONSTRAINT uq_appointment_type_name UNIQUE (appointment_type_name),
ADD CONSTRAINT chk_appointment_type_lowercase CHECK (BINARY(appointment_type_name) = BINARY(LOWER(appointment_type_name)));

ALTER TABLE appointment_request
ADD CONSTRAINT uq_appointment_request UNIQUE (request_type_id, appointment_id, initiator_type_id),
ADD CONSTRAINT fk_appointment_request_request_type_id FOREIGN KEY (request_type_id) REFERENCES request_type(request_type_id),
ADD CONSTRAINT fk_appointment_request_appointment_id FOREIGN KEY (appointment_id) REFERENCES appointment(appointment_id),
ADD CONSTRAINT fk_appointment_request_initiator_type_id FOREIGN KEY (initiator_type_id) REFERENCES initiator_type(initiator_type_id),
ADD CONSTRAINT fk_appointment_request_request_status_id FOREIGN KEY (request_status_id) REFERENCES request_status(request_status_id);

ALTER TABLE request_type
ADD CONSTRAINT uq_request_type_name UNIQUE (request_type_name),
ADD CONSTRAINT chk_request_type_lowercase CHECK (BINARY(request_type_name) = BINARY(LOWER(request_type_name)));

ALTER TABLE request_status
ADD CONSTRAINT uq_request_status UNIQUE (status_name),
ADD CONSTRAINT chk_request_status_lowercase CHECK (BINARY(status_name) = BINARY(LOWER(status_name)));

ALTER TABLE initiator_type
ADD CONSTRAINT uq_initiator_type UNIQUE (initiator_type_name),
ADD CONSTRAINT chk_initiator_type_lowercase CHECK (BINARY(initiator_type_name) = BINARY(LOWER(initiator_type_name)));