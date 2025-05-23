import Image from "next/image";
import { useRouter } from "next/router";
import {
  useState,
  ChangeEvent,
  FormEvent,
  memo,
  useEffect,
  useContext,
} from "react";
import Cookie from "universal-cookie";
import { fetchUser, userImageUpload } from "@/lib/users";
import { CurrentUserContext } from "@/context/CurrentUserContext";
import NotificationContext from "@/context/notificationContext";

const cookie = new Cookie();

const ProfileImageUpload: React.FC = memo(() => {
  const router = useRouter();
  const userId = parseInt(router.query.id as string);

  const currentUserContext = useContext(CurrentUserContext);
  const notificationContext = useContext(NotificationContext);
  const { currentUser } = currentUserContext;

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  useEffect(() => {
    if (!isNaN(userId)) {
      fetchUser(userId)
        .then(async (res) => {
          const data = await res.user;
          return data;
        })
        .then((data) => {
          setImageUrl(data.url);
        })
        .catch((err) => {
          console.error(err);
        });
    }
  }, [userId]);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    setSelectedFile(file);

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      // ここでファイルの読み込みが行われ、読み込みが終わるとonloadend関数が実行される。
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    if (!selectedFile) return;

    const accessToken = cookie.get("access_token") as string;

    userImageUpload(selectedFile, userId, accessToken)
      .then(async (res) => {
        const url = await res.url;
        setImageUrl(url);
      })
      .then(() => {
        setPreview(null);
        notificationContext.success("アイコンを変更しました");
      })
      .catch((errorMessage) => {
        setPreview(null);
        if (errorMessage === "ゲストユーザーのユーザー情報は更新できません") {
          notificationContext.error(
            "ゲストユーザーのプロフィール画像は更新できません"
          );
        } else {
          notificationContext.error("アイコンを変更できませんでした");
        }
      });
  };

  return (
    <div className="flex flex-col items-center mt-2">
      <div className="relative w-24 h-24">
        <Image
          className="rounded-full object-cover"
          src={imageUrl || "/default.svg"}
          fill
          alt="current profile image"
          priority
          sizes="(max-width: 600px) 100vw, 24px"
        />
      </div>
      {currentUser?.id === userId && (
        <form
          onSubmit={handleSubmit}
          className="flex flex-col items-center mt-2"
        >
          <label
            htmlFor="fileInput"
            className="px-4 py-2 mb-4 bg-white text-sky-500 rounded border border-indigo-200 cursor-pointer text-sm hover:bg-sky-100"
          >
            アイコンを変更
          </label>
          <input
            id="fileInput"
            type="file"
            onChange={handleFileChange}
            className="hidden"
          />
          {preview && (
            <>
              <div className="relative w-24 h-24">
                <Image
                  src={preview}
                  alt="Profile Preview"
                  fill
                  style={{ objectFit: "cover" }}
                  className="rounded-full"
                  sizes="(max-width: 600px) 100vw, 24px"
                />
              </div>
              <div>
                <p className="text-gray-500 text-xs mt-1">
                  新しいプロフィール画像
                </p>
              </div>
              <button
                type="submit"
                className="mt-2 px-4 py-2 bg-sky-500 text-white rounded hover:bg-sky-600 font-bold mb-10"
              >
                アイコンをこちらに変更する
              </button>
            </>
          )}
        </form>
      )}
    </div>
  );
});

ProfileImageUpload.displayName = "ProfileImageUpload";

export default ProfileImageUpload;
