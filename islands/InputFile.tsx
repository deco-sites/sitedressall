import { useState } from "preact/hooks";
import { JSX } from "preact/jsx-runtime";

const InputFile = () => {
  const [inputMessage, setInputMessage] = useState<string | undefined>(
    undefined,
  );
  const inputMessageDefault = "upload";

  const handleChange = (event: JSX.TargetedEvent<HTMLInputElement, Event>) => {
    const target = event.currentTarget as HTMLInputElement;
    setInputMessage(target.files?.[0]?.name);
  };

  return (
    <div class="flex gap-2 w-full">
      <input
        class="hidden"
        type="file"
        name="portfolio"
        id="portfolio"
        onChange={(ev) => handleChange(ev)}
      />
      <div class="w-full border border-[#4F4F4F] rounded-[5px] py-3 px-4">
        {inputMessage ?? inputMessageDefault}
      </div>
      <label
        class="w-full max-w-36 flex justify-center items-center text-xl border border-[#4F4F4F] rounded-[40px]"
        htmlFor="portfolio"
      >
        enviar
      </label>
    </div>
  );
};

export default InputFile;
