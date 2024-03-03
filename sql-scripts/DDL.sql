CREATE TYPE account_type AS ENUM('company','reg_user');

--User table
CREATE TABLE users (
    user_id INT PRIMARY KEY,
    username VARCHAR(255) NOT NULL,
    password_ VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone_number VARCHAR(20),
    profile_picture_url VARCHAR(255),
    account_type account_type NOT NULL
);

--Property Table
CREATE TABLE IF NOT EXISTS property(
	property_id INT,
	user_id INT,
	locker_owner VARCHAR(75),
	occupant_information VARCHAR(200), 
	condo_fee DECIMAL(6,2),
	PRIMARY KEY(property_id),
	FOREIGN KEY(user_id) references users(user_id) ON DELETE CASCADE
);

--File table
CREATE TABLE File_
(
    file_id INT PRIMARY KEY,
    file_data VARCHAR(255) NOT NULL, -- Assuming PDF files will be stored as binary data
    property_id INT,
    FOREIGN KEY (property_id) REFERENCES property(property_id)
);

--Unit table
CREATE TABLE  IF NOT EXISTS unit(
	unit_id INT,
	property_id INT,
	owner_id INT,
	availability BOOLEAN,
	registration_info VARCHAR(200), 
	condo_fee DECIMAL(6,2),
	PRIMARY KEY(unit_id, property_id),
	FOREIGN KEY(property_id) references property(property_id) ON DELETE CASCADE,
	FOREIGN KEY(owner_id) references users(user_id) ON DELETE CASCADE
);

--locker table
CREATE TABLE IF NOT EXISTS locker(
	locker_id INT,
	property_id INT,
	locker_owner VARCHAR(75),
	occupant_information VARCHAR(200), 
	condo_fee DECIMAL(6,2),
	occupied BOOLEAN,
	PRIMARY KEY(locker_id, property_id),
	FOREIGN KEY(property_id) references property(property_id) ON DELETE CASCADE
);