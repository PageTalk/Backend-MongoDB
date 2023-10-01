DELIMITER //

CREATE TRIGGER `UserCreationTrigger` 
AFTER INSERT ON `users`
FOR EACH ROW
BEGIN
    INSERT INTO interaction (fk_user_id, interaction_type, interaction_details)
    VALUES (NEW.id, "createUser", "User created");
END //

CREATE TRIGGER `UserUpdateTrigger`
AFTER UPDATE ON `users`
FOR EACH ROW
BEGIN
    INSERT INTO interaction (fk_user_id, interaction_type, interaction_details)
    VALUES (NEW.id, "updateUser", "User updated");
END //

CREATE TRIGGER `UserDeletionTrigger`
AFTER DELETE ON `users`
FOR EACH ROW
BEGIN
    INSERT INTO interaction (fk_user_id, interaction_type, interaction_details)
    VALUES (OLD.id, "deleteUser", "User deleted");
END //

CREATE TRIGGER `UserLoginTrigger`
AFTER UPDATE ON `users`
FOR EACH ROW
BEGIN
    IF NEW.last_login != OLD.last_login THEN
        INSERT INTO interaction (fk_user_id, interaction_type, interaction_details)
        VALUES (NEW.id, "login", "User logged in");
    END IF;
END //

CREATE TRIGGER `PDFUploadTrigger`
AFTER INSERT ON `pdf`
FOR EACH ROW
BEGIN
    INSERT INTO interaction (fk_user_id, interaction_type, interaction_details)
    VALUES (NEW.fk_user_id, "createPDF", "PDF created");
END //

CREATE TRIGGER `QueryCreationTrigger`
AFTER INSERT ON `query`
FOR EACH ROW
BEGIN
    INSERT INTO interaction (fk_user_id, interaction_type, interaction_details)
    VALUES (NEW.fk_user_id, "createQuery", "Query created");
END //

CREATE TRIGGER `QueryUpdateTrigger`
AFTER UPDATE ON `query`
FOR EACH ROW
BEGIN
    INSERT INTO interaction (fk_user_id, interaction_type, interaction_details)
    VALUES (NEW.fk_user_id, "updateQuery", "Query updated");
END //

CREATE TRIGGER `QueryDeletionTrigger`
AFTER DELETE ON `query`
FOR EACH ROW
BEGIN
    INSERT INTO interaction (fk_user_id, interaction_type, interaction_details)
    VALUES (OLD.fk_user_id, "deleteQuery", "Query deleted");
END //

DELIMITER ;