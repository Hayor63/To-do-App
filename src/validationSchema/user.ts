import { object, optional, string, TypeOf, z } from "zod";

export const createUserSchema = object({
  body: object({
    userName: string({
      required_error: "userName is required",
    }),
    password: string({
      required_error: " Password is required",
    })
      .min(8, "Password should not be less than 8")
      .regex(
        /(?=^.{8,}$)(?=.*\d)(?=.*[!@#$%^&*]+)(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/,
        {
          message:
            "Password must contain uppercase letter, lowercase letter, a number and any of (!@#$%^&*)",
        }
      ),

    emailAddress: string({
      required_error: "Email is required",
    }).email("Not a valid Email"),
    
    role: z.enum(["admin", "user", "manager"]).optional(),
  }),
});

export const resetPasswordSchema = object({
  body: object({
    email: string({
      required_error: "Email is required",
    }).email("Invalid email format"), // ✅ Ensure email is provided
    password: string({
      required_error: "Password is required",
    })
      .min(8, "Password must be at least 8 characters")
      .regex(
        /(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*])/,
        "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
      ),
    confirmPassword: string({
      required_error: "Confirm password is required",
    }),
  }).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  }),
});


export const loginSchema = object({
  body: object({
    password: string({
      required_error: " Password is required",
    }),
    emailAddress: string({
      required_error: "Email is required",
    }).email("Not a valid Email"),
  }),
});

export const getUserByIdSchema = object({
  params: object({
    id: string({
      required_error: "user ID is required",
    }),
  }),
});



export const updateUserSchema = object({
  // The params section validates the URL parameter (ID).
  params: object({
    id: string({
      required_error: "User ID is required", // Validation for 'id'
    }),
  }),

  // The body section validates the request body
  body: object({
    userName: string({
      required_error: "UserName is required", // Validation for 'userName'
    }).trim(), // Optional: Trim whitespace

    password: string({
      required_error: "Password is required", // Validation for 'password'
    })
      .min(8, "Password should not be less than 8")
      .regex(
        /(?=^.{8,}$)(?=.*\d)(?=.*[!@#$%^&*]+)(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/,
        {
          message:
            "Password must contain uppercase letter, lowercase letter, a number, and any of (!@#$%^&*)",
        }
      ),

    emailAddress: string({
      required_error: "Email is required", // Validation for 'emailAddress'
    })
      .email("Not a valid Email")
      .trim(), // Optional: Trim whitespace

    role: z.enum(["admin", "user", "manager"]).optional(), // 'role' is optional
  }),
});

//Delete Categories
export const deleteUserSchema = object({
  params: object({
    id: string({
      required_error: "User ID is required",
    }),
  }),
});

// export const idSchema = object({
//   params: object({
//     id: string({ required_error: "Id is required!!" }),
//   }),
// });

export type createUserInput = TypeOf<typeof createUserSchema>["body"];
export type loginInput = TypeOf<typeof loginSchema>["body"];
export type resetPasswordInput = TypeOf<typeof resetPasswordSchema>["body"];
export type getUserId = TypeOf<typeof getUserByIdSchema>["params"];
export type updateUserInfo = {
  params: TypeOf<typeof updateUserSchema>["params"];
  body: TypeOf<typeof updateUserSchema>["body"];
};
export type deleteUser = TypeOf<typeof deleteUserSchema>

