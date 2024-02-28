CREATE TABLE Unit

(
	unit_id INT,
	property_id INT,
	owner_id INT,
	availability BOOLEAN,
	registration_info VARCHAR(200), 
	condo_fee DECIMAL(6,2),
	
	PRIMARY KEY(unit_id, property_id),
	FOREIGN KEY(property_id) references Property(property_id) ON DELETE CASCADE,
	FOREIGN KEY(owner_id) references Users(owner_id) ON DELETE CASCADE
	
);