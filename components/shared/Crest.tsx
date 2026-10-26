import Image from "next/image";

const Crest = ({ name, size = 20 }: { name: string; size?: number }) => {
  return (
    <Image
      src={`${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/club-logos/${name}.svg`}
      alt={name}
      width={size}
      height={size}
      className="w-auto h-auto max-w-[70%] max-h-[70%]"
    />
  );
};

export default Crest;
