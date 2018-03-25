let _id = 0;
class Post {
    constructor(author, createdAt, photoLink, likes, discription, hashTags) {
        this.id = String(_id++);
        this.createdAt = createdAt;
        this.photoLink = photoLink;
        this.author = author;
        this.discription = discription;
        this.hashTags = hashTags;
        this.likes = likes;
    }
}

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
                        if (post.createdAt - filterConfig.fromDate < 0)
                            return false;
                    }
                    if (filterConfig.toDate!=="") {
                        if (filterConfig.toDate - post.createdAt < 0)
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
            if (typeof post.discription !== "string")
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

            if (editPost.hasOwnProperty("discription")) {
                if (typeof editPost.description !== "string" || editPost.description === "")
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
                return post2.createdAt - post1.createdAt;
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

                if (editPost.hasOwnProperty("discription")) {
                    post.discription = editPost.discription;
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

const photoPosts = [];

for (method in ServerModule) {
    photoPosts.__proto__[method] = ServerModule[method];
}


photoPosts.addPhotoPost(new Post('AnnaMaria', new Date(1800, 14, 18, 23, 12),'pic/barokko1.jpg',['AnnaMaria', 'MarioValentino'], 'Where my prince on a white horse?', ['#InCastle', '#WaitingForPrince']));
photoPosts.addPhotoPost(new Post('AnnaMaria',new Date(1820, 11, 18, 23, 12),'pic/barokko2.jpg',['StefanoGrande'], 'How to get rid of rats in the house?', ['#InCastle', '#HateRats']));
photoPosts.addPhotoPost(new Post('StefanoGrande',new Date(1810, 10, 16, 20, 12), 'pic/barokko.jpg',['AnnaMaria', 'MarioValentino',], 'War.... war never changes',['#InCastle', '#HateWar']));
photoPosts.addPhotoPost(new Post('MarioValentino',new Date(1850, 10, 16, 20, 12), 'pic/barokko4.jpg',['AnnaMaria'], 'Again I lost the crop',['#NotInCastle', '#NeedJob', '#GodBlessKing']));
photoPosts.addPhotoPost(new Post('AnnaMaria', new Date(1810, 10, 16, 20, 12),'pic/barokko3.jpg',['AnnaMaria'], 'War.... war never changes',['#InCastle', '#HateWar']));
photoPosts.addPhotoPost(new Post('StefanoGrande', new Date(1910, 10, 16, 20, 12),'pic/exadel.jpg',['AnnaMaria'], 'War.... war never changes',['#InCastle', '#HateWar']));
photoPosts.addPhotoPost(new Post('MarioValentino', new Date(1930, 10, 16, 20, 12), 'pic/exadel1.jpg',['AnnaMaria'], 'War.... war never changes',['#InCastle', '#HateWar']));
photoPosts.addPhotoPost(new Post('StefanoGrande', new Date(1900, 10, 16, 20, 12), 'pic/exadel2.jpg',['AnnaMaria', 'StefanoGrande'], 'War.... war never changes',['#InCastle', '#HateWar']));
photoPosts.addPhotoPost(new Post('AnnaMaria', new Date(1950, 10, 16, 20, 12), 'pic/exadel.jpg',['AnnaMaria', 'StefanoGrande'], 'War.... war never changes',['#InCastle', '#HateWar']));
photoPosts.addPhotoPost(new Post('StefanoGrande', new Date(1990, 10, 16, 20, 12), 'pic/order.jpg',['AnnaMaria'], 'War.... war never changes',['#InCastle', '#HateWar']));
photoPosts.addPhotoPost(new Post('AnnaMaria', new Date(2000, 10, 16, 20, 12), 'pic/exadel2.jpg',['AnnaMaria'], 'War.... war never changes',['#InCastle', '#HateWar']));


const filterConfig ={
    fromDate:"",
    toDate:"",
    author:"",
    hashTags:[]
};

const Users = [
    {
        username: "StefanoGrande",
        password: "111"
    },
    {
        username: "AnnaMaria",
        password: "222"
    },
    {
        username: "1",
        password: "1"
    }
]




