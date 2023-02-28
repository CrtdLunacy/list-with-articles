export interface MediaGroupsModel  {
  country: string;
  city: string;
  object: string
  developer: string;
  solution?: {
    url?: string;
    description?: string;
  };
  title: string;
  description: string | HTMLElement;
  application: string;
  direction: string;
  id: string;
  created: string;
  updated: string;
};

