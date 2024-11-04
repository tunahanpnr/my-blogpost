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

export default function BlogPage() {
    const [cardData, setCardData] = useState([
        {
            username: 'Card 1',
            text: 'This is the first card',
            image: 'https://media.istockphoto.com/id/517188688/photo/mountain-landscape.jpg?s=612x612&w=0&k=20&c=A63koPKaCyIwQWOTFBRWXj_PwCrR4cEoOw2S9Q7yVl8=',
            avatar: 'https://img.freepik.com/free-psd/3d-illustration-person-with-sunglasses_23-2149436188.jpg?t=st=1730672920~exp=1730676520~hmac=d343a15a4a4de71883939feffccddb10019f4e74aa44c59a94e37424f79d921c&w=1380'
        },
        {
            username: 'Card 2',
            text: 'This is the second card',
            image: 'https://media.istockphoto.com/id/517188688/photo/mountain-landscape.jpg?s=612x612&w=0&k=20&c=A63koPKaCyIwQWOTFBRWXj_PwCrR4cEoOw2S9Q7yVl8=',
            avatar: 'https://img.freepik.com/free-psd/3d-illustration-person-with-sunglasses_23-2149436188.jpg?t=st=1730672920~exp=1730676520~hmac=d343a15a4a4de71883939feffccddb10019f4e74aa44c59a94e37424f79d921c&w=1380'
        },
        {
            username: 'Card 3',
            text: 'This is the third card',
            image: 'https://media.istockphoto.com/id/517188688/photo/mountain-landscape.jpg?s=612x612&w=0&k=20&c=A63koPKaCyIwQWOTFBRWXj_PwCrR4cEoOw2S9Q7yVl8=',
            avatar: 'https://img.freepik.com/free-psd/3d-illustration-person-with-sunglasses_23-2149436188.jpg?t=st=1730672920~exp=1730676520~hmac=d343a15a4a4de71883939feffccddb10019f4e74aa44c59a94e37424f79d921c&w=1380'
        },
        {
            username: 'Card 4',
            text: 'This is the fourth card',
            image: 'https://media.istockphoto.com/id/517188688/photo/mountain-landscape.jpg?s=612x612&w=0&k=20&c=A63koPKaCyIwQWOTFBRWXj_PwCrR4cEoOw2S9Q7yVl8=',
            avatar: 'https://img.freepik.com/free-psd/3d-illustration-person-with-sunglasses_23-2149436188.jpg?t=st=1730672920~exp=1730676520~hmac=d343a15a4a4de71883939feffccddb10019f4e74aa44c59a94e37424f79d921c&w=1380'
        }
    ]);


    useEffect(() => {

    }, []);

    return (
        <>
            <BlogForm/>
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
                        {cardData.map((card, index) => (
                            <Card key={index} variant="outlined"
                                  sx={{display: 'flex', height: 'auto', alignItems: 'flex-start'}}>
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
                                        avatar={<Avatar src={card.avatar} alt={card.username}/>}
                                        title={card.username}
                                        sx={{padding: 0}}
                                    />
                                    <CardMedia
                                        component="img"
                                        image={card.image}
                                        alt={card.username}
                                        sx={{
                                            height: '100%',
                                            width: '100%',
                                            objectFit: 'cover',
                                            borderRadius: 2,
                                            marginTop: 1
                                        }} // Changed to cover
                                    />
                                </Box>

                                <Box
                                    sx={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        width: '60%',
                                        padding: 2
                                    }}
                                >
                                    <CardContent>
                                        <Typography variant="body2" color="text.secondary">
                                            {card.text}
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