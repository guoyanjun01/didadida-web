import { useState } from "react";

export default function Admin() {
  const [userId, setUserId] = useState("");

  const activate = async () => {
    await fetch("/api/activate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId }),
    });

    alert("已开通");
  };

  return (
    <div style={{ padding: 40 }}>
      <h1>后台管理</h1>

      <input
        placeholder="输入用户ID"
        value={userId}
        onChange={(e) => setUserId(e.target.value)}
      />

      <button onClick={activate}>开通会员</button>
    </div>
  );
}