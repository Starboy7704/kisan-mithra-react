import { useEffect, useState } from "react";

 function PleaseWait() {
  const [dots, setDots] = useState(".");

  useEffect(() => {
    const interval = setInterval(() => {
      setDots((d) => (d === "....." ? "." : d + "."));
    }, 350);

    return () => clearInterval(interval);
  }, []);

  return <span>Please wait{dots}</span>;
}
export default PleaseWait;