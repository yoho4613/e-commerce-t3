import { useRouter } from "next/router";
import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from "react";
import { toast } from "react-hot-toast";
import { UserDetail } from "~/config/type";
import { defaultUserDetail } from "~/constant/config";
import { api } from "~/utils/api";

interface ContextProp {
  userDetail: UserDetail;
  setUserDetail: Dispatch<SetStateAction<UserDetail>>;
  updateWatchlistContext: (productId: string) => void;
  updateCartContext: (productId: string) => void;
}

const UserContext = createContext<ContextProp>({
  userDetail: defaultUserDetail,
  setUserDetail: (str) => {
    return str;
  },
  updateWatchlistContext: (str) => {
    return str;
  },
  updateCartContext: (str) => {
    return str;
  },
});

export const StateContext = ({ children }: { children: ReactNode }) => {
  const router = useRouter();
  const { mutate: updateCart } = api.cart.updateCart.useMutation({
    onError: async (err) => {
      toast.error("You must be logged in in order to add or remove cart");
      await router.push("/login");
      return err;
    },
  });
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

   const updateCartContext = (productId: string) => {
    if (userDetail.cart.includes(productId)) {
      setUserDetail((prev) => ({
        ...prev,
        cart: prev.cart.filter((id) => id !== productId),
      }));
      updateCart({ userId: userDetail.id, productId: productId });
    } else {
      setUserDetail((prev) => ({
        ...prev,
        cart: [...prev.cart, productId],
      }));
      updateCart({ userId: userDetail.id, productId: productId });
    }
  };

  return (
    <UserContext.Provider
      value={{
        userDetail,
        setUserDetail,
        updateWatchlistContext,
        updateCartContext,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useStateContext = () => useContext(UserContext);
