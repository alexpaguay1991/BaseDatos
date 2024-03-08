--- Table role : Maneja los roles de los usuarios
INSERT INTO role (role) VALUES ('Admin');
INSERT INTO role (role) VALUES ('Medico');

--- Table users: Maneja los usuarios del sistema
INSERT INTO users (names, email, role_id) VALUES ('Junior Stalin Jurado Peña', 'jsjurado2@espe.edu.ec', 1);
INSERT INTO users (names, email, role_id) VALUES ('Ivette Yulliana Roman Verdezoto', 'iyroman@espe.edu.ec', 2);
INSERT INTO users (names, email, role_id) VALUES ('Santiago Sagñay', 'santiago@espe.edu.ec', 1);
INSERT INTO users (names, email, role_id) VALUES ('Alex Paguay', 'alex@espe.edu.ec', 2);
INSERT INTO users (names, email, role_id) VALUES ('Christopher Zambrano', 'christopher@espe.edu.ec', 1);

---Table Genders: Maneja los generos de los pacientes
INSERT INTO genders (description) VALUES ('Masculino');
INSERT INTO genders (description) VALUES ('Femenino');
INSERT INTO genders (description) VALUES ('No binario');
INSERT INTO genders (description) VALUES ('Prefiero no decir');

---Table Patients: Maneja los pacientes del sistema
INSERT INTO patients (national_id, names, birth_date, gender_id, email, phone_number, address, emergency_contact_name, emergency_contact_phone) VALUES ('1720001111', 'Juan Martinez', TO_DATE('1985-04-15', 'YYYY-MM-DD'), 1, 'juan.martinez@example.com', '0998123456', 'Av. 6 de Diciembre s/n y Av. Colón, Quito', 'Maria Martinez', '0998567890');
INSERT INTO patients (national_id, names, birth_date, gender_id, email, phone_number, address, emergency_contact_name, emergency_contact_phone) VALUES ('1720002222', 'Andrea López', TO_DATE('1990-07-22', 'YYYY-MM-DD'), 2, 'andrea.lopez@example.com', '0999123456', 'Gil Ramírez D. 4-15 y Chapetones, Cuenca', 'Carlos López', '0999567890');
INSERT INTO patients (national_id, names, birth_date, gender_id, email, phone_number, address, emergency_contact_name, emergency_contact_phone) VALUES ('1720003333', 'Carlos Zambrano', TO_DATE('1978-02-05', 'YYYY-MM-DD'), 3, 'carlos.zambrano@example.com', '0997123456', 'DE LOS ACEITUNOS LT.66 Y AV.ELOY ALFARO, Guayaquil', 'Sofia Zambrano', '0996567890');
INSERT INTO patients (national_id, names, birth_date, gender_id, email, phone_number, address, emergency_contact_name, emergency_contact_phone) VALUES ('1720004444', 'Lucia Fernández', TO_DATE('1982-11-30', 'YYYY-MM-DD'), 2, 'lucia.fernandez@example.com', '0996123456', 'Calle Bolívar 1234 y Tarqui, Cuenca', 'Pedro Fernández', '0997567890');
INSERT INTO patients (national_id, names, birth_date, gender_id, email, phone_number, address, emergency_contact_name, emergency_contact_phone) VALUES ('1720005555', 'Miguel Ángel Torres', TO_DATE('1995-05-20', 'YYYY-MM-DD'), 1, 'miguel.torres@example.com', '0995123456', 'Av. Amazonas 456 y Naciones Unidas, Quito', 'Daniela Torres', '0998567891');

---Table Doctors: Maneja los doctores del sistema
INSERT INTO doctors (national_id, names, specialty, phone_number, email) VALUES ('1820001111', 'Ana Rivera', 'Fisioterapia', '0998123457', 'ana.rivera@example.com');
INSERT INTO doctors (national_id, names, specialty, phone_number, email) VALUES ('1820002222', 'David Molina', 'Fisioterapia', '0999123457', 'david.molina@example.com');
INSERT INTO doctors (national_id, names, specialty, phone_number, email) VALUES ('1820003333', 'Luisa Pérez', 'Fisioterapia', '0997123457', 'luisa.perez@example.com');
INSERT INTO doctors (national_id, names, specialty, phone_number, email) VALUES ('1820004444', 'Jorge Castillo', 'Fisioterapia', '0996123457', 'jorge.castillo@example.com');
INSERT INTO doctors (national_id, names, specialty, phone_number, email) VALUES ('1820005555', 'Carla Espinoza', 'Fisioterapia', '0995123457', 'carla.espinoza@example.com');

---Table Medical Records: Maneja los registros médicos de los pacientes
INSERT INTO medical_records (patient_id, blood_type, allergies, medical_conditions) VALUES ((SELECT id FROM patients WHERE national_id = '1720001111'), 'O+', 'Ninguna', 'Ninguna');
INSERT INTO medical_records (patient_id, blood_type, allergies, medical_conditions) VALUES ((SELECT id FROM patients WHERE national_id = '1720002222'), 'A+', 'Polen', 'Asma');
INSERT INTO medical_records (patient_id, blood_type, allergies, medical_conditions) VALUES ((SELECT id FROM patients WHERE national_id = '1720003333'), 'B+', 'Penicilina', 'Hipertensión');
INSERT INTO medical_records (patient_id, blood_type, allergies, medical_conditions) VALUES ((SELECT id FROM patients WHERE national_id = '1720004444'), 'AB-', 'Frutos secos', 'Diabetes tipo 2');
INSERT INTO medical_records (patient_id, blood_type, allergies, medical_conditions) VALUES ((SELECT id FROM patients WHERE national_id = '1720005555'), 'O-', 'Látex', 'Ninguna');

---Table medical_entries: Maneja las entradas médicas de los pacientes
INSERT INTO medical_entries (record_id, doctor_id, type, description) VALUES ((SELECT id FROM medical_records WHERE patient_id = (SELECT id FROM patients WHERE national_id = '1720001111')), (SELECT id FROM doctors WHERE national_id = '1820001111'), 'diagnóstico', 'El paciente muestra signos de recuperación satisfactoria.');
INSERT INTO medical_entries (record_id, doctor_id, type, description) VALUES ((SELECT id FROM medical_records WHERE patient_id = (SELECT id FROM patients WHERE national_id = '1720002222')), (SELECT id FROM doctors WHERE national_id = '1820002222'), 'tratamiento', 'Se prescribe tratamiento antiinflamatorio durante 14 días.');
INSERT INTO medical_entries (record_id, doctor_id, type, description) VALUES ((SELECT id FROM medical_records WHERE patient_id = (SELECT id FROM patients WHERE national_id = '1720003333')), (SELECT id FROM doctors WHERE national_id = '1820003333'), 'nota', 'El paciente necesita seguimiento adicional para evaluar la evolución.');

---Table appointment_states: Maneja los estados de las citas médicas
INSERT INTO appointment_states (state_name) VALUES ('Completada');
INSERT INTO appointment_states (state_name) VALUES ('Cancelada');
INSERT INTO appointment_states (state_name) VALUES ('No asistió');


