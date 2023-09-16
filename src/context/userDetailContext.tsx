import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from "react";
import { UserDetail } from "~/config/type";
import { defaultUserDetail } from "~/constant/config";

interface ContextProp {
  userDetail: UserDetail;
  setUserDetail: Dispatch<SetStateAction<UserDetail>>;
  updateWatchlistContext: (productId: string) => void;
}

const UserContext = createContext<ContextProp>({
  userDetail: defaultUserDetail,
  setUserDetail: () => {},
  updateWatchlistContext: () => {},
});

export const StateContext = ({ children }: { children: ReactNode }) => {
  const [userDetail, setUserDetail] = useState<UserDetail>(defaultUserDetail);

  const updateWatchlistContext = (productId: string) => {
    if (userDetail.watchlist.includes(productId)) {
      setUserDetail((prev) => ({
        ...prev,
        watchlist: prev.watchlist.filter((id) => id !== productId),
      }));
    } else {
      setUserDetail((prev) => ({
        ...prev,
        watchlist: [...prev.watchlist, productId],
      }));
    }
  };

  return (
    <UserContext.Provider
      value={{
        userDetail,
        setUserDetail,
        updateWatchlistContext,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useStateContext = () => useContext(UserContext);
