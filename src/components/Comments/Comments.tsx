import { UserOutlined } from "@ant-design/icons";
import { Avatar } from "antd";
export default function Comments() {
  return (
    <div>
      <h1 className="font-bold text-2xl ">Comments</h1>
      <div className="flex items-center justify-between mt-4">
        <Avatar
          size={54 * 2}
          icon={
            <UserOutlined
              style={{
                border: "2px solid white",
                borderRadius: "100%",
                padding: "10px",
                marginTop: "30px",
              }}
            />
          }
        />
        <div className="flex-1 coll ml-4">
          <p className="font-bold ">Anonymous</p>
          <input
            placeholder="Write your comments here...."
            type="text"
            className="w-full bg-white text-black p-6 rounded-xl text-lg"
          />
        </div>
      </div>
    </div>
  );
}
