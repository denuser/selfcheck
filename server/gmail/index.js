const { OAuth2Client } = require('google-auth-library');
const http = require('http');
const url = require('url');
const opn = require('opn');
const destroyer = require('server-destroy');
const path = require("path")
const { MongoClient, ObjectId } = require('mongodb');

const dbUrl = 'mongodb://localhost:27017';
const dbName = 'selfcheck';

// Download your OAuth2 configuration from the Google
const keys = require(path.resolve(__dirname, './keys.json'));

/**
 * Start by acquiring a pre-authenticated oAuth2 client.
 */
async function main() {
    //const oAuth2Client = await getAuthenticatedClient();


    // Make a simple request to the Google Plus API using our pre-authenticated client. The `request()` method
    // takes an AxiosRequestConfig object.  Visit https://github.com/axios/axios#request-config.
    //const url = 'https://www.googleapis.com/plus/v1/people?query=pizza';
    //const res = await oAuth2Client.request({ url });
    //console.log(res.data);

    const oAuth2Client = new OAuth2Client(
        keys.web.client_id,
        keys.web.client_secret,
        keys.web.redirect_uris[1]
    );

    const client = await MongoClient.connect(dbUrl, { useNewUrlParser: true });
    const db = client.db(dbName);

    const doc = await db.collection('tokens').findOne({ '_id': new ObjectId("5c2f382c70fa833a24f2cd89") })
    client.close();


    await oAuth2Client.setCredentials(doc)
    // const res = await oAuth2Client.verifyIdToken({
    //     idToken: "eyJhbGciOiJSUzI1NiIsImtpZCI6Ijc5NzhhOTEzNDcyNjFhMjkxYmQ3MWRjYWI0YTQ2NGJlN2QyNzk2NjYiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL2FjY291bnRzLmdvb2dsZS5jb20iLCJhenAiOiI2NTk3MDA4MjI0MDMtdGdpY2JwYzNhbm9kZ3BnODBjbmZjaHNwMzZ1azNvdDQuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJhdWQiOiI2NTk3MDA4MjI0MDMtdGdpY2JwYzNhbm9kZ3BnODBjbmZjaHNwMzZ1azNvdDQuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJzdWIiOiIxMDYzNTc5Mjg5MTg4NDMxMjM1NTMiLCJhdF9oYXNoIjoibzZCZ0JsSEFlUUNxeENiNlhsU0g0USIsImlhdCI6MTU0NjUzNzg0MSwiZXhwIjoxNTQ2NTQxNDQxfQ.fIvlg5DRMJ8gUmRMlrMybAecp8pLct0Hsn_K6SR-DvcxvdbkebjYADRAjdpyYcA2q6Su7xVRFDCE8lCc3lQkOu7sXWgkX4b1KRCCJ2tNlBO_ulW9tL1J9mOB1gvWhL_ab9wAu0bHjygkytU88tA7Drywf2sC7pIv8Sbr7LWvMugDD5Vqq-Nb-u_bQHAZ2tOe1TNyupBhjhrzWlFrSXciMYMRjQpYdIAZrs5858pRaLC7l39VMODpQVzHkCXlrZWFnFgQgYTA-L9hWju0hDbcgh3DWrIRIbsdE_V4G1Np7cQUP4kGYnpAVogg-CczkpoYbMwabxH3qd5LTLHizXE_Qw"
    // })

    const isExpiring = oAuth2Client.isTokenExpiring()
    const rtes = await oAuth2Client.getAccessToken();
    
    // After acquiring an access_token, you may want to check on the audience, expiration,
    // or original scopes requested.  You can do that with the `getTokenInfo` method.
    const tokenInfo = await oAuth2Client.getTokenInfo(
        oAuth2Client.credentials.access_token
    );
    console.log(tokenInfo);
}

/**
 * Create a new OAuth2Client, and go through the OAuth2 content
 * workflow.  Return the full client to the callback.
 */
function getAuthenticatedClient() {
    return new Promise((resolve, reject) => {
        // create an oAuth client to authorize the API call.  Secrets are kept in a `keys.json` file,
        // which should be downloaded from the Google Developers Console.
        const oAuth2Client = new OAuth2Client(
            keys.web.client_id,
            keys.web.client_secret,
            keys.web.redirect_uris[1]
        );

        // Generate the url that will be used for the consent dialog.
        const authorizeUrl = oAuth2Client.generateAuthUrl({
            access_type: 'offline',
            scope: 'openid',
            prompt: 'consent'
        });

        // Open an http server to accept the oauth callback. In this simple example, the
        // only request to our webserver is to /oauth2callback?code=<code>
        const server = http
            .createServer(async (req, res) => {
                try {
                    if (req.url.indexOf('/oauth2callback') > -1) {
                        // acquire the code from the querystring, and close the web server.
                        const qs = new url.URL(req.url, 'http://localhost:3000')
                            .searchParams;
                        const code = qs.get('code');
                        console.log(`Code is ${code}`);
                        res.end('Authentication successful! Please return to the console.');
                        server.destroy();

                        // Now that we have the code, use that to acquire tokens.
                        const r = await oAuth2Client.getToken(code);
                        // Make sure to set the credentials on the OAuth2 client.
                        oAuth2Client.setCredentials(r.tokens);
                        console.info('Tokens acquired.');

                        const client = await MongoClient.connect(dbUrl, { useNewUrlParser: true });
                        const db = client.db(dbName);

                        await db.collection('tokens').insertOne(r.tokens);
                        client.close();

                        resolve(oAuth2Client);
                    }
                } catch (e) {
                    reject(e);
                }
            })
            .listen(3000, () => {
                // open the browser to the authorize url to start the workflow
                opn(authorizeUrl, { wait: false }).then(cp => cp.unref());
            });
        destroyer(server);
    });
}

main().catch(console.error);