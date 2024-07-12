import Link from "next/link";
import { memo } from "react";

import { FavoriteStoreCardsProps } from "@/types/store";

export const FavoriteStoreCards: React.FC<FavoriteStoreCardsProps> = memo(
  (props) => {
    const { favoriteStores } = props;
    return (
      <div className="flex flex-col items-start pl-5 overflow-scroll max-h-56">
        {favoriteStores?.length !== 0 ? (
          <>
            {favoriteStores?.map((store) => (
              <Link
                key={store.id}
                href={`/stores/${store.id}`}
                className="mb-3 text-cyan-600 bg-white rounded text-sm px-4 py-2 shadow hover:shadow-lg transition-shadow duration-300"
              >
                {store.name}
              </Link>
            ))}
          </>
        ) : (
          <>
            <p>お気に入り登録した店舗はありません</p>
          </>
        )}
      </div>
    );
  }
);

FavoriteStoreCards.displayName = "FavoriteStoreCards";
