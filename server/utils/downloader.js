import fs from 'fs';
import path from 'path';
import https from 'https';
import http from 'http';
import { URL } from 'url';

/**
 * Downloads an image from a URL and saves it to the uploads directory.
 * Supports redirects and includes a User-Agent header.
 */
export const downloadImage = async (url, redirectCount = 0) => {
    if (redirectCount > 5) {
        throw new Error('Too many redirects');
    }

    return new Promise((resolve, reject) => {
        try {
            const parsedUrl = new URL(url);
            const protocol = parsedUrl.protocol === 'https:' ? https : http;

            const options = {
                headers: {
                    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
                }
            };

            protocol.get(url, options, (response) => {
                // Handle Redirects
                if (response.statusCode >= 300 && response.statusCode < 400 && response.headers.location) {
                    const nextUrl = new URL(response.headers.location, url).href;
                    return downloadImage(nextUrl, redirectCount + 1).then(resolve).catch(reject);
                }

                if (response.statusCode !== 200) {
                    console.error(`Download failed: ${url} (Status: ${response.statusCode})`);
                    reject(new Error(`Failed to download image: Status Code ${response.statusCode}`));
                    return;
                }

                // Generate filename
                const ext = path.extname(parsedUrl.pathname) || '.jpg';
                const filename = Date.now() + '_downloaded' + (ext.split('?')[0]); // Clean query params if any
                const uploadPath = path.join('uploads', filename);
                const publicPath = '/uploads/' + filename;

                if (!fs.existsSync('uploads')) fs.mkdirSync('uploads');

                const file = fs.createWriteStream(uploadPath);
                response.pipe(file);

                file.on('finish', () => {
                    file.close();
                    resolve(publicPath);
                });
            }).on('error', (err) => {
                console.error(`Download error for ${url}:`, err.message);
                reject(err);
            });
        } catch (error) {
            reject(error);
        }
    });
};
