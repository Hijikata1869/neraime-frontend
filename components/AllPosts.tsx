import { memo, useEffect, useState } from "react";
import { fetchAllPosts } from "@/lib/crowdedness";
import { LatestPosts } from "@/types/crowdedness";
import { format } from "date-fns";
import { CrowdednessReviewCard } from "./CrowdednessReviewCard";
import Cookie from "universal-cookie";

const cookie = new Cookie();

export const AllPosts: React.FC = memo(() => {
  const [allPosts, setAllPosts] = useState<LatestPosts | undefined>(undefined);

  const fetchPosts = () => {
    const token = cookie.get("access_token") as string;
    fetchAllPosts(token)
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
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div className="w-full lg:px-40 md:px-20 px-10 mb-20 ">
      <h2 className="font-bold text-2xl text-gray-900 mb-5 md:mt-20 mt-10">
        投稿一覧
      </h2>
      <CrowdednessReviewCard reviews={allPosts} reFetchPost={fetchPosts} />
    </div>
  );
});

AllPosts.displayName = "AllPosts";
