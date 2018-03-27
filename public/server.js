const ServerModule = (function () {
    
    return {
        
        getPhotoPosts(skip = 0, top = 10, filterConfig) {

            if (typeof skip !== "number" || typeof top !== "number") {
                return;
            }

            let posts = this;
            if (typeof filterConfig === "object") {
                posts = posts.filter((post) => {
                    if (filterConfig.author!=="") {
                        if (!~post.author.indexOf(filterConfig.author))
                            return false;
                    }
                    if (filterConfig.hashTags.length!==0) {
                        if (!filterConfig.hashTags.every((tag) => {
                            return post.hashTags.includes(tag);
                        }))
                            return false;
                    }
                    if (filterConfig.fromDate!=="") {
                        if (new Date(post.createdAt) - filterConfig.fromDate <= 0)
                            return false;
                    }
                    if (filterConfig.toDate!=="") {
                        if (filterConfig.toDate - new Date(post.createdAt) <= 0)
                            return false;
                    }

                    return true;
                });
            }

            return posts.slice(skip, top + skip);
        },

        getPhotoPost(id) {
            if (typeof id !== "string" || id === "") {
                return;
            }

            return this.find((el) => {
                return el.id === id;
            });
        },

        validatePhotoPost(post) {
            if (typeof post !== "object") {
                return false;
            }
            if (typeof post.id !== "string" || post.id === "")
                return false;

            if (this.some((el) => el.id === post.id))
                return false;
            if (typeof post.description !== "string")
                return false;
            if (!(post.createdAt instanceof Date))
                return false;
            if (typeof post.author !== "string" || post.author === "")
                return false;
            if (typeof post.photoLink !== "string" || post.photoLink === "")
                return false;
            if (typeof post.hashTags === "undefined" || !Array.isArray(post.hashTags))
                return false;
            if (typeof post.likes === "undefined" || !Array.isArray(post.hashTags))
                return false;

            return true;
        },

        validateEditPost(editPost) {
            if (typeof editPost !== "object") {
                return false;
            }

            if (editPost.hasOwnProperty("description")) {
                if (typeof editPost.description !== "string")
                    return false;
            }
            if (editPost.hasOwnProperty("photoLink")) {
                if (typeof editPost.photoLink !== "string" || editPost.photoLink === "")
                    return false;
            }
            if (editPost.hasOwnProperty("hashTags")) {
                if (!Array.isArray(editPost.hashTags))
                    return false;
            }
            if (editPost.hasOwnProperty("likes")) {
                if (!Array.isArray(editPost.likes))
                    return false;
            }
            return true;

        },

        addPhotoPost(post) {
            if (!this.validatePhotoPost(post))
                return false;

            this.unshift(post);
            this.sort((post1, post2) => {
                return new Date(post2.createdAt) - new Date(post1.createdAt);
            });
            return true;
        },

        editPhotoPost(id, editPost) {
            if (typeof id !== "string" || id === "" || typeof editPost !== "object") {
                return false;
            }

            let post = this.getPhotoPost(id);
            if (post) {

                if (!this.validateEditPost(editPost)) {
                    return false;
                }

                if (editPost.hasOwnProperty("description")) {
                    post.description = editPost.description;
                }
                if (editPost.hasOwnProperty("photoLink")) {
                    post.photoLink = editPost.photoLink;
                }
                if (editPost.hasOwnProperty("hashTags")) {
                    post.hashTags = editPost.hashTags;
                }
                if (editPost.hasOwnProperty("likes")) {
                    post.likes = editPost.likes;
                }
                return true;
            }

            return false;
        },

        removePhotoPost(id) {
            if (typeof id !== "string" || id === "") {
                return false;
            }

            let index = this.findIndex((el) => {
                return el.id === id;
            });

            if (~index) {
                this.splice(index, 1);
                return true;
            }

            return false;
        }
    }
})();





