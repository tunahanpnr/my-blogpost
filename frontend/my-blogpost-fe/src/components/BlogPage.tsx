import {
    Box,
    Paper,
    Card,
    CardHeader,
    CardContent,
    CardMedia,
    Avatar,
    Typography,
} from '@mui/material';
import {useEffect, useState} from "react";
import BlogForm from "./BlogForm.tsx";
import {BlogPost} from "../models/BlogModel.ts";
import {useApi} from "../hooks/useApi.ts";
import {GET_IMAGE_PREFIX, LIST_BLOG_POSTS} from "../api/api.ts";

export default function BlogPage() {
    const [refresh, setRefresh] = useState(false);
    const booksResponse = useApi<BlogPost[]>(LIST_BLOG_POSTS, refresh);
    const [blogPosts, setBlogPosts] = useState<BlogPost[]>(booksResponse.data || []);

    useEffect(() => {
        if (booksResponse.data) {
            setBlogPosts(booksResponse.data);
        }
    }, [booksResponse.data]);

    function handleRefresh(): void {
        setRefresh(prevState => !prevState);
    }

    return (
        <>
            <BlogForm handleRefresh={handleRefresh} />
            <Box
                display="flex"
                alignItems="center"
                justifyContent="center"
                padding="30px"
            >
                <Paper
                    elevation={6}
                    sx={{
                        width: '50vw',
                        padding: '20px',
                        borderRadius: '8px',
                        background: 'linear-gradient(to bottom right, #f3f4f6, #e0e0e0)',
                    }}
                >
                    <Box display="flex" flexDirection="column" gap={2}>
                        {blogPosts.map((card, index) => (
                            <Card key={index} variant="outlined"
                                  sx={{ display: 'flex', height: 'auto', alignItems: 'flex-start' }}>

                                {/* Left Side: Avatar, Username, and Image */}
                                <Box
                                    sx={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'center',
                                        justifyContent: 'flex-start',
                                        width: '40%',
                                        padding: 2
                                    }}
                                >
                                    <CardHeader
                                        avatar={<Avatar src={GET_IMAGE_PREFIX + card.avatar} alt={card.username} />}
                                        title={card.username}
                                        sx={{ padding: 0 }}
                                    />
                                    <CardMedia
                                        component="img"
                                        image={GET_IMAGE_PREFIX + card.image}
                                        sx={{
                                            height: '100%',
                                            width: '100%',
                                            objectFit: 'cover',
                                            borderRadius: 2,
                                            marginTop: 1
                                        }}
                                    />
                                </Box>

                                {/* Right Side: Text Content and Created At Date */}
                                <Box
                                    sx={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        width: '60%',
                                        padding: 2,
                                        position: 'relative'  // Enable absolute positioning within this box
                                    }}
                                >
                                    <CardContent sx={{ width: '100%' }}>
                                        {/* Main Text Content */}
                                        <Typography variant="body2" color="text.secondary">
                                            {card.text}
                                        </Typography>

                                        {/* Created At Date */}
                                        <Typography
                                            variant="caption"
                                            color="text.secondary"
                                            sx={{
                                                position: 'absolute',
                                                bottom: 0,
                                                right: 0,
                                                padding: '4px',
                                                fontSize: '0.75rem',
                                            }}
                                        >
                                            {new Date(card.created_at).toLocaleString()}
                                        </Typography>
                                    </CardContent>
                                </Box>
                            </Card>
                        ))}
                    </Box>
                </Paper>
            </Box>
        </>
    );
}