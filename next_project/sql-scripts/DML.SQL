-- Adding default users
INSERT INTO users (username, password_, email, phone_number, profile_picture_url, account_type) 
VALUES 
    ('admin', 'admin123', 'admin@example.com', '1234567890', 'https://www.shutterstock.com/image-photo/travel-man-tourist-alone-on-600nw-1433992112.jpg', 'company'),
    ('user1', 'password1', 'user1@example.com', '9876543210', 'https://www.shutterstock.com/image-photo/travel-man-tourist-alone-on-600nw-1433992112.jpg', 'reg_user'),
    ('user2', 'password2', 'user2@example.com', NULL, NULL, 'reg_user');

-- Adding default properties
INSERT INTO property (user_id, property_name, property_type, address) 
VALUES 
    (1, 'Admin', 'rental', '123 Bernard'),
    (1, 'User1', 'rental', '456 Ste'),
    (1, 'User2', 'rental', '789 Tryia');

-- Adding default files
INSERT INTO File_ (file_id, file_data, property_id) 
VALUES 
    (1, 'file_data_example_1.pdf', 2),
    (2, 'file_data_example_2.pdf', 2);

-- Adding default units
INSERT INTO unit (unit_id, property_id, owner_id, occupied, registration_key) 
VALUES 
    (1, 1, 1, TRUE, 'unit_reg_key_1'),
    (2, 1, 1, FALSE, 'unit_reg_key_2');

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
    (1, 2, 2, 1, 1, 'Move in request for User1 Property'),
    (2, 2, 2, 4, 1, 'Violation report for User1 Property');
