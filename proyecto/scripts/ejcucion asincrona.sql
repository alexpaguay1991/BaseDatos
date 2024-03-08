BEGIN
    DBMS_SCHEDULER.CREATE_JOB (
        job_name => 'REPLICAR_TRIGGERS_JOB',
        job_type => 'PLSQL_BLOCK',
        job_action => 'BEGIN
                            replicar_role;
                            replicar_users;
                            replicar_genders;
                            replicar_appointment_states;
                            replicar_patients;
                            replicar_doctors;
                            replicar_medical_records;
                            replicar_medical_entries;
                            replicar_appointments;
                        END;',
        start_date => SYSTIMESTAMP + INTERVAL '1' MINUTE, -- Inicia después de 1 minuto
        repeat_interval => 'FREQ=MINUTELY; INTERVAL=1', -- Se ejecuta cada minuto
        enabled => TRUE
    );
END;
/

