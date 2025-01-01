export interface User {
    id: string
    name: string
    email: string
    phone_number: string
    photo_filename: string
    created_at: string
    is_admin: string
    isBroker: string
    Broker_name: string | null
    Broker_phone: string | null
    Broker_address: string | null
    Broker_email: string | null
}