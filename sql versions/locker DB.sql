CREATE TABLE locker_table
(
	locker_id INT,
	locker_owner VARCHAR(75),
	occupant_information VARCHAR(200), 
	condo_fee DDECIMAL(6,2),
	occupied BOOLEAN,
	PRIMARY KEY(locker_id,),
	FOREIGN KEY(property_id) references Property(property_id) ON DELETE CASCADE
	
	
);

INSERT INTO locker_table (locker_id,locker_owner,occupant_information, condo_fee, occupied) VALUES

(1,'bob','clown',344,True),
(2,'steve','minecraft dude',565,True),
(3,'anita maxx win',the best, 777, False),
(4,'billy','idk', 546, True),
(5,'yugi','yuyuyu', 98, True)