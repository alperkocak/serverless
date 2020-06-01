import 'source-map-support/register'
import * as middy from "middy";
import { cors } from "middy/middlewares";
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import { createLogger } from '../../utils/logger';


const logger = createLogger('createTodo');

export const handler = middy(async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  const todoId = event.pathParameters.todoId
  logger.info('Generating upload url for todo item ',todoId)
  // TODO: Return a presigned URL to upload a file for a TODO item with the provided id
  return undefined
});

handler.use(
  cors({
    origin: "*",
    credentials: true
  })
)