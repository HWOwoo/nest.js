import { Request, Response } from "express";
import { PostCreateDto } from "../interfaces/post/PostCreateDto";
import { PostUpdateDto } from "../interfaces/post/PostUpdateDto";
import message from "../modules/responseMessage";
import statusCode from "../modules/statusCode";
import util from "../modules/util";
import { PostService } from "../services";


const createPost = async (req: Request, res: Response): Promise<void> => {
    const postCreateDto: PostCreateDto = req.body;
    
    try {
        const data = await PostService.createPost(postCreateDto);
        res.status(statusCode.CREATED).send(util.success(statusCode.CREATED, message.CREATE_POST_SUCCESS, data));
    } catch (error) {
        res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, message.INTERNAL_SERVER_ERROR));
    }
}

const updatePost = async (req: Request, res: Response): Promise<void> => {
    const postUpdateDto: PostUpdateDto = req.body;
    const { postId } = req.params;

    try {
        const data = await PostService.updatePost(postId, postUpdateDto);
        res.status(statusCode.CREATED).send(util.success(statusCode.OK, message.UPDATE_POST_SUCCESS, data));
    } catch (error) {
        res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, message.INTERNAL_SERVER_ERROR));
    }
}

const findPostById = async (req: Request, res: Response): Promise<void> => {
    const { postId } = req.params;

    try {
        const data = await PostService.findPostById(postId);
        res.status(statusCode.CREATED).send(util.success(statusCode.OK, message.READ_POST_SUCCESS, data));
    } catch (error) {
        res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, message.INTERNAL_SERVER_ERROR));
    }
}

const deletePost = async (req: Request, res: Response): Promise<void> => {
    const { postId } = req.params;

    try {
        const data = await PostService.deletePost(postId);
        res.status(statusCode.CREATED).send(util.success(statusCode.OK, message.DELETE_POST_SUCCESS, data));
    } catch (error) {
        res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, message.INTERNAL_SERVER_ERROR));
    }
}

export default {
    createPost,
    updatePost,
    findPostById,
    deletePost,
}