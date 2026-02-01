import { Post } from '../models/index.js';

export const createPost = async (req, res) => {
    try {
        const { title, category, content } = req.body;
        let image_url = req.body.image_url;

        if (req.file) {
            image_url = '/uploads/' + req.file.filename;
        }

        const newPost = await Post.create({
            title,
            category,
            content,
            image_url,
            // author_id: req.user.id // If we track authors
        });

        res.status(201).json(newPost);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const updatePost = async (req, res) => {
    try {
        const { id } = req.params;
        const post = await Post.findByPk(id);
        if (!post) return res.status(404).json({ message: 'Post not found' });

        const { title, category, content, event_date } = req.body;
        let image_url = post.image_url;

        if (req.file) {
            image_url = '/uploads/' + req.file.filename;
        } else if (req.body.image_url_input) {
            // Import downloadImage dynamically or add to top imports if possible
            // Since this is a module, top-level import is better. 
            // BUT: I cannot edit top-level imports easily with this tool if I am targeting line 24.
            // I will use dynamic import or assume I can add top import in a separate call? 
            // Actually, I can use dynamic import here to be safe and avoid multi-edit complexity.
            const { downloadImage } = await import('../utils/downloader.js');
            try {
                image_url = await downloadImage(req.body.image_url_input);
            } catch (err) {
                return res.status(400).json({ message: 'Failed to download image from URL' });
            }
        }

        await post.update({
            title, category, content, event_date, image_url
        });

        res.json(post);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getPosts = async (req, res) => {
    try {
        const { category } = req.query;
        const where = { is_published: true };
        if (category) where.category = category;

        const posts = await Post.findAll({
            where,
            order: [['createdAt', 'DESC']]
        });
        res.json(posts);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching posts' });
    }
};

export const getPostById = async (req, res) => {
    try {
        const { id } = req.params;
        const post = await Post.findByPk(id);
        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }
        res.json(post);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching post' });
    }
};

export const deletePost = async (req, res) => {
    try {
        const { id } = req.params;
        await Post.destroy({ where: { id } });
        res.json({ message: 'Post deleted' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting post' });
    }
};
