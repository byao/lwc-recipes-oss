// Simple Express server setup to serve the build output
const compression = require('compression');
const helmet = require('helmet');
const express = require('express');
const path = require('path');

const app = express();
app.use(
    helmet.contentSecurityPolicy({
        directives: {
            defaultSrc: ["'self'"],
            scriptSrcElem: [
                "'self'",
                "'unsafe-inline'",
                '*.googletagmanager.com',
                '*.google-analytics.com',
                '*.decibelinsight.net',
                '*.decibelinsight.com'
            ],
            styleSrc: ["'self'", "'unsafe-inline'"],
            connectSrc: [
                '*.google-analytics.com',
                'www.googleapis.com',
                '*.decibelinsight.net',
                '*.decibelinsight.com',
                'wss://collection.decibelinsight.net',
                'https://collection.decibelinsight.net'
            ],
            imgSrc: ["'self'", '*.google-analytics.com']
        }
    })
);
app.use(
    helmet.referrerPolicy({
        policy: 'no-referrer-when-downgrade'
    })
);
app.use(compression());

const HOST = process.env.HOST || 'localhost';
const PORT = process.env.PORT || 3001;
const DIST_DIR = './dist';

app.use(express.static(DIST_DIR));

app.use('*', (req, res) => {
    res.sendFile(path.resolve(DIST_DIR, 'index.html'));
});

app.listen(PORT, () =>
    console.log(`✅  Server started: http://${HOST}:${PORT}`)
);
