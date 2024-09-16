
CREATE TABLE contacts (
id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
name VARCHAR(50),
email VARCHAR(255),
contact_number int(15),
country_code varchar(5),
message TEXT,
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


CREATE TABLE users (
id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
name VARCHAR(50),
password varchar(255),
email VARCHAR(255),
contact_number int(15),
country_code varchar(5),
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

