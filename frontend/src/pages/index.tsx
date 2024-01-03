import RecentAds from "@/components/RecentAds";
import isAuth from "@/components/secure/isAuth";

function Home() {
  return (
    <>
      <RecentAds />
    </>
  );
}

export default isAuth(Home);
