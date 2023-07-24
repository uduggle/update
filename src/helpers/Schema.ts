import Joi from 'joi';


//User Register Schema

export const registerSchema = Joi.object({
  name: Joi.string().min(4).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});

// Subcategory Create Schema

export const subSchema = Joi.object({
  discription: Joi.string().min(7).optional(),
  subname: Joi.string().min(4).required(),
  subimage: Joi.string().required(),
  cat_catId: Joi.number().required()
});

// Subcategory update Schema

export const subSchemaupdate = Joi.object({
  discription: Joi.string().min(7).optional(),
  subname: Joi.string().min(4).required(),
  subimage: Joi.string().required(),
});

// /Create Product Schema

export const createProduct = Joi.object({
  proname     : Joi.string().min(4).required(),   
  proStock    : Joi.number().required(), 
  proPrice    : Joi.number().required(),   
  proimage    : Joi.string().required(),   
  proDescription : Joi.string().min(7).required(),
  subId : Joi.number().required()
})
export const updateProduct = Joi.object({
  proname     : Joi.string().min(4).required(),   
  proStock    : Joi.number().required(), 
  proPrice    : Joi.number().required(),   
  proimage    : Joi.string().required(),   
  proDescription : Joi.string().min(7).required()
})

