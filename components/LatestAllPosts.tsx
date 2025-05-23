import { memo, useEffect, useState } from "react";
import Link from "next/link";
import { format } from "date-fns";
import Cookie from "universal-cookie";

import { fetchLatestPosts } from "@/lib/crowdedness";

import { LatestPosts } from "@/types/crowdedness";

import { CrowdednessReviewCard } from "./CrowdednessReviewCard";

const cookie = new Cookie();

export const LatestAllPosts: React.FC = memo(() => {
  const [latestPosts, setLatestPosts] = useState<LatestPosts | undefined>(
    undefined
  );

  const fetchPost = () => {
    const token = cookie.get("access_token") as string;
    fetchLatestPosts(token)
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
  };

  useEffect(() => {
    fetchPost();
  }, []);

  return (
    <div className="w-full lg:px-40 md:px-20 px-10 my-20">
      <h2 className="font-bold text-gray-900 text-3xl mb-5">新着の投稿</h2>
      {latestPosts?.length !== 0 ? (
        <div className="flex flex-col justify-center items-center">
          <CrowdednessReviewCard
            reviews={latestPosts}
            reFetchPost={fetchPost}
          />
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
