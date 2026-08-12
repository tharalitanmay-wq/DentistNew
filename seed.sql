-- ========================================================
-- Pearl Dental Care - MySQL Database Schema & Seed Script
-- ========================================================

-- Create Database if not exists
CREATE DATABASE IF NOT EXISTS pearl_dental;
USE pearl_dental;

-- Drop existing tables if re-seeding
DROP TABLE IF EXISTS Appointments;
DROP TABLE IF EXISTS Doctors;
DROP TABLE IF EXISTS Services;
DROP TABLE IF EXISTS Blogs;
DROP TABLE IF EXISTS Galleries;
DROP TABLE IF EXISTS Testimonials;
DROP TABLE IF EXISTS FAQs;
DROP TABLE IF EXISTS Settings;
DROP TABLE IF EXISTS customers;
DROP TABLE IF EXISTS admins;
DROP TABLE IF EXISTS Users;

-- ========================================================
-- 1. Admins Table
-- ========================================================
CREATE TABLE admins (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  username VARCHAR(255) NOT NULL UNIQUE,
  email VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- ========================================================
-- 2. Customers Table
-- ========================================================
CREATE TABLE customers (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  username VARCHAR(255) NOT NULL UNIQUE,
  email VARCHAR(255) NOT NULL UNIQUE,
  phone VARCHAR(255) DEFAULT '',
  password VARCHAR(255) NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Legacy Users Table (for system backward compatibility)
CREATE TABLE Users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  role ENUM('patient', 'doctor', 'staff', 'admin') DEFAULT 'patient',
  phone VARCHAR(255) DEFAULT '',
  avatar VARCHAR(255) DEFAULT 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400',
  createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
  updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Create Doctors Table
CREATE TABLE Doctors (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  title VARCHAR(255) NOT NULL,
  specialization VARCHAR(255) NOT NULL,
  experience VARCHAR(255) NOT NULL,
  bio TEXT NOT NULL,
  avatar VARCHAR(255) NOT NULL,
  rating FLOAT DEFAULT 5.0,
  consultationFee INT NOT NULL,
  availableDays JSON,
  timeSlots JSON,
  contactEmail VARCHAR(255) DEFAULT '',
  education JSON,
  featured TINYINT(1) DEFAULT 0,
  createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
  updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Create Services Table
CREATE TABLE Services (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  category VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  priceRange VARCHAR(255) NOT NULL,
  estimatedPriceMin INT DEFAULT 150,
  estimatedPriceMax INT DEFAULT 400,
  duration VARCHAR(255) DEFAULT '45 mins',
  icon VARCHAR(255) DEFAULT 'Sparkles',
  benefits JSON,
  isActive TINYINT(1) DEFAULT 1,
  featured TINYINT(1) DEFAULT 0,
  createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
  updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Create Appointments Table
CREATE TABLE Appointments (
  id INT AUTO_INCREMENT PRIMARY KEY,
  patientName VARCHAR(255) NOT NULL,
  patientEmail VARCHAR(255) NOT NULL,
  patientPhone VARCHAR(255) NOT NULL,
  doctorId VARCHAR(255) DEFAULT '',
  doctorName VARCHAR(255) NOT NULL,
  serviceId VARCHAR(255) DEFAULT '',
  serviceName VARCHAR(255) NOT NULL,
  date VARCHAR(255) NOT NULL,
  timeSlot VARCHAR(255) NOT NULL,
  notes TEXT,
  reportFile VARCHAR(255) DEFAULT '',
  status ENUM('Pending', 'Confirmed', 'Completed', 'Cancelled') DEFAULT 'Pending',
  userId VARCHAR(255) DEFAULT '',
  prescription TEXT,
  paymentStatus ENUM('Unpaid', 'Paid', 'Insurance Pending') DEFAULT 'Unpaid',
  createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
  updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Create Blogs Table
CREATE TABLE Blogs (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  slug VARCHAR(255) NOT NULL UNIQUE,
  excerpt TEXT NOT NULL,
  content LONGTEXT NOT NULL,
  category VARCHAR(255) NOT NULL,
  author VARCHAR(255) DEFAULT 'Dr. Evelyn Sterling',
  readTime VARCHAR(255) DEFAULT '5 min read',
  coverImage VARCHAR(255) NOT NULL,
  isPublished TINYINT(1) DEFAULT 1,
  tags JSON,
  createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
  updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- ========================================================
-- Seed Initial Data
-- ========================================================

-- Insert Sample Admin Account (Password: AdminPass123! hashed with bcrypt)
INSERT INTO admins (id, name, username, email, password) VALUES
(1, 'Master Admin', 'admin', 'admin@pearldental.com', '$2a$10$wE99V9n8tE5fCq6m/A0U.eQ80Jq55uO1vM7c4.6Y1z5/5G7J1K1.');

-- Insert Sample Customer Account (Password: AdminPass123! hashed with bcrypt)
INSERT INTO customers (id, name, username, email, phone, password) VALUES
(1, 'Johnathan Miller', 'jmiller', 'patient@example.com', '+1 (555) 234-5678', '$2a$10$wE99V9n8tE5fCq6m/A0U.eQ80Jq55uO1vM7c4.6Y1z5/5G7J1K1.');

-- Insert Legacy Users
INSERT INTO Users (id, name, email, password, role, phone) VALUES
(1, 'Dr. Evelyn Sterling (Admin)', 'admin@pearldental.com', '$2a$10$wE99V9n8tE5fCq6m/A0U.eQ80Jq55uO1vM7c4.6Y1z5/5G7J1K1.', 'admin', '+1 (800) 555-PEARL'),
(2, 'Johnathan Miller', 'patient@example.com', '$2a$10$wE99V9n8tE5fCq6m/A0U.eQ80Jq55uO1vM7c4.6Y1z5/5G7J1K1.', 'patient', '+1 (555) 234-5678');

-- Insert Sample Doctors
INSERT INTO Doctors (id, name, title, specialization, experience, bio, avatar, rating, consultationFee, availableDays, timeSlots, contactEmail, education, featured) VALUES
(1, 'Dr. Evelyn Sterling', 'Chief Aesthetic Dentist & Founder', 'Cosmetic Dentistry & Full Mouth Reconstruction', '16+ Years', 'Dr. Sterling is a pioneer in digital smile design, combining artistic perfection with minimally invasive porcelain artistry.', 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=600', 5.0, 250, '["Monday", "Tuesday", "Wednesday", "Thursday"]', '["09:00 AM", "11:00 AM", "02:00 PM", "04:00 PM"]', 'dr.sterling@pearldental.com', '["DDS - Harvard School of Dental Medicine", "Fellowship - American Academy of Cosmetic Dentistry"]', 1),
(2, 'Dr. Julian Vance', 'Lead Implant Specialist & Maxillofacial Surgeon', 'Dental Implants & 3D Guided Surgery', '14+ Years', 'Specializing in computer-guided full-arch tooth replacement and painless bone grafting with state-of-the-art CBCT scanning.', 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=600', 4.9, 280, '["Monday", "Wednesday", "Friday"]', '["10:00 AM", "01:00 PM", "03:30 PM"]', 'dr.vance@pearldental.com', '["DMD - Columbia University", "Residency - Johns Hopkins Hospital"]', 1);

-- Insert Sample Services
INSERT INTO Services (id, name, category, description, priceRange, estimatedPriceMin, estimatedPriceMax, duration, icon, benefits, isActive, featured) VALUES
(1, 'Signature Porcelain Veneers', 'Cosmetic Dentistry', 'Custom handcrafted ultra-thin porcelain veneers designed to transform shape, shade, and alignment with natural light translucency.', '$1,200 - $2,500 / tooth', 1200, 2500, '60 mins', 'Sparkles', '["Stain Resistant", "15-20 Year Longevity", "Minimally Invasive"]', 1, 1),
(2, '3D Computer-Guided Dental Implants', 'Restorative Dentistry', 'Painless, computer-guided titanium & zirconia implant placement for lifetime permanent tooth restoration.', '$2,800 - $4,500', 2800, 4500, '90 mins', 'ShieldCheck', '["Lifetime Warranty Option", "Natural Bone Integration", "Computer Precision"]', 1, 1),
(3, 'Laser Teeth Whitening (Zoom Ultimate)', 'Cosmetic Dentistry', 'Advanced laser activation whitening that lightens teeth up to 8 shades in a single 45-minute luxury session.', '$450 - $750', 450, 750, '45 mins', 'Zap', '["Zero Sensitivity Gel", "Immediate 8-Shade Lift", "Includes Take-Home Touch Up"]', 1, 1);

-- Insert Sample Appointments
INSERT INTO Appointments (id, patientName, patientEmail, patientPhone, doctorId, doctorName, serviceId, serviceName, date, timeSlot, notes, status, userId) VALUES
(1, 'Victoria Sterling-Hayes', 'victoria@example.com', '+1 (555) 888-9900', '1', 'Dr. Evelyn Sterling', '1', 'Signature Porcelain Veneers', '2026-08-05', '11:00 AM', 'Consultation for 8 upper veneers and smile simulation.', 'Confirmed', '1'),
(2, 'Harrison Ford-Blake', 'harrison@example.com', '+1 (555) 777-6655', '2', 'Dr. Julian Vance', '2', '3D Computer-Guided Dental Implants', '2026-08-15', '02:00 PM', 'Single molar implant consultation with 3D CBCT scan review.', 'Pending', '1');

-- Verify Database Tables
SHOW TABLES;
SELECT * FROM admins;
SELECT * FROM customers;
