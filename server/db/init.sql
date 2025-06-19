CREATE DATABASE IF NOT EXISTS runningshoescataloguing;

USE runningshoescataloguing;

CREATE TABLE IF NOT EXISTS running_shoes (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  brand VARCHAR(255) NOT NULL,
  model VARCHAR(255) NOT NULL,
  first_use DATE,
  races_used INT,
  image_url TEXT,
  vote INT
);
