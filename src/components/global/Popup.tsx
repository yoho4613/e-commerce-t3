import { FC } from "react";

interface PopupProps {}

const Popup: FC<PopupProps> = ({ popup, setPopup, confirm }) => {
  return (
    <div
      className="fixed left-0 top-0 z-50 flex h-screen w-screen items-center justify-center"
      style={{ background: "rgba(0,0,0,0.4)" }}
    >
      {popup && (
        <div className=" space-y-4 rounded-md bg-whitePrimary p-2 sm:p-8">
          <p>Are you sure you want to remove this item from watchlist?</p>
          <div className="flex w-full justify-between">
            <button
              className=" rounded-md bg-green-500 px-4 py-2 text-whitePrimary"
              onClick={() => {
                confirm(popup);
                setPopup(null);
              }}
            >
              Confirm
            </button>
            <button
              className="btn--red px-4 py-2"
              onClick={() => setPopup(null)}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
export default Popup;
