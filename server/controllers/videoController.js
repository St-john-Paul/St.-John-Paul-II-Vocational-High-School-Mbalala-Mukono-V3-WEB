import { Video } from '../models/index.js';

export const createVideo = async (req, res) => {
    try {
        const { title, category, description, video_url_input } = req.body;
        let video_url = video_url_input;
        let thumbnail_url = '/uploads/video-placeholder.png'; // Default placeholder

        if (req.files && req.files.video) {
            video_url = '/uploads/' + req.files.video[0].filename;
        } else if (req.files && req.files.file) { // Fallback for single file upload
            video_url = '/uploads/' + req.files.file[0].filename;
        }

        // Handle thumbnail upload if provided
        if (req.files && req.files.thumbnail) {
            thumbnail_url = '/uploads/' + req.files.thumbnail[0].filename;
        } else if (req.body.thumbnail_url_input) {
            thumbnail_url = req.body.thumbnail_url_input;
        } else if (video_url && (video_url.includes('youtube.com') || video_url.includes('youtu.be'))) {
            // Auto-fetch YT thumbnail logic could go here, for now basic logic
            let navUrl = new URL(video_url);
            let videoId = navUrl.searchParams.get("v");
            if (!videoId && video_url.includes('youtu.be')) {
                videoId = video_url.split('/').pop();
            }
            if (videoId) thumbnail_url = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
        }

        const newVideo = await Video.create({
            title,
            video_url,
            thumbnail_url,
            category,
            description
        });

        res.status(201).json(newVideo);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
};

export const getVideos = async (req, res) => {
    try {
        const { category } = req.query;
        const where = {};
        if (category && category !== 'All') where.category = category;

        const videos = await Video.findAll({
            where,
            order: [['createdAt', 'DESC']]
        });
        res.json(videos);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching videos' });
    }
};

export const getVideoById = async (req, res) => {
    try {
        const { id } = req.params;
        const video = await Video.findByPk(id);
        if (!video) return res.status(404).json({ message: 'Video not found' });
        res.json(video);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching video' });
    }
};

export const updateVideo = async (req, res) => {
    try {
        const { id } = req.params;
        const video = await Video.findByPk(id);
        if (!video) return res.status(404).json({ message: 'Video not found' });

        const { title, category, description, video_url_input, thumbnail_url_input } = req.body;

        // Update fields if provided
        if (title) video.title = title;
        if (category) video.category = category;
        if (description) video.description = description;

        if (req.files && req.files.video) {
            video.video_url = '/uploads/' + req.files.video[0].filename;
        } else if (video_url_input) {
            video.video_url = video_url_input;
        }

        if (req.files && req.files.thumbnail) {
            video.thumbnail_url = '/uploads/' + req.files.thumbnail[0].filename;
        } else if (thumbnail_url_input) {
            video.thumbnail_url = thumbnail_url_input;
        }
        // If updating URL to a YouTube link and no thumbnail provided, try to update thumbnail
        else if (video.video_url.includes('youtube') || video.video_url.includes('youtu.be')) {
            let videoId = '';
            if (video.video_url.includes('youtube.com/watch?v=')) videoId = video.video_url.split('v=')[1].split('&')[0];
            else if (video.video_url.includes('youtu.be/')) videoId = video.video_url.split('youtu.be/')[1].split('?')[0];

            if (videoId && !thumbnail_url_input && !req.files?.thumbnail) {
                video.thumbnail_url = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
            }
        }

        await video.save();
        res.json(video);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
};

export const deleteVideo = async (req, res) => {
    try {
        const { id } = req.params;
        await Video.destroy({ where: { id } });
        res.json({ message: 'Video deleted' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting video' });
    }
};
