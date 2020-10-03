import React from 'react';
import { Box, Card, CardContent, Typography } from '@material-ui/core';

export default ({ id, name, email }) => (
    <Box width="100%">
        <Card variant="outlined">
            <CardContent>
                <Typography>
                    USER ID: {id}
                </Typography>
                <Typography>
                    NAME: {name}
                </Typography>
                <Typography>
                    EMAIL: {email}
                </Typography>
            </CardContent>
        </Card>
    </Box>

);