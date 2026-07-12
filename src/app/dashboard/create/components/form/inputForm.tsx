import type { Control, FieldError, FieldValues, Path } from "react-hook-form";
import { Controller } from "react-hook-form";
import { Input } from "@/components/ui/input";

interface Props<T extends FieldValues> {
  name: Path<T>;
  control: Control<T>;
  type?: string;
  error?: FieldError;
  placeholder?: string;
}

const InputForm = <T extends FieldValues>({
  name,
  control,
  type,
  error,
  placeholder,
}: Props<T>) => {
  return (
    <div className=" space-y-2 mb-4 flex flex-col ">
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <Input
            id={name}
            type={type}
            {...field}
            placeholder={placeholder}
            className={`p-2 ${
              error ? "border-red-500" : ""
            } pl-12 h-14 text-base bg-background border-primary/20 focus-visible:ring-primary/30 `}
          />
        )}
      />
      {error && <p className="text-red-500 text-sm mt-1">{error.message}</p>}
    </div>
  );
};

export default InputForm;
