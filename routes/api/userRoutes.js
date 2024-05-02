const app= express();

app.get('/api/users', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Get a single user by ID
app.get('/api/users/:userId', async (req, res) => {
  try {
    const user = await User.findById(req.params.userId)
      .populate('thoughts')
      .populate('friends');
    res.json(user);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Create a new user
app.post('/api/users', async (req, res) => {
  try {
    const newUser = await User.create(req.body);
    res.status(201).json(newUser);
  } catch (err) {
    res.status(400).json(err);
  }
});

// Update a user by ID
app.put('/api/users/:userId', async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(req.params.userId, req.body, { new: true });
    res.json(updatedUser);
  } catch (err) {
    res.status(400).json(err);
  }
});

// Delete a user by ID
app.delete('/api/users/:userId', async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.userId);
    res.json(deletedUser);
  } catch (err) {
    res.status(400).json(err);
  }
});

// Add friend
app.post('/api/users/:userId/friends/:friendId', async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    user.friends.push(req.params.friendId);
    await user.save();
    res.json(user);
  } catch (err) {
    res.status(400).json(err);
  }
});

// Remove friend
app.delete('/api/users/:userId/friends/:friendId', async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    user.friends.pull(req.params.friendId);
    await user.save();
    res.json(user);
  } catch (err) {
    res.status(400).json(err);
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});