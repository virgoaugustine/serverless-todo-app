import 'source-map-support/register'

import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import * as middy from 'middy'
import { cors, httpErrorHandler } from 'middy/middlewares'

import { generateUploadUrl } from '../../helpers/todos'

import { createLogger } from '../../utils/logger'


const logger = createLogger('generateUploadUrl')

export const handler = middy(
  async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    
    // TODO: Return a presigned URL to upload a file for a TODO item with the provided id
    
    const attachmentId = event.pathParameters.todoId
    const uploadUrl = await generateUploadUrl(attachmentId)

    if (uploadUrl) {
      logger.info('URL Generated')
    }
    else {
      logger.error('Could not generate URL')
    }
    

    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true
      },
      body: JSON.stringify({
        uploadUrl
      })
    }
  }
)

handler
  .use(httpErrorHandler())
  .use(
    cors({
      credentials: true
    })
  )