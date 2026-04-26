import { useEffect, useState } from "react";

// This is unused for now
export function Clock() {
  const [date, setDate] = useState(new Date());

  useEffect(() => {
    setDate(new Date());

    return () => {
      // this is run when the component unmounts.
      console.log("use effect cleanup");
    };
  }, []); // runs once

  return <div>{date.toLocaleTimeString()}</div>;
}
