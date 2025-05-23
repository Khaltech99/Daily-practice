import { Storage, Client, ID } from "appwrite";

const endpoint = "https://fra.cloud.appwrite.io/v1";
const projectId = "675b12f500385603e84e";

const client = new Client().setEndpoint(endpoint).setProject(projectId);
const storage = new Storage(client);

export const uploadFiletoServer = async (file) => {
  try {
    const result = await storage.createFile(
      "682d76a80031ade244db",
      ID.unique(),
      file
    );

    return {
      success: true,
      message: "file uploaded successfully",
      result: result,
    };
  } catch (error) {
    console.log(error);
    return { success: false, message: "failed to upload file" };
  }
};
