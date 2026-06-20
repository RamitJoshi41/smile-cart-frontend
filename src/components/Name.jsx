import React, { useRef, useState } from "react";

const Name = () => {
  const [name, setName] = useState("");
  const prevName = useRef("");
  React.useEffect(() => {
    prevName.current = name;
  }, [name]);

  return (
    <div className="m-4 p-4 ">
      <div className="text-lg font-semibold text-blue-500">
        My Name is :
        <input
          className="ml-2 rounded-md border border-solid border-gray-300 px-2 py-1"
          type="text"
          value={name}
          onChange={e => setName(e.target.value)}
        />
        <pre className="text-blue-600">
          My {name} is and it used to be {prevName.current}
        </pre>
      </div>
    </div>
  );
};
export default Name;
