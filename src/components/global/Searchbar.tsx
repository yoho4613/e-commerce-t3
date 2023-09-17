import { useRouter } from "next/router";
import { FC, useState } from "react";
import { FiSearch } from "react-icons/fi";

interface SearchbarProps {
  category?: string;
  subCategory?: string;
}

const Searchbar: FC<SearchbarProps> = ({ category, subCategory }) => {
  const router = useRouter();
  const [input, setInput] = useState("");
  return (
    <>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          router
            .push(
              `/list?category=${category ?? "all"}&subCategory=${
                subCategory ?? "all"
              }&search=${input}`,
            )
            .then((res) => res)
            .catch((err) => console.log(err));
        }}
      >
        <input
          className="w-full bg-secondary px-2 py-1 text-sm md:px-4 md:py-2"
          placeholder="What are you looking for?"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button className="absolute right-2 top-1.5 text-xl">
          <FiSearch />
        </button>
      </form>
    </>
  );
};

export default Searchbar;
