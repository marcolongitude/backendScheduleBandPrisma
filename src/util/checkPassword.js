import bcrypt from "bcryptjs";

export default function checkPassword(oldPassword, password_hash) {
    return bcrypt.compare(oldPassword, password_hash);
}