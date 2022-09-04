import { object, string, number, boolean, TypeOf } from "zod";

const payload = {
    body: object({
        identidad: string({
            required_error: 'Identidad es requerida'
        })
        .trim(),

        name: string({
            required_error: 'Nombre es requerido'
        })
        .min(2, { message: 'Debe tener 2 o más caracteres de largo'})
        .trim(),

        lastName: string({
            required_error: 'Last Name is required'
        }).min(2, { message: 'Debe tener 2 o más caracteres de largo'})
        .trim(),

        rtn: string()
            .min(14, { message: 'Debe tener 14 o más caracteres de largo'})
            .trim(),

        gender: string().trim(),
        
        birth: string(),

        email: string({
            required_error: 'Email es requerido'
        })
        .trim()
        .email('No es un email valido'),

        phone1: string({ required_error: 'Telefono es requerido'}).trim(),

        phone2: string().trim(),

        location: string().trim(),

        country: string().trim(),

        city: string().trim(),

        website: string().trim(),

        facebook: string().trim(),

        twitter: string().trim(),

        linkedin: string().trim(),

        creditLimit: number({ required_error: 'Limite de credito es requerido'}).positive(),
        
        payIVA: boolean({ required_error: 'Paga IVA es requerido'})
    })
};

const updatePayload = {
    body: object({
        identidad: string({
            invalid_type_error: 'Identidad must be a string'
        })
        .trim()
        .min(2, { message: 'Debe tener 2 o más caracteres de largo'})
        .optional(),

        name: string({
            invalid_type_error: 'Identidad must be a string'
        })
        .trim()
        .min(2, { message: 'Debe tener 2 o más caracteres de largo'})
        .optional(),

        lastName: string({
            invalid_type_error: 'Last Name must be a string'
        })
        .trim()
        .min(2, { message: 'Debe tener 2 o más caracteres de largo'})
        .optional(),

        rtn: string({
            invalid_type_error: 'RTN must be a string'
        })
        .trim()
        .optional(),

        gender: string({
            invalid_type_error: 'Gender must be a string'
        })
        .trim()
        .optional(),
        
        birth: string().optional(),

        email: string({
            invalid_type_error: 'Email must be a string'
        })
        .trim()
        .email('Not a valid email')
        .optional(),

        phone1: string().optional(),

        phone2: string().optional(),

        location: string().optional(),

        country: string().optional(),

        city: string().optional(),

        facebook: string().optional(),

        twitter: string().optional(),

        linkedin: string().optional(),

        creditLimit: number().positive().optional(),
        
        payIVA: boolean().optional()

    })
};

const params = {
    params: object({
        customerId: string({
            required_error: 'Customer ID es requerido'
        }),
    }),
};

export const createCustomerSchema = object({
    ...payload
});

export const getCustomerSchema = object({
    ...params 
});

export const updateCustomerSchema = object({
    ...updatePayload,
    ...params
});

export const deleteCustomerSchema = object({
    ...params 
});

export type CreateCustomerInput = TypeOf<typeof createCustomerSchema>;
export type UpdateCustomerInput = TypeOf<typeof updateCustomerSchema>;
export type ReadCustomerInput = TypeOf<typeof getCustomerSchema>;
export type DeleteCustomerInput = TypeOf<typeof deleteCustomerSchema>;