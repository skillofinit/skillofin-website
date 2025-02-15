export type userSignUpPayloadType = {
  emailId: string;
  firstName: string;
  lastName?: string;
  password: string;
  otp?: string;
  role: "freelancer" | "client";
  countryCode: string;
  corrency: string;
  countryName: string;
};
