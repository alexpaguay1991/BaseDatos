
export const initialPatientState = () => {
    return {
        national_id: "",
        names: "",
        birth_date: "",
        gender_id: 0,
        email: "",
        phone_number: "",
        address: "",
        emergency_contact_name: "",
        emergency_contact_phone: "",
    }
};

export const initialDoctorState = () => {
    return {
        national_id: "",
        names: "",
        specialty: "",
        phone_number: "",
        email: "",
        password: "",
    }
};

export const initialUserState = () => {
    return {
        names: "",
        email: "",
        role_id: 0,
        password: "",
    }
}