export type PhotoDTO = {
  url: string;
  path: string;
  _id: string;
};

export type PlaceDTO = {
  amountPaid?: number;
  currency?: string;
  description?: string;
  mainTag?: string;
  people?: number;
  photos?: PhotoDTO[];
  placeName?: {
    address?: string;
    title?: string;
    _id: string;
  };
  subTags?: string[];
  _id: string;
};

export type PlanDTO = {
  _id: string;
  date: string;
  createdAt: string;
  updatedAt?: string;
  originalPost?: string;
  isMyelin?: boolean;
  myelin?: any;
  place?: PlaceDTO | null;
  plan: string;
  slug: string;
  user: UserDTO;
};

export type MonthDataDTO = {
  [date: string]: {
    [planTitle: string]: PlanDTO[];
  };
};

export type PlansResponse = {
  allplans: PlanDTO[];
  quickPlans: PlanDTO[];
  monthData: {
    [month: string]: MonthDataDTO;
  };
};

export type UserDTO = {
  _id: string;
  fullName: string;
  username: string;
  avatarUrl?: string;
  biography?: string;
  email?: string;
};
