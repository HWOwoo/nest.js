import { PostBaseResponseDto } from "../interfaces/common/PostBaseResponseDto";
import { PostCreateDto } from "../interfaces/post/PostCreateDto";
import { PostResponseDto } from "../interfaces/post/PostResponseDto";
import { PostUpdateDto } from "../interfaces/post/PostUpdateDto";
import Post from "../models/Post";



const createPost = async (postCreateDto: PostCreateDto): Promise<PostBaseResponseDto> => {
    try {
    	// create를 위해 각 filed명에 값들을 할당시켜준다.
        const post = new Post({
            title: postCreateDto.title,
            content: postCreateDto.content,
            additional: {
                category: postCreateDto.additional?.category,
                season: postCreateDto.additional?.season,
            }
        });
        await post.save();

        const data = {
            _id: post.id
        };

        return data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

const updatePost = async (postId: string, postUpdateDto: PostUpdateDto): Promise<PostUpdateDto | null> => {
    try {
        await Post.findByIdAndUpdate(postId, postUpdateDto); // update 로직
        const post = await findPostById(postId); // update 된 정보를 불러오는 로직
        // null이 될 경우를 처리해줘야 한다.
		if (!post) {
            return null;
        }
        return post;

    } catch (error) {
        console.log(error);
        throw error;
    }
}

const findPostById = async (postId: string): Promise<PostResponseDto | null> => {
    try {
        const post = await Post.findById(postId);
        if (!post) {
            return null;
        }
        return post as PostResponseDto;
        
    } catch (error) {
        console.log(error);
        throw error;
    }
}

const deletePost = async (postId: string): Promise<PostResponseDto | null> => {
    try {
        const post = await Post.findByIdAndDelete(postId);
        if (!post) {
            return null;
        }
        return post as PostResponseDto;
    } catch (error) {   
        console.log(error)
        throw error;
    }
}

export default {
    createPost,
    updatePost,
    findPostById,
    deletePost,
}