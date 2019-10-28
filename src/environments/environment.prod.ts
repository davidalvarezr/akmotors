export const environment = {
  production: true
};


// const url = `https://whispering-hollows-67471.herokuapp.com`;
const url = `http://localhost:8082`
const endpoint = `${url}/api/v1`;
const publicEndpoint = `${endpoint}/public`;

export const routes = {
  login: `${publicEndpoint}/authenticate`,
  addAd: `${endpoint}/ads`,                                       // POST
  getAllAds: `${publicEndpoint}/ads`,                             // GET
  getOneAd: `${publicEndpoint}/ads`, // /{id}                     // GET
  deleteOneAd: `${endpoint}/ads`, // /{id}                        // DELETE
  softDeleteOneAd: `${endpoint}/ads/softDelete`, // /{id}         // DELETE
  addImages: `${endpoint}/file/upload`,                           // POST
  deleteImages: `${endpoint}/file/delete`, // /{id}               // DELETE
  retrieveImage: `${publicEndpoint}/file/download`, // /{id-n}    // GET
}
