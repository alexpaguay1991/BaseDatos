export const validatePatient = (patient) => {
    const fields = [
        { value: patient.national_id, message: "La cédula es obligatoria." },
        { value: patient.names, message: "El nombre es obligatorio." },
        {
            value: patient.birth_date,
            message: "La fecha de nacimiento es obligatoria.",
        },
        { value: patient.gender_id, message: "El género es obligatorio." },
        { value: patient.email, message: "El email es obligatorio." },
        { value: patient.phone_number, message: "El teléfono es obligatorio." },
        { value: patient.address, message: "La dirección es obligatoria." },
    ];

    for (const { value, message } of fields) {
        if (!value || (typeof value === "number" && value === '0')) {
            return message; // Retorna el primer mensaje de error encontrado
        }
    }
    return ""; // No se encontraron errores
};

export const validateDoctor = (doctor) => {
    const fields = [
        { value: doctor.national_id, message: "La cédula es obligatoria." },
        { value: doctor.names, message: "El nombre es obligatorio." },
        { value: doctor.specialty, message: "La especialidad es obligatoria." },
        { value: doctor.phone_number, message: "El teléfono es obligatorio." },
        { value: doctor.email, message: "El email es obligatorio." },
        { value: doctor.password, message: "La contraseña es obligatoria." }
    ];

    for (const { value, message } of fields) {
        if (!value || (typeof value === "number" && value === '0')) {
            return message;
        }
    }
    return "";
}