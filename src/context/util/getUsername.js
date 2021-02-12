import Auth from "@aws-amplify/auth";

export default async function getUser() {
  try {
    const user = await Auth.currentAuthenticatedUser();
    return user;
  } catch (error) {
    console.log("error: ", error);
  }
}
