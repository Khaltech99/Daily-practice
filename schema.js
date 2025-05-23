import { z } from "zod";

export const formSchema = z.object({
  username: z.string().min(4, "name must be more than 4"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters long")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter")
    .regex(/[0-9]/, "Password must contain at least one number")
    .regex(
      /[^A-Za-z0-9]/,
      "Password must contain at least one special character"
    ),
  email: z.string().email("invalid email address"),
});

export const loginSchema = z.object({
  email: z.string().email("invalid email address"),
  password: z.string(),
});
export const resetSchema = z.object({
  email: z.string().email("invalid email address"),
});

export const updatePasswordSchema = z
  .object({
    password: z
      .string()
      .min(8, "Password must be at least 8 characters long")
      .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
      .regex(/[a-z]/, "Password must contain at least one lowercase letter")
      .regex(/[0-9]/, "Password must contain at least one number")
      .regex(
        /[^A-Za-z0-9]/,
        "Password must contain at least one special character"
      ),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export const phoneSchema = z.object({
  phone: z
    .string()
    .min(14, "Phone number must be 14 characters including +234")
    .max(14, "Phone number must be 14 characters including +234")
    .regex(
      /^\+234[1-9]\d{9}$/,
      "Phone number must start with +234 followed by 10 digits, first digit 1-9"
    )
    .transform((val) => {
      // Remove non-digit characters except +, strip leading zeros
      let cleaned = val.replace(/[^0-9+]/g, "").replace(/^0+/, "");
      // If it doesn't start with +234, prepend it
      if (!cleaned.startsWith("+234")) {
        cleaned = `+234${cleaned.replace(/^\+234/, "")}`;
      }
      // Remove zero immediately after +234
      cleaned = cleaned.replace(/^\+2340+/, "+234");
      // Ensure length is 13 characters
      return cleaned.slice(0, 15);
    }),
});

export const otpSchema = z.object({
  pin: z.string().length(6, "OTP must be 6 digits"),
});

export const productSchema = z.object({
  productName: z.string(),
  productPrice: z.coerce
    .number({ invalid_type_error: "price must be a number" })
    .min(10, "price must be at least 0")
    .max(15, "price must not exceed 1000")
    .refine((val) => !isNaN(val) && Number.isFinite(val), {
      message: "Invalid float value",
    }),
  productDescription: z.string(),
});

//schema for file upload

// File upload validation schema
export const fileUploadSchema = z.object({
  file: z
    .instanceof(File, { message: "Please select a file" })
    .refine((file) => file.size <= 2 * 1024 * 1024, {
      message: "File size must be less than 2MB",
    })
    .refine(
      (file) => {
        const allowedTypes = [
          "image/svg+xml",
          "image/png",
          "image/jpeg",
          "image/gif",
        ];
        return allowedTypes.includes(file.type);
      },
      {
        message: "File type not supported. Please upload SVG, PNG, JPG or GIF",
      }
    ),
});

// Additional schema for form data if needed
export const uploadFormSchema = z.object({
  file: fileUploadSchema.shape.file,
  description: z.string().optional(),
  tags: z.array(z.string()).optional(),
});

// Type inference for TypeScript (if using TypeScript)
