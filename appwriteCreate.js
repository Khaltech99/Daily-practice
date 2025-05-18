import { Account, Client, OAuthProvider } from "appwrite";

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
