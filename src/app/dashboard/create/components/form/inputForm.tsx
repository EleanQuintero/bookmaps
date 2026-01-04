import type { Control, FieldError } from "react-hook-form";
import { Controller } from "react-hook-form";
import { Input } from "@/components/ui/input";

interface Props {
  name: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: Control<any>;
  type?: string;
  error?: FieldError;
  placeholder?: string;
}

const InputForm = ({ name, control, type, error, placeholder }: Props) => {
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
