const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const UserSchema = new mongoose.Schema (
    {
        userName: {
            type: String,
            required: [ true, "User name is required"],
        },
        email: {
            type: String,
            required: [ true, "Email is required"],
        },
        password: {
            type: String,
            required: [ true, "Password is required"],
            minLength: [ 2, "Password must be atleast 2 characters"] // REMEMBER TO CHANGE THIS
        },
    },
    { timestamps: true }
);

UserSchema.virtual("confirmPassword")
    .get(() => this._confirmPassword)
    .set((value) => this._confirmPassword = value);

// validate passwords BEFORE the normal model validation
UserSchema.pre("validate", function(next) {
    if(this.password !== this.confirmPassword) {
        this.invalidate("confirmPassword", "Passwords must match!");
    }
    next();
})

// hash the password prior to saving in to MongoDB
UserSchema.pre("save", function(next) {
bcrypt.hash(this.password, 10)
    .then((hashedPass) => {
        this.password = hashedPass;
        next();
    })
})

// this will create a NEW collection in the same DB as Karaoke Models
// the new collection will have a lowercase name and will be made plural
//    This will be:   users
const User = mongoose.model("User", UserSchema);

module.exports = User;
