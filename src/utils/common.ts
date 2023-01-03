///import { makeOAuth2Client } from "./shared";
import { google } from "googleapis";
const calendarID = process.env.REACT_APP_CALENDAR_ID;
const clientSecret: any = process.env.REACT_APP_GOOGLE_API_KEY;
const accessToken = process.env.REACT_APP_GOOGLE_ACCESS_TOKEN;
const clientId: any = process.env.REACT_APP_CLIENT_ID;

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

export default async function getToken() {
  //const { clientId, clientSecret, code } = await getArgs();
  const oauth2Client = makeOAuth2Client({ clientId, clientSecret });

  // if (code) await getRefreshToken(code);
  // else
  getAuthUrl();

  async function getAuthUrl() {
    const url = oauth2Client.generateAuthUrl({
      // 'online' (default) or 'offline' (gets refresh_token)
      access_type: "offline",

      // scopes are documented here: https://developers.google.com/identity/protocols/oauth2/scopes#calendar
      scope: ["https://www.googleapis.com/auth/calendar", "https://www.googleapis.com/auth/calendar.events"],
    });

    console.log(`Go to this URL to acquire a refresh token:\n\n${url}\n`);
  }

  async function getRefreshToken(code: string) {
    const token = await oauth2Client.getToken(code);
    console.log(token);
  }
}
