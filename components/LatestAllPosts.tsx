import { memo, useEffect, useState } from "react";
import { format } from "date-fns";

import { fetchLatestPosts } from "@/lib/crowdedness";

import { LatestPosts } from "@/types/crowdedness";

export const LatestAllPosts: React.FC = memo(() => {
  const [latestPosts, setLatestPosts] = useState<LatestPosts | undefined>(
    undefined
  );

  useEffect(() => {
    fetchLatestPosts()
      .then(async (res) => {
        const data: LatestPosts = await res.latest_crowdedness;
        data.forEach((post) => {
          post.created_at = format(new Date(post.created_at), "yyyy年MM月dd日");
        });
        setLatestPosts(data);
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
