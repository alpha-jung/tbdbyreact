import * as CryptoJS from 'crypto-js'

const secretKey = process.env.REACT_APP_AES_KEY;

export const encrypt = (password: string) => {
  let result = '';
  
  const data = {
    id: password
  };

  if(typeof secretKey != "undefined") {
    const encrypted = CryptoJS.SHA512(JSON.stringify(data));
    // const encrypted = CryptoJS.AES.encrypt(JSON.stringify(data), secretKey);
    result = encrypted.toString();
  }

  return encodeURIComponent(result);
}
