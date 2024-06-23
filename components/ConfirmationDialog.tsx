import {
  Description,
  Dialog,
  DialogPanel,
  DialogTitle,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import { Fragment, memo } from "react";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";

import { ConfirmationDialogProps } from "@/types";

export const ConfirmationDialog: React.FC<ConfirmationDialogProps> = memo(
  (props) => {
    const { isOpen, setIsOpen, executeOnDialogAction } = props;

    return (
      <>
        <Transition appear show={isOpen} as={Fragment}>
          <Dialog onClose={() => setIsOpen(false)} className="relative z-10">
            <TransitionChild
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
            </TransitionChild>
            <div className="fixed inset-0 z-10 w-screen overflow-y-auto flex items-center justify-center">
              <div className="flex items-end justify-center p-4 text-center">
                <TransitionChild
                  as={Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0 translate-y-4"
                  enterTo="opacity-100 translate-y-0"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100 translate-y-0"
                  leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                >
                  <DialogPanel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all">
                    <div className="bg-white px-4 pb-4 pt-5 ">
                      <div className="sm:flex sm:items-start">
                        <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100">
                          <ExclamationTriangleIcon
                            className="h-6 w-6 text-red-600"
                            aria-hidden="true"
                          />
                        </div>
                        <div className="mt-3 text-center">
                          <DialogTitle
                            as="h3"
                            className="text-base font-semibold leading-6 text-gray-900"
                          >
                            アカウントを削除しますか？
                          </DialogTitle>
                          <div className="mt-2">
                            <Description className="text-sm text-gray-500">
                              アカウントを削除するとこれまでの投稿も削除されます。
                            </Description>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="bg-gray-50 px-4 py-3 ">
                      <button
                        type="button"
                        className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm"
                        onClick={executeOnDialogAction}
                      >
                        削除する
                      </button>
                      <button
                        type="button"
                        className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-inset ring-gray-300 hover:bg-gray-50"
                        onClick={() => setIsOpen(false)}
                      >
                        キャンセル
                      </button>
                    </div>
                  </DialogPanel>
                </TransitionChild>
              </div>
            </div>
          </Dialog>
        </Transition>
      </>
    );
  }
);

ConfirmationDialog.displayName = "ConfirmationDialog";
