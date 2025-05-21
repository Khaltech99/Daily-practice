import { Databases, Client, ID } from "appwrite";

const endpoint = "https://fra.cloud.appwrite.io/v1";
const projectId = "675b12f500385603e84e";

const client = new Client().setEndpoint(endpoint).setProject(projectId);
const database = new Databases(client);

//CREATING DATA PROJECT
export const createProductData = async (productData) => {
  try {
    const result = await database.createDocument(
      "682c9d6b00139cbda86a",
      "682c9dc200231832ed01",
      ID.unique(),
      productData
    );
    return {
      success: true,
      message: "data added successfully to db",
      result: result,
    };
  } catch (error) {
    console.log(error);
    return { success: false, message: "failed adding data to the db" };
  }
};

//SHOW PRODUCTS

export const showProducts = async () => {
  try {
    const result = await database.listDocuments(
      "682c9d6b00139cbda86a",
      "682c9dc200231832ed01"
    );
    return {
      success: true,
      message: "data fetched successfully from db",
      result: result,
    };
  } catch (error) {
    console.log(error);
    return { success: false, message: "failed to fetch data from the db" };
  }
};

//DELETE

export const deleteProduct = async (productId) => {
  try {
    const deleteResult = await database.deleteDocument(
      "682c9d6b00139cbda86a",
      "682c9dc200231832ed01",
      productId
    );
    return {
      success: true,
      message: "data deleted successfully from db",
      result: deleteResult,
    };
  } catch (error) {
    console.log(error);
    return { success: false, message: "failed to delete data from the db" };
  }
};
