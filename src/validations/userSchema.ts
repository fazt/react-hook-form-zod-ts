import { z } from "zod";

const plans = ["free", "basic", "medium", "pro"] as const;

export type Plans = (typeof plans)[number];

export const mappedPlans: {[key in Plans]: string} = {
    basic: "Basic",
    free: "Free",
    medium: "Medium",
    pro: "Pro"
}

export const userSchema = z.object({
  name: z
    .string()
    .min(3, {
      message: "Name must be at least 3 characters long",
    })
    .max(200, {
      message: "Name must be less than 200 characters long",
    }),
  email: z.string().email({
    message: "Please enter a valid email",
  }),
  password: z.string().min(6, {
    message: "Password must be at least 6 characters long",
  }),
  confirmPassword: z.string().min(6, {
    message: "Password must be at least 6 characters long",
  }),
  weight: z.string().refine((weight) => !isNaN(parseFloat(weight)), {
    message: "Weight must be a number",
  }),
  dateOfBirth: z.string().refine(dob => new Date(dob).toString() !== "Invalid Date", {
    message: "Please enter a valid date of birth"
  }),
  plan: z.enum(plans, {
    errorMap: () => ({ message: "Please select a plan" }),
  }),
}).refine(data => data.password === data.confirmPassword, {
    message: "Passwords must match",
    path: ["confirmPassword"]
})
