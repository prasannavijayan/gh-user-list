import React from 'react';
import { Link } from 'react-router-dom';
import { List, ListItem, ListItemText, ListItemAvatar, Avatar, Typography, TextField, Button, Grid, Skeleton, useTheme } from '@mui/material';
import { ArrowBack, ArrowForward } from '@mui/icons-material';
import { useUserContext } from './api/User';

function UserList() {
  const theme = useTheme();
  const isDarkTheme = theme.palette.mode === 'dark';
  const { users, loading, page, setPage, searchTerm, setSearchTerm } = useUserContext();

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} ys={12}>
        <TextField
          label="Search"
          variant="outlined"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          fullWidth
          size="small"
          autoFocus
        />
      </Grid>
      <Grid item xs={12}>
        {loading && (
          <List data-testid="loading-skeleton">
            {[...Array(10)].map((_, index) => (
              <ListItem key={index}>
                <ListItemAvatar>
                  <Skeleton variant="circular" width={40} height={40} />
                </ListItemAvatar>
                <ListItemText>
                  <Skeleton variant="text" width="70%" />
                </ListItemText>
              </ListItem>
            ))}
          </List>
        )}
        <List>
          {!loading && users.map((user) => (
            <ListItem
              key={user.id}
              component={Link}
              to={`/user/${user.login}`}
              style={{ textDecoration: 'none', color: 'inherit' }}
              sx={{ '&:hover': { backgroundColor: isDarkTheme ? '#333' : '#f4f4f4' } }}
            >
              <ListItemAvatar>
                <Avatar alt={user.login} src={user.avatar_url} />
              </ListItemAvatar>
              <ListItemText primary={user.login} />
            </ListItem>
          ))}
          {!loading && users.length === 0 && <Typography>No users found</Typography>}
        </List>
      </Grid>
      {
        !searchTerm ?
        <Grid item xs={12} container justifyContent="center">
          <Button onClick={() => setPage(page - 1)} disabled={page === 1 || loading} size="small">
            <ArrowBack />
          </Button>
          <Typography variant="body1" style={{ margin: '0 16px' }}>{page}</Typography>
          <Button onClick={() => setPage(page + 1)} disabled={loading} size="small">
            <ArrowForward />
          </Button>
        </Grid>
        :
        <></>
      }
    </Grid>
  );
}

export default UserList;
