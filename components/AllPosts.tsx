import { memo, useEffect, useState } from "react";
import { fetchAllPosts } from "@/lib/crowdedness";
import { LatestPosts } from "@/types/crowdedness";
import { format } from "date-fns";
import { CrowdednessReviewCard } from "./CrowdednessReviewCard";

export const AllPosts: React.FC = memo(() => {
  const [allPosts, setAllPosts] = useState<LatestPosts | undefined>(undefined);

  useEffect(() => {
    fetchAllPosts()
      .then(async (res) => {
        const data: LatestPosts = await res.all_crowdedness;
        data.forEach((post) => {
          post.created_at = format(new Date(post.created_at), "yyyy年MM月dd日");
        });
        setAllPosts(data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  return (
    <div className="w-full px-40 mb-20">
      <h2 className="font-bold text-2xl text-gray-900 mb-5">投稿一覧</h2>
      <CrowdednessReviewCard reviews={allPosts} />
    </div>
  );
});

AllPosts.displayName = "AllPosts";
