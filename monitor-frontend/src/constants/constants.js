export const sensorSelectStyles = {
    control: (provided) => ({
        ...provided,
        border: `2px solid #000`,
    }),
}

export const notificationOptions = [
    {label: "Email", value: "EMAIL"},
    {label: "Text Message", value: "SMS"},
    {label: "Voice Message", value: "VOICE"}
]

export const notificationSelectStyles = {
    control: (provided) => ({
        ...provided,
        width: 300
    }),
}