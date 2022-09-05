import { object, string, TypeOf, z } from "zod";

enum Gender { Male, Female };

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
            required_error: 'Apellido es requerido'
        }).min(2, { message: 'Debe tener 2 o más caracteres de largo'})
        .trim(),

        username: string({
            required_error: 'Nombre de usuario es requerido'
        })
        .min(2, { message: 'Debe tener 2 o más caracteres de largo'})
        .trim(),

        rtn: string()
            .min(14, { message: 'Debe tener 14 o más caracteres de largo'})
            .trim(),

        gender: string().trim(),

        rol: string({
            required_error: 'Rol de usuario es requerido'
        }).trim(),
        
        birth: string(),

        email: string({
            required_error: 'Email es requerido'
        })
        .trim()
        .email('No es un email valido'),

        password: string({
            required_error: 'Password es requerida'
        }).min(6, 'Contraseña debe tener un mínimo de 6 caracteres'),

        passwordConfirm: string({
            required_error: 'Password es requerida'
        }).min(6, 'Contraseña de confirmación debe tener un mínimo de 6 caracteres'),

        phone1: string({ required_error: 'Telefono es requerido'}).trim(),

        phone2: string().trim(),

        location: string().trim(),

        country: string().trim(),

        city: string().trim(),

        website: string().trim(),

        facebook: string().trim(),

        twitter: string().trim(),

        linkedin: string().trim(),

        workLocation: string().trim(),

    }).refine((data) => data.password === data.passwordConfirm, {
        message: 'Password do not match',
        path: ['passwordConfirm']
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

        username: string({
            invalid_type_error: 'Username must be a string'
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

        website: string().optional(),

        facebook: string().optional(),

        twitter: string().optional(),

        linkedin: string().optional(),

        workLocation: string().optional()
    })
};

const loginPayload = {
    body: object({
        username: string({
            required_error: 'Nombre de usuario es requerido'
        }).trim(),
        password: string({
            required_error: 'Password es requerido'
        })
    }).strict()
}

const params = {
    params: object({
        userId: string({
            required_error: 'User ID es requerido'
        }),
    }),
};

export const createUserSchema = object({
    ...payload
});

export const getUserSchema = object({
    ...params 
});

export const updateUserSchema = object({
    ...updatePayload,
    ...params
});

export const deleteUserSchema = object({
    ...params 
});

export const loginSchema = object({
    ...loginPayload
});

export const updateProfileSchema = object({
    ...updatePayload
})

export type CreateUserInput = Omit<TypeOf<typeof createUserSchema>, 'body.passwordConfirm'>;
export type UpdateUserInput = TypeOf<typeof updateUserSchema>;
export type ReadUserInput = TypeOf<typeof getUserSchema>;
export type DeleteUserInput = TypeOf<typeof deleteUserSchema>;
export type LoginUserInput = TypeOf<typeof loginSchema>; 
export type ProfileUserInput = TypeOf<typeof updateProfileSchema>;