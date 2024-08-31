import { Layout } from "@/components/Layout";

const Privacy: React.FC = () => {
  return (
    <Layout title="プライバシーポリシー">
      <div className="w-full flex flex-col text-gray-900 lg:px-40 md:px-20 px-10 lg:my-20 my-10">
        <h1 className="font-bold lg:text-3xl text-2xl mb-10">
          プライバシーポリシー
        </h1>
        <div>
          <div className="mb-10">
            <h2 className="font-bold">お客様から取得する情報</h2>
            <div className="ml-4">
              <p>当サービスは、お客様から以下の情報を取得します。</p>
              <ul className="ml-4">
                <li>・氏名(ニックネームやペンネームも含む)</li>
                <li>・メールアドレス</li>
                <li>・写真や動画</li>
                <li>・Cookie(クッキー)を用いて生成された識別情報</li>
              </ul>
            </div>
          </div>
          <div className="mb-10">
            <h2 className="font-bold">お客様の情報を利用する目的</h2>
            <div className="ml-4">
              <p>
                当サービスは、お客様から取得した情報を、以下の目的のために利用します。
              </p>
              <ul className="ml-4">
                <li>
                  ・当サービスに関する登録の受付、お客様の本人確認、認証のため
                </li>
                <li>・お客様の当サービスの利用履歴を管理するため</li>
                <li>
                  ・当サービスにおけるお客様の行動履歴を分析し、当サービスの維持改善に役立てるため
                </li>
                <li>・お客様からのお問い合わせに対応するため</li>
                <li>・当サービスの規約や法令に違反する行為に対応するため</li>
                <li>
                  ・当サービスの変更、提供中止、終了、契約解除をご連絡するため
                </li>
                <li>・当サービス規約の変更等を通知するため</li>
                <li>・以上の他、当サービスの提供、維持、保護及び改善のため</li>
              </ul>
            </div>
          </div>
          <div className="mb-10">
            <h2 className="font-bold">安全管理のために講じた措置</h2>
            <div className="ml-4">
              <p>
                当サービスが、お客様から取得した情報に関して安全管理のために講じた措置につきましては、末尾記載のお問い合わせ先にご連絡をいただきましたら、法令の定めに従い個別にご回答させていただきます。
              </p>
            </div>
          </div>
          <div className="mb-10">
            <h2 className="font-bold">第三者提供</h2>
            <div className="ml-4">
              <p>
                当サービスは、お客様から取得する情報のうち、個人データ（個人情報保護法第１６条第３項）に該当するものついては、あらかじめお客様の同意を得ずに、第三者（日本国外にある者を含みます。）に提供しません。
                但し、次の場合は除きます。
              </p>
              <ul className="ml-4">
                <li>・個人データの取扱いを外部に委託する場合</li>
                <li>・当サービスが買収された場合</li>
                <li>
                  ・事業パートナーと共同利用する場合（具体的な共同利用がある場合は、その内容を別途公表します。）
                </li>
                <li>
                  ・その他、法律によって合法的に第三者提供が許されている場合
                </li>
              </ul>
            </div>
          </div>
          <div className="mb-10">
            <h2 className="font-bold">アクセス解析ツール</h2>
            <div className="ml-4">
              <p>
                当サービスは、お客様のアクセス解析のために、「Googleアナリティクス」を利用しています。Googleアナリティクスは、トラフィックデータの収集のためにCookieを使用しています。トラフィックデータは匿名で収集されており、個人を特定するものではありません。Cookieを無効にすれば、これらの情報の収集を拒否することができます。詳しくはお使いのブラウザの設定をご確認ください。Googleアナリティクスについて、詳しくは以下からご確認ください。
              </p>
              <a
                href="https://marketingplatform.google.com/about/analytics/terms/jp/"
                className="text-sky-600 underline"
              >
                Google アナリティクス利用規約
              </a>
            </div>
          </div>
          <div className="mb-10">
            <h2 className="font-bold">プライバシーポリシーの変更</h2>
            <div className="ml-4">
              <p>
                当サービスは、必要に応じて、このプライバシーポリシーの内容を変更します。この場合、変更後のプライバシーポリシーの施行時期と内容を適切な方法により周知または通知します。
              </p>
            </div>
          </div>
          <div className="mb-10">
            <h2 className="font-bold">お問い合わせ</h2>
            <div className="ml-4">
              <p>
                お客様の情報の開示、情報の訂正、利用停止、削除をご希望の場合は、以下のメールアドレスにご連絡ください。
              </p>
              <p className="ml-4">e-mail</p>
              <p className="ml-4">d.yamada.biz@gmail.com</p>
              <p>
                この場合、必ず、運転免許証のご提示等当サービスが指定する方法により、ご本人からのご請求であることの確認をさせていただきます。なお、情報の開示請求については、開示の有無に関わらず、ご申請時に一件あたり1,000円の事務手数料を申し受けます。
              </p>
            </div>
          </div>
          <div className="mb-10">
            <h2 className="font-bold">事業者の氏名</h2>
            <p className="ml-4">山田　大智</p>
          </div>
          <div className="mb-10">
            <h2 className="font-bold">事業者の住所</h2>
            <p className="ml-4">宮城県仙台市泉区将監一丁目19-17</p>
          </div>
          <p>2024年08月28日 制定</p>
        </div>
      </div>
    </Layout>
  );
};

export default Privacy;