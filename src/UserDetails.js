import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Avatar, Typography, Grid, Paper, IconButton, Skeleton } from '@mui/material';
import { ArrowBack } from '@mui/icons-material';

function UserDetails() {
  const { username } = useParams();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch(`https://api.github.com/users/${username}`)
      .then((response) => response.json())
      .then((data) => {
        setUser(data);
        setLoading(false);
      })
      .catch((error) => console.error(error));
  }, [username]);

  if (loading) {
    return (
      <Paper style={{ padding: 16, marginTop: 16 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} style={{ textAlign: 'left' }}>
            <IconButton component={Link} to="/" style={{ marginBottom: -4 }}>
              <ArrowBack />
            </IconButton>
          </Grid>
          <Grid item>
            <Skeleton variant="circular" width={200} height={200} />
          </Grid>
          <Grid item>
            <Skeleton variant="text" width={200} />
            <Skeleton variant="text" width={200} />
            <Skeleton variant="text" width={200} />
            <Skeleton variant="text" width={200} />
            <Skeleton variant="text" width={200} />
            <br/><br/>
            <Skeleton variant="text" width={200} />
            <Skeleton variant="text" width={200} />
            <Skeleton variant="text" width={200} />
            <Skeleton variant="text" width={200} />
            <Skeleton variant="text" width={200} />
            <Skeleton variant="text" width={200} />
            <Skeleton variant="text" width={200} />
          </Grid>
        </Grid>
      </Paper>
    );
  }

  if (!user) {
    return <Typography>User not found</Typography>;
  }

  return (
    <Paper style={{ padding: 16, marginTop: 16 }}>
      <Grid container spacing={2}>
        <Grid item xs={12} style={{ textAlign: 'left' }}>
          <IconButton component={Link} to="/" style={{ marginBottom: -4 }}>
            <ArrowBack />
          </IconButton>
        </Grid>
        <Grid item>
          <Avatar alt={user.login} src={user.avatar_url} sx={{ width: 200, height: 200 }} />
        </Grid>
        <Grid item>
          <Typography variant="h4">{user.login}</Typography>
          <Typography>{user.name}</Typography>
          <Typography>{user.location}</Typography>
          <Typography>{user.company}</Typography>
          {user.email && <Typography>{user.email}</Typography>}
          <br/><br/>
          <Typography>Followers: {user.followers}</Typography>
          <Typography>Following: {user.following}</Typography>
          <Typography>Public Repositories: {user.public_repos}</Typography>
          <Typography>Public Gists: {user.public_gists}</Typography>
          <Typography>Bio: {user.bio || '--'}</Typography>
          {user.twitter_username && <Typography>Twitter: {user.twitter_username}</Typography>}
          {user.blog && <Typography>Website: {user.blog}</Typography>}
          <Typography>Created at: {new Date(user.created_at).toLocaleDateString()}</Typography>
          <Typography>Last updated: {new Date(user.updated_at).toLocaleDateString()}</Typography>
        </Grid>
      </Grid>
    </Paper>
  );
}

export default UserDetails;
