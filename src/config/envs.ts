import 'dotenv/config'

import {get} from 'env-var'


export const envs = {
    PORT : get('PORT').required().asPortNumber(),
    MONGO_URL: get('MONGO_URL').required().asString(),
    URL: get('URL').required().asString(),
    DB_NAME: get('DB_NAME').required().asString(),
    JWT_SEED: get('JWT_SEED').required().asString(),
    EMAIL_ADMIN: get('EMAIL_ADMIN').required().asString(),
    PASSWORD_ADMIN: get('PASSWORD_ADMIN').required().asString()
}
