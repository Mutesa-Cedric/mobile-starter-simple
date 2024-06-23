const { z } = require('zod');

//structure of the user
const userSchema = z.object({
    name: z.string().min(3),
    email: z.string().email(),
    password: z.string().min(6),
});

// validate given input data to the user schema
const validateUser = (data) => {
    const user = userSchema.safeParse(data);
    if (!user.success) {
        throw new Error(user.error.errors[0].message);
    }
    return user.data;
}

module.exports ={
    validateUser
}

