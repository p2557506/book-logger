import {sign,verify} from "jsonwebtoken";

export const createTokens = (user) => {
    //3 Arguments taken by token
    //Mixed up sercet/ Create .env file for secret
    const accessToken = sign({
        username: user.username,
        id:user.id

    },
    "changelater"
    );
    return accessToken

}
