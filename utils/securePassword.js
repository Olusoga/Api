const bcrypt = require('bcryptjs');
const securePassword = async (password) =>{
    const salt = await genSalt(10);
    const hashedpassword = await bycrypt.hash(password, salt)
    return hashedpassword;
};

module.exports = securePassword;