import { Box } from "@mui/material";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import axios from 'axios';
import { useEffect, useState, } from 'react';
import { Link } from "react-router-dom";



const StudentBook = () => {
    const [book, setBooks] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:5000/')
            .then(res => setBooks(res.data))
            .catch(err => console.log(err))
            console.log(book);
    }, [book])
    return (
        <Box sx={{ display: 'flex' }}>
            <Box >
            <div className='max-w-6xl pt-[60px] font-oswald
        mx-auto'>
            <h1 className="text-4xl mb-10 text-center  font-bold">All Books</h1>
            <div className='grid grid-cols-3  items-center justify-center gap-6'>
            {
                book?.map((data,i)=>(
                    <Card key={i} sx={{ maxWidth: 345 }}>
                        <div>
                            
                        </div>
                <CardMedia
                    sx={{ height: 200 }}
                image={data.Image}
                    title="green iguana"
                />
                <CardContent sx={{height:'150px'}}>
                    <Typography gutterBottom  component="div">
                       {data.BookName}
                    </Typography>
                    <Typography   gutterBottom variant="h6" component="div">
                       {data.AuthorName}
                    </Typography>
                    <Typography className='text-right py-1 text-xl font-semibold'  color="text.secondary">
                       {data.Price}$
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button><Link to='/student/bookInfo' size="small">Borrow</Link></Button>
                    <Button size="small">Learn More</Button>
                </
                CardActions>
            </Card>
                ))
            }
            </div>
           
        </div>
            </Box>
        </Box>
    );
};

export default StudentBook;