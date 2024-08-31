import Image from "next/image";
import Link from "next/link";
import { Layout } from "@/components/Layout";

const Custom404: React.FC = () => {
  return (
    <Layout title="404 not found">
      <div className="mt-20 flex flex-col justify-center items-center">
        <h1 className="text-gray-900 font-bold md:text-2xl mb-10">
          お探しのページは見つかりませんでした。
        </h1>
        <Image
          src={"/notFound.svg"}
          alt="page not found"
          width={300}
          height={300}
          priority
          className="mb-10"
        />
        <Link
          href="/"
          className="border border-gray-900 rounded px-4 py-2 text-sm hover:bg-gray-200"
        >
          トップページに戻る
        </Link>
      </div>
    </Layout>
  );
};

export default Custom404;
