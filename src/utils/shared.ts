import { google } from "googleapis";
// const calendarID = process.env.REACT_APP_CALENDAR_ID;
// const apiKey = process.env.REACT_APP_GOOGLE_API_KEY;
// const accessToken = process.env.REACT_APP_GOOGLE_ACCESS_TOKEN;
// const clientId = process.env.REACT_APP_CLIENT_ID;

// export async function getArgs() {

//   const clientId = argv['clientId'] as string;
//   const clientSecret = argv['clientSecret'] as string;

//   const code = argv.code as string | undefined;
//   const refreshToken = argv.refreshToken as string | undefined;
//   const test = argv.test as boolean;

//   if (!clientId) throw new Error('No clientId ');
//   console.log('We have a clientId');

//   if (!clientSecret) throw new Error('No clientSecret');
//   console.log('We have a clientSecret');

//   if (code) console.log('We have a code');
//   if (refreshToken) console.log('We have a refreshToken');

//   return { code, clientId, clientSecret, refreshToken, test };
// }

export function makeOAuth2Client({
  clientId,
  clientSecret,
}: {
  clientId: string;
  clientSecret: string;
}) {
  return new google.auth.OAuth2(
    /* YOUR_CLIENT_ID */ clientId,
    /* YOUR_CLIENT_SECRET */ clientSecret,
    /* YOUR_REDIRECT_URL */ "urn:ietf:wg:oauth:2.0:oob"
  );
}
