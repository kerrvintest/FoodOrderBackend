export interface CreateVendorInputs {
    name: string;
    ownerName: string;
    foodType: [string];
    pincode: string;
    address: string;
    phone: string;
    email: string;
    password: string;
}

export interface EditVendorInputes{
    name: string;
    foodType: [string];
    address: string;
    phone: string;
}

export interface VendorLoginInputs {
    email: string;
    password: string;
}

export interface VendorPayload {
    _id: string,
    email: string,
    name: string,
    foodTypes: [string]
}