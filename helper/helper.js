import bcrypt from 'bcrypt';

export const hashPassword = async(password) => {
    const saltRounds = 10;
    try {
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        return hashedPassword;
    } catch (error) {
        console.log(error);
        throw new Error("Error Hashing Password")
    }
};


export const comparePassword = async(password, hashedPassword) => {
    return bcrypt.compare(password, hashedPassword);
};