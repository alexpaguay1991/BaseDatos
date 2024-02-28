--borra triggers existentes
DECLARE
    trigger_name VARCHAR2(100);
BEGIN
    FOR trg IN (SELECT trigger_name FROM user_triggers) LOOP
        trigger_name := trg.trigger_name;
        EXECUTE IMMEDIATE 'DROP TRIGGER ' || trigger_name;
    END LOOP;
END;
/

--create database link esclavo 1
CREATE DATABASE LINK PROYECTO1
CONNECT TO replica1 IDENTIFIED BY replica1
USING '
(DESCRIPTION =
    (ADDRESS_LIST =
      (ADDRESS = (PROTOCOL = TCP)(HOST = DESKTOP-P3AQF06)(PORT = 1521))
    )
    (CONNECT_DATA =
      (SERVICE_NAME = ESPE)
    )
  )
';
--create database link esclavo 2
CREATE DATABASE LINK PROYECTO2
CONNECT TO replica1 IDENTIFIED BY replica1
USING '
(DESCRIPTION =
    (ADDRESS_LIST =
      (ADDRESS = (PROTOCOL = TCP)(HOST = DESKTOP-P3AQF07)(PORT = 1521))
    )
    (CONNECT_DATA =
      (SERVICE_NAME = ESPE)
    )
  )
';
--role
CREATE OR REPLACE TRIGGER replicar_role
AFTER INSERT OR UPDATE OR DELETE ON role
FOR EACH ROW
BEGIN
    IF INSERTING THEN
        -- Insertar el registro en la tabla remota utilizando el enlace de base de datos PROYECTO1
        INSERT INTO role@PROYECTO1 (id, role, created_at, updated_at)
        VALUES (:NEW.id, :NEW.role, :NEW.created_at, :NEW.updated_at);
        
        -- Insertar el registro en la tabla remota utilizando el enlace de base de datos PROYECTO2
        INSERT INTO role@PROYECTO2 (id, role, created_at, updated_at)
        VALUES (:NEW.id, :NEW.role, :NEW.created_at, :NEW.updated_at);
        
    ELSIF UPDATING THEN
        -- Actualizar el registro correspondiente en la tabla remota utilizando el enlace de base de datos PROYECTO1
        UPDATE role@PROYECTO1 
        SET role = :NEW.role,
            created_at = :NEW.created_at,
            updated_at = :NEW.updated_at
        WHERE id = :OLD.id;
        
        -- Actualizar el registro correspondiente en la tabla remota utilizando el enlace de base de datos PROYECTO2
        UPDATE role@PROYECTO2 
        SET role = :NEW.role,
            created_at = :NEW.created_at,
            updated_at = :NEW.updated_at
        WHERE id = :OLD.id;
        
    ELSIF DELETING THEN
        -- Eliminar el registro correspondiente en la tabla remota utilizando el enlace de base de datos PROYECTO1
        DELETE FROM role@PROYECTO1 WHERE id = :OLD.id;
        
        -- Eliminar el registro correspondiente en la tabla remota utilizando el enlace de base de datos PROYECTO2
        DELETE FROM role@PROYECTO2 WHERE id = :OLD.id;
    END IF;
EXCEPTION
    WHEN OTHERS THEN
        -- Manejo de errores, si es necesario
        NULL;
END;
/
--
--users
CREATE OR REPLACE TRIGGER replicar_users
AFTER INSERT OR UPDATE OR DELETE ON users
FOR EACH ROW
BEGIN
    IF INSERTING THEN
        -- Insertar el registro en la tabla remota utilizando el enlace de base de datos PROYECTO1
        INSERT INTO users@PROYECTO1 (id, names, email, role_id, created_at, updated_at)
        VALUES (:NEW.id, :NEW.names, :NEW.email, :NEW.role_id, :NEW.created_at, :NEW.updated_at);
        
        -- Insertar el registro en la tabla remota utilizando el enlace de base de datos PROYECTO2
        INSERT INTO users@PROYECTO2 (id, names, email, role_id, created_at, updated_at)
        VALUES (:NEW.id, :NEW.names, :NEW.email, :NEW.role_id, :NEW.created_at, :NEW.updated_at);
        
    ELSIF UPDATING THEN
        -- Actualizar el registro correspondiente en la tabla remota utilizando el enlace de base de datos PROYECTO1
        UPDATE users@PROYECTO1 
        SET names = :NEW.names,
            email = :NEW.email,
            role_id = :NEW.role_id,
            created_at = :NEW.created_at,
            updated_at = :NEW.updated_at
        WHERE id = :OLD.id;
        
        -- Actualizar el registro correspondiente en la tabla remota utilizando el enlace de base de datos PROYECTO2
        UPDATE users@PROYECTO2 
        SET names = :NEW.names,
            email = :NEW.email,
            role_id = :NEW.role_id,
            created_at = :NEW.created_at,
            updated_at = :NEW.updated_at
        WHERE id = :OLD.id;
        
    ELSIF DELETING THEN
        -- Eliminar el registro correspondiente en la tabla remota utilizando el enlace de base de datos PROYECTO1
        DELETE FROM users@PROYECTO1 WHERE id = :OLD.id;
        
        -- Eliminar el registro correspondiente en la tabla remota utilizando el enlace de base de datos PROYECTO2
        DELETE FROM users@PROYECTO2 WHERE id = :OLD.id;
    END IF;
EXCEPTION
    WHEN OTHERS THEN
        -- Manejo de errores, si es necesario
        NULL;
END;
/

--genders
CREATE OR REPLACE TRIGGER replicar_genders
AFTER INSERT OR UPDATE OR DELETE ON genders
FOR EACH ROW
BEGIN
    IF INSERTING THEN
        -- Insertar el registro en la tabla remota utilizando el enlace de base de datos PROYECTO1
        INSERT INTO genders@PROYECTO1 (id, description)
        VALUES (:NEW.id, :NEW.description);
        
        -- Insertar el registro en la tabla remota utilizando el enlace de base de datos PROYECTO2
        INSERT INTO genders@PROYECTO2 (id, description)
        VALUES (:NEW.id, :NEW.description);
        
    ELSIF UPDATING THEN
        -- Actualizar el registro correspondiente en la tabla remota utilizando el enlace de base de datos PROYECTO1
        UPDATE genders@PROYECTO1 
        SET description = :NEW.description
        WHERE id = :OLD.id;
        
        -- Actualizar el registro correspondiente en la tabla remota utilizando el enlace de base de datos PROYECTO2
        UPDATE genders@PROYECTO2 
        SET description = :NEW.description
        WHERE id = :OLD.id;
        
    ELSIF DELETING THEN
        -- Eliminar el registro correspondiente en la tabla remota utilizando el enlace de base de datos PROYECTO1
        DELETE FROM genders@PROYECTO1 WHERE id = :OLD.id;
        
        -- Eliminar el registro correspondiente en la tabla remota utilizando el enlace de base de datos PROYECTO2
        DELETE FROM genders@PROYECTO2 WHERE id = :OLD.id;
    END IF;
EXCEPTION
    WHEN OTHERS THEN
        -- Manejo de errores, si es necesario
        NULL;
END;
/

--patients
CREATE OR REPLACE TRIGGER replicar_patients
AFTER INSERT OR UPDATE OR DELETE ON patients
FOR EACH ROW
BEGIN
    IF INSERTING THEN
        -- Insertar el registro en la tabla remota utilizando el enlace de base de datos PROYECTO1
        INSERT INTO patients@PROYECTO1 (
            id, 
            national_id, 
            names, 
            birth_date, 
            gender_id, 
            email, 
            phone_number, 
            emergency_contact_name, 
            emergency_contact_phone, 
            address, 
            created_at, 
            updated_at
        )
        VALUES (
            :NEW.id, 
            :NEW.national_id, 
            :NEW.names, 
            :NEW.birth_date, 
            :NEW.gender_id, 
            :NEW.email, 
            :NEW.phone_number, 
            :NEW.emergency_contact_name, 
            :NEW.emergency_contact_phone, 
            :NEW.address, 
            :NEW.created_at, 
            :NEW.updated_at
        );
        
        -- Insertar el registro en la tabla remota utilizando el enlace de base de datos PROYECTO2
        INSERT INTO patients@PROYECTO2 (
            id, 
            national_id, 
            names, 
            birth_date, 
            gender_id, 
            email, 
            phone_number, 
            emergency_contact_name, 
            emergency_contact_phone, 
            address, 
            created_at, 
            updated_at
        )
        VALUES (
            :NEW.id, 
            :NEW.national_id, 
            :NEW.names, 
            :NEW.birth_date, 
            :NEW.gender_id, 
            :NEW.email, 
            :NEW.phone_number, 
            :NEW.emergency_contact_name, 
            :NEW.emergency_contact_phone, 
            :NEW.address, 
            :NEW.created_at, 
            :NEW.updated_at
        );
        
    ELSIF UPDATING THEN
        -- Actualizar el registro correspondiente en la tabla remota utilizando el enlace de base de datos PROYECTO1
        UPDATE patients@PROYECTO1 
        SET national_id = :NEW.national_id, 
            names = :NEW.names, 
            birth_date = :NEW.birth_date, 
            gender_id = :NEW.gender_id, 
            email = :NEW.email, 
            phone_number = :NEW.phone_number, 
            emergency_contact_name = :NEW.emergency_contact_name, 
            emergency_contact_phone = :NEW.emergency_contact_phone, 
            address = :NEW.address, 
            created_at = :NEW.created_at, 
            updated_at = :NEW.updated_at
        WHERE id = :OLD.id;
        
        -- Actualizar el registro correspondiente en la tabla remota utilizando el enlace de base de datos PROYECTO2
        UPDATE patients@PROYECTO2 
        SET national_id = :NEW.national_id, 
            names = :NEW.names, 
            birth_date = :NEW.birth_date, 
            gender_id = :NEW.gender_id, 
            email = :NEW.email, 
            phone_number = :NEW.phone_number, 
            emergency_contact_name = :NEW.emergency_contact_name, 
            emergency_contact_phone = :NEW.emergency_contact_phone, 
            address = :NEW.address, 
            created_at = :NEW.created_at, 
            updated_at = :NEW.updated_at
        WHERE id = :OLD.id;
        
    ELSIF DELETING THEN
        -- Eliminar el registro correspondiente en la tabla remota utilizando el enlace de base de datos PROYECTO1
        DELETE FROM patients@PROYECTO1 WHERE id = :OLD.id;
        
        -- Eliminar el registro correspondiente en la tabla remota utilizando el enlace de base de datos PROYECTO2
        DELETE FROM patients@PROYECTO2 WHERE id = :OLD.id;
    END IF;
EXCEPTION
    WHEN OTHERS THEN
        -- Manejo de errores, si es necesario
        NULL;
END;
/

--doctors
CREATE OR REPLACE TRIGGER replicar_doctors
AFTER INSERT OR UPDATE OR DELETE ON doctors
FOR EACH ROW
BEGIN
    IF INSERTING THEN
        -- Insertar el registro en la tabla remota utilizando el enlace de base de datos PROYECTO1
        INSERT INTO doctors@PROYECTO1 (
            id, 
            national_id, 
            names, 
            specialty, 
            phone_number, 
            email
        )
        VALUES (
            :NEW.id, 
            :NEW.national_id, 
            :NEW.names, 
            :NEW.specialty, 
            :NEW.phone_number, 
            :NEW.email
        );
        
        -- Insertar el registro en la tabla remota utilizando el enlace de base de datos PROYECTO2
        INSERT INTO doctors@PROYECTO2 (
            id, 
            national_id, 
            names, 
            specialty, 
            phone_number, 
            email
        )
        VALUES (
            :NEW.id, 
            :NEW.national_id, 
            :NEW.names, 
            :NEW.specialty, 
            :NEW.phone_number, 
            :NEW.email
        );
        
    ELSIF UPDATING THEN
        -- Actualizar el registro correspondiente en la tabla remota utilizando el enlace de base de datos PROYECTO1
        UPDATE doctors@PROYECTO1 
        SET national_id = :NEW.national_id, 
            names = :NEW.names, 
            specialty = :NEW.specialty, 
            phone_number = :NEW.phone_number, 
            email = :NEW.email
        WHERE id = :OLD.id;
        
        -- Actualizar el registro correspondiente en la tabla remota utilizando el enlace de base de datos PROYECTO2
        UPDATE doctors@PROYECTO2 
        SET national_id = :NEW.national_id, 
            names = :NEW.names, 
            specialty = :NEW.specialty, 
            phone_number = :NEW.phone_number, 
            email = :NEW.email
        WHERE id = :OLD.id;
        
    ELSIF DELETING THEN
        -- Eliminar el registro correspondiente en la tabla remota utilizando el enlace de base de datos PROYECTO1
        DELETE FROM doctors@PROYECTO1 WHERE id = :OLD.id;
        
        -- Eliminar el registro correspondiente en la tabla remota utilizando el enlace de base de datos PROYECTO2
        DELETE FROM doctors@PROYECTO2 WHERE id = :OLD.id;
    END IF;
EXCEPTION
    WHEN OTHERS THEN
        -- Manejo de errores, si es necesario
        NULL;
END;
/

--medical_records
CREATE OR REPLACE TRIGGER replicar_medical_records
AFTER INSERT OR UPDATE OR DELETE ON medical_records
FOR EACH ROW
BEGIN
    IF INSERTING THEN
        -- Insertar el registro en la tabla remota utilizando el enlace de base de datos PROYECTO1
        INSERT INTO medical_records@PROYECTO1 (
            id, 
            patient_id, 
            blood_type, 
            allergies, 
            medical_conditions, 
            is_active, 
            created_at, 
            updated_at
        )
        VALUES (
            :NEW.id, 
            :NEW.patient_id, 
            :NEW.blood_type, 
            :NEW.allergies, 
            :NEW.medical_conditions, 
            :NEW.is_active, 
            :NEW.created_at, 
            :NEW.updated_at
        );
        
        -- Insertar el registro en la tabla remota utilizando el enlace de base de datos PROYECTO2
        INSERT INTO medical_records@PROYECTO2 (
            id, 
            patient_id, 
            blood_type, 
            allergies, 
            medical_conditions, 
            is_active, 
            created_at, 
            updated_at
        )
        VALUES (
            :NEW.id, 
            :NEW.patient_id, 
            :NEW.blood_type, 
            :NEW.allergies, 
            :NEW.medical_conditions, 
            :NEW.is_active, 
            :NEW.created_at, 
            :NEW.updated_at
        );
        
    ELSIF UPDATING THEN
        -- Actualizar el registro correspondiente en la tabla remota utilizando el enlace de base de datos PROYECTO1
        UPDATE medical_records@PROYECTO1 
        SET patient_id = :NEW.patient_id, 
            blood_type = :NEW.blood_type, 
            allergies = :NEW.allergies, 
            medical_conditions = :NEW.medical_conditions, 
            is_active = :NEW.is_active, 
            created_at = :NEW.created_at, 
            updated_at = :NEW.updated_at
        WHERE id = :OLD.id;
        
        -- Actualizar el registro correspondiente en la tabla remota utilizando el enlace de base de datos PROYECTO2
        UPDATE medical_records@PROYECTO2 
        SET patient_id = :NEW.patient_id, 
            blood_type = :NEW.blood_type, 
            allergies = :NEW.allergies, 
            medical_conditions = :NEW.medical_conditions, 
            is_active = :NEW.is_active, 
            created_at = :NEW.created_at, 
            updated_at = :NEW.updated_at
        WHERE id = :OLD.id;
        
    ELSIF DELETING THEN
        -- Eliminar el registro correspondiente en la tabla remota utilizando el enlace de base de datos PROYECTO1
        DELETE FROM medical_records@PROYECTO1 WHERE id = :OLD.id;
        
        -- Eliminar el registro correspondiente en la tabla remota utilizando el enlace de base de datos PROYECTO2
        DELETE FROM medical_records@PROYECTO2 WHERE id = :OLD.id;
    END IF;
EXCEPTION
    WHEN OTHERS THEN
        -- Manejo de errores, si es necesario
        NULL;
END;
/

--medical_entries
CREATE OR REPLACE TRIGGER replicar_medical_entries
AFTER INSERT OR UPDATE OR DELETE ON medical_entries
FOR EACH ROW
BEGIN
    IF INSERTING THEN
        -- Insertar el registro en la tabla remota utilizando el enlace de base de datos PROYECTO1
        INSERT INTO medical_entries@PROYECTO1 (
            id, 
            record_id, 
            doctor_id, 
            type, 
            description, 
            created_at, 
            updated_at
        )
        VALUES (
            :NEW.id, 
            :NEW.record_id, 
            :NEW.doctor_id, 
            :NEW.type, 
            :NEW.description, 
            :NEW.created_at, 
            :NEW.updated_at
        );
        
        -- Insertar el registro en la tabla remota utilizando el enlace de base de datos PROYECTO2
        INSERT INTO medical_entries@PROYECTO2 (
            id, 
            record_id, 
            doctor_id, 
            type, 
            description, 
            created_at, 
            updated_at
        )
        VALUES (
            :NEW.id, 
            :NEW.record_id, 
            :NEW.doctor_id, 
            :NEW.type, 
            :NEW.description, 
            :NEW.created_at, 
            :NEW.updated_at
        );
        
    ELSIF UPDATING THEN
        -- Actualizar el registro correspondiente en la tabla remota utilizando el enlace de base de datos PROYECTO1
        UPDATE medical_entries@PROYECTO1 
        SET record_id = :NEW.record_id, 
            doctor_id = :NEW.doctor_id, 
            type = :NEW.type, 
            description = :NEW.description, 
            created_at = :NEW.created_at, 
            updated_at = :NEW.updated_at
        WHERE id = :OLD.id;
        
        -- Actualizar el registro correspondiente en la tabla remota utilizando el enlace de base de datos PROYECTO2
        UPDATE medical_entries@PROYECTO2 
        SET record_id = :NEW.record_id, 
            doctor_id = :NEW.doctor_id, 
            type = :NEW.type, 
            description = :NEW.description, 
            created_at = :NEW.created_at, 
            updated_at = :NEW.updated_at
        WHERE id = :OLD.id;
        
    ELSIF DELETING THEN
        -- Eliminar el registro correspondiente en la tabla remota utilizando el enlace de base de datos PROYECTO1
        DELETE FROM medical_entries@PROYECTO1 WHERE id = :OLD.id;
        
        -- Eliminar el registro correspondiente en la tabla remota utilizando el enlace de base de datos PROYECTO2
        DELETE FROM medical_entries@PROYECTO2 WHERE id = :OLD.id;
    END IF;
EXCEPTION
    WHEN OTHERS THEN
        -- Manejo de errores, si es necesario
        NULL;
END;
/

--appointment_states
CREATE OR REPLACE TRIGGER replicar_appointment_states
AFTER INSERT OR UPDATE OR DELETE ON appointment_states
FOR EACH ROW
BEGIN
    IF INSERTING THEN
        -- Insertar el registro en la tabla remota utilizando el enlace de base de datos PROYECTO1
        INSERT INTO appointment_states@PROYECTO1 (
            id, 
            state_name
        )
        VALUES (
            :NEW.id, 
            :NEW.state_name
        );
        
        -- Insertar el registro en la tabla remota utilizando el enlace de base de datos PROYECTO2
        INSERT INTO appointment_states@PROYECTO2 (
            id, 
            state_name
        )
        VALUES (
            :NEW.id, 
            :NEW.state_name
        );
        
    ELSIF UPDATING THEN
        -- Actualizar el registro correspondiente en la tabla remota utilizando el enlace de base de datos PROYECTO1
        UPDATE appointment_states@PROYECTO1 
        SET state_name = :NEW.state_name
        WHERE id = :OLD.id;
        
        -- Actualizar el registro correspondiente en la tabla remota utilizando el enlace de base de datos PROYECTO2
        UPDATE appointment_states@PROYECTO2 
        SET state_name = :NEW.state_name
        WHERE id = :OLD.id;
        
    ELSIF DELETING THEN
        -- Eliminar el registro correspondiente en la tabla remota utilizando el enlace de base de datos PROYECTO1
        DELETE FROM appointment_states@PROYECTO1 WHERE id = :OLD.id;
        
        -- Eliminar el registro correspondiente en la tabla remota utilizando el enlace de base de datos PROYECTO2
        DELETE FROM appointment_states@PROYECTO2 WHERE id = :OLD.id;
    END IF;
EXCEPTION
    WHEN OTHERS THEN
        -- Manejo de errores, si es necesario
        NULL;
END;
/

