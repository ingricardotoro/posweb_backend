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

        nameCategory: string({
            required_error: 'Nombre de categoría es requirido'
        }).min(2, { message: 'Debe tener 2 o más caracteres de largo'})
        .trim(),

        description: string().trim()
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

        nameCategory: string()
            .min(2, { message: 'Debe tener 2 o más caracteres de largo'})
            .trim()
            .optional(),

        description: string().trim().optional()
    })
};

const params = {
    params: object({
        categoryId: string({
            required_error: 'Category ID es requerido'
        }),
    }),
};

export const createCategorySchema = object({
    ...payload
});

export const getCategorySchema = object({
    ...params 
});

export const updateCategorySchema = object({
    ...updatePayload,
    ...params
});

export const deleteCategorySchema = object({
    ...params 
});

export type CreateCategoryInput = TypeOf<typeof createCategorySchema>;
export type UpdateCategoryInput = TypeOf<typeof updateCategorySchema>;
export type ReadCategoryInput = TypeOf<typeof getCategorySchema>;
export type DeleteCategoryInput = TypeOf<typeof deleteCategorySchema>;