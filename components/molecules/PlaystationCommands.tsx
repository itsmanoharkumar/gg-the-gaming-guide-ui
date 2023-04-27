import PlaystationButton from "@/components/atoms/PSButton";

interface Props {
  inputCommands: string;
}

export default function PlaystationCommands({ inputCommands }: Props) {
  const inputCommandsArray = inputCommands?.split(" ") || [];
  return (
    <div className={"flex"}>
      {inputCommandsArray.map((inputCommand, index) => {
        return <PlaystationButton value={inputCommand} key={index} />;
      })}
    </div>
  );
}
