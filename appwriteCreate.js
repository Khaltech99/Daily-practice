import { Account, Client, ID, OAuthProvider } from "appwrite";

const endpoint = "https://fra.cloud.appwrite.io/v1";
const projectId = "675b12f500385603e84e";

// Create the client
const client = new Client().setEndpoint(endpoint).setProject(projectId);

export const account = new Account(client);

export const sendPasswordRecovery = async (email) => {
  try {
    const redirectUrl = `${window.location.origin}/update-password`;
    await account.createRecovery(email, redirectUrl);
    return { success: true, message: "Recovery email sent successfully." };
  } catch (error) {
    console.log(error);
    return { success: false, message: "error resetting password" };
  }
};

export const updateUserPassword = async (userId, secret, password) => {
  try {
    await account.updateRecovery(userId, secret, password);
    return { success: true, message: "password updated successfully" };
  } catch (error) {
    console.log(error);
    return { success: false, message: "password update failed" };
  }
};

export const verifyUserAccount = async () => {
  try {
    const redirectUrl = `${window.location.origin}/verify`;
    await account.createVerification(redirectUrl);
    return { success: true, message: "verification email sent successfully" };
  } catch (error) {
    console.log(error);
    return { success: false, message: "verification failed" };
  }
};

//UPDATE VERIFICATION
export const updateVerification = async (userId, secret) => {
  try {
    await account.updateVerification(userId, secret);
    await account.deleteSession("current");
    return {
      success: true,
      message: "update successful",
    };
  } catch (error) {
    console.log(error);
    return { success: false, message: "update not successful" };
  }
};

export const loginWithEmail = async () => {
  const redirectUrlSuccess = `${window.location.origin}/success`;
  const redirectUrlFail = `${window.location.origin}/fail`;
  try {
    await account.createOAuth2Session(
      OAuthProvider.Google,
      redirectUrlSuccess,
      redirectUrlFail
    );
    return { success: true, message: "success" };
  } catch (error) {
    console.log(error);
    return { success: false, message: "login failed" };
  }
};

//LOGIN WITH PHONE NUMBER
export const sendPhoneNumber = async (userPhoneNumber) => {
  try {
    const data = await account.createPhoneToken(ID.unique(), userPhoneNumber);
    return { success: true, message: "token sent successfully", data };
  } catch (error) {
    console.log(error);
    return { success: false, message: "login failed" };
  }
};

export const loginWithToken = async (userId, otp) => {
  try {
    await account.createSession(userId, otp);
    return { success: true, message: "login successful" };
  } catch (error) {
    console.log(error);
    return { success: false, message: "login failed" };
  }
};

//GETUSER

export const getUser = async () => {
  try {
    const user = await account.get();
    return { success: true, message: "user fetched successfully", user };
  } catch (error) {
    console.log(error);
    return { success: false, message: "user not found" };
  }
};
