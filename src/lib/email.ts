import { dev } from "$app/environment";
import { fromEmailAddress, fromEmailName } from "./constants";

/**
 * Sends an email using the MailChannels API
 * @param to
 * @param subject
 * @param body
 */
export async function sendEmail(to: string, subject: string, body: string) {
  const request = new Request("https://api.mailchannels.net/tx/v1/send", {
    method: "POST",
    headers: {
      "content-type": "application/json"
    },
    body: JSON.stringify({
      personalizations: [
        {
          to: [{ email: to }]
        }
      ],
      from: {
        email: fromEmailAddress,
        name: fromEmailName
      },
      subject,
      content: [
        {
          type: "text/plain",
          value: body
        }
      ]
    })
  });

  if (dev) {
    console.log(`Sending email:
 To: ${to}
 Subject: ${subject}
 Body:
  ${body}`);
  } else {
    const response = await fetch(request);
    if (response.status >= 400) {
      console.error(
        `Error sending email: ${response.status} ${response.statusText} ${await response.text()}`
      );
    }
  }
}
