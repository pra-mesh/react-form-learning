//React Hook form is used for uncontrolled form with minimal render and validation using zod
import { useForm } from "react-hook-form";
type FormFields = {
  email: string;
  password: string;
};
const ReactHookForm = () => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<FormFields>({
    defaultValues: {
      email: "test@test.com",
    },
  });
  const onSubmit = async (data: FormFields) => {
    try {
      await new Promise((r) => setTimeout(r, 3000));
      console.log({ data });
      throw new Error("Invalid Data");
    } catch {
      setError("root", { message: "Form submission failed" });
    }
  };
  return (
    <form
      className="flex flex-col items-center"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div>
        <input
          type="text"
          {...register("email", {
            required: "Email is required",
            validate: (value) => {
              if (!value.includes("@")) {
                return "Invalid email";
              }
            },
            //TODO check pattern error.
            //     pattern:
            //       /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/,
          })}
          placeholder="email"
          className={`m-2 ${errors.email && "bg-amber-600"}`}
        />
        {errors.email && (
          <div className="text-red-500">{errors?.email?.message}</div>
        )}
      </div>
      <div>
        <input
          type="password"
          {...register("password", {
            required: "Password is required",
            minLength: 3,
          })}
          placeholder="password"
          className="m-2"
        />
        {errors.password && (
          <div className="text-red-500">{errors?.password?.message}</div>
        )}
      </div>
      <div>
        <button type="submit" className="px-5 bg-blue-500 rounded-sm mx-2">
          {isSubmitting ? "Submitting.. " : "Submit"}
        </button>
      </div>
      {errors?.root && (
        <div className="text-red-500">{errors?.root?.message}</div>
      )}
    </form>
  );
};

export default ReactHookForm;
