interface IAddress {
  street: string;
  city: string;
  state: string;
  zipCode: string;
  phoneNumber?: string;
}

export interface IClubMember {
  memberId: number;
  firstName: string;
  lastName: string;
  address?: IAddress;
  memberSince?: string;
  favoriteActivity?: string;
  id?: string
}

