"use client";

import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { userSchema, mappedPlans } from "@/validations/userSchema";

type Inputs = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  dayOfBirth: string;
  weight: string;
  plan: string;
  dateOfBirth: string;
};

function Home() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: zodResolver(userSchema),
  });

  const plansOptions = Object.entries(mappedPlans).map(([key, value]) => (
    <option value={key} key={key}>
      {value}
    </option>
  ));

  console.log(errors);

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    console.log(data);
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="name">Name</label>
        <input type="text" id="name" {...register("name")} />
        {errors.name?.message && <p>{errors.name?.message}</p>}

        <label htmlFor="email">Email</label>
        <input type="email" id="email" {...register("email")} />
        {errors.email?.message && <p>{errors.email?.message}</p>}

        {/* password */}
        <label htmlFor="password">Password</label>
        <input type="password" id="password" {...register("password")} />
        {errors.password?.message && <p>{errors.password?.message}</p>}

        {/* confirm password */}
        <label htmlFor="confirmPassword">Confirm Password</label>
        <input
          type="password"
          id="confirmPassword"
          {...register("confirmPassword")}
        />
        {errors.confirmPassword?.message && (
          <p>{errors.confirmPassword?.message}</p>
        )}

        {/* dateOfBirth */}

        <label htmlFor="dateOfBirth">Date of Birth</label>
        <input type="date" id="dateOfBirth" {...register("dateOfBirth")} />
        {errors.dateOfBirth?.message && <p>{errors.dateOfBirth?.message}</p>}

        {/* weight */}
        <label htmlFor="weight">Weight</label>
        <input type="text" id="weight" {...register("weight")} />
        {errors.weight?.message && <p>{errors.weight?.message}</p>}

        {/* plan */}
        <label htmlFor="plan">Plan</label>
        <select id="plan" {...register("plan")}>
          {plansOptions}
        </select>
        {errors.plan?.message && <p>{errors.plan?.message}</p>}

        <button type="submit">Submit</button>
      </form>

      <div>{JSON.stringify(watch(), null, 2)}</div>
    </div>
  );
}

export default Home;
