CREATE TYPE account_type AS ENUM('company','reg_user');
CREATE TYPE property_type AS ENUM('sale', 'rental');

--User table
CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    username VARCHAR(255),
    password_ VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    phone_number VARCHAR(20),
    profile_picture_url VARCHAR(255),
    account_type account_type
);

--Property Table
CREATE TABLE IF NOT EXISTS property(
	property_id SERIAL,
	user_id INTEGER,
	property_name VARCHAR(10),
	property_type property_type,
	PRIMARY KEY(property_id),
	FOREIGN KEY(user_id) references users(user_id) ON DELETE CASCADE
);

--File table
CREATE TABLE File_
(
    file_id INT,
    file_data VARCHAR(255) NOT NULL, -- Assuming PDF files will be stored as binary data
    property_id INTEGER,
	PRIMARY KEY (file_id, property_id),
    FOREIGN KEY (property_id) REFERENCES property(property_id)
);

--Unit table
CREATE TABLE  IF NOT EXISTS unit(
	unit_id INT,
	property_id INTEGER,
	owner_id INTEGER,
	occupied BOOLEAN,
	registration_key VARCHAR(40) UNIQUE,
	square_footage INTEGER NULL,
	price_per_square_foot DECIMAL(6,2) NULL,
	condo_fee DECIMAL(8,2) NULL, 
	PRIMARY KEY(unit_id, property_id),
	FOREIGN KEY(property_id) references property(property_id) ON DELETE CASCADE,
	FOREIGN KEY(owner_id) references users(user_id) ON DELETE CASCADE
);

--locker table
CREATE TABLE IF NOT EXISTS locker(
	locker_id INT,
	property_id INTEGER,
	owner_id INTEGER,
	condo_fee DECIMAL(6,2) NULL,
	occupied BOOLEAN,
	PRIMARY KEY(locker_id, property_id),
	FOREIGN KEY(property_id) references property(property_id) ON DELETE CASCADE,
	FOREIGN KEY(owner_id) references users(user_id) ON DELETE CASCADE
);

--parking table
CREATE TABLE IF NOT EXISTS parking (
    parking_id INT,
    property_id INT,
    owner_id INT,
    condo_fee DECIMAL(6,2) NULL,
    occupied BOOLEAN NOT NULL DEFAULT FALSE,
    PRIMARY KEY(parking_id, property_id),
	FOREIGN KEY(property_id) references property(property_id) ON DELETE CASCADE,
	FOREIGN KEY(owner_id) references users(user_id) ON DELETE CASCADE
);

CREATE TABLE request_type (
	type_id INT PRIMARY KEY,
	type_name VARCHAR(30)
);

CREATE TABLE request_status (
	status_id INT PRIMARY KEY,
	status_name VARCHAR(30)
);


CREATE TABLE request (
	req_id SERIAL PRIMARY KEY,
	unit_id INT,
	property_id INT,
	req_creator INT,
	req_reviewer INT NULL,
	type_id INT,
	status_id INT,
	details TEXT,
	FOREIGN KEY(type_id) references request_type(type_id) ON DELETE CASCADE,
	FOREIGN KEY(status_id) references request_status(status_id) ON DELETE CASCADE,
	FOREIGN KEY(req_creator) references users(user_id) ON DELETE CASCADE,
	FOREIGN KEY(req_reviewer) references users(user_id) ON DELETE CASCADE,
	FOREIGN KEY(unit_id, property_id) references unit(unit_id, property_id) ON DELETE CASCADE
);

