import * as uuid from "uuid";
import { CreateTodoRequest } from "../requests/CreateTodoRequest";
import { TodoItem } from "../models/TodoItem";
//import { TodoUpdate } from "../models/TodoUpdate";
import { TodoAccess } from "../dataLayer/todoAccess";
import { APIGatewayProxyEvent } from "aws-lambda";
import { getUserId } from "../utils/AuthHelper";
//import { UpdateTodoRequest } from "../requests/UpdateTodoRequest";

const todoAccess = new TodoAccess();

const bucketName = process.env.IMAGES_S3_BUCKET

export const getTodos = async (event: APIGatewayProxyEvent): Promise<TodoItem[]> => {
    const userId = getUserId(event);
    return await todoAccess.getTodos(userId);
};

export const createTodo = async (createTodoRequest: CreateTodoRequest, event: APIGatewayProxyEvent): Promise<TodoItem> => {
    const todoId = uuid.v4();
    const userId = getUserId(event);
    return await todoAccess.createTodo({
        createdAt: new Date().toISOString(),
        done: false,
        dueDate: createTodoRequest.dueDate,
        name: createTodoRequest.name,
        todoId,
        userId,
        attachmentUrl: `https://${bucketName}.s3.amazonaws.com/${todoId}`
    });
};



/* export const getTodoItem = async (todoId: string): Promise<TodoItem> => {
    return await todoAccess.getTodoItem(todoId);
};

export const getAllTodos = async (): Promise<TodoItem[]> => {
    return await todoAccess.getAllTodos();
};

export const getAllTodosByUser = async (event: APIGatewayProxyEvent): Promise<TodoItem[]> => {
    const userId = AuthHelper.getUserId(event);
    return await todoAccess.getAllTodosByUser(userId);
}; 





export const updateTodo = async (todoId: string, request: UpdateTodoRequest, event: APIGatewayProxyEvent): Promise<TodoUpdate> => {
    const userId = AuthHelper.getUserId(event);
    return await todoAccess.updateTodo(todoId, userId, request);
};

export const deleteTodo = async (todoId: string, event: APIGatewayProxyEvent): Promise<void> => {
    const userId = AuthHelper.getUserId(event);
    return await todoAccess.deleteTodo(todoId, userId);
};

export const getUploadUrl = (todoId: string) => s3Helper.getUploadUrl(todoId);
export const getUploadUrl(todoId: string): string {
    if (!todoId) {
        return "";
    }

    return this.s3.getSignedUrl('putObject', {
        Bucket: config.todosBucketName,
        Key: todoId,
        Expires: this.urlExpiration
    });
}

export const deleteS3BucketObject = (todoId: string) => s3Helper.deleteObject(todoId);
*/