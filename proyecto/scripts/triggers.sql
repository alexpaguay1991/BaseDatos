CREATE OR REPLACE TRIGGER replicar_role
AFTER INSERT OR UPDATE OR DELETE ON role
FOR EACH ROW
BEGIN
    IF INSERTING THEN
        INSERT INTO role@PROYECTO1 (id, role, created_at, updated_at)
        VALUES (:NEW.id, :NEW.role, :NEW.created_at, :NEW.updated_at);
        
        INSERT INTO role@PROYECTO2 (id, role, created_at, updated_at)
        VALUES (:NEW.id, :NEW.role, :NEW.created_at, :NEW.updated_at);
        
    ELSIF UPDATING THEN
        UPDATE role@PROYECTO1 
        SET role = :NEW.role,
            created_at = :NEW.created_at,
            updated_at = :NEW.updated_at
        WHERE id = :OLD.id;
        
        UPDATE role@PROYECTO2 
        SET role = :NEW.role,
            created_at = :NEW.created_at,
            updated_at = :NEW.updated_at
        WHERE id = :OLD.id;
        
    ELSIF DELETING THEN
        DELETE FROM role@PROYECTO1 WHERE id = :OLD.id;
        DELETE FROM role@PROYECTO2 WHERE id = :OLD.id;
    END IF;
EXCEPTION
    WHEN OTHERS THEN
        NULL;
END;
/
---tabla users
CREATE OR REPLACE TRIGGER replicar_users
AFTER INSERT OR UPDATE OR DELETE ON users
FOR EACH ROW
BEGIN
    IF INSERTING THEN
        INSERT INTO users@PROYECTO1 (id, names, email, role_id, created_at, updated_at)
        VALUES (:NEW.id, :NEW.names, :NEW.email, :NEW.role_id, :NEW.created_at, :NEW.updated_at);
        
        INSERT INTO users@PROYECTO2 (id, names, email, role_id, created_at, updated_at)
        VALUES (:NEW.id, :NEW.names, :NEW.email, :NEW.role_id, :NEW.created_at, :NEW.updated_at);
        
    ELSIF UPDATING THEN
        UPDATE users@PROYECTO1 
        SET names = :NEW.names,
            email = :NEW.email,
            role_id = :NEW.role_id,
            created_at = :NEW.created_at,
            updated_at = :NEW.updated_at
        WHERE id = :OLD.id;
        
        UPDATE users@PROYECTO2 
        SET names = :NEW.names,
            email = :NEW.email,
            role_id = :NEW.role_id,
            created_at = :NEW.created_at,
            updated_at = :NEW.updated_at
        WHERE id = :OLD.id;
        
    ELSIF DELETING THEN
        DELETE FROM users@PROYECTO1 WHERE id = :OLD.id;
        DELETE FROM users@PROYECTO2 WHERE id = :OLD.id;
    END IF;
EXCEPTION
    WHEN OTHERS THEN
        NULL;
END;
/

--genders
CREATE OR REPLACE TRIGGER replicar_genders
AFTER INSERT OR UPDATE OR DELETE ON genders
FOR EACH ROW
BEGIN
    IF INSERTING THEN
        INSERT INTO genders@PROYECTO1 (id, description)
        VALUES (:NEW.id, :NEW.description);
        
        INSERT INTO genders@PROYECTO2 (id, description)
        VALUES (:NEW.id, :NEW.description);
        
    ELSIF UPDATING THEN
        UPDATE genders@PROYECTO1 
        SET description = :NEW.description
        WHERE id = :OLD.id;
        
        UPDATE genders@PROYECTO2 
        SET description = :NEW.description
        WHERE id = :OLD.id;
        
    ELSIF DELETING THEN
        DELETE FROM genders@PROYECTO1 WHERE id = :OLD.id;
        DELETE FROM genders@PROYECTO2 WHERE id = :OLD.id;
    END IF;
EXCEPTION
    WHEN OTHERS THEN
        NULL;
END;
/
---appointment_states
CREATE OR REPLACE TRIGGER replicar_appointment_states
AFTER INSERT OR UPDATE OR DELETE ON appointment_states
FOR EACH ROW
BEGIN
    IF INSERTING THEN
        INSERT INTO appointment_states@PROYECTO1 (id, state_name)
        VALUES (:NEW.id, :NEW.state_name);
        
        INSERT INTO appointment_states@PROYECTO2 (id, state_name)
        VALUES (:NEW.id, :NEW.state_name);
        
    ELSIF UPDATING THEN
        UPDATE appointment_states@PROYECTO1 
        SET state_name = :NEW.state_name
        WHERE id = :OLD.id;
        
        UPDATE appointment_states@PROYECTO2 
        SET state_name = :NEW.state_name
        WHERE id = :OLD.id;
        
    ELSIF DELETING THEN
        DELETE FROM appointment_states@PROYECTO1 WHERE id = :OLD.id;
        DELETE FROM appointment_states@PROYECTO2 WHERE id = :OLD.id;
    END IF;
EXCEPTION
    WHEN OTHERS THEN
        NULL;
END;
/
---patients
CREATE OR REPLACE TRIGGER replicar_patients
AFTER INSERT OR UPDATE OR DELETE ON patients
FOR EACH ROW
BEGIN
    IF INSERTING THEN
        INSERT INTO patients@PROYECTO1 (id, national_id, names, birth_date, gender_id, email, phone_number, emergency_contact_name, emergency_contact_phone, address, created_at, updated_at)
        VALUES (:NEW.id, :NEW.national_id, :NEW.names, :NEW.birth_date, :NEW.gender_id, :NEW.email, :NEW.phone_number, :NEW.emergency_contact_name, :NEW.emergency_contact_phone, :NEW.address, :NEW.created_at, :NEW.updated_at);
        
        INSERT INTO patients@PROYECTO2 (id, national_id, names, birth_date, gender_id, email, phone_number, emergency_contact_name, emergency_contact_phone, address, created_at, updated_at)
        VALUES (:NEW.id, :NEW.national_id, :NEW.names, :NEW.birth_date, :NEW.gender_id, :NEW.email, :NEW.phone_number, :NEW.emergency_contact_name, :NEW.emergency_contact_phone, :NEW.address, :NEW.created_at, :NEW.updated_at);
        
    ELSIF UPDATING THEN
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
        DELETE FROM patients@PROYECTO1 WHERE id = :OLD.id;
        DELETE FROM patients@PROYECTO2 WHERE id = :OLD.id;
    END IF;
EXCEPTION
    WHEN OTHERS THEN
        NULL;
END;
/
---doctors
CREATE OR REPLACE TRIGGER replicar_doctors
AFTER INSERT OR UPDATE OR DELETE ON doctors
FOR EACH ROW
BEGIN
    IF INSERTING THEN
        INSERT INTO doctors@PROYECTO1 (id, national_id, names, specialty, phone_number, email, role_id)
        VALUES (:NEW.id, :NEW.national_id, :NEW.names, :NEW.specialty, :NEW.phone_number, :NEW.email, :NEW.role_id);
        
        INSERT INTO doctors@PROYECTO2 (id, national_id, names, specialty, phone_number, email, role_id)
        VALUES (:NEW.id, :NEW.national_id, :NEW.names, :NEW.specialty, :NEW.phone_number, :NEW.email, :NEW.role_id);
        
    ELSIF UPDATING THEN
        UPDATE doctors@PROYECTO1 
        SET national_id = :NEW.national_id,
            names = :NEW.names,
            specialty = :NEW.specialty,
            phone_number = :NEW.phone_number,
            email = :NEW.email,
            role_id = :NEW.role_id
        WHERE id = :OLD.id;
        
        UPDATE doctors@PROYECTO2 
        SET national_id = :NEW.national_id,
            names = :NEW.names,
            specialty = :NEW.specialty,
            phone_number = :NEW.phone_number,
            email = :NEW.email,
            role_id = :NEW.role_id
        WHERE id = :OLD.id;
        
    ELSIF DELETING THEN
        DELETE FROM doctors@PROYECTO1 WHERE id = :OLD.id;
        DELETE FROM doctors@PROYECTO2 WHERE id = :OLD.id;
    END IF;
EXCEPTION
    WHEN OTHERS THEN
        NULL;
END;
/
--medical records
CREATE OR REPLACE TRIGGER replicar_medical_records
AFTER INSERT OR UPDATE OR DELETE ON medical_records
FOR EACH ROW
BEGIN
    IF INSERTING THEN
        INSERT INTO medical_records@PROYECTO1 (id, patient_id, blood_type, allergies, medical_conditions, is_active, created_at, updated_at)
        VALUES (:NEW.id, :NEW.patient_id, :NEW.blood_type, :NEW.allergies, :NEW.medical_conditions, :NEW.is_active, :NEW.created_at, :NEW.updated_at);
        
        INSERT INTO medical_records@PROYECTO2 (id, patient_id, blood_type, allergies, medical_conditions, is_active, created_at, updated_at)
        VALUES (:NEW.id, :NEW.patient_id, :NEW.blood_type, :NEW.allergies, :NEW.medical_conditions, :NEW.is_active, :NEW.created_at, :NEW.updated_at);
        
    ELSIF UPDATING THEN
        UPDATE medical_records@PROYECTO1 
        SET patient_id = :NEW.patient_id,
            blood_type = :NEW.blood_type,
            allergies = :NEW.allergies,
            medical_conditions = :NEW.medical_conditions,
            is_active = :NEW.is_active,
            created_at = :NEW.created_at,
            updated_at = :NEW.updated_at
        WHERE id = :OLD.id;
        
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
        DELETE FROM medical_records@PROYECTO1 WHERE id = :OLD.id;
        DELETE FROM medical_records@PROYECTO2 WHERE id = :OLD.id;
    END IF;
EXCEPTION
    WHEN OTHERS THEN
        NULL;
END;
/
--medical entries
CREATE OR REPLACE TRIGGER replicar_medical_entries
AFTER INSERT OR UPDATE OR DELETE ON medical_entries
FOR EACH ROW
BEGIN
    IF INSERTING THEN
        INSERT INTO medical_entries@PROYECTO1 (id, record_id, doctor_id, type, description, created_at, updated_at)
        VALUES (:NEW.id, :NEW.record_id, :NEW.doctor_id, :NEW.type, :NEW.description, :NEW.created_at, :NEW.updated_at);
        
        INSERT INTO medical_entries@PROYECTO2 (id, record_id, doctor_id, type, description, created_at, updated_at)
        VALUES (:NEW.id, :NEW.record_id, :NEW.doctor_id, :NEW.type, :NEW.description, :NEW.created_at, :NEW.updated_at);
        
    ELSIF UPDATING THEN
        UPDATE medical_entries@PROYECTO1 
        SET record_id = :NEW.record_id,
            doctor_id = :NEW.doctor_id,
            type = :NEW.type,
            description = :NEW.description,
            created_at = :NEW.created_at,
            updated_at = :NEW.updated_at
        WHERE id = :OLD.id;
        
        UPDATE medical_entries@PROYECTO2 
        SET record_id = :NEW.record_id,
            doctor_id = :NEW.doctor_id,
            type = :NEW.type,
            description = :NEW.description,
            created_at = :NEW.created_at,
            updated_at = :NEW.updated_at
        WHERE id = :OLD.id;
        
    ELSIF DELETING THEN
        DELETE FROM medical_entries@PROYECTO1 WHERE id = :OLD.id;
        DELETE FROM medical_entries@PROYECTO2 WHERE id = :OLD.id;
    END IF;
EXCEPTION
    WHEN OTHERS THEN
        NULL;
END;
/
--appointments
CREATE OR REPLACE TRIGGER replicar_appointments
AFTER INSERT OR UPDATE OR DELETE ON appointments
FOR EACH ROW
BEGIN
    IF INSERTING THEN
        INSERT INTO appointments@PROYECTO1 (id, scheduler_id, patient_id, doctor_id, appointment_date, start_time, state_id, created_at, updated_at)
        VALUES (:NEW.id, :NEW.scheduler_id, :NEW.patient_id, :NEW.doctor_id, :NEW.appointment_date, :NEW.start_time, :NEW.state_id, :NEW.created_at, :NEW.updated_at);
        
        INSERT INTO appointments@PROYECTO2 (id, scheduler_id, patient_id, doctor_id, appointment_date, start_time, state_id, created_at, updated_at)
        VALUES (:NEW.id, :NEW.scheduler_id, :NEW.patient_id, :NEW.doctor_id, :NEW.appointment_date, :NEW.start_time, :NEW.state_id, :NEW.created_at, :NEW.updated_at);
        
    ELSIF UPDATING THEN
        UPDATE appointments@PROYECTO1 
        SET scheduler_id = :NEW.scheduler_id,
            patient_id = :NEW.patient_id,
            doctor_id = :NEW.doctor_id,
            appointment_date = :NEW.appointment_date,
            start_time = :NEW.start_time,
            state_id = :NEW.state_id,
            created_at = :NEW.created_at,
            updated_at = :NEW.updated_at
        WHERE id = :OLD.id;
        
        UPDATE appointments@PROYECTO2 
        SET scheduler_id = :NEW.scheduler_id,
            patient_id = :NEW.patient_id,
            doctor_id = :NEW.doctor_id,
            appointment_date = :NEW.appointment_date,
            start_time = :NEW.start_time,
            state_id = :NEW.state_id,
            created_at = :NEW.created_at,
            updated_at = :NEW.updated_at
        WHERE id = :OLD.id;
        
    ELSIF DELETING THEN
        DELETE FROM appointments@PROYECTO1 WHERE id = :OLD.id;
        DELETE FROM appointments@PROYECTO2 WHERE id = :OLD.id;
    END IF;
EXCEPTION
    WHEN OTHERS THEN
        NULL;
END;
/
