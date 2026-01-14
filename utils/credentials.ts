export type Credentials = {
    username: string;
    password: string;
  };

  export function randomCreds(prefix = 'Username') {
    const id = Date.now().toString().slice(-6);
  
    return {
      username: `${prefix}${id}`,
      password: `Pass${id}`,
    };
  }
  
  