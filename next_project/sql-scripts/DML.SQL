-- Default Request Types
INSERT INTO request_type(type_id, type_name) VALUES (1, 'Move In'), (2, 'Move Out'), (3, 'Change intercom number'), (4, 'Report Violation');
INSERT INTO request_status(status_id, status_name) VALUES (1, 'In Review'), (2, 'Denied'), (3, 'Accepted');