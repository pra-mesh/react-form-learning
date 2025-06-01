//React Hook form and zod makes validation and form field easier
import { Controller, useForm } from "react-hook-form";
import type { SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Select from "react-select";
type OptionType = { value: string; label: string };
const options: OptionType[] = [
  { value: "chocolate", label: "Chocolate" },
  { value: "strawberry", label: "Strawberry" },
  { value: "vanilla", label: "Vanilla" },
];

const schema = z.object({
  email: z.string().email("Email is not valid"),
  password: z.string().min(3, "At least  3 characters are required"),
  selectOptions: z.array(z.string()).min(1),
});
//capture object of specific type we use infer
type FormFields = z.infer<typeof schema>;
const RHFWithZod = () => {
  const {
    register,
    handleSubmit,
    setError,
    control,
    formState: { errors, isSubmitting },
  } = useForm<FormFields>({
    defaultValues: {
      email: "test@test.com",
    },
    resolver: zodResolver(schema),
  });
  const onSubmit: SubmitHandler<FormFields> = async (data: FormFields) => {
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
          {...register("email")}
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
          {...register("password")}
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
      <Controller
        name="selectOptions"
        control={control}
        render={({ field }) => (
          <Select<OptionType, true>
            value={options.filter((option) =>
              field.value?.includes(option.value)
            )}
            onChange={(selected) =>
              field.onChange(selected.map((option) => option.value))
            }
            options={options}
            isMulti
            className="mt-2"
          />
        )}
      ></Controller>
      {errors.selectOptions && (
        <div className="text-red-500">{errors?.selectOptions?.message}</div>
      )}
      {errors?.root && (
        <div className="text-red-500">{errors?.root?.message}</div>
      )}
    </form>
  );
};

export default RHFWithZod;
