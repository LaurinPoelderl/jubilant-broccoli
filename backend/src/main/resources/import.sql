insert into users (id, email, name, username)
VALUES
(1, 'manuelpuchner@icloud.com', 'Manuel Puchner', 'manuelpuchner');

insert into todo (completed, user_id, title) VALUES
 (false, 1, 'Todo Application machen'),
 (false, 1, 'Todo Application testen'),
 (false, 1, 'Todo Application deployen');