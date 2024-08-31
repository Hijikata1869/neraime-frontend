import { Layout } from "@/components/Layout";

const About: React.FC = () => {
  return (
    <Layout title="NERAIMEについて">
      <div className="w-full md:my-20 my-10 lg:px-40 md:px-20 px-10 text-gray-900">
        <h1 className="font-bold text-3xl mb-10">NERAIMEについて</h1>
        <h2 className="font-bold text-xl mb-5">NERAIMEの開発経緯</h2>
        <div className="font-semibold">
          <p className="indent-4 mb-4">
            私はカフェで勉強したりサウナに行くことがよくあります。しかし、勉強しにカフェに行ったら席が埋まっていて座れなかったり、サウナが満席でサウナ室の前で並んで待たなければならなかったということがありました。また、自分自身がカフェで働く中で１時間前までは満席で店内がいっぱいだったのに今は驚くほど空いている、といった経験をすることがよくあります。
          </p>
          <p className="indent-4 mb-4">
            そこで混み具合の傾向を可視化することで、狙い目の時間をみつけたいという思いでNERAIMEを開発しました。NERAIMEでは、訪問したお店の混み具合を1時間ごとに4つのレベル(空いてる・普通・混雑・空き無し)に分けて投稿できます。投稿された混み具合のデータは曜日と時間ごとに表形式で視覚的にわかりやすいように表示しています。
          </p>
          <p className="indent-4 mb-4">
            NERAIMEを使ってくださるユーザーさんたちの投稿で、少しでも多くデータを集め、各店舗の狙い目の時間を可視化し、お店に行って残念な思いをする方が少しでも少なくなれば幸いです。
          </p>
          <p className="indent-4">
            今後も皆さんにとって有益なWebサービスになるよう開発を続けていきますので、改善点やご要望がありましたらぜひお問い合わせページの連絡先から開発者宛にご連絡していただければと思います。よろしくお願いいたします。
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default About;
