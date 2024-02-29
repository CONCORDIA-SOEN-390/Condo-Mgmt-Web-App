CREATE TABLE users 
(
    userid INT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(255) NOT NULL,
    password_ VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone_number VARCHAR(20),
    profile_picture_url VARCHAR(255),
    account_type ENUM('company', 'reg_user') NOT NULL
);

CREATE TABLE Property 
(
    property_id INT PRIMARY KEY,
    property_name VARCHAR(255) NOT NULL,
);

CREATE TABLE File_ 
(
    file_id INT PRIMARY KEY,
    file_data BLOB NOT NULL, -- Assuming PDF files will be stored as binary data
    property_id INT,
    FOREIGN KEY (property_id) REFERENCES Property(property_id)
);

