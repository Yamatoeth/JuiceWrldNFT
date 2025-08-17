import { createThirdwebClient } from "thirdweb";

// Replace this with your client ID string
// refer to https://portal.thirdweb.com/typescript/v5/client on how to get a client ID

const clientId = "f2ef2c91bb3aeb736baa602bc4b4b137";

export const client = createThirdwebClient({
  clientId: clientId,
});
