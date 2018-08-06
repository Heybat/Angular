"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const functions = require("firebase-functions");
const admin = require("firebase-admin");
const cors = require('cors')({
    origin: true,
});
// const serviceAccount = require('C:\Git\Angular\firebase-functons\functions\shop-8339f-firebase-adminsdk-sk9uj-13d0c3c9df.json');
// admin.initializeApp({
//   credential: admin.credential.cert(functions.config().firebase()),
//   databaseURL: 'https://shop-8339f.firebaseio.com'
// });
const app = admin.initializeApp();
exports.userOnCreate = functions.auth.user().onCreate((user, context) => {
    console.log('in userOncreate');
    if (!user.emailVerified) {
        user.disabled = true;
        console.log(JSON.stringify(user));
    }
    return null;
});
exports.getEmailStatus = functions.https.onRequest((req, res) => {
    cors(req, res, () => {
        console.log('in getEmailStatus');
        if (req.method !== "POST") {
            res.status(400).send({
                message: 'Method is not allowed!'
            });
        }
        const email = req.body.email;
        console.log(email);
        console.log(req.body);
        let status;
        admin.auth().getUserByEmail(email).then((user) => {
            status = user.emailVerified;
            res.status(200).send({ isEmailVerified: status });
        })
            .catch((error) => {
            let response = { errorMessage: error.message,
                errorCode: error.code };
            res.status(400).send(response);
        });
    });
});
//# sourceMappingURL=index.js.map