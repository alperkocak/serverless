import 'source-map-support/register'
import * as middy from "middy";
import { cors } from "middy/middlewares";
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'

import { UpdateTodoRequest } from '../../requests/UpdateTodoRequest'
import { createLogger } from '../../utils/logger';

const logger = createLogger('createTodo');

export const handler = middy(async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => { 
  
  const updatedTodo: UpdateTodoRequest = JSON.parse(event.body)
  logger.info('Updating todo item ',updatedTodo)
  // TODO: Update a TODO item with the provided id using values in the "updatedTodo" object
  return undefined
});

handler.use(
  cors({
    origin: "*",
    credentials: true
  })
)