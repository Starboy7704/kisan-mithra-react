import { useNavigate } from "react-router";

const Logout = () => {
  const navigate=useNavigate();
 const handleLogout=()=>{
  navigate("/herosection")
 }

  return (
    <div className="flex items-center justify-center h-64">
      <button
        onClick={handleLogout}
        className="text-lg font-semibold px-4 py-2 bg-black text-white rounded"
      >
        Logout
      </button>
    </div>
  );
};

export default Logout;
