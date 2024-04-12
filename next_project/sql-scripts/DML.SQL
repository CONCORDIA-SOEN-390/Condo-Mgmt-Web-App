-- Adding default users
INSERT INTO users (username, password_, email, phone_number, profile_picture_url, account_type) 
VALUES 
    ('company1', 'admin123', 'admin@example.com', '1234567890', 'https://www.shutterstock.com/image-photo/travel-man-tourist-alone-on-600nw-1433992112.jpg', 'company'),
    ('company2', 'admin123', 'admin22@example.com', '1234567890', 'https://www.shutterstock.com/image-photo/travel-man-tourist-alone-on-600nw-1433992112.jpg', 'company'),
    ('user1', 'password1', 'user1@example.com', '9876543210', 'https://www.shutterstock.com/image-photo/travel-man-tourist-alone-on-600nw-1433992112.jpg', 'reg_user'),
    ('user2', 'password2', 'user2@example.com', NULL, NULL, 'reg_user'),
    ('employee1', 'password3', 'emp1@example.com', NULL, NULL, 'finance'),
    ('employee13', 'password3', 'emp31@example.com', NULL, NULL, 'finance'),
    ('employee14', 'password3', 'emp14@example.com', NULL, NULL, 'finance'),
    ('employee15', 'password3', 'emp1r@example.com', NULL, NULL, 'finance'),
    ('employee25', 'password4', 'emp23@example.com', NULL, NULL, 'management'),
    ('employee24', 'password4', 'emp22@example.com', NULL, NULL, 'management'),
    ('employee223', 'password4', 'emp12@example.com', NULL, NULL, 'management'),
    ('employee23', 'password4', 'emp26@example.com', NULL, NULL, 'management'),
    ('employee3', 'password5', 'emp33@example.com', NULL, NULL, 'operations'),
    ('employee31', 'password5', 'emp32@example.com', NULL, NULL, 'operations'),
    ('employee321', 'password5', 'emp43@example.com', NULL, NULL, 'operations'),
    ('employee33', 'password5', 'emp223@example.com', NULL, NULL, 'operations'),
    ('employee34', 'password5', 'emp73@example.com', NULL, NULL, 'operations');


-- Adding default properties
INSERT INTO property (user_id, property_name, property_type, address) 
VALUES 
    (1, 'Admin', 'rental', '123 Bernard'),
    (2, 'User1', 'rental', '456 Ste'),
    (1, 'User2', 'rental', '789 Tryia');

-- Adding default files
INSERT INTO File_ (file_id, file_data, property_id) 
VALUES 
    (1, 'file_data_example_1.pdf', 2),
    (2, 'file_data_example_2.pdf', 2);

-- Adding default units
INSERT INTO unit (unit_id, property_id, owner_id, occupied, registration_key) 
VALUES 
    (11, 1, 1, TRUE, 'unit_reg_key_1'),
    (12, 1, 1, FALSE, 'unit_reg_key_2'),
    (11, 2, 2, TRUE, 'unit_reg_key_3'),
    (12, 2, 2, FALSE, 'unit_reg_key_4'),
    (13, 2, 2, FALSE, 'unit_reg_key_5'),
    (11, 3, 1, TRUE, 'unit_reg_key_6'),
    (21, 3, 1, FALSE, 'unit_reg_key_7');

-- Adding default lockers
INSERT INTO locker (locker_id, property_id, owner_id, condo_fee, occupied) 
VALUES 
    (1, 1, 1, 50.00, TRUE),
    (2, 1, 1, 50.00, FALSE);

-- Adding default parking spaces
INSERT INTO parking (parking_id, property_id, owner_id, condo_fee, occupied) 
VALUES 
    (1, 1, 1, 100.00, TRUE),
    (2, 1, 1, 100.00, FALSE);

-- Adding default request types (Already provided in previous DML)
INSERT INTO request_type(type_id, type_name) 
VALUES 
    (1, 'Move In'), 
    (2, 'Move Out'), 
    (3, 'Change intercom number'), 
    (4, 'Report Violation');

-- Adding default request status (Already provided in previous DML)
INSERT INTO request_status(status_id, status_name) 
VALUES 
    (1, 'In Review'), 
    (2, 'Denied'), 
    (3, 'Accepted');

-- Adding default requests
INSERT INTO request (unit_id, property_id, req_creator, type_id, status_id, details) 
VALUES 
    (11, 1, 2, 1, 1, 'Move in request for User1 Property'),
    (12, 1, 2, 4, 1, 'Violation report for User1 Property');

-- Adding default facilities
INSERT INTO facility (property_id, name, description) VALUES
    (1, 'Swimming Pool', 'A large swimming pool for recreational activities'),
    (1, 'Tennis Court', 'An outdoor tennis court for sports enthusiasts'),
    (1, 'Gym', 'A fully-equipped gym with cardio and strength training equipment');

-- Adding default reservations
INSERT INTO reservation (facility_id, property_id, user_id, start_time, end_time) VALUES
    (1, 1, 2, '2024-04-06 09:00:00', '2024-04-06 10:30:00'),
    (2, 1, 2, '2024-04-07 15:00:00', '2024-04-07 16:30:00'),
    (3, 1, 3, '2024-04-08 17:00:00', '2024-04-08 18:00:00');

-- Adding default employees
INSERT INTO employee (employee_id, company_id, property_id, num_of_assigned_req) 
VALUES
    (5, 1, 1, 0),
    (6, 1, 1, 0),
    (7, 1, 3, 0),
    (8, 2, 2, 0),
    (9, 2, 2, 0),
    (10, 1, 3, 0),
    (11, 2, 2, 0),
    (12, 2, 2, 0),
    (13, 1, 1, 0),
    (14, 1, 1, 0),
    (15, 1, 1, 0),
    (16, 1, 3, 0),
    (17, 1, 3, 0);

INSERT INTO sale (sale_id_id, property_id, old_owner_id, condo_fee, sale_date) 
VALUES
    (1, 1, 1, 2.0, '2017-07-23');