# Authentication Logic

## Auth Flow

1. User Registers & then redirected to Login page.
2. Enters email & clicks login. <br />
2.1. We create a token/OTP, hash it and send email with the hash embeded into the URL<br />
2.2. When user clicks the link, we get the hash & verify the token. <br />
2.3. Decode the hash, find the token in DB with id & email. <br />
2.4. If the token is found we sign it with JWT and set cookie with user information. <br />
3. We then read the set cookie and dispatch user info to Redux store.
4. Each minute a function checks if the cookie is still present in application memory, if its not we will dispach a logout.
 