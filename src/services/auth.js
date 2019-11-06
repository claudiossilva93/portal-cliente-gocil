import OAuth from "oauth-1.0a";
import CryptoJS from "crypto";
import { carregarCliente } from "./cliente";

export const USER_KEY = "@portal-client-user";
export const CLIENTE_KEY = "@portal-client-cliente";

export const isAuthenticated = () => localStorage.getItem(USER_KEY) !== null;

export const getHeader = url => {
  const oauth = OAuth({
    consumer: {
      key: "QA",
      secret: "servidor-qa"
    },
    signature_method: "HMAC-SHA1",
    hash_function: function(base_string, key) {
      return CryptoJS.createHmac("sha1", key)
        .update(base_string)
        .digest("base64");
    },
    nonce_length: 32
  });

  var request_data = {
    url: url,
    method: "GET",
    data: {}
  };

  var token = {
    key: "cc403d82-9eb2-49cc-a9c0-5d451890e3f9",
    secret:
      "18c66741-c413-47c9-b538-14db82db4c1b39f0b6f1-fbc7-42bf-8f8f-32c7b876cbeb"
  };
  const headers = oauth.toHeader(oauth.authorize(request_data, token));
  return headers;
};

export const getUser = () => JSON.parse(localStorage.getItem(USER_KEY));

export const getCliente = () => JSON.parse(localStorage.getItem(CLIENTE_KEY));

export const setCliente = cliente => localStorage.setItem(CLIENTE_KEY, JSON.stringify(cliente));

export const login = user => {
  localStorage.setItem(USER_KEY, JSON.stringify(user));
  carregarCliente( user.cliente );
};

export const logout = () => {
  localStorage.removeItem(USER_KEY);
};


