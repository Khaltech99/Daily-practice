import { uiStore } from "../../uistore";

const Toggle = () => {
  const changeToggleMode = uiStore((state) => state.changeToggleMode);

  return (
    <button
      onClick={changeToggleMode}
      className="text-black dark:text-white bg-red-400 rounded-lg h-fit text-center w-fit p-2 m-3"
    >
      clickMe
    </button>
  );
};

export default Toggle;
