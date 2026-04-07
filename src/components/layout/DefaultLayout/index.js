import { Sidebar } from "../../common";
const DefaultLayout = (props) => {
  return (
    <div className="flex h-screen ">
      {" "}
      <div className="bg-gray-800 text-white">
        <Sidebar />
      </div>
      <div className="flex-1 p-4"> {props.children} </div>{" "}
    </div>
  );
};
export default DefaultLayout;
