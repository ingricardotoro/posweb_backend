import { object, string, number, TypeOf } from "zod";

const payload = {
    body: object({
        index: number({
            required_error: 'Indice de area padre es requerida'
        })
        .positive(),

        parentCode: number({
            required_error: 'Area padre es requerido'
        })
        .positive(),

        nameArea: string({
            required_error: 'Nombre de area es requerido'
        }).min(2, { message: 'Debe tener 2 o más caracteres de largo'})
        .trim(),

        employee: string({
            required_error: 'Employee ID es requerido'
        }),

        phoneArea: string({ required_error: 'Telefono es requerido'}).trim(),

        details: string().trim()
    })
};

const updatePayload = {
    body: object({
        index: number()
        .positive()
        .optional(),

        parentCode: number()
        .positive()
        .optional(),

        nameArea: string()
            .min(2, { message: 'Debe tener 2 o más caracteres de largo'})
            .trim()
            .optional(),

        employee: string().optional(),

        phoneArea: string({ required_error: 'Telefono es requerido'}).trim(),

        details: string().trim().optional()

    })
};

const params = {
    params: object({
        areaId: string({
            required_error: 'Area ID es requerido'
        }),
    }),
};

export const createAreaSchema = object({
    ...payload
});

export const getAreaSchema = object({
    ...params 
});

export const updateAreaSchema = object({
    ...updatePayload,
    ...params
});

export const deleteAreaSchema = object({
    ...params 
});

export type CreateAreaInput = TypeOf<typeof createAreaSchema>;
export type UpdateAreaInput = TypeOf<typeof updateAreaSchema>;
export type ReadAreaInput = TypeOf<typeof getAreaSchema>;
export type DeleteAreaInput = TypeOf<typeof deleteAreaSchema>;