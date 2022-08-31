export interface DialogInterface {
  open: boolean,
  closeDialog: () => void,
}

export interface ImageSliderPropsInterface {
  ad: AdInterface | null,
}
export interface AdInterface {
  _id: string,
  images: Array<{ data: string }>,
  textInfo: {
    category: string,
    city: string,
    description: string,
    name: string,
    price: string,
    region: string,
    subCategory: string,
    title: string,
    sellerName: string,
    sellerEmail: string,
    sellerId: string,
  },
  creationDate: string
};

export interface GetAdsPropsInterface {
  functionProps: {
    page: number | undefined,
    PER_PAGE: number,
    sortingParams: Array<string> | null,
    subString: string,
    category?: string,
    subCategory?: string,
  },
  setAds: (ads: Array<AdInterface>) => void,
  setPageCount: (pageCount: number) => void,
  setAdsAmount: (adsAmount: number) => void,
  setAdsLoading: (loading: boolean) => void,
};

export interface MenuPropsInterface {
  getAdsProps: GetAdsPropsInterface,
  setSubString: (subString: string) => void,
  setCategory: (category: string) => void,
  setSubCategory: (subCategory: string) => void,
};

export interface EmptyAdInterface {
  title: string,
  category: string,
  subCategory: string | null,
  description: string,
  region: string,
  price: number | string,
  city: string,
  sellerName: string,
  sellerEmail: string,
  sellerId: string,
};

interface CityInterface {
  value: string,
  label: string,
};

export interface RegionInterface {
  cities: Array<CityInterface>,
  label: string,
  value: string,
};

interface SubCategoryInterface {
  label: string,
  value: string,
};

export interface CategoryInterface {
  label: string,
  subCategories: Array<SubCategoryInterface>,
  value: string,
};

export interface ImageInterface {
  contentType: string,
  data: string,
  id: string,
};

export interface DataCategoryInterface {
  contents: Array<string>,
  title: string,
  _id: string,
};

export interface DataRegionInterface {
  cities: Array<string>,
  state: string,
  _id: string,
};

export interface DataMenuInterface {
  contents: Array<string>,
  title: string,
  _id: string,
};

interface ContentsInterface {
  text: string,
  selected: boolean,
};

export interface MenuInterface {
  contents: Array<ContentsInterface>
  open: boolean,
  selected: boolean,
  title: string,
  _id: string,
};

export interface SignUpFormInputsInterface {
  name: string,
  email: string,
  password: string,
};

export interface LogInFormInputsInterface {
  email: string,
  password: string,
};

export interface MessageInterface {
  senderId: string,
  message: string,
  break?: string,
  creationDate?: string,
};

export type InterlocutorType = { id: string, name: string } | null;

export interface ChatInterface {
  adId: string,
  creationDate: string,
  messages: Array<MessageInterface>,
  participants: Array<InterlocutorType>,
  _id: string,
};

export interface UserContextInterface {
  user: UserType,
  setUser: (user: UserType) => void,
  isLogInDialogOpen: boolean,
  setIsLogInDialogOpen: (isLogInDialogOpen: boolean) => void,
  setTokenValidation: (tokenValidation: boolean) => void,
  isAccountImageChanged: boolean,
  setIsAccountImageChanged: (isAccountImageChanged: boolean) => void,
  isTokenValidationComplete: boolean,
};

export type UserType = {
  _id: string,
  email: string,
  name: string,
  registrationDate: string,
  image: { data: string },
} | null;

export interface BriefAdInterface {
  _id: string,
  images: Array<ImageInterface>,
  textInfo: { title: string },
}

export interface ModifiedChatInterface {
  _id: string,
  myInterlocutor: InterlocutorType,
  messages: Array<MessageInterface>,
  creationDate: string,
  adId: string,
  adImage?: string,
  adTitle?: string,
  sellerImage?: string,
};

export interface SellerInterface {
  _id: string,
  image: { data: string },
  name: string,
  registrationDate: string,
}

export interface FirstMessageDialogPropsInterface extends DialogInterface {
  seller: SellerInterface | null,
  messageText: string,
  setMessageText: (messageText: string) => void,
  ad: AdInterface | null,
  paramsId: string
}

export interface ConfirmationDialogPropsInterface extends DialogInterface {
  changingAccountImage: boolean,
  setChangingAccountImage: (changingAccountImage: boolean) => void,
}

export interface SortingOptionInterface {
  value: string,
  label: string,
}

export interface ErrorInterface {
  field: string,
  errorText: string,
}

export interface ErrorsInterface {
  inputs: Array<ErrorInterface>,
  reenteredPassword?: ErrorInterface,
  captcha?: ErrorInterface,
}

export interface SignUpFormPropsInterface {
  setLoading: (loading: boolean) => void,
}

export interface LogInFormPropsInterface extends SignUpFormPropsInterface {
  isOpen: boolean,
  setIsSignUpDialogOpen: (isSignUpDialogOpen: boolean) => void,
}

export interface CaptchaPropsInterface {
  captchaEntered: string,
  setCaptchaEntered: (captchaEntered: string) => void,
  setCaptchaCreated: (captchaCreated: string) => void,
  errorFound: (field: string) => ErrorInterface | undefined,
  resetErrors: (field: string) => void,
  captchaReload: boolean,
}

export interface ProfileContextInterface {
  changingAccountImage: boolean,
  closeDialog: () => void,
  outletTitle: string | null,
  setIsDialogOpen: (isDialogOpen: boolean) => void,
}

export interface ChatDeletionDialogInterface {
  open: boolean,
  chatId: string,
}

export interface ChatDeletionDialogPropsInterface {
  dialog: ChatDeletionDialogInterface,
  closeDialog: () => void,
  getChatsData: () => void,
}

export interface InterlocutorsPropsInterface {
  myId: string,
	chats: Array<ModifiedChatInterface> | null,
	setChats: (chats: Array<ModifiedChatInterface> | null) => void,
	newMessage: MessageInterface | null,
	setNewMessage: (newMessage: MessageInterface | null) => void,
	chatId: string,
	setChatId: (chatId: string) => void,
	setOldMessages: (oldMessages: Array<MessageInterface> | null) => void,
	setIsChatChosen: (isChatChosen: boolean) => void,
  setLoading: (loading: boolean) => void,
}

export interface LastMessageInterface {
  chatId: string,
  message: MessageInterface,
}

export interface AdCardPropsInterface {
  ad: AdInterface,
}

export interface NewAdFormPropsInterface {
  ad: EmptyAdInterface,
  adIsCreated: boolean,
  setAd: (ad: EmptyAdInterface) => void,
  creationDate: string,
  mainPictureId: string,
  emptyAd: EmptyAdInterface,
  setCreationDate: (creationDate: string) => void,
  setImages: (images: Array<ImageInterface> | null) => void,
}

export interface ImagesCardPropsInterface {
  adIsCreated: boolean,
  setAdIsCreated: (adIsCreated: boolean) => void,
  creationDate: string,
  mainPictureId: string,
  setMainPictureId: (mainPictureId: string) => void,
  images: Array<ImageInterface> | null,
  setImages: (images: Array<ImageInterface> | null) => void,
}