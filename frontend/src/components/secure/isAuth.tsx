import { useRouter } from "next/router";
import { ComponentType, useEffect } from "react";

export default function isAuth(Component: ComponentType) {
  return function IsAuth(props: any) {
    const router = useRouter();
    const token = localStorage.getItem("token");

    useEffect(() => {
      if (!token) {
        router.push("/signin");
      }
    }, []);

    if (!token) {
      return null;
    }

    return <Component {...props} />;
  };
}
