import { memo, useEffect } from "react";

import { fetchLatestPosts } from "@/lib/crowdedness";

export const LatestAllPosts: React.FC = memo(() => {
  useEffect(() => {
    fetchLatestPosts()
      .then((res) => {
        console.log(res.latest_crowdedness);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="w-full px-40 my-20">
      <h2 className="font-bold text-gray-900 text-3xl">新着の投稿</h2>
    </div>
  );
});

LatestAllPosts.displayName = "LatestAllPosts";
