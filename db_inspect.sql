SELECT 'admins' AS `Table`, COUNT(*) AS `Row Count` FROM admins UNION ALL
SELECT 'appointments', COUNT(*) FROM appointments UNION ALL
SELECT 'blogs', COUNT(*) FROM blogs UNION ALL
SELECT 'customers', COUNT(*) FROM customers UNION ALL
SELECT 'doctors', COUNT(*) FROM doctors UNION ALL
SELECT 'faqs', COUNT(*) FROM faqs UNION ALL
SELECT 'galleries', COUNT(*) FROM galleries UNION ALL
SELECT 'services', COUNT(*) FROM services UNION ALL
SELECT 'settings', COUNT(*) FROM settings UNION ALL
SELECT 'testimonials', COUNT(*) FROM testimonials UNION ALL
SELECT 'users', COUNT(*) FROM users UNION ALL
SELECT 'walkinqueues', COUNT(*) FROM walkinqueues;

DESCRIBE admins;
DESCRIBE appointments;
DESCRIBE blogs;
DESCRIBE customers;
DESCRIBE doctors;
DESCRIBE faqs;
DESCRIBE galleries;
DESCRIBE services;
DESCRIBE settings;
DESCRIBE testimonials;
DESCRIBE users;
DESCRIBE walkinqueues;

SELECT 'ADMINS DATA' AS section; SELECT * FROM admins LIMIT 5;
SELECT 'USERS DATA' AS section; SELECT id, name, email, role, created_at FROM users LIMIT 5;
SELECT 'APPOINTMENTS DATA' AS section; SELECT * FROM appointments LIMIT 5;
SELECT 'DOCTORS DATA' AS section; SELECT * FROM doctors LIMIT 5;
SELECT 'SERVICES DATA' AS section; SELECT * FROM services LIMIT 5;
SELECT 'BLOGS DATA' AS section; SELECT id, title, created_at FROM blogs LIMIT 5;
SELECT 'FAQS DATA' AS section; SELECT * FROM faqs LIMIT 5;
SELECT 'GALLERIES DATA' AS section; SELECT * FROM galleries LIMIT 5;
SELECT 'SETTINGS DATA' AS section; SELECT * FROM settings LIMIT 5;
SELECT 'TESTIMONIALS DATA' AS section; SELECT * FROM testimonials LIMIT 5;
SELECT 'CUSTOMERS DATA' AS section; SELECT * FROM customers LIMIT 5;
SELECT 'WALKINQUEUES DATA' AS section; SELECT * FROM walkinqueues LIMIT 5;
