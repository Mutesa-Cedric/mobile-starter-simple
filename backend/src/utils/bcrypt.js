const { compare, hash } = require("bcrypt");

const hashPassword = async (password) => {
    const hashedPassword = await hash(password, 10);
    return hashedPassword;
};


const comparePassword = async (password, encryptedPassword) => {
    if (!encryptedPassword) return false;
    return await compare(password, encryptedPassword);
}


module.exports = {
    hashPassword,
    comparePassword
}