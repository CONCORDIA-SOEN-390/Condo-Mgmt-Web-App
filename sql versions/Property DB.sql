CREATE TABLE property

(
	property_id INT,
	user_id INT,
	locker_owner VARCHAR(75),
	occupant_information VARCHAR(200), 
	condo_fee DECIMAL(6,2),
	
	PRIMARY KEY(property_id, user_id),
	FOREIGN KEY(user_id) references Users(user_id) ON DELETE CASCADE
	
);