import { useEffect, useState } from "react";
import { useRouter } from "next/router";

import { fetchStore } from "@/lib/stores";

import { Layout } from "@/components/Layout";

const StorePage: React.FC = () => {
  const router = useRouter();
  const storeId = parseInt(router.query.id as string);

  useEffect(() => {
    if (!isNaN(storeId)) {
      fetchStore(storeId)
        .then((data) => {
          const storeData = data.store;
          return storeData;
        })
        .then((data) => {
          console.log(data);
        })
        .catch((err) => {
          console.error(err);
        });
    }
    // eslint-disable-next-line
  }, []);

  return (
    <Layout title="店舗ページ">
      <h1>店舗ページ</h1>
    </Layout>
  );
};

export default StorePage;
