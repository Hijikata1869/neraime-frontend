import { Layout } from "@/components/Layout";

const Contact: React.FC = () => {
  return (
    <Layout title="お問い合わせ">
      <div className="w-full lg:px-40 md:px-20 px-10 text-gray-900 lg:mt-20 mt-10">
        <h1 className="font-bold text-3xl mb-4">お問い合わせ</h1>
        <p>
          当サービスに関するお問い合わせ・ご要望は開発者Eメールか、開発者X(旧Twitter)のDMにお願いいたします。
        </p>
        <p className="mt-10 font-bold">Eメール</p>
        <p>d.yamada.biz@gmail.com</p>
        <p className="mt-10 font-bold">X(旧Twitter)アカウント</p>
        <p>@Valeyellow56</p>
      </div>
    </Layout>
  );
};

export default Contact;
