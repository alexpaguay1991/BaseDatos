---DROP VIEW IF EXISTS view_appointments;

DROP VIEW IF EXISTS view_appointments;
CREATE OR REPLACE VIEW view_appointments AS
SELECT
    a.id AS appointment_id,
    d.id AS doctor_id,
    d.names AS doctor_name,         -- Nombre del doctor
    u.id AS scheduler_id,
    u.names AS scheduler_name,      -- Nombre de quien agenda la cita
    p.id AS patient_id,
    p.names AS patient_name,        -- Nombre del paciente
    TO_CHAR(a.appointment_date, 'YYYY-MM-DD') AS appointment_date,
    TO_CHAR(a.start_time, 'HH24:MI:SS') AS start_time
FROM 
    appointments a
    JOIN doctors d ON a.doctor_id = d.id
    JOIN users u ON a.scheduler_id = u.id
    JOIN patients p ON a.patient_id = p.id;



CREATE OR REPLACE VIEW available_appointments AS
SELECT
    d.id as doctor_id,
    TO_CHAR(ad.appointment_date, 'YYYY-MM-DD') AS appointment_date, 
    TO_CHAR(TO_DATE('00:00:00', 'HH24:MI:SS') + NUMTODSINTERVAL(hours.hour, 'HOUR'), 'HH24:MI:SS') as available_start_time
FROM
    (SELECT id FROM doctors) d
CROSS JOIN 
    (SELECT LEVEL + 7 AS hour FROM dual CONNECT BY LEVEL <= 9) hours 
CROSS JOIN
    (SELECT DISTINCT appointment_date FROM appointments) ad
LEFT JOIN 
    appointments a ON
    a.doctor_id = d.id AND
    a.appointment_date = ad.appointment_date AND
    EXTRACT(hour FROM CAST(a.start_time AS TIMESTAMP)) = hours.hour
WHERE
    a.id IS NULL 
ORDER BY
    d.id, ad.appointment_date, hours.hour;


