import mongoose, { Schema } from "mongoose";
import bcrypt from "bcryptjs";

/* =========================================================
USER INTERFACE
========================================================= */
export interface IUser {
  name: string;
  email: string;
  password: string;

  avatar?: {
    url?: string;
    publicId?: string;
  };

  role: "admin" | "manager";

  isVerified: boolean;

  createdAt?: Date;
  updatedAt?: Date;
}

/* =========================================================
USER SCHEMA
========================================================= */
const userSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
      minlength: [2, "Name too short"],
      maxlength: [50, "Name too long"],
    },

    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
      match: [
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
        "Please enter a valid email",
      ],
    },

    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [6, "Password must be at least 6 characters"],
      select: false,
    },

    avatar: {
      url: {
        type: String,
        default: "",
      },

      publicId: {
        type: String,
        default: "",
      },
    },

    role: {
      type: String,
      enum: ["admin", "manager"],
      default: "manager",
    },

    isVerified: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

/* =========================================================
INDEXES
========================================================= */
userSchema.index({ email: 1 });
userSchema.index({ role: 1 });

/* =========================================================
PASSWORD HASHING
========================================================= */
userSchema.pre("save", async function (next) {
  const user = this as any;

  if (!user.isModified("password")) {
    return;
  }
  user.password = await bcrypt.hash(user.password, 12);
});

/* =========================================================
COMPARE PASSWORD METHOD
========================================================= */
userSchema.methods.comparePassword = async function (
  candidatePassword: string,
) {
  return bcrypt.compare(candidatePassword, this.password);
};

/* =========================================================
VIRTUAL
========================================================= */
userSchema.virtual("avatarUrl").get(function () {
  const user = this as any;

  return user.avatar?.url || "";
});

/* =========================================================
MODEL
========================================================= */
const User = mongoose.model("User", userSchema);

export default User;
