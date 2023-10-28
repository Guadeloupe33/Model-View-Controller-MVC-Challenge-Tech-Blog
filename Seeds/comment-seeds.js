const { Comment } = require('../models');

const commentData = [{
        comment_text: "I loved this article! Very informative and well-written. Thanks for sharing.",
        user_id: 1,
        post_id: 1
    },
    {
        comment_text: "It's amazing how quickly technology is advancing. I'm truly impressed by the recent developments",
        user_id: 2,
        post_id: 2
    },
    {
        comment_text: "I often share articles from this blog with my friends. They always agree on how interesting it is.",
        user_id: 3,
        post_id: 3
    }
];

const seedComments = () => Comment.bulkCreate(commentData);

module.exports = seedComments;