import PlaystationButton from "@/components/atoms/PSButton";

interface Props {
  inputCommands: string;
}

export default function PlaystationCommands({ inputCommands }: Props) {
  const inputCommandsArray = inputCommands?.split(" ") || [];
  return (
    <div className={"flex items-start justify-between mb-2"}>
      {inputCommandsArray.map((inputCommand, index) => {
        if (inputCommand) {
          return <PlaystationButton value={inputCommand} key={index} />;
        }
      })}
    </div>
  );
}
