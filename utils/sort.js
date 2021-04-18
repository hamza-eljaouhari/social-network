module.exports = {
    sortByCreatedAt: function(list){
        return list.sort((postA, postB) => {
            return new Date(postA.created_at) - new Date(postB.created_at);
        });
    },
    sortByUpdatedAt: function(list){
        return list.sort((postA, postB) => {
            return new Date(postA.updated_at) - new Date(postB.updated_at);
        });
    },
    sortByPublishedAt: function(list){
        return list.sort((postA, postB) => {
            return new Date(postA.published_at) - new Date(postB.published_at);
        });
    }
}