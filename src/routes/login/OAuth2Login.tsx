import { useSearchParams } from "react-router-dom";
import { useEffect } from "react";

function OAuth2Login() {
  const [params, setSearchParams] = useSearchParams();

  useEffect(() => {
    const at = params.get("at");
    const expireAt = params.get("expireAt");
    
    if (at != null && expireAt != null) {
      sessionStorage.setItem("at", at);
      sessionStorage.setItem("expireAt", expireAt);
    } else {
      alert("로그인 처리 중 문제가 발생했습니다. 다시 로그인해주세요.");
    }

    window.location.replace("/");
  }, []);

  return (
    <div></div>
  )
}

export default OAuth2Login;