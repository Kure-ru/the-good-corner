import RecentAds from "@/components/RecentAds";
import isAuth from "@/components/secure/isAuth";
import { CategoryForm } from "@/components/CategoryForm";

function Home() {
  return (
    <>
      <RecentAds />
      <CategoryForm />
    </>
  );
}

export default isAuth(Home);
