export type userSignUpPayloadType = {
  emailId: string;
  firstName: string;
  lastName?: string;
  password: string;
  otp?: string;
  role: "freelancer" | "client" | "bank";
  countryCode: string;
  currency: string;
  countryName: string;
  mobileNumber: string;
};
