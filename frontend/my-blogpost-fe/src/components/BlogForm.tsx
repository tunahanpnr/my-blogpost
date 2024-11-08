import React, {useState} from 'react';
import {Box, Paper, CardMedia, TextField, Button} from '@mui/material';
import {CreateBlogPost} from "../models/BlogModel.ts";


interface BlogFormProps {
    handleRefresh: () => void
}


const BlogForm: React.FC<BlogFormProps> = ({handleRefresh}) => {
    const [formData, setFormData] = useState<CreateBlogPost>({
        username: '',
        text: '',
        image: null,
        avatar: '',
    });

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = event.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0] || null;
        setFormData((prevData) => ({
            ...prevData,
            image: file,
        }));
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const dataToSend = new FormData();
        dataToSend.append('username', formData.username);
        dataToSend.append('text', formData.text);
        if (formData.image) {
            dataToSend.append('image', formData.image);
        }
        if (formData.avatar) {
            dataToSend.append('avatar', formData.avatar);
        }
        try {
            const response = await fetch('http://localhost:3000/v1/blog/create', {
                method: 'POST',
                body: dataToSend,
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            handleRefresh()
            setFormData({username: '', text: '', image: null, avatar: ''});

        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <Box
            component="form"
            onSubmit={handleSubmit}
            display="flex"
            flexDirection="column"
            alignItems="center"
            marginTop="100px"
        >
            <Paper
                elevation={4}
                sx={{
                    width: '50vw',
                    padding: 2,
                    borderRadius: '8px',
                    background: 'linear-gradient(to bottom right, #f3f4f6, #e0e0e0)',
                }}
            >
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'flex-start',
                        justifyContent: 'space-between',
                        padding: 2,
                    }}
                >
                    {/* Left Part */}
                    <Box sx={{width: '40%', paddingRight: 1}}>
                        <TextField
                            name="avatar"
                            label="Avatar URL"
                            value={formData.avatar}
                            onChange={handleChange}
                            variant="outlined"
                            fullWidth
                            margin="normal"
                        />
                        <TextField
                            type="file"
                            inputProps={{accept: 'image/*'}}
                            margin="normal"
                            fullWidth
                            onChange={handleFileChange}
                        />
                        {formData.image && (
                            <CardMedia
                                component="img"
                                image={URL.createObjectURL(formData.image)}
                                alt="Selected"
                                sx={{
                                    height: '100px',
                                    width: '100%',
                                    objectFit: 'cover',
                                    borderRadius: 2,
                                    marginTop: 1,
                                }}
                            />
                        )}
                    </Box>

                    {/* Right Part */}
                    <Box sx={{width: '60%', paddingLeft: 1}}>
                        <TextField
                            name="username"
                            label="Username"
                            value={formData.username}
                            onChange={handleChange}
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            required={true}
                        />
                        <TextField
                            name="text"
                            label="Text"
                            value={formData.text}
                            onChange={handleChange}
                            variant="outlined"
                            fullWidth
                            multiline
                            rows={4}
                            margin="normal"
                            required={true}
                        />
                    </Box>
                </Box>
                <Button type="submit" variant="contained" color="primary">
                    Add Post
                </Button>
            </Paper>
        </Box>
    );
};

export default BlogForm;
