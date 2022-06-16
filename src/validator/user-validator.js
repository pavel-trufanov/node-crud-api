export const getValidator = (user) => {
    const result = {
        valid: true,
        errors: []
    };
    if (!user.username) {
        result.valid = false;
        result.errors.push('username');
    }
    if (!user.age) {
        result.valid = false;
        result.errors.push('age');
    }
    if (!user.hobbies) {
        result.valid = false;
        result.errors.push('hobbies');
    }
    return result;
}
