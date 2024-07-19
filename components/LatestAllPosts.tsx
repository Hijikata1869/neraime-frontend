import { memo, useEffect, useState } from "react";
import Link from "next/link";
import { format } from "date-fns";

import { fetchLatestPosts } from "@/lib/crowdedness";

import { LatestPosts } from "@/types/crowdedness";

import { CrowdednessReviewCard } from "./CrowdednessReviewCard";

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
      <h2 className="font-bold text-gray-900 text-3xl mb-5">新着の投稿</h2>
      {latestPosts?.length !== 0 ? (
        <div className="flex flex-col justify-center items-center">
          <CrowdednessReviewCard reviews={latestPosts} />
          <Link href="/posts">
            <button className="py-2 px-4 bg-cyan-600 rounded-lg text-gray-50 font-bold hover:bg-cyan-500 transition">
              投稿をもっと見る
            </button>
          </Link>
        </div>
      ) : (
        <div>
          <p className="font-bold text-gray-900">まだ投稿がありません</p>
        </div>
      )}
    </div>
  );
});

LatestAllPosts.displayName = "LatestAllPosts";
