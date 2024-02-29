--Property Table
CREATE TABLE IF NOT EXISTS property(
	property_id INT,
	user_id INT,
	locker_owner VARCHAR(75),
	occupant_information VARCHAR(200), 
	condo_fee DECIMAL(6,2),
	PRIMARY KEY(property_id, user_id),
	FOREIGN KEY(user_id) references users(user_id) ON DELETE CASCADE
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
	FOREIGN KEY(owner_id) references users(owner_id) ON DELETE CASCADE
);

--locker table
CREATE TABLE IF NOT EXISTS locker(
	locker_id INT,
	locker_owner VARCHAR(75),
	occupant_information VARCHAR(200), 
	condo_fee DDECIMAL(6,2),
	occupied BOOLEAN,
	PRIMARY KEY(locker_id, property_id),
	FOREIGN KEY(property_id) references property(property_id) ON DELETE CASCADE
);