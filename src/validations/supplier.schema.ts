import { object, string, TypeOf } from "zod";

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

        companyName: string({
            required_error: 'Nombre de la empresa es requerido'
        })
        .min(2, { message: 'Debe tener 2 o más caracteres de largo'})
        .trim(),

        companyLocation: string({
            required_error: 'Ubicación de la empresa es requerido'
        })
        .min(2, { message: 'Debe tener 2 o más caracteres de largo'})
        .trim(),

        companyPhone1: string({ required_error: 'Telefono es requerido'}).trim(),

        companyPhone2: string().trim(),

        companyRtn: string()
        .min(14, { message: 'Debe tener 14 o más caracteres de largo'})
        .trim(),

        companyLogo: string().trim(),

        workPosition: string().trim(),

        title: string().trim()
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

        companyName: string({
            required_error: 'Nombre de la empresa es requerido'
        })
        .min(2, { message: 'Debe tener 2 o más caracteres de largo'})
        .trim(),

        companyLocation: string()
        .min(2, { message: 'Debe tener 2 o más caracteres de largo'})
        .trim()
        .optional(),

        companyPhone1: string().trim().optional(),

        companyPhone2: string().trim().optional(),

        companyRtn: string()
        .min(14, { message: 'Debe tener 14 o más caracteres de largo'})
        .trim()
        .optional(),

        companyLogo: string().trim().optional(),

        workPosition: string().trim().optional(),

        title: string().trim().optional()

    })
};

const params = {
    params: object({
        supplierId: string({
            required_error: 'Supplier ID es requerido'
        }),
    }),
};

export const createSupplierSchema = object({
    ...payload
});

export const getSupplierSchema = object({
    ...params 
});

export const updateSupplierSchema = object({
    ...updatePayload,
    ...params
});

export const deleteSupplierSchema = object({
    ...params 
});

export type CreateSupplierInput = TypeOf<typeof createSupplierSchema>;
export type UpdateSupplierInput = TypeOf<typeof updateSupplierSchema>;
export type ReadSupplierInput = TypeOf<typeof getSupplierSchema>;
export type DeleteSupplierInput = TypeOf<typeof deleteSupplierSchema>;