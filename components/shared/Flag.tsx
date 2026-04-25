import Image from "next/image";
import { getFlag } from "@u/getFlag";

const Flag = ({ name, size = 20 }: { name: string; size?: number }) => {
  return <Image src={getFlag(name)} alt={name} width={size} height={size} />;
};

export default Flag;
