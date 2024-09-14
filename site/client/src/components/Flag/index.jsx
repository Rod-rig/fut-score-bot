import { getFlag } from "@/pages/User/utils";

const Flag = ({ name, size = 20 }) => {
  return <img src={getFlag(name)} alt={name} width={size} />;
};

export default Flag;
