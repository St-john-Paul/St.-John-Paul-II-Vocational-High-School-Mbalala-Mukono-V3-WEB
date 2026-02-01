/**
 * Optimizes an image file by resizing and converting to WebP.
 * @param {File} file - The original image file.
 * @param {number} maxWidth - Maximum width for the image (default 1920px).
 * @param {number} quality - WebP quality (0.1 to 1.0, default 0.8).
 * @returns {Promise<File>} - A promise that resolves to the optimized WebP File object.
 */
export const optimizeImage = (file, maxWidth = 1920, quality = 0.8) => {
    return new Promise((resolve, reject) => {
        if (!file || !file.type.startsWith('image/')) {
            reject(new Error('Invalid file type. Please upload an image.'));
            return;
        }

        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = (event) => {
            const img = new Image();
            img.src = event.target.result;
            img.onload = () => {
                let width = img.width;
                let height = img.height;

                // Resize if wider than maxWidth (maintain aspect ratio)
                if (width > maxWidth) {
                    height = Math.round((height * maxWidth) / width);
                    width = maxWidth;
                }

                const canvas = document.createElement('canvas');
                canvas.width = width;
                canvas.height = height;

                const ctx = canvas.getContext('2d');
                ctx.drawImage(img, 0, 0, width, height);

                // Convert to WebP
                canvas.toBlob((blob) => {
                    if (!blob) {
                        reject(new Error('Image optimization failed.'));
                        return;
                    }

                    // Create a new File object
                    const newFileName = file.name.replace(/\.[^/.]+$/, "") + ".webp";
                    const newFile = new File([blob], newFileName, {
                        type: 'image/webp',
                        lastModified: Date.now(),
                    });

                    resolve(newFile);
                }, 'image/webp', quality);
            };
            img.onerror = (err) => reject(err);
        };
        reader.onerror = (err) => reject(err);
    });
};
